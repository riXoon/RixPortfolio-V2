import React, { useEffect } from 'react';
import useLenisScroll from './hooks/useLenisScroll';
import { Outlet, useLocation } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  useLenisScroll();
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <>
      <CustomCursor />
      <Outlet />
      <Analytics />
    </>
  );
}
