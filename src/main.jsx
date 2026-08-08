import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ProjectOverviewData } from './constants/index.js';
import App from './App.jsx'
import './index.css'

// ─── Chunk Error Boundary ─────────────────────────────────────────────────────
// Catches "Failed to fetch dynamically imported module" errors that occur when
// a new deployment invalidates chunk hashes that are still cached in the browser.
// On first detection it triggers a one-time hard reload; after that it renders a
// friendly UI so the user isn't left with a blank screen.
class ChunkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      /Loading chunk/.test(error?.message ?? '') ||
      /Failed to fetch dynamically imported module/.test(error?.message ?? '') ||
      /Importing a module script failed/.test(error?.message ?? '');

    if (isChunkError) {
      // Only auto-reload once per session to avoid infinite loops
      const alreadyReloaded = sessionStorage.getItem('chunk_reload_attempted');
      if (!alreadyReloaded) {
        sessionStorage.setItem('chunk_reload_attempted', '1');
        window.location.reload();
        return { hasError: false }; // keep rendering while reload fires
      }
    }
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ChunkErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0C0A12',
          color: '#fff',
          fontFamily: 'monospace',
          gap: '1.5rem',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1rem', color: '#9B72EF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Update available
          </p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>
            A new version of this site was deployed.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '420px', lineHeight: 1.6 }}>
            Please refresh the page to load the latest version.
          </p>
          <button
            onClick={() => { sessionStorage.removeItem('chunk_reload_attempted'); window.location.reload(); }}
            style={{
              padding: '0.65rem 1.75rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg,#7B4FD0,#9B72EF)',
              color: '#fff',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              letterSpacing: '0.05em'
            }}
          >
            Refresh page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Lazy page loader ─────────────────────────────────────────────────────────
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
    <ChunkErrorBoundary>
      <HelmetProvider>
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider router={router} />
        </Suspense>
      </HelmetProvider>
    </ChunkErrorBoundary>
  </React.StrictMode>,
)
