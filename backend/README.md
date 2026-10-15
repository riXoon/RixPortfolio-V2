# Portfolio backend

Express API for the portfolio, backed by Supabase (Postgres + Storage).

## Run locally

```bash
cd backend
npm install
cp .env.example .env.development.local   # then fill in the values
npm run dev                               # http://localhost:5500
```

Import the original hardcoded content into Supabase (one-off, safe to re-run):

```bash
npm run import:data -- --dry-run
npm run import:data
```

## Environment variables

| Name | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Service role key. Bypasses RLS, so keep it server-side only |
| `JWT_SECRET` | Signs admin login tokens. Use a long random value, different per environment |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `CORS_ORIGINS` | Comma-separated frontend origins allowed by CORS (`http://localhost:5173` is always allowed) |
| `PORT` | Local only. Vercel assigns its own |

## Deploy to Vercel

1. Import the Git repo in Vercel as a **new project** (separate from the frontend project).
2. Set **Root Directory** to `backend`. Leave build/output settings empty: Vercel detects Express from `app.js`.
3. Add the environment variables above (mark `SUPABASE_SERVICE_KEY` and `JWT_SECRET` as Sensitive).
4. Deploy, then check `https://<your-backend>.vercel.app/health` returns `{"status":"ok"}`.
5. In the **frontend** Vercel project, set `VITE_API_URL=https://<your-backend>.vercel.app/api/v1` and redeploy
   (Vite bakes it in at build time).
6. Set `CORS_ORIGINS` on the backend to the frontend's real domain(s) and redeploy the backend.

Limits that matter here:
- Request bodies are capped at **4.5 MB** by Vercel. A single admin save with several large images can exceed it.
- The filesystem is read-only; all uploads go to Supabase Storage (already the case).

## Endpoints (`/api/v1`)

Public read, admin write (`Authorization: Bearer <token>`):
`projects`, `certificates`, `skills`, `experiences`, `testimonials`, `achievements`

| Method | Path | Auth |
|---|---|---|
| POST | `/auth/login` | public |
| GET | `/<resource>` and `/<resource>/:id` | public (cached 60s; requests with a token are never cached) |
| POST / PUT / DELETE | `/<resource>` / `/<resource>/:id` | admin |
| POST | `/messages` | public (contact form) |
| GET / PUT / DELETE | `/messages` ... | admin |
| GET | `/health` (outside `/api/v1`) | public, touches nothing |
