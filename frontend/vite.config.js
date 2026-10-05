import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

const dynamicRoutes = [
  '/',
  '/all-projects',
  '/certifications',
  '/ctf-archive',
  '/all-projects/pijin',
  '/all-projects/zentry',
  '/all-projects/zaproll',
  '/all-projects/PARMS',
  '/all-projects/LMS',
  '/all-projects/picpac',
  '/all-projects/monito',
  '/all-projects/gothamgains',
  '/all-projects/furniro',
  '/all-projects/entriq'
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://erixon.dev',
      dynamicRoutes
    })
  ],
})
