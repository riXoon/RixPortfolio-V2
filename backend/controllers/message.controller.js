import * as MessageModel from '../models/message.model.js'

export const getMessages = async (req, res) => {
    try {
        const messages = await MessageModel.getAll()
        res.status(200).json(messages)
    } catch (error) {
        console.error('Get Messages Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id } = req.params
        const message = await MessageModel.getById(id)
        if (!message) return res.status(404).json({ message: 'Message not found' })
        res.status(200).json(message)
    } catch (error) {
        console.error('Get Message Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const createMessage = async (req, res) => {
    try {
        const fields = { ...req.body }
        const message = await MessageModel.create(fields)
        res.status(201).json(message)
    } catch (error) {
        console.error('Create Message Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const updateMessage = async (req, res) => {
    try {
        const fields = { ...req.body }

        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ message: 'No fields to update' })
        }

        const message = await MessageModel.update(req.params.id, fields)
        if (!message) return res.status(404).json({ message: 'Message not found' })
        res.status(200).json(message)
    } catch (error) {
        console.error('Update Message Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const message = await MessageModel.remove(req.params.id)
        if (!message) return res.status(404).json({ message: 'Message not found' })
        res.status(200).json({ message: 'Message deleted' })
    } catch (error) {
        console.error('Delete Message Error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
