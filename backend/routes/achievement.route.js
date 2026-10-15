import express from 'express'
import {
    getAchievements, getAchievement, createAchievement, updateAchievement, deleteAchievement
} from '../controllers/achievement.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { achievementUpload } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.get('/', getAchievements)
router.get('/:id', getAchievement)

router.post('/', protect, achievementUpload, createAchievement)
router.put('/:id', protect, achievementUpload, updateAchievement)
router.delete('/:id', protect, deleteAchievement)

export default router
