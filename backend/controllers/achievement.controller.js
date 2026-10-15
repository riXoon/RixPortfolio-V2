import * as AchievementModel from '../models/achievement.model.js'
import { uploadImage } from '../utils/storage.js'

// only these columns can be written from the request body
const buildFields = async (req) => {
    const fields = {}
    const textKeys = ['title', 'description', 'date']
    textKeys.forEach(k => { if (req.body[k] !== undefined) fields[k] = req.body[k] })
    if (req.body.sort_order !== undefined) {
        // multipart sends '' for an empty number input
        fields.sort_order = req.body.sort_order === '' ? null : Number(req.body.sort_order)
    }
    if (req.file) fields.image_url = await uploadImage(req.file, 'achievements')
    return fields
}

export const getAchievements = async (req, res) => {
    try {
        res.status(200).json(await AchievementModel.getAll())
    } catch (error) {
        console.error('Get Achievements Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getAchievement = async (req, res) => {
    try {
        const row = await AchievementModel.getById(req.params.id)
        if (!row) return res.status(404).json({ message: 'Achievement not found' })
        res.status(200).json(row)
    } catch (error) {
        console.error('Get Achievement Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const createAchievement = async (req, res) => {
    try {
        const fields = await buildFields(req)
        if (!fields.title) {
            return res.status(400).json({ message: 'title is required' })
        }
        res.status(201).json(await AchievementModel.create(fields))
    } catch (error) {
        console.error('Create Achievement Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const updateAchievement = async (req, res) => {
    try {
        const fields = await buildFields(req)
        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }
        const row = await AchievementModel.update(req.params.id, fields)
        if (!row) return res.status(404).json({ message: 'Achievement not found' })
        res.status(200).json(row)
    } catch (error) {
        console.error('Update Achievement Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const deleteAchievement = async (req, res) => {
    try {
        const row = await AchievementModel.remove(req.params.id)
        if (!row) return res.status(404).json({ message: 'Achievement not found' })
        res.status(200).json({ message: 'Achievement deleted' })
    } catch (error) {
        console.error('Delete Achievement Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
