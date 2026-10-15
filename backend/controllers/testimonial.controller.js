import * as TestimonialModel from '../models/testimonial.model.js'
import { uploadImage } from '../utils/storage.js'

// only these columns can be written from the request body
const buildFields = async (req) => {
    const fields = {}
    const textKeys = ['name', 'role', 'testimonial']
    textKeys.forEach(k => { if (req.body[k] !== undefined) fields[k] = req.body[k] })
    if (req.body.sort_order !== undefined) {
        // multipart sends '' for an empty number input
        fields.sort_order = req.body.sort_order === '' ? null : Number(req.body.sort_order)
    }
    if (req.file) fields.profile_url = await uploadImage(req.file, 'testimonials')
    return fields
}

export const getTestimonials = async (req, res) => {
    try {
        res.status(200).json(await TestimonialModel.getAll())
    } catch (error) {
        console.error('Get Testimonials Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getTestimonial = async (req, res) => {
    try {
        const row = await TestimonialModel.getById(req.params.id)
        if (!row) return res.status(404).json({ message: 'Testimonial not found' })
        res.status(200).json(row)
    } catch (error) {
        console.error('Get Testimonial Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const createTestimonial = async (req, res) => {
    try {
        const fields = await buildFields(req)
        if (!fields.name || !fields.testimonial) {
            return res.status(400).json({ message: 'name and testimonial are required' })
        }
        res.status(201).json(await TestimonialModel.create(fields))
    } catch (error) {
        console.error('Create Testimonial Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const updateTestimonial = async (req, res) => {
    try {
        const fields = await buildFields(req)
        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }
        const row = await TestimonialModel.update(req.params.id, fields)
        if (!row) return res.status(404).json({ message: 'Testimonial not found' })
        res.status(200).json(row)
    } catch (error) {
        console.error('Update Testimonial Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const deleteTestimonial = async (req, res) => {
    try {
        const row = await TestimonialModel.remove(req.params.id)
        if (!row) return res.status(404).json({ message: 'Testimonial not found' })
        res.status(200).json({ message: 'Testimonial deleted' })
    } catch (error) {
        console.error('Delete Testimonial Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
