import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed'))
    }
    cb(null, true)
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024} //maximum of 5mb per image
})

export const projectUpload = upload.fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'poster', maxCount: 1},
    {name: 'graphics', maxCount: 10}
])