import express from 'express'
import {
    getExperiences, getExperience, createExperience, updateExperience, deleteExperience
} from '../controllers/experience.controller.js'
import { experienceUpload } from '../middlewares/upload.middleware.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', getExperiences)
router.get('/:id', getExperience)

router.post('/', protect, experienceUpload, createExperience)
router.put('/:id', protect, experienceUpload, updateExperience)
router.delete('/:id', protect, deleteExperience)

export default router
