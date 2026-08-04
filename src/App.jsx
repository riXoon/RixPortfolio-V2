import React from 'react';
import useLenisScroll from './hooks/useLenisScroll';
import { Outlet } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';

export default function App() {
  useLenisScroll();
  return (
    <>
      <CustomCursor />
      <Outlet />
    </>
  );
}
