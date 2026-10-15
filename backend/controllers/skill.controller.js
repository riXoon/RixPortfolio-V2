import * as SkillModel from '../models/skill.model.js'
import { uploadImage } from '../utils/storage.js'

export const getSkills = async (req, res) => {
    try {
        const skills = await SkillModel.getAll()
        res.status(200).json(skills)
    } catch (error) {
        console.error('Get Skills Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getSkill = async (req, res) => {
    try {
        const { id } = req.params
        const skill = await SkillModel.getById(id)
        if (!skill) return res.status(404).json({ message: 'Skill not found' })
        res.status(200).json(skill)
    } catch (error) {
        console.error('Get Skill Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// only these columns can be written from the request body
const buildFields = async (req) => {
    const fields = {}
    const textKeys = ['name', 'category']
    textKeys.forEach(k => { if (req.body[k] !== undefined) fields[k] = req.body[k] })
    // multipart sends '' for an empty number input
    if (req.body.sort_order !== undefined) {
        fields.sort_order = req.body.sort_order === '' ? null : Number(req.body.sort_order)
    }
    if (req.file) fields.icon_url = await uploadImage(req.file, 'skills')
    return fields
}

export const createSkill = async (req, res) => {
    try {
        const fields = await buildFields(req)

        if (!fields.name) return res.status(400).json({ message: 'name is required' })
        const skill = await SkillModel.create(fields)
        res.status(201).json(skill)
    } catch (error) {
        console.error('Create Skill Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const updateSkill = async (req, res) => {
    try {
        const fields = await buildFields(req)

        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }

        const skill = await SkillModel.update(req.params.id, fields)
        if (!skill) return res.status(404).json({ message: 'Skill not found' })
        res.status(200).json(skill)
    } catch (error) {
        console.error('Update Skill Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const deleteSkill = async (req, res) => {
    try {
        const skill = await SkillModel.remove(req.params.id)
        if (!skill) return res.status(404).json({ message: 'Skill not found' })
        res.status(200).json({ message: 'Skill deleted' })
    } catch (error) {
        console.error('Delete Skill Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
