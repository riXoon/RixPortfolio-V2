import crypto from 'crypto'
import path from 'path'
import supabase from '../config/supabase.js'

const BUCKET_NAME = 'portfolio_media'

export const uploadImage = async(file, folder) => {
    const ext = path.extname(file.originalname)
    const filePath = `${folder}/${crypto.randomUUID()}${ext}`

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            cacheControl: '3600'
        })
        if (error) throw error
        
        const {data} = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)
        return data.publicUrl

}
