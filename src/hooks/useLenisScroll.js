import Lenis from 'lenis'
import { useEffect } from 'react'

const useLenisScroll = () => {
  useEffect(() => {
    // Only skip Lenis for users who have explicitly asked for reduced motion.
    // Do NOT gate on hardwareConcurrency or window width — those thresholds
    // were incorrectly blocking smooth scroll for many real desktop/laptop users
    // (any machine with ≤3 logical cores was getting a no-op stub).
    // Touch/mobile devices naturally don't need Lenis because they use native
    // momentum scrolling, and the pointer: coarse check below handles that.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isTouchDevice) {
      // Provide a dummy window.__lenis so other components don't crash when calling .stop() or .start()
      window.__lenis = { stop: () => {}, start: () => {}, destroy: () => {}, raf: () => {}, scrollTo: () => {} };
      return;
    }

    // Lenis Library for smooth scroll
    const lenis = new Lenis({
      duration: 3, // Adjust this value to change the scroll speed (default is ~1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Expose globally so pages with inner-scroll layouts (e.g. CTFArchivePage)
    // can call window.__lenis?.stop() / window.__lenis?.start()
    window.__lenis = lenis

    // Handle anchor links for smooth scrolling and prevent snapping back
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el);
        }
      } else if (href && href.startsWith('/#') && href.length > 2) {
        const id = href.replace('/', '');
        const el = document.querySelector(id);
        if (el && window.location.pathname === '/') {
          e.preventDefault();
          lenis.scrollTo(el);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy()
      window.__lenis = null
      cancelAnimationFrame(rafId)
    }
  }, [])
}

export default useLenisScroll
