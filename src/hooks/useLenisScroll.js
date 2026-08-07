import Lenis from 'lenis'
import { useEffect } from 'react'

const useLenisScroll = () => {
  useEffect(() => {
    // Check for low-end device, mobile device, or user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    if (prefersReducedMotion || isMobile || isLowEnd) {
      // Provide a dummy window.__lenis so other components don't crash when calling .stop() or .start()
      window.__lenis = { stop: () => {}, start: () => {}, destroy: () => {}, raf: () => {} };
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

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      window.__lenis = null
      cancelAnimationFrame(rafId)
    }
  }, [])
}

export default useLenisScroll
