import express from 'express'
import {
    getSkills, getSkill, createSkill, updateSkill, deleteSkill
} from '../controllers/skill.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { skillUpload } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.get('/', getSkills)
router.get('/:id', getSkill)

router.post('/', protect, skillUpload, createSkill)
router.put('/:id', protect, skillUpload, updateSkill)
router.delete('/:id', protect, deleteSkill)

export default router
