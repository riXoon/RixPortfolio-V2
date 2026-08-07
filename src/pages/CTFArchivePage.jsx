import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { FMlogo, grid01, glow07 } from '../assets';
import { Link, useSearchParams } from 'react-router-dom';
import GitBookRenderer from '../components/GitBookRenderer';
import SEO from '../components/SEO';
import { FiMenu, FiX, FiChevronRight, FiChevronDown, FiFile, FiFileText } from 'react-icons/fi';
import {
  FiGlobe,
  FiLock,
  FiEye,
  FiImage,
  FiActivity,
  FiZap,
  FiCpu,
  FiCode,
  FiSearch,
} from 'react-icons/fi';

// Simple module-level cache for Table of Contents
let cachedTocData = null;
// Cache for individual pages
const cachedPages = new Map();

// ─── Challenge Type Detector ──────────────────────────────────────────────────
// Each entry has:
//   pattern      — strict match against individual page titles (requires dash prefix)
//   loosePattern — relaxed match against parent category titles (keyword anywhere)
const CHALLENGE_TYPES = [
  { pattern: /[—\-]\s*web\b/i,              loosePattern: /\bweb\b/i,         label: 'WEB',       Icon: FiGlobe,    color: '#60A5FA', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.35)'  },
  { pattern: /[—\-]\s*dfir\b/i,             loosePattern: /\bdfir\b/i,        label: 'DFIR',      Icon: FiSearch,   color: '#34D399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.35)'  },
  { pattern: /[—\-]\s*crypto(graphy)?\b/i,  loosePattern: /\bcrypto/i,        label: 'CRYPTO',    Icon: FiLock,     color: '#FBBF24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.35)'  },
  { pattern: /[—\-]\s*osint\b/i,            loosePattern: /\bosint\b/i,       label: 'OSINT',     Icon: FiEye,      color: '#FB923C', bg: 'rgba(251,146,60,0.1)',  border: 'rgba(251,146,60,0.35)'  },
  { pattern: /[—\-]\s*steg(o|anography)\b/i, loosePattern: /\bsteg/i,         label: 'STEGO',     Icon: FiImage,    color: '#F472B6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.35)' },
  { pattern: /[—\-]\s*forensics?\b/i,       loosePattern: /\bforensic/i,      label: 'FORENSICS', Icon: FiActivity, color: '#6EE7B7', bg: 'rgba(110,231,183,0.1)', border: 'rgba(110,231,183,0.35)' },
  { pattern: /[—\-]\s*pwn\b/i,              loosePattern: /\bpwn\b|\bbinary\b|\bexploitation\b/i, label: 'PWN',       Icon: FiZap,      color: '#F87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.35)' },
  { pattern: /[—\-]\s*rev\b/i,              loosePattern: /\brev(erse)?\b|\breverse\b/i,  label: 'REV',       Icon: FiCpu,      color: '#94A3B8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.35)' },
  { pattern: /[—\-]\s*misc\b/i,             loosePattern: /\bmisc\b/i,        label: 'MISC',      Icon: FiCode,     color: '#A78BFA', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.35)' },
];
const DEFAULT_TYPE = { label: 'MISC', Icon: FiFile, color: '#9B72EF', bg: 'rgba(155,114,239,0.1)', border: 'rgba(155,114,239,0.35)' };

// Try strict title match first; if no match, fall back to loose category match
function getChallengeType(title = '', categoryTitle = '') {
  for (const t of CHALLENGE_TYPES) {
    if (t.pattern.test(title)) return t;
  }
  if (categoryTitle) {
    for (const t of CHALLENGE_TYPES) {
      if (t.loosePattern.test(categoryTitle)) return t;
    }
  }
  return DEFAULT_TYPE;
}

// ─── Terminal Boot Loading ─────────────────────────────────────────────────────
const BootLoader = () => {
  const [lines, setLines] = useState([]);
  const bootLines = [
    '> Initializing CTF archive...',
    '> Fetching writeup payload...',
    '> Decrypting content layers...',
    '> Rendering document...',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, bootLines[i]]);
      i++;
      if (i >= bootLines.length) clearInterval(interval);
    }, 380);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center items-start h-64 px-2">
      <div className="font-mono text-[#9B72EF]/80 text-xs space-y-1.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {line}
          </motion.div>
        ))}
        <div className="mt-1">
          <span className="text-[#9B72EF]/60">{'> '}</span>
          <span className="ctf-boot-cursor" />
        </div>
      </div>
    </div>
  );
};

