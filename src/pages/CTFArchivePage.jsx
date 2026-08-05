import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { FMlogo, grid01, glow07 } from '../assets';
import { Link } from 'react-router-dom';
import GitBookRenderer from '../components/GitBookRenderer';
import { FiMenu, FiX, FiChevronRight, FiChevronDown } from 'react-icons/fi';

// ─── Sidebar Item ─────────────────────────────────────────────────────────────
const SidebarItem = ({ page, activePageId, onSelectPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = page.pages && page.pages.length > 0;
  const isActive = activePageId === page.id;

  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center justify-between px-3 py-2 cursor-pointer rounded-md transition-all duration-150 ${
          isActive
            ? 'bg-[#9B72EF]/20 text-[#9B72EF] font-semibold'
            : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}
        onClick={() => {
          if (hasChildren) setIsOpen(o => !o);
          onSelectPage(page.id);
        }}
      >
        <span className="truncate text-sm leading-snug">{page.title}</span>
        {hasChildren && (
          <span className="text-gray-500 ml-2 flex-shrink-0">
            {isOpen ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="ml-3 pl-2 border-l border-white/10 mt-0.5 mb-0.5 flex flex-col gap-0.5">
          {page.pages.map(child => (
            <SidebarItem
              key={child.id}
              page={child}
              activePageId={activePageId}
              onSelectPage={onSelectPage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Lenis container hook ─────────────────────────────────────────────────────
// Creates a Lenis smooth-scroll instance bound to a specific DOM wrapper/content
// pair so the Lenis feel applies to an inner pane rather than the window.
function usePaneLenis(wrapperRef, contentRef, deps = []) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      lerp: 0.1,          // smoothness (0 = instant, 1 = never arrives)
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const CTFArchivePage = () => {
  const [toc, setToc] = useState([]);
  const [filesMap, setFilesMap] = useState({});
  const [activePageId, setActivePageId] = useState(null);
  const [documentContent, setDocumentContent] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loadingToc, setLoadingToc] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [error, setError] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Refs for the two Lenis-managed panes
  const sidebarWrapperRef = useRef(null);
  const sidebarContentRef = useRef(null);
  const mainWrapperRef    = useRef(null);
  const mainContentRef    = useRef(null);

  // Smooth-scroll the desktop sidebar
  usePaneLenis(sidebarWrapperRef, sidebarContentRef);

  // Smooth-scroll the main content area.
  // Re-initialise whenever the page content changes so Lenis recalculates
  // the scroll height after new content renders.
  usePaneLenis(mainWrapperRef, mainContentRef, [documentContent]);

  // ── Fetch Table of Contents ──────────────────────────────────────────────
  useEffect(() => {
    const fetchTOC = async () => {
      try {
        const res  = await fetch('/api/gitbook');
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch TOC');

        const pages = data.pages || [];
        setToc(pages);

        // Convert files array → map keyed by file ID for O(1) lookup
        if (Array.isArray(data.files)) {
          const map = {};
          data.files.forEach(f => { map[f.id] = f; });
          setFilesMap(map);
        } else if (data.files && typeof data.files === 'object') {
          setFilesMap(data.files);
        }

        if (pages.length > 0) setActivePageId(pages[0].id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingToc(false);
      }
    };
    fetchTOC();
  }, []);

  // ── Fetch Page Content ───────────────────────────────────────────────────
  useEffect(() => {
    if (!activePageId) return;

    const fetchPage = async () => {
      setLoadingPage(true);
      setDocumentContent(null);
      setPageData(null);

      try {
        const res  = await fetch(`/api/gitbook?pageId=${activePageId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch page');

        setDocumentContent(data.document);
        setPageData(data);

        if (Array.isArray(data.files) && data.files.length > 0) {
          setFilesMap(prev => {
            const merged = { ...prev };
            data.files.forEach(f => { merged[f.id] = f; });
            return merged;
          });
        }
      } catch (err) {
        console.error('Failed to fetch page:', err);
      } finally {
        setLoadingPage(false);
      }
    };
    fetchPage();
  }, [activePageId]);

  const handleSelectPage = (id) => {
    setActivePageId(id);
    setIsMobileSidebarOpen(false);
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      style={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      className="bg-[#0A0710]"
    >
      {/* Background decorations */}
      <img src={glow07} alt="" aria-hidden="true" className="-z-10 fixed inset-0 w-full h-full object-cover opacity-40 pointer-events-none" />
      <img src={grid01} alt="" aria-hidden="true" className="-z-20 fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="z-20 flex-shrink-0 flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10 bg-[#0A0710]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileSidebarOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            {isMobileSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <Link to="/#ctf-writeups" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={FMlogo} alt="FM-logo" className="h-6 md:h-8 w-auto object-contain" />
          </Link>
        </div>

        <span className="text-[#9B72EF] font-mono text-xs uppercase tracking-widest font-semibold border border-[#9B72EF]/30 px-3 py-1 rounded-full bg-[#9B72EF]/10">
          CTF Archive
        </span>
      </header>

      {/* ── Body (sidebar + content) ─────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 relative">

        {/* ── Desktop Sidebar ───────────────────────────────────────────── */}
        {/*
          data-lenis-prevent  → stops the GLOBAL Lenis from consuming wheel
                                events here so they reach our local instance.
          ref=sidebarWrapperRef → Lenis clips/scrolls within this element.
          overflow-hidden     → required for Lenis container-mode to work.
        */}
        <aside
          ref={sidebarWrapperRef}
          data-lenis-prevent
          className="hidden md:flex flex-col w-64 lg:w-72 flex-shrink-0 border-r border-white/10 bg-[#12101A]/70 backdrop-blur-md overflow-hidden"
        >
          {/* sidebarContentRef is what Lenis translates */}
          <div ref={sidebarContentRef} className="p-3">
            <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-3 px-2">
              Table of Contents
            </p>

            {loadingToc ? (
              <div className="animate-pulse flex flex-col gap-2 px-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-white/10 rounded" style={{ width: `${60 + (i % 3) * 15}%` }} />
                ))}
              </div>
            ) : error ? (
              <div className="text-red-400 text-xs px-2">{error}</div>
            ) : (
              <div className="flex flex-col gap-0.5">
                {toc.map(page => (
                  <SidebarItem
                    key={page.id}
                    page={page}
                    activePageId={activePageId}
                    onSelectPage={handleSelectPage}
                  />
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ── Mobile Sidebar Overlay ────────────────────────────────────── */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 z-40 md:hidden"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              {/* Drawer */}
              <motion.aside
                data-lenis-prevent
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="absolute inset-y-0 left-0 w-72 bg-[#1A1625] border-r border-white/10 z-50 p-3 shadow-2xl flex flex-col md:hidden ctf-scroll-area"
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Contents</p>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="text-gray-400 hover:text-white">
                    <FiX size={18} />
                  </button>
                </div>

                <div className="flex flex-col gap-0.5">
                  {toc.map(page => (
                    <SidebarItem
                      key={page.id}
                      page={page}
                      activePageId={activePageId}
                      onSelectPage={handleSelectPage}
                    />
                  ))}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Main Content ──────────────────────────────────────────────── */}
        {/*
          data-lenis-prevent  → stops global Lenis, local instance takes over.
          ref=mainWrapperRef  → Lenis uses this as the clipping viewport.
          overflow-hidden     → required for Lenis container-mode.
        */}
        <main
          ref={mainWrapperRef}
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-hidden"
        >
          {/* mainContentRef is the element Lenis translates */}
          <div ref={mainContentRef}>
            <motion.div
              key={activePageId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto px-5 py-8 md:px-10 md:py-12"
            >
              {loadingPage ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#9B72EF]" />
                </div>
              ) : !documentContent ? (
                <div className="flex justify-center items-center h-64 text-gray-600 italic text-sm">
                  {activePageId ? 'No content found for this page.' : 'Select a page from the sidebar.'}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* ── Page Header (Cover & Title) ── */}
                  {pageData && (
                    <div className="mb-6">
                      {/* Cover Image */}
                      {pageData.cover?.ref?.file && filesMap[pageData.cover.ref.file] && (
                        <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden mb-8 border border-[#3B2B6A]/50 shadow-2xl relative">
                          <img 
                            src={filesMap[pageData.cover.ref.file].downloadURL} 
                            alt="Cover" 
                            className="w-full h-full object-cover"
                            style={{ objectPosition: `50% ${pageData.cover.yPos ? pageData.cover.yPos * 100 : 50}%` }}
                          />
                        </div>
                      )}
                      
                      {/* Page Title & Icon */}
                      {pageData.title && (
                        <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3 border-b border-[#3B2B6A]/50 pb-4">
                          {pageData.icon && (
                            <span className="text-2xl md:text-3xl">
                              {/* Simple emoji rendering for gitbook icons which are often emojis or names */}
                              {pageData.icon.length > 2 ? '📄' : pageData.icon} 
                            </span>
                          )}
                          {pageData.title}
                        </h1>
                      )}
                    </div>
                  )}
                  
                  {/* ── Page Document Content ── */}
                  <GitBookRenderer document={documentContent} filesMap={filesMap} />
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CTFArchivePage;
