import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ProjectOverviewData } from './constants/index.js';
import App from './App.jsx'
import './index.css'

// Helper to enforce a minimum loading time so the animation can finish
const lazyWithMinDelay = (importFunc, delay = 3500) => {
  return lazy(() => 
    Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports)
  );
};

// Lazy load pages for code splitting with guaranteed animation time
const Home = lazyWithMinDelay(() => import('./pages/Home.jsx'));
const AllProjects = lazyWithMinDelay(() => import('./pages/AllProjects.jsx'));
const ProjectOverview = lazyWithMinDelay(() => import('./pages/ProjectOverview.jsx'));
const CertificationsPage = lazyWithMinDelay(() => import('./pages/CertificationsPage.jsx'));
const CTFArchivePage = lazyWithMinDelay(() => import('./pages/CTFArchivePage.jsx'));
const NoPage = lazyWithMinDelay(() => import('./pages/NoPage.jsx'));

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

import LoadingScreen from './components/LoadingScreen.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>,
)
