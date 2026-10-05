import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AchievementData } from '../constants';

// ─── Slide variants (horizontal slide) ──────────────────────────────────────
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// ─── Floating particle dots (purely decorative) ──────────────────────────────
const FloatingDots = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-[#9B72EF]/20 pointer-events-none"
        style={{
          width: `${6 + i * 3}px`,
          height: `${6 + i * 3}px`,
          left: `${10 + i * 15}%`,
          top: `${15 + (i % 3) * 25}%`,
        }}
        animate={{
          y: [0, -12, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 2.5 + i * 0.4,
          repeat: Infinity,
          delay: i * 0.3,
          ease: 'easeInOut',
        }}
      />
    ))}
  </>
);

// ─── Individual Slide Card (landscape image layout) ─────────────────────────
const AchievementSlide = ({ item }) => (
  <div className="w-full flex flex-col">

    {/* ── Top: Landscape Image ── */}
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] shrink-0 overflow-hidden">
      {/* Bottom fade into card body */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#130F1E] via-[#130F1E]/20 to-transparent z-10 pointer-events-none" />
      {/* Subtle purple tint */}
      <div className="absolute inset-0 bg-[#7B4FD0]/10 z-10 pointer-events-none" />
      <motion.img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      {/* Number badge — top left */}
      <div className="absolute top-3 left-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-[#0C0A12]/75 border border-[#9B72EF]/40 backdrop-blur-sm">
        <span className="text-[#9B72EF] font-mono text-[11px] font-bold">{String(item.id).padStart(2, '0')}</span>
      </div>
      {/* Date + Award badges — top right */}
      <div className="absolute top-3 right-4 z-20 flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#9B72EF] bg-[#0C0A12]/75 border border-[#9B72EF]/30 px-2.5 py-[3px] rounded-full backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 shrink-0">
            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
          </svg>
          {item.date}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#F6C90E]/90 bg-[#0C0A12]/75 border border-[#F6C90E]/25 px-2.5 py-[3px] rounded-full backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 shrink-0 text-[#F6C90E]">
            <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.798 49.798 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clipRule="evenodd" />
          </svg>
          Award
        </span>
      </div>
    </div>

    {/* ── Bottom: Text Content ── */}
    <div className="relative flex-1 flex flex-col justify-center px-6 py-5 gap-3 overflow-hidden">
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#7B4FD0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title + description row */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-start sm:gap-6 gap-2"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.4, ease: 'easeOut' }}
      >
        {/* Left: title + divider */}
        <div className="flex flex-col gap-2 sm:w-[38%] shrink-0">
          <h2 className="text-white font-black text-[1.1rem] sm:text-[1.25rem] leading-snug">
            {item.title}
          </h2>
          <div className="w-10 h-[2px] rounded-full bg-gradient-to-r from-[#9B72EF] to-[#B794F6]" />
        </div>
        {/* Right: description */}
        <p className="text-[#C4B5FD]/65 text-[13px] sm:text-sm leading-relaxed flex-1">
          {item.description}
        </p>
      </motion.div>

      {/* Stars */}
      <motion.div
        className="flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32, duration: 0.35 }}
      >
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="w-3 h-3 text-[#F6C90E] drop-shadow-[0_0_3px_rgba(246,201,14,0.5)]">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        ))}
        <span className="text-white/25 text-[10px] font-mono ml-1.5 uppercase tracking-widest">Recognition</span>
      </motion.div>
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const Achievement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);
  const DURATION = 3000;
  const total = AchievementData.length;

  const goTo = useCallback((index, dir) => {
    setDirection(dir);
    setCurrentIndex(index);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer — restarts fresh whenever index or hover changes
  useEffect(() => {
    clearInterval(timerRef.current);
    if (isHovered) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, DURATION);
    return () => clearInterval(timerRef.current);
  }, [isHovered, currentIndex, total]);

  const current = AchievementData[currentIndex];

  return (
    <div className="flex flex-col items-center py-14 lg:py-24 w-full relative border-t border-[#3B2B6A]/30 overflow-hidden">

      {/* ── Background ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#4B2B9A]/12 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#9B72EF]/8 blur-[100px]" />
      </div>

      {/* ── Section Header ── */}
      <div className="w-full flex flex-col items-center justify-center mb-10 px-4 z-10">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="uppercase text-white font-black text-[2.2rem] sm:text-[3rem] lg:text-[5.5rem] text-center leading-none whitespace-nowrap"
        >
          Achieve<span className="text-[#9B72EF]">ments</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="text-white/50 text-center px-8 mt-3 max-w-xl text-sm"
        >
          Milestones, recognitions, and victories earned through dedication and relentless curiosity.
        </motion.p>
      </div>

      {/* ── Carousel ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* ── Card Stage ── */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-[#3B2B6A]/50"
          style={{ background: 'linear-gradient(135deg, #1A1625 0%, #130F1E 100%)' }}
        >
          {/* Floating dots (behind slide) */}
          <FloatingDots />

          {/* Height anchor + animated slide stage */}
          <div className="relative w-full overflow-hidden">
            {/* Invisible spacer — stays in flow to give the container its natural height */}
            <div className="invisible pointer-events-none" aria-hidden="true">
              <AchievementSlide item={current} />
            </div>
            {/* Slides animate absolutely over the spacer — no layout shift */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full"
              >
                <AchievementSlide item={current} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Paused pill */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -4 }}
                transition={{ duration: 0.2 }}
                className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A1625]/80 border border-[#9B72EF]/30 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B72EF] animate-pulse" />
                <span className="text-[9px] font-mono text-[#9B72EF]/80 uppercase tracking-widest">Paused</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-30">
            <motion.div
              key={`pb-${currentIndex}-${isHovered}`}
              className="h-full bg-gradient-to-r from-[#7B4FD0] via-[#9B72EF] to-[#B794F6]"
              initial={{ width: '0%' }}
              animate={!isHovered ? { width: '100%' } : { width: '0%' }}
              transition={!isHovered ? { duration: DURATION / 1000, ease: 'linear' } : { duration: 0 }}
            />
          </div>
        </div>

        {/* ── Prev / Next ── */}
        <button
          id="achievement-prev-btn"
          aria-label="Previous achievement"
          onClick={prev}
          className="absolute -left-1 sm:-left-4 top-1/2 -translate-y-[calc(50%+20px)] z-20 group/btn flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#130F1E] border border-[#3B2B6A]/60 hover:border-[#9B72EF]/70 hover:bg-[#9B72EF]/15 hover:scale-110 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="w-4 h-4 text-white/50 group-hover/btn:text-[#B794F6] transition-colors">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
          </svg>
        </button>

        <button
          id="achievement-next-btn"
          aria-label="Next achievement"
          onClick={next}
          className="absolute -right-1 sm:-right-4 top-1/2 -translate-y-[calc(50%+20px)] z-20 group/btn flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#130F1E] border border-[#3B2B6A]/60 hover:border-[#9B72EF]/70 hover:bg-[#9B72EF]/15 hover:scale-110 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="w-4 h-4 text-white/50 group-hover/btn:text-[#B794F6] transition-colors">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
          </svg>
        </button>

        {/* ── Bottom controls row: dots + counter ── */}
        <div className="flex items-center justify-between mt-5 px-1">
          {/* Slide counter */}
          <span className="text-[11px] font-mono text-white/25 uppercase tracking-[0.18em]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          {/* Dot indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Achievement slides">
            {AchievementData.map((_, i) => (
              <button
                key={i}
                id={`achievement-dot-${i}`}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to achievement ${i + 1}`}
                onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? 'w-6 h-[3px] bg-[#9B72EF] shadow-[0_0_6px_rgba(155,114,239,0.7)]'
                    : 'w-[3px] h-[3px] bg-[#3B2B6A] hover:bg-[#7B4FD0]/50'
                }`}
              />
            ))}
          </div>

          {/* Autoplay status */}
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.15em] flex items-center gap-1.5">
            {isHovered ? (
              <>
                <span className="w-1 h-1 rounded-full bg-[#9B72EF]/50 inline-block" />
                Paused
              </>
            ) : (
              <>
                <span className="w-1 h-1 rounded-full bg-[#3B2B6A] animate-pulse inline-block" />
                Auto
              </>
            )}
          </span>
        </div>

      </motion.div>
    </div>
  );
};

export default Achievement;
