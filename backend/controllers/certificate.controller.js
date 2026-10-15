import * as CertificateModel from '../models/certificate.model.js'
import { uploadImage } from '../utils/storage.js'

export const getCertificates = async (req, res) => {
    try {
        const certificates = await CertificateModel.getAll()
        res.status(200).json(certificates)
    } catch (error) {
        console.error('Get Certificates Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getCertificate = async (req, res) => {
    try {
        const { id } = req.params
        const certificate = await CertificateModel.getById(id)
        if (!certificate) return res.status(404).json({ message: 'Certificate not found' })
        res.status(200).json(certificate)
    } catch (error) {
        console.error('Get Certificate Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// only these columns can be written from the request body
const buildFields = (body) => {
    const fields = {}
    const textKeys = ['title', 'issuer', 'date', 'category', 'description', 'link']
    textKeys.forEach(k => { if (body[k] !== undefined) fields[k] = body[k] })
    if (body.sort_order !== undefined) {
        // multipart sends '' for an empty number input
        fields.sort_order = body.sort_order === '' ? null : Number(body.sort_order)
    }
    return fields
}

export const createCertificate = async (req, res) => {
    try {
        const fields = buildFields(req.body)
        if (!fields.title || !fields.issuer) {
            return res.status(400).json({ message: 'title and issuer are required' })
        }
        if (req.file) {
            fields.image_url = await uploadImage(req.file, 'certificates')
        }

        const certificate = await CertificateModel.create(fields)
        res.status(201).json(certificate)
    } catch (error) {
        console.error('Create Certificate Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const updateCertificate = async (req, res) => {
    try {
        const fields = buildFields(req.body)
        if (req.file) {
            fields.image_url = await uploadImage(req.file, 'certificates')
        }

        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }

        const certificate = await CertificateModel.update(req.params.id, fields)
        if (!certificate) return res.status(404).json({ message: 'Certificate not found' })
        res.status(200).json(certificate)
    } catch (error) {
        console.error('Update Certificate Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const deleteCertificate = async (req, res) => {
    try {
        const certificate = await CertificateModel.remove(req.params.id)
        if (!certificate) return res.status(404).json({ message: 'Certificate not found' })
        res.status(200).json({ message: 'Certificate deleted' })
    } catch (error) {
        console.error('Delete Certificate Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
