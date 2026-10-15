// One-off import: copies the hardcoded portfolio data in frontend/src/constants
// into Supabase and uploads every referenced image to the storage bucket.
//
//   npm run import:data -- --dry-run     # show what would happen, write nothing
//   npm run import:data                  # import (existing rows are skipped)
//   npm run import:data -- --overwrite   # also update rows that already exist
//
// Safe to re-run: rows are matched by a natural key (slug / title+issuer / name /
// school) and uploads use deterministic paths, so nothing is duplicated.
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import supabase from '../config/supabase.js'
import { optimizeImage } from '../utils/storage.js'

const BUCKET = 'portfolio_media'
const DRY_RUN = process.argv.includes('--dry-run')
const OVERWRITE = process.argv.includes('--overwrite')

const here = path.dirname(fileURLToPath(import.meta.url))
const FRONTEND = path.resolve(here, '../../frontend')

const MIME = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
    '.gif': 'image/gif', '.svg': 'image/svg+xml', '.avif': 'image/avif',
}

const stats = {}
const bytes = { before: 0, after: 0 }
const failures = []
const bump = (table, key) => {
    stats[table] ??= { created: 0, updated: 0, skipped: 0, failed: 0 }
    stats[table][key]++
}

// ── 1. Load the frontend constants with Vite so asset imports resolve to files ──
const loadConstants = async () => {
    const viteEntry = path.join(FRONTEND, 'node_modules/vite/dist/node/index.js')
    if (!fs.existsSync(viteEntry)) {
        throw new Error(`Vite not found at ${viteEntry}. Run "npm install" in frontend/ first.`)
    }
    const { createServer } = await import(pathToFileURL(viteEntry).href)
    const server = await createServer({
        root: FRONTEND,
        configFile: false,
        logLevel: 'error',
        appType: 'custom',
        server: { middlewareMode: true, hmr: false, watch: null },
        optimizeDeps: { noDiscovery: true, include: [] },
    })
    try {
        return await server.ssrLoadModule('/src/constants/index.js')
    } finally {
        await server.close()
    }
}

// ── 2. Image upload (deterministic path, de-duplicated per run) ──
const uploaded = new Map()

