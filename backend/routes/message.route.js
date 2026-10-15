import express from 'express'
import {
    getMessages, getMessage, createMessage, updateMessage, deleteMessage
} from '../controllers/message.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', getMessages) // typically protected, but leaving as is for consistency or later modification
router.get('/:id', getMessage)

// Creating a message shouldn't be protected (public contact form)
router.post('/', createMessage)
router.put('/:id', protect, updateMessage)
router.delete('/:id', protect, deleteMessage)

export default router
