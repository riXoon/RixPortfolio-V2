# Dynamic Portfolio & Admin Dashboard Implementation Plan

Based on your requirements, here is a detailed, end-to-end plan for making your portfolio dynamic. We will be using **Express** with a **Standard MVC** structure, **Custom JWT Authentication**, and **Supabase Storage** for images.

## 1. Database Schema & Supabase Preparation
Before writing backend code, you need to define the structure of your data in Supabase.

### Tables to Create in Supabase SQL Editor:
- **`admin_users`**: `id`, `email`, `password_hash`, `created_at`
- **`projects`**: `id`, `title`, `description`, `image_url`, `demo_link`, `repo_link`, `tags` (array of text), `created_at`
- **`certificates`**: `id`, `title`, `issuer`, `date_issued`, `image_url`, `certificate_link`, `created_at`
- **`skills`**: `id`, `category` (e.g., Frontend, Backend), `name`, `icon_url`, `proficiency` (1-100), `created_at`
- **`experiences`**: `id`, `type` (Education/Work), `company_school`, `role`, `duration`, `description`, `created_at`
- **`messages`**: `id`, `sender_name`, `sender_email`, `message`, `is_read` (boolean), `created_at`

### Storage Bucket:
- Create a public bucket in Supabase Storage named `portfolio_media` to store project screenshots, certificate images, and skill icons.

---

## 2. Backend Architecture (MVC Structure)
Organize your `backend/` directory to follow the standard MVC pattern:

```text
backend/
├── config/
│   ├── env.js
│   └── supabase.js       # (Already exists) Supabase client initialization
├── controllers/          # Contains the business logic for each route
│   ├── authController.js
│   ├── projectController.js
│   ├── certificateController.js
│   ├── skillController.js
│   ├── experienceController.js
│   └── messageController.js
├── middlewares/          
│   ├── authMiddleware.js # Verifies JWT tokens for protected routes
│   └── uploadMiddleware.js # Multer setup for handling file uploads before sending to Supabase Storage
├── routes/               # Maps HTTP verbs and endpoints to specific controllers
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   ├── certificateRoutes.js
│   ├── skillRoutes.js
│   ├── experienceRoutes.js
│   └── messageRoutes.js
└── app.js                # (Already exists) Express app entry point
```

---

## 3. Backend Implementation (Routes & Controllers)

### A. Authentication (Custom JWT)
- **`POST /api/auth/login`**: Controller checks `email` and `password_hash` against `admin_users` table (using `bcrypt`). If successful, generates and returns a JWT.
- **Middleware**: `authMiddleware.js` extracts the `Authorization: Bearer <token>` header, verifies it with `jsonwebtoken`, and attaches the user ID to the request.

### B. CRUD Operations (Example: Projects)
For each entity (Projects, Certificates, Skills, Experiences), you will create standard RESTful endpoints:
- **`GET /api/projects`**: (Public) Fetches all projects for the frontend portfolio.
- **`GET /api/projects/:id`**: (Public) Fetches a single project.
- **`POST /api/projects`**: (Protected by JWT) Adds a new project.
- **`PUT /api/projects/:id`**: (Protected by JWT) Updates a project.
- **`DELETE /api/projects/:id`**: (Protected by JWT) Deletes a project.

### C. Image Uploading Flow
When creating or updating a project/certificate with an image:
1. The React frontend sends a `multipart/form-data` POST request.
2. `uploadMiddleware` (using `multer`) intercepts the file in memory.
3. The controller uploads the memory buffer directly to the `portfolio_media` Supabase Storage bucket.
4. Supabase returns the public URL of the uploaded image.
5. The controller saves the public URL along with the rest of the text data into the database table.

---

## 4. Frontend Integration & Admin Dashboard

### A. Admin Dashboard Setup
In your existing Vite/React frontend:
- **Routing Setup (React Router)**: 
  - Create a `/login` page.
  - Create a private `/admin/*` layout using a Protected Route component that checks for the presence of the JWT in `localStorage`.
- **Dashboard UI**:
  - Add a Sidebar to navigate between: Projects, Certificates, Skills, Experiences, and Inbox (Messages).
  - Build standard Data Tables to list items, and Modals/Forms for Creating/Editing items.
- **API Client**:
  - Create an `axios` instance configured to automatically attach the JWT token from `localStorage` to every request.

### B. Dynamic Public Portfolio
Replace your current hardcoded static data with API calls:
- Inside your public components (e.g., `ProjectsSection.jsx`), use `useEffect` (or React Query) to fetch data from `GET /api/projects`.
- Display a loading skeleton or spinner while fetching.
- Map over the fetched data to render your beautiful UI components.
- For the **Contact Form**, point the `onSubmit` handler to `POST /api/messages`.

---

## 5. Suggested Execution Steps

When you are ready to begin coding, I recommend following this sequence:

1. **Database & Storage First**: Create the tables and the storage bucket in your Supabase dashboard.
2. **Backend Authentication**: Install `jsonwebtoken` and `bcryptjs`. Build the login route and JWT middleware. Test it using Postman or Bruno.
3. **Admin Frontend (Login)**: Build the `/login` page on the frontend, save the token to `localStorage`, and redirect to `/admin`.
4. **Backend CRUD & Uploads**: Install `multer`. Build out the routes and controllers for Projects first (including the image upload logic).
5. **Admin Frontend (Projects)**: Build the UI to add, edit, and delete projects from the dashboard.
6. **Public Frontend (Projects)**: Fetch and render the dynamic projects on the main portfolio page.
7. **Repeat for other entities**: Once the Projects pipeline is fully working end-to-end, replicate the pattern for Certificates, Skills, Experiences, and Messages.
