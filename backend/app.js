import express from "express";
import { PORT } from "./config/env.js";
import cors from 'cors'

import supabase from './config/supabase.js'

import authRoutes from './routes/auth.route.js'
import projectRoutes from './routes/project.route.js'
import certificateRoutes from './routes/certificate.route.js'
import skillRoutes from './routes/skill.route.js'
import experienceRoutes from './routes/experience.route.js'
import messageRoutes from './routes/message.route.js'


const app = express();

//middleware
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173']
}))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/projects', projectRoutes)
app.use('/api/v1/certificates', certificateRoutes)
app.use('/api/v1/skills', skillRoutes)
app.use('/api/v1/experiences', experienceRoutes)
app.use('/api/v1/messages', messageRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get('/api/test-db', async(req, res) => {
    try {
        const {data, error} = await supabase.from('admin_users').select('*').limit(5)
        if (error) throw error

        res.json({
            success:true,
            message: 'Successfully connected to Supabase',
            data: data
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

app.listen(PORT, () => {
  console.log(`I am listening to port ${PORT}`);
});