import express from 'express'
import {
    getExperiences, getExperience, createExperience, updateExperience, deleteExperience
} from '../controllers/experience.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', getExperiences)
router.get('/:id', getExperience)

router.post('/', protect, createExperience)
router.put('/:id', protect, updateExperience)
router.delete('/:id', protect, deleteExperience)

export default router
