import express from "express";
import { PORT } from "./config/env.js";

import supabase from './config/supabase.js'

import authRoutes from './routes/auth.route.js'

const app = express();

//middleware
app.use(express.json())

app.use('/api/v1/auth', authRoutes)

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