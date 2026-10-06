import express from 'express'
import {
    getProjects, getProject, createProject, updateProject, deleteProject
} from '../controllers/project.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { projectUpload } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.get('/', getProjects)
router.get('/:id', getProject)

router.post('/', protect, projectUpload, createProject)
router.put('/:id', protect, projectUpload, updateProject)
router.delete('/:id', protect, deleteProject)

export default router
