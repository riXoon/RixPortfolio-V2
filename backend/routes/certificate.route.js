import express from 'express'
import {
    getCertificates, getCertificate, createCertificate, updateCertificate, deleteCertificate
} from '../controllers/certificate.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { certificateUpload } from '../middlewares/upload.middleware.js'

const router = express.Router()

router.get('/', getCertificates)
router.get('/:id', getCertificate)

router.post('/', protect, certificateUpload, createCertificate)
router.put('/:id', protect, certificateUpload, updateCertificate)
router.delete('/:id', protect, deleteCertificate)

export default router
