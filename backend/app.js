import express from "express";
import { PORT, CORS_ORIGINS } from "./config/env.js";
import cors from 'cors'
import compression from 'compression'
import { publicCache } from './middlewares/cache.middleware.js'

import supabase from './config/supabase.js'

import authRoutes from './routes/auth.route.js'
import projectRoutes from './routes/project.route.js'
import certificateRoutes from './routes/certificate.route.js'
import skillRoutes from './routes/skill.route.js'
import experienceRoutes from './routes/experience.route.js'
import messageRoutes from './routes/message.route.js'
import testimonialRoutes from './routes/testimonial.route.js'
import achievementRoutes from './routes/achievement.route.js'


const app = express();

//middleware
app.use(compression())
app.use(express.json())
// CORS_ORIGINS is a comma-separated list of allowed frontends, e.g.
// "https://erixon.dev,https://www.erixon.dev". The local dev server is always allowed.
const allowedOrigins = [
    'http://localhost:5173',
    ...(CORS_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean),
]
app.use(cors({ origin: allowedOrigins }))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/projects', publicCache, projectRoutes)
app.use('/api/v1/certificates', publicCache, certificateRoutes)
app.use('/api/v1/skills', publicCache, skillRoutes)
app.use('/api/v1/experiences', publicCache, experienceRoutes)
app.use('/api/v1/messages', messageRoutes)
app.use('/api/v1/testimonials', publicCache, testimonialRoutes)
app.use('/api/v1/achievements', publicCache, achievementRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Liveness check for uptime monitors. Touches nothing, so it is cheap and leaks nothing.
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Last resort for errors thrown by middleware (e.g. multer rejecting a file):
// always answer with JSON and never leak stack traces or internals.
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const tooLarge = err.code === 'LIMIT_FILE_SIZE';
  const badRequest = tooLarge || err.name === 'MulterError' || err.message === 'Only image files are allowed';
  if (!badRequest) console.error('Unhandled error:', err);
  res.status(badRequest ? 400 : 500).json({
    message: tooLarge ? 'Image is too large (max 5 MB)' : badRequest ? err.message : 'Internal Server Error',
  });
});

// Vercel runs the exported app as a serverless function, so it must not open its own port there.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`I am listening to port ${PORT}`);
  });
}

export default app;