// ─── Sidebar Item ─────────────────────────────────────────────────────────────
const SidebarItem = ({ page, activePageId, onSelectPage, depth = 0, categoryTitle = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = page.pages && page.pages.length > 0;
  const isActive = activePageId === page.id;
  const isTopLevel = depth === 0;
  // Use own title first; if no match, inherit parent category type
  const challengeType = getChallengeType(page.title, categoryTitle);

  // Open folder automatically if a child is active
  useEffect(() => {
    if (
      hasChildren &&
      page.pages.some(
        p => p.id === activePageId || (p.pages && p.pages.some(child => child.id === activePageId))
      )
    ) {
      setIsOpen(true);
    }
  }, [activePageId, hasChildren, page.pages]);

  if (isTopLevel) {
    // ── Section header (CTF event) or leaf intro page ─────────────────────────
    return (
      <div className="flex flex-col mb-1">
        <button
          onClick={() => {
            if (hasChildren) setIsOpen(o => !o);
            onSelectPage(page.id);
          }}
          className={`w-full text-left flex items-center justify-between px-2 py-2.5 rounded-md transition-all duration-150 group ${
            isActive
              ? 'bg-[#9B72EF]/15 text-[#C4A7F5]'
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {hasChildren ? (
              /* Collapsible section — show chevron */
              <span className="font-mono text-[#9B72EF]/60 text-[10px] flex-shrink-0">
                {isOpen ? <FiChevronDown size={11} /> : <FiChevronRight size={11} />}
              </span>
            ) : (
              /* Leaf page (e.g. intro) — page icon */
              <span className="text-[#9B72EF]/40 flex-shrink-0"><FiFileText size={11} /></span>
            )}
            <span className="text-[11px] font-bold uppercase tracking-wider truncate leading-snug">
              {page.title}
            </span>
          </div>
        </button>

        {hasChildren && isOpen && (
          <div className="ml-3 pl-2 border-l border-[#3B2B6A]/40 mt-0.5 mb-1 flex flex-col gap-0.5">
            {page.pages.map(child => (
              <SidebarItem
                key={child.id}
                page={child}
                activePageId={activePageId}
                onSelectPage={onSelectPage}
                depth={1}
                categoryTitle={page.title}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Writeup child item (or sub-category for nested CTFs like PicoCTF) ───────────
  return (
    <div className="flex flex-col">
      {hasChildren ? (
        // Sub-category header (e.g. PicoCTF's "Web Exploitation", "Cryptography", etc.)
        // These act as type-folders; their title IS the challenge type.
        <button
          onClick={() => setIsOpen(o => !o)}
          className={`w-full text-left flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all duration-150 group ${
            isActive || (hasChildren && page.pages?.some(p => p.id === activePageId))
              ? 'text-[#C4A7F5]'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {/* Expand chevron */}
          <span className="flex-shrink-0 text-[#9B72EF]/50 transition-transform duration-150" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            <FiChevronRight size={10} />
          </span>
          {/* Type color dot */}
          <span
            className="flex-shrink-0 w-1 h-1 rounded-full"
            style={{ background: challengeType.color }}
          />
          <span className="text-[10px] font-bold uppercase tracking-wider truncate">{page.title}</span>
        </button>
      ) : (
        // Leaf writeup item
        <div
          className={`ctf-sidebar-active group flex items-center gap-2 px-2 py-2 cursor-pointer rounded-md transition-all duration-150 ${
            isActive
              ? 'bg-[#9B72EF]/15 text-white'
              : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
          }`}
          onClick={() => onSelectPage(page.id)}
        >
          {/* Challenge type colored dot */}
          <span
            className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-px"
            style={{ background: challengeType.color, boxShadow: isActive ? `0 0 6px ${challengeType.color}` : 'none' }}
          />
          <span className="truncate text-[11px] leading-snug flex-1">{page.title}</span>
          {/* Type badge — visible on active or hover */}
          <span
            className={`ctf-challenge-badge flex-shrink-0 transition-opacity duration-150 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            style={{ color: challengeType.color, background: challengeType.bg, borderColor: challengeType.border }}
          >
            <challengeType.Icon size={8} />
            {challengeType.label}
          </span>
        </div>
      )}

      {hasChildren && isOpen && (
      <div className="ml-4 pl-2 border-l border-white/10 mt-0.5 mb-0.5 flex flex-col gap-0.5">
          {page.pages.map(child => (
            <SidebarItem
              key={child.id}
              page={child}
              activePageId={activePageId}
              onSelectPage={onSelectPage}
              depth={depth + 1}
              categoryTitle={page.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Sidebar animation variants ─────────────────────────────────────────────
const tocContainerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};
const tocItemVariants = {
  hidden:  { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};


function usePaneLenis(wrapperRef, contentRef, deps = []) {
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

// ─── Sidebar Skeleton ─────────────────────────────────────────────────────────
const SidebarSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-3 px-2 pt-1">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex flex-col gap-1.5">
        <div className="h-3 bg-white/10 rounded w-3/4" />
        <div className="ml-3 flex flex-col gap-1">
          <div className="h-2.5 bg-white/5 rounded" style={{ width: `${55 + (i % 3) * 15}%` }} />
          <div className="h-2.5 bg-white/5 rounded" style={{ width: `${45 + (i % 2) * 20}%` }} />
        </div>
      </div>
    ))}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const CTFArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  usePaneLenis(sidebarWrapperRef, sidebarContentRef);
  usePaneLenis(mainWrapperRef, mainContentRef, [documentContent]);

  // ── Fetch Table of Contents ──────────────────────────────────────────────
  useEffect(() => {
    const fetchTOC = async () => {
      try {
        if (cachedTocData) {
          setToc(cachedTocData.pages);
          setFilesMap(cachedTocData.filesMap);
          setLoadingToc(false);
          const idFromQuery = searchParams.get('id');
          if (idFromQuery) setActivePageId(idFromQuery);
          else if (cachedTocData.pages.length > 0) setActivePageId(cachedTocData.pages[0].id);
          return;
        }

        const res  = await fetch('/api/gitbook');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch TOC');

        const pages = data.pages || [];
        let newFilesMap = {};
        if (Array.isArray(data.files)) {
          data.files.forEach(f => { newFilesMap[f.id] = f; });
        } else if (data.files && typeof data.files === 'object') {
          newFilesMap = data.files;
        }

        cachedTocData = { pages, filesMap: newFilesMap };
        setToc(pages);
        setFilesMap(newFilesMap);

        const idFromQuery = searchParams.get('id');
        if (idFromQuery) setActivePageId(idFromQuery);
        else if (pages.length > 0) setActivePageId(pages[0].id);
      } catch (err) {
        console.error('Error fetching TOC:', err);
        setError(err.message);
      } finally {
        setLoadingToc(false);
      }
    };
    fetchTOC();
  }, []);

  const handleSelectPage = (id) => {
    setActivePageId(id);
    setSearchParams({ id });
    setIsMobileSidebarOpen(false);
  };

  // ── Fetch Page Content ───────────────────────────────────────────────────
  useEffect(() => {
    if (!activePageId) return;

    const fetchPage = async () => {
      if (cachedPages.has(activePageId)) {
        const cached = cachedPages.get(activePageId);
        setDocumentContent(cached.document);
        setPageData(cached.pageData);
        if (cached.files) setFilesMap(prev => ({ ...prev, ...cached.files }));
        setLoadingPage(false);
        return;
      }

      setLoadingPage(true);
      setDocumentContent(null);
      setPageData(null);

      try {
        const res  = await fetch(`/api/gitbook?pageId=${activePageId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch page');

        setDocumentContent(data.document);
        setPageData(data);

        let newFiles = {};
        if (data.files) {
          if (Array.isArray(data.files)) {
            const map = {};
            data.files.forEach(f => { map[f.id] = f; });
            newFiles = map;
            setFilesMap(prev => ({ ...prev, ...map }));
          } else if (typeof data.files === 'object') {
            newFiles = data.files;
            setFilesMap(prev => ({ ...prev, ...data.files }));
          }
        }

        cachedPages.set(activePageId, { document: data.document, pageData: data, files: newFiles });
      } catch (err) {
        console.error('Failed to fetch page:', err);
        setError(err.message);
      } finally {
        setLoadingPage(false);
      }
    };
    fetchPage();
  }, [activePageId]);

  // Derive the active page title for the header breadcrumb
  const activePageTitle = (() => {
    if (!activePageId || toc.length === 0) return null;
    for (const section of toc) {
      if (section.id === activePageId) return section.title;
      if (section.pages) {
        const child = section.pages.find(p => p.id === activePageId);
        if (child) return child.title;
      }
    }
    return null;
  })();

  const activeChallengeType = getChallengeType(activePageTitle || '');

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      style={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      className="bg-[#0A0710] relative z-0"
    >
      <SEO title="CTF Archive | Erickson Guhilde" description="Archive of my Capture The Flag (CTF) writeups and cybersecurity challenges." />

      {/* Background decorations */}
      <div className='kali-glow fixed top-1/4 left-1/4 w-[40rem] h-[40rem] lg:w-[70rem] lg:h-[70rem]' style={{ opacity: 0.4, zIndex: -10 }} aria-hidden="true" />
      <img src={grid01} alt="Grid background" aria-hidden="true" loading='lazy' decoding='async' className="-z-20 fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="z-20 flex-shrink-0 flex items-center justify-between px-4 md:px-6 py-3 border-b border-[#3B2B6A]/40 bg-[#0A0710]/85 backdrop-blur-md relative overflow-hidden">
        {/* Scanline overlay on header */}
        <div className="ctf-scanline" aria-hidden="true" />

        <div className="flex items-center gap-3 relative z-10">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileSidebarOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            {isMobileSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <Link to="/#ctf-writeups" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={FMlogo} alt="FM-logo" loading='lazy' decoding='async' className="h-6 md:h-8 w-auto object-contain" style={{ filter: 'drop-shadow(0 0 8px rgba(155,114,239,0.5))' }} />
          </Link>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-[#9B72EF]/50">
            <span>~/senec4</span>
            <span>/</span>
            <span className="text-[#9B72EF]/80">ctf-archive</span>
            {activePageTitle && (
              <>
                <span>/</span>
                <span className="text-white/60 truncate max-w-[160px]">{activePageTitle}</span>
              </>
            )}
          </div>
        </div>

        {/* Terminal-style CTF badge */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="font-mono text-[#9B72EF]/50 text-[10px] hidden md:inline">[</span>
          <span className="text-[#9B72EF] font-mono text-[10px] uppercase tracking-[0.18em] font-bold border border-[#9B72EF]/30 px-3 py-1 rounded bg-[#9B72EF]/8">
            CTF ARCHIVE
          </span>
          <span className="font-mono text-[#9B72EF]/50 text-[10px] hidden md:inline">]</span>
        </div>
      </header>

      {/* ── Body (sidebar + content) ─────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 relative">

        {/* ── Desktop Sidebar ───────────────────────────────────────────── */}
        <aside
          ref={sidebarWrapperRef}
          data-lenis-prevent
          className="hidden md:flex flex-col w-64 lg:w-72 flex-shrink-0 border-r border-[#3B2B6A]/30 bg-[#0D0B15]/80 backdrop-blur-md overflow-hidden relative"
        >
          {/* Sidebar scanline */}
          <div className="ctf-scanline opacity-50" aria-hidden="true" />

          <div ref={sidebarContentRef} className="p-3 relative z-10">
            {/* Terminal-style header */}
            <div className="px-2 mb-4 pt-1">
              <p className="font-mono text-[#9B72EF] text-[10px] tracking-wider">
                <span className="text-[#9B72EF]/50">┌─</span> [contents]
              </p>
              <p className="font-mono text-[#9B72EF]/30 text-[9px] mt-0.5 pl-3">
                └─$ ls -la ./writeups/
              </p>
            </div>

            {loadingToc ? (
              <SidebarSkeleton />
            ) : error ? (
              <div className="font-mono text-red-400 text-xs px-2">
                <span className="text-red-500">✕ ERROR:</span> {error}
              </div>
            ) : (
              <motion.div
                className="flex flex-col gap-0.5"
                variants={tocContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {toc.map(page => (
                  <motion.div key={page.id} variants={tocItemVariants}>
                    <SidebarItem
                      page={page}
                      activePageId={activePageId}
                      onSelectPage={handleSelectPage}
                      depth={0}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </aside>

        {/* ── Mobile Sidebar Overlay ────────────────────────────────────── */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 z-40 md:hidden"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              <motion.aside
                data-lenis-prevent
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="absolute inset-y-0 left-0 w-72 bg-[#0D0B15] border-r border-[#3B2B6A]/40 z-50 p-3 shadow-2xl flex flex-col md:hidden ctf-scroll-area relative overflow-hidden"
              >
                {/* Mobile sidebar scanline */}
                <div className="ctf-scanline opacity-40" aria-hidden="true" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <p className="font-mono text-[#9B72EF] text-[10px] tracking-wider">┌─ [contents]</p>
                    <button onClick={() => setIsMobileSidebarOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                      <FiX size={18} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    {toc.map(page => (
                      <motion.div key={page.id} variants={tocItemVariants} initial="hidden" animate="visible">
                        <SidebarItem
                          page={page}
                          activePageId={activePageId}
                          onSelectPage={handleSelectPage}
                          depth={0}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Main Content ──────────────────────────────────────────────── */}
        <main
          ref={mainWrapperRef}
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden"
        >
          <div ref={mainContentRef}>
            <motion.div
              key={activePageId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto px-5 py-8 md:px-10 md:py-12"
            >
              {loadingPage ? (
                <BootLoader />
              ) : !documentContent ? (
                /* ── Empty state ── */
                <div className="flex flex-col justify-center items-start h-64 px-2">
                  <div className="font-mono text-xs space-y-2 text-[#9B72EF]/50">
                    <p><span className="text-[#9B72EF]/70">$</span> cat writeup.md</p>
                    <p className="text-gray-600 italic pl-4">
                      {activePageId ? 'No content found for this page.' : 'Select a writeup from the sidebar.'}
                    </p>
                    <p className="pl-4"><span className="ctf-boot-cursor" /></p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* ── Page Header ── */}
                  {pageData && (
                    <div className="mb-6">
                      {/* Cover image */}
                      {pageData.cover?.ref?.file && filesMap[pageData.cover.ref.file] && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                          className="w-full h-48 md:h-64 rounded-xl overflow-hidden mb-8 border border-[#3B2B6A]/50 shadow-2xl relative"
                        >
                          <img
                            src={filesMap[pageData.cover.ref.file].downloadURL}
                            alt="Cover"
                            loading='lazy'
                            decoding='async'
                            className="w-full h-full object-cover"
                            style={{ objectPosition: `50% ${pageData.cover.yPos ? pageData.cover.yPos * 100 : 50}%` }}
                          />
                          {/* Cover gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0710]/60 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                      )}

                      {/* ── Terminal window frame around title ── */}
                      {pageData.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                          className="mb-6 rounded-xl overflow-hidden border border-[#3B2B6A]/40 bg-[#0F0C16]/60 shadow-xl relative"
                        >
                          {/* Window top bar */}
                          <div className="flex items-center justify-between px-4 py-2.5 bg-[#1A1625] border-b border-[#2D2046]">
                            <div className="flex items-center gap-1.5">
                              <span className="ctf-terminal-dot bg-[#FF5F57]" />
                              <span className="ctf-terminal-dot bg-[#FFBD2E]" />
                              <span className="ctf-terminal-dot bg-[#28CA41]" />
                            </div>
                            {/* Challenge type badge in the title bar */}
                            <span
                              className="ctf-challenge-badge"
                              style={{
                                color: activeChallengeType.color,
                                background: activeChallengeType.bg,
                                borderColor: activeChallengeType.border,
                              }}
                            >
                              <activeChallengeType.Icon size={9} />
                              {activeChallengeType.label}
                            </span>
                          </div>

                          {/* Title content */}
                          <div className="px-6 py-5 relative">
                            <div className="ctf-scanline opacity-30" aria-hidden="true" />
                            <div className="relative z-10">
                              {pageData.icon && (
                                <span className="text-[#9B72EF]/60 mb-2 block">
                                  <FiFileText size={22} />
                                </span>
                              )}
                              <h1 className="text-2xl md:text-3xl font-black text-white ctf-glow-heading leading-tight">
                                {pageData.title}
                              </h1>
                              <div className="mt-3 flex items-center gap-2">
                                <span className="font-mono text-[#9B72EF]/40 text-[10px]">$ ./read</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-[#3B2B6A]/60 to-transparent" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
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
