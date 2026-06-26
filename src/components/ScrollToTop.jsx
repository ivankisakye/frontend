import { useEffect } from 'react'

export default function ScrollToTop() {

  useEffect(() => {
    function handleScroll() {
      // When user reaches near the bottom (last 5% of page),
      // smoothly scroll back to top automatically
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      if (percent >= 95) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 800)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Renders nothing — invisible, works in background
  return null
}