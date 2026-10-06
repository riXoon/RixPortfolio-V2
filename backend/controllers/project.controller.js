import * as ProjectModel from '../models/project.model.js'
import { uploadImage } from '../utils/storage.js'

// multipart/form-data sends arrays/objects as strings, so we parse them
const parseJSON = (value, fallback) => {
    if (value === undefined || value === '') return fallback
    if (typeof value !== 'string') return value
    try { return JSON.parse(value) } catch { return fallback }
}

const buildFields = (body) => {
    const fields = {}
    const textKeys = ['slug', 'type', 'page_status', 'title', 'description',
        'content', 'summary', 'site_link', 'repo_link', 'date_label', 'status']
    textKeys.forEach(k => { if (body[k] !== undefined) fields[k] = body[k] })

    const jsonKeys = ['roles', 'category', 'tools', 'contributors']
    jsonKeys.forEach(k => { if (body[k] !== undefined) fields[k] = parseJSON(body[k], []) })

    return fields
}

const handleFiles = async (files, fields) => {
    if (!files) return
    if (files.thumbnail?.[0]) fields.thumbnail_url = await uploadImage(files.thumbnail[0], 'projects/thumbnails')
    if (files.poster?.[0]) fields.poster_url = await uploadImage(files.poster[0], 'projects/posters')
    if (files.graphics?.length) {
        fields.graphics = await Promise.all(files.graphics.map(f => uploadImage(f, 'projects/graphics')))
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.getAll()
        res.status(200).json(projects)
    } catch (error) {
        console.error('Get Projects Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getProject = async (req, res) => {
    try {
        const { id } = req.params
        // try slug first (public pages use it), then fall back to uuid
        let project = await ProjectModel.getBySlug(id)
        if (!project && /^[0-9a-f-]{36}$/i.test(id)) project = await ProjectModel.getById(id)

        if (!project) return res.status(404).json({ message: 'Project not found' })
        res.status(200).json(project)
    } catch (error) {
        console.error('Get Project Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const createProject = async (req, res) => {
    try {
        const fields = buildFields(req.body)

        if (!fields.title || !fields.slug) {
            return res.status(400).json({ message: 'title and slug are required' })
        }

        await handleFiles(req.files, fields)
        const project = await ProjectModel.create(fields)
        res.status(201).json(project)
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'A project with this slug already exists' })
        }
        console.error('Create Project Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const updateProject = async (req, res) => {
    try {
        const fields = buildFields(req.body)
        await handleFiles(req.files, fields)

        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }

        const project = await ProjectModel.update(req.params.id, fields)
        if (!project) return res.status(404).json({ message: 'Project not found' })
        res.status(200).json(project)
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'A project with this slug already exists' })
        }
        console.error('Update Project Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const project = await ProjectModel.remove(req.params.id)
        if (!project) return res.status(404).json({ message: 'Project not found' })
        res.status(200).json({ message: 'Project deleted' })
    } catch (error) {
        console.error('Delete Project Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
