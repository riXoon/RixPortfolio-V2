import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProjectOverviewData } from './constants/index.js';
import App from './App.jsx'
import './index.css'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home.jsx'));
const AllProjects = lazy(() => import('./pages/AllProjects.jsx'));
const ProjectOverview = lazy(() => import('./pages/ProjectOverview.jsx'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage.jsx'));
const CTFArchivePage = lazy(() => import('./pages/CTFArchivePage.jsx'));
const NoPage = lazy(() => import('./pages/NoPage.jsx'));

const projects = ProjectOverviewData;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-projects",
        element: <AllProjects projects={projects} />,
      },
      {
        path: "/all-projects/:projectId",
        element: <ProjectOverview projects={projects} />,
      },
      {
        path: "/certifications",
        element: <CertificationsPage />,
      },
      {
        path: "/ctf-archive",
        element: <CTFArchivePage />,
      },
      {
        path: "*",
        element: <NoPage />,
      },
    ],
  },
]);

const LoadingFallback = () => (
  <div className="w-screen h-screen flex items-center justify-center bg-[#0A0710]">
    <div className="w-8 h-8 border-4 border-[#9B72EF] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)
