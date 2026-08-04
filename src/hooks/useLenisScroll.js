import Lenis from 'lenis'

const useLenisScroll = () => {
  // Lenis Library for smooth scroll
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    console.log(e)
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}

export default useLenisScroll
