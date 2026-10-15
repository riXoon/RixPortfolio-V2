import * as ExperienceModel from '../models/experience.model.js'

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
        const fields = { ...req.body }
        const experience = await ExperienceModel.create(fields)
        res.status(201).json(experience)
    } catch (error) {
        console.error('Create Experience Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const updateExperience = async (req, res) => {
    try {
        const fields = { ...req.body }

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
