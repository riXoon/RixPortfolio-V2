import express from 'express'
import {
    getMessages, getMessage, createMessage, updateMessage, deleteMessage
} from '../controllers/message.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

// messages contain visitors' emails, so reading them is admin-only
router.get('/', protect, getMessages)
router.get('/:id', protect, getMessage)

// Creating a message shouldn't be protected (public contact form)
router.post('/', createMessage)
router.put('/:id', protect, updateMessage)
router.delete('/:id', protect, deleteMessage)

export default router
