import crypto from 'crypto'
import path from 'path'
import sharp from 'sharp'
import supabase from '../config/supabase.js'

export const BUCKET_NAME = 'portfolio_media'

// Small images (icons, avatars, logos) are shown at a few dozen to ~200px, so 400px
// covers 2x screens. Everything else (posters, certificates, graphics) is capped at 1600px.
const SMALL_FOLDERS = ['skills', 'testimonials', 'experiences', 'education', 'profiles']
const SMALL_WIDTH = 400
const LARGE_WIDTH = 1600

// Formats we leave untouched: vectors can't be resized, and re-encoding a GIF drops animation.
const PASS_THROUGH = new Set(['image/svg+xml', 'image/gif'])

// Resizes (never enlarges) and re-encodes as WebP. Falls back to the original bytes if
// the image can't be processed, so an upload never fails because of optimization.
export const optimizeImage = async (buffer, mimetype, folder) => {
    if (PASS_THROUGH.has(mimetype)) return { buffer, contentType: mimetype, optimized: false }

    const width = SMALL_FOLDERS.some(f => folder.startsWith(f)) ? SMALL_WIDTH : LARGE_WIDTH
    try {
        const out = await sharp(buffer)
            .rotate() // apply EXIF orientation before the metadata is dropped
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toBuffer()
        // keep the original if re-encoding somehow made it bigger
        if (out.length >= buffer.length) return { buffer, contentType: mimetype, optimized: false }
        return { buffer: out, contentType: 'image/webp', optimized: true }
    } catch (err) {
        console.warn(`Image optimization skipped: ${err.message}`)
        return { buffer, contentType: mimetype, optimized: false }
    }
}

const extFor = (contentType, originalName) => {
    if (contentType === 'image/webp') return '.webp'
    return path.extname(originalName)
}

export const uploadImage = async(file, folder) => {
    const { buffer, contentType } = await optimizeImage(file.buffer, file.mimetype, folder)
    // random file names are never reused, so the object is safe to cache for a year
    const filePath = `${folder}/${crypto.randomUUID()}${extFor(contentType, file.originalname)}`

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, buffer, {
            contentType,
            cacheControl: '31536000'
        })
    if (error) throw error

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)
    return data.publicUrl
}
