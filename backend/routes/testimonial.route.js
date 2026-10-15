import express from 'express'
import {
    getTestimonials, getTestimonial, createTestimonial, updateTestimonial, deleteTestimonial
} from '../controllers/testimonial.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { testimonialUpload } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.get('/', getTestimonials)
router.get('/:id', getTestimonial)

router.post('/', protect, testimonialUpload, createTestimonial)
router.put('/:id', protect, testimonialUpload, updateTestimonial)
router.delete('/:id', protect, deleteTestimonial)

export default router