const resolveAssetFile = (url) => {
    if (!url || typeof url !== 'string') return null
    if (url.startsWith('data:')) {
        console.warn('  ! inlined (data:) asset skipped')
        return null
    }
    let clean = decodeURIComponent(url.split(/[?#]/)[0])
    if (clean.startsWith('/@fs/')) clean = clean.slice(5) // absolute path served by vite
    const file = path.isAbsolute(clean) && fs.existsSync(clean) ? clean : path.join(FRONTEND, clean)
    if (!fs.existsSync(file)) {
        console.warn(`  ! asset file not found: ${url}`)
        return null
    }
    return file
}

// Storage can return an error with an empty message when a request drops (large files,
// flaky connection), so retry a few times and always report what we can about the failure.
const describeError = (e) => {
    const parts = [e.message, e.name, e.statusCode ?? e.status, e.originalError?.message, e.cause?.message]
    return parts.filter(Boolean).join(' / ') || JSON.stringify(e)
}

const uploadWithRetry = async (objectPath, buffer, contentType, attempts = 3) => {
    let lastError
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const { error } = await supabase.storage.from(BUCKET).upload(objectPath, buffer, {
                contentType,
                cacheControl: '31536000',
                upsert: true,
            })
            if (!error) return
            lastError = error
        } catch (err) {
            lastError = err // fetch itself threw (network drop)
        }
        if (attempt < attempts) {
            console.warn(`  ! upload failed (${describeError(lastError)}), retry ${attempt}/${attempts - 1}`)
            await new Promise(r => setTimeout(r, 1000 * attempt))
        }
    }
    throw new Error(`upload ${objectPath}: ${describeError(lastError)} (${(buffer.length / 1024).toFixed(0)} KB)`)
}

const uploadAsset = async (assetUrl, folder) => {
    const file = resolveAssetFile(assetUrl)
    if (!file) return null
    if (uploaded.has(file)) return uploaded.get(file)

    const original = fs.readFileSync(file)
    const ext = path.extname(file).toLowerCase()
    // same resize + WebP re-encode the admin uploads get
    const { buffer, contentType } = await optimizeImage(original, MIME[ext] || 'application/octet-stream', folder)
    const outExt = contentType === 'image/webp' ? '.webp' : ext
    const hash = crypto.createHash('sha1').update(buffer).digest('hex').slice(0, 8)
    const objectPath = `imports/${folder}/${path.basename(file, ext)}-${hash}${outExt}`
    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(objectPath)
    bytes.before += original.length
    bytes.after += buffer.length

    if (!DRY_RUN) {
        await uploadWithRetry(objectPath, buffer, contentType)
    }
    bump('images', 'created')
    uploaded.set(file, pub.publicUrl)
    return pub.publicUrl
}

// ── 3. Row writer: insert if missing, optionally update ──
const writeRow = async (table, match, row, label) => {
    try {
        let q = supabase.from(table).select('id')
        for (const [k, v] of Object.entries(match)) q = q.eq(k, v)
        const { data: found, error: findErr } = await q.limit(1)
        if (findErr) throw findErr

        if (found.length && !OVERWRITE) {
            bump(table, 'skipped')
            console.log(`  = ${label} (already exists)`)
            return
        }
        if (DRY_RUN) {
            bump(table, found.length ? 'updated' : 'created')
            console.log(`  + ${label} (dry run)`)
            return
        }
        const { error } = found.length
            ? await supabase.from(table).update(row).eq('id', found[0].id)
            : await supabase.from(table).insert(row)
        if (error) throw error
        bump(table, found.length ? 'updated' : 'created')
        console.log(`  + ${label}`)
    } catch (err) {
        bump(table, 'failed')
        failures.push(`${table} "${label}": ${err.message}`)
        console.error(`  ✗ ${label}: ${err.message}`)
    }
}

// Runs one importer step per item; a failure on one item never stops the rest.
const forEachItem = async (table, items, labelOf, fn) => {
    for (const [i, item] of items.entries()) {
        try {
            await fn(item, i)
        } catch (err) {
            bump(table, 'failed')
            failures.push(`${table} "${labelOf(item)}": ${err.message}`)
            console.error(`  ✗ ${labelOf(item)}: ${err.message}`)
        }
    }
}

// ── 4. Make sure the tables have the columns the importer writes ──
const REQUIRED = {
    projects: ['slug', 'type', 'page_status', 'title', 'description', 'content', 'summary', 'thumbnail_url',
        'poster_url', 'graphics', 'roles', 'category', 'tools', 'contributors', 'site_link', 'repo_link',
        'date_label', 'status'],
    certificates: ['title', 'issuer', 'date', 'category', 'description', 'link', 'image_url', 'sort_order'],
    skills: ['name', 'category', 'icon_url', 'sort_order'],
    experiences: ['type', 'short_title', 'company_school', 'role', 'duration', 'description', 'logo_url', 'sort_order'],
    testimonials: ['name', 'role', 'testimonial', 'profile_url', 'sort_order'],
    achievements: ['title', 'description', 'date', 'image_url', 'sort_order'],
}

const preflight = async () => {
    const problems = []
    for (const [table, cols] of Object.entries(REQUIRED)) {
        for (const col of cols) {
            const { error } = await supabase.from(table).select(col).limit(1)
            if (error) problems.push(`${table}.${col}: ${error.message}`)
        }
    }
    const { error: bucketErr } = await supabase.storage.from(BUCKET).list('', { limit: 1 })
    if (bucketErr) problems.push(`storage bucket "${BUCKET}": ${bucketErr.message}`)

    if (problems.length) {
        console.error('Schema check failed:\n  ' + problems.join('\n  '))
        console.error(`
Run this in the Supabase SQL editor, then try again:

  alter table certificates add column if not exists date text, add column if not exists link text;
  alter table experiences add column if not exists short_title text, add column if not exists logo_url text,
                          add column if not exists sort_order int;
  alter table skills add column if not exists sort_order int;

  create table if not exists testimonials (
    id uuid primary key default gen_random_uuid(),
    name text not null, role text, testimonial text not null, profile_url text,
    sort_order int, created_at timestamptz default now());
  create table if not exists achievements (
    id uuid primary key default gen_random_uuid(),
    title text not null, description text, date text, image_url text,
    sort_order int, created_at timestamptz default now());
  alter table testimonials enable row level security;
  alter table achievements enable row level security;
`)
        process.exit(1)
    }
}

// ── 5. Importers ──
// skills.category is NOT NULL, and the hardcoded list has none, so assign one here.
// Edit them later in the admin if you want different groupings.
const SKILL_CATEGORY = {
    'HyperText Markup Language': 'Frontend', 'Cascading Style Sheet': 'Frontend', 'JavaScript': 'Languages',
    'TypeScript': 'Languages', 'Rust': 'Languages', 'ReactJS': 'Frontend', 'Tailwind CSS': 'Frontend',
    'Bootstrap': 'Frontend', 'NodeJS': 'Backend', 'ExpressJS': 'Backend', 'MongoDB': 'Backend',
    'Git': 'Tools', 'GitHub': 'Tools', 'Figma': 'Tools', 'VS Code': 'Tools', 'Visual Studio': 'Tools',
}

const importSkills = async ({ ExpertiseData }) => {
    console.log('\nSkills')
    await forEachItem('skills', ExpertiseData[0].techStacks, s => s.tooltip, async (s, i) => {
        const icon_url = await uploadAsset(s.icon, 'skills')
        await writeRow('skills', { name: s.tooltip },
            { name: s.tooltip, category: SKILL_CATEGORY[s.tooltip] || 'Other', icon_url, sort_order: i }, s.tooltip)
    })
}

const importEducation = async ({ AboutData }) => {
    console.log('\nEducation')
    // static data is oldest-first; the page shows the newest first
    const entries = [...AboutData[0].education].reverse()
    await forEachItem('experiences', entries, e => e.name, async (e, i) => {
        const logo_url = await uploadAsset(e.logo, 'education')
        await writeRow('experiences', { type: 'Education', company_school: e.name }, {
            type: 'Education', short_title: e.title, company_school: e.name,
            role: e.course, duration: e.level, description: null, logo_url, sort_order: i,
        }, e.name)
    })
}

const importTestimonials = async ({ TestimonialData }) => {
    console.log('\nTestimonials')
    await forEachItem('testimonials', TestimonialData, t => t.name, async (t, i) => {
        const profile_url = await uploadAsset(t.profile, 'testimonials')
        await writeRow('testimonials', { name: t.name }, {
            name: t.name, role: t.role, testimonial: t.testimonial, profile_url, sort_order: i,
        }, t.name)
    })
}

const importAchievements = async ({ AchievementData }) => {
    console.log('\nAchievements')
    await forEachItem('achievements', AchievementData, a => a.title, async (a, i) => {
        const image_url = await uploadAsset(a.image, 'achievements')
        await writeRow('achievements', { title: a.title }, {
            title: a.title, description: a.description, date: a.date, image_url, sort_order: i,
        }, a.title)
    })
}

const importCertificates = async ({ ExpertiseData }) => {
    console.log('\nCertificates')
    const c = ExpertiseData[0].certifications[0]
    await forEachItem('certificates', [...c.images01, ...c.images02], x => x.title, async (cert, i) => {
        const image_url = await uploadAsset(cert.src, 'certificates')
        await writeRow('certificates', { title: cert.title, issuer: cert.issuer }, {
            title: cert.title, issuer: cert.issuer, date: cert.date, category: cert.category,
            description: cert.description, link: null, image_url, sort_order: i,
        }, cert.title)
    })
}

const importProjects = async ({ ProjectOverviewData }) => {
    console.log('\nProjects')
    await forEachItem('projects', ProjectOverviewData, p => p.title, async (p) => {
        // one at a time: three large uploads at once is what tends to drop
        const thumbnail_url = await uploadAsset(p.img, 'projects/thumbnails')
        const poster_url = await uploadAsset(p.poster, 'projects/posters')
        const graphic = await uploadAsset(p.graphics, 'projects/graphics')
        const contributors = []
        for (const c of p.contributor || []) {
            contributors.push({
                name: c.name,
                role: c.role || [],
                ...(c.profile ? { profile: await uploadAsset(c.profile, 'profiles') } : {}),
            })
        }
        await writeRow('projects', { slug: p.id }, {
            slug: p.id, type: p.type, page_status: p.pageStatus, title: p.title,
            description: p.desc, content: p.content, summary: p.summary || null,
            thumbnail_url, poster_url, graphics: graphic ? [graphic] : [],
            roles: p.roles || [], category: p.category || [],
            tools: (p.tools || []).map(t => t.tooltip), contributors,
            site_link: p.siteLink || null, repo_link: p.githubLink || null,
            date_label: p.date || null, status: p.status || null,
        }, p.title)
    })
}

// ── 6. Run ──
const main = async () => {
    console.log(`Import hardcoded data → Supabase${DRY_RUN ? ' (DRY RUN, nothing is written)' : ''}${OVERWRITE ? ' (overwrite existing)' : ''}`)
    await preflight()
    const constants = await loadConstants()

    await importSkills(constants)
    await importEducation(constants)
    await importTestimonials(constants)
    await importAchievements(constants)
    await importCertificates(constants)
    await importProjects(constants)

    console.log('\nSummary')
    console.table(stats)
    const mb = (n) => (n / 1024 / 1024).toFixed(1)
    console.log(`Images: ${mb(bytes.before)} MB -> ${mb(bytes.after)} MB after optimizing`)
    if (failures.length) {
        console.error(`\n${failures.length} failure(s):\n  ` + failures.join('\n  '))
        process.exit(1)
    }
    console.log(DRY_RUN ? '\nDry run complete. Re-run without --dry-run to import.' : '\nDone.')
}

main().catch((err) => {
    console.error('Import aborted:', err.message)
    process.exit(1)
})
