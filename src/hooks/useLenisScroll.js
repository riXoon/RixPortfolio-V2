import Lenis from 'lenis'
import { useEffect } from 'react'

const useLenisScroll = () => {
  useEffect(() => {
    // Lenis Library for smooth scroll
    const lenis = new Lenis()

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
