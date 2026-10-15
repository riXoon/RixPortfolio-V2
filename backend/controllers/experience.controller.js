import * as ExperienceModel from '../models/experience.model.js'
import { uploadImage } from '../utils/storage.js'

// only these columns can be written from the request body
const buildFields = async (req) => {
    const fields = {}
    const textKeys = ['type', 'short_title', 'company_school', 'role', 'duration', 'description']
    textKeys.forEach(k => { if (req.body[k] !== undefined) fields[k] = req.body[k] })
    if (req.body.sort_order !== undefined) {
        // multipart sends '' for an empty number input
        fields.sort_order = req.body.sort_order === '' ? null : Number(req.body.sort_order)
    }
    if (req.file) fields.logo_url = await uploadImage(req.file, 'experiences')
    return fields
}

export const getExperiences = async (req, res) => {
    try {
        const experiences = await ExperienceModel.getAll()
        res.status(200).json(experiences)
    } catch (error) {
        console.error('Get Experiences Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getExperience = async (req, res) => {
    try {
        const { id } = req.params
        const experience = await ExperienceModel.getById(id)
        if (!experience) return res.status(404).json({ message: 'Experience not found' })
        res.status(200).json(experience)
    } catch (error) {
        console.error('Get Experience Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const createExperience = async (req, res) => {
    try {
        const fields = await buildFields(req)
        if (!fields.type || !fields.company_school || !fields.role) {
            return res.status(400).json({ message: 'type, company_school and role are required' })
        }
        const experience = await ExperienceModel.create(fields)
        res.status(201).json(experience)
    } catch (error) {
        console.error('Create Experience Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const updateExperience = async (req, res) => {
    try {
        const fields = await buildFields(req)

        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }

        const experience = await ExperienceModel.update(req.params.id, fields)
        if (!experience) return res.status(404).json({ message: 'Experience not found' })
        res.status(200).json(experience)
    } catch (error) {
        console.error('Update Experience Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const deleteExperience = async (req, res) => {
    try {
        const experience = await ExperienceModel.remove(req.params.id)
        if (!experience) return res.status(404).json({ message: 'Experience not found' })
        res.status(200).json({ message: 'Experience deleted' })
    } catch (error) {
        console.error('Delete Experience Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
