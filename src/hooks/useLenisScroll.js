import Lenis from 'lenis'
import { useEffect } from 'react'

const useLenisScroll = () => {
  useEffect(() => {
    // Lenis Library for smooth scroll — runs unconditionally for all users.
    // Touch/mobile devices use native momentum scroll which feels natural;
    // Lenis on desktop adds the smooth easing on top of that without conflict.
    const lenis = new Lenis({
      duration: 3,
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
