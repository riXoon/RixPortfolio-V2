import React from 'react';
import useLenisScroll from './hooks/useLenisScroll';
import { Outlet } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  useLenisScroll();
  return (
    <>
      <CustomCursor />
      <Outlet />
      <Analytics />
    </>
  );
}
