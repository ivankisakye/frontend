import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop    = window.scrollY
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight
      const percent      = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      setScrollPercent(Math.round(percent))
      setVisible(scrollTop > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // SVG circle progress ring
  const radius      = 22
  const circumference = 2 * Math.PI * radius
  const strokeDash  = circumference - (scrollPercent / 100) * circumference

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .scroll-btn-enter {
          animation: fadeInUp 0.3s ease forwards;
        }
      `}</style>

      {visible && (
        <button
          onClick={scrollUp}
          className="scroll-btn-enter fixed bottom-24 right-4 sm:right-6 z-50 w-12 h-12 flex items-center justify-center group"
          aria-label="Scroll to top"
          title="Back to top"
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            {/* Track */}
            <circle
              cx="24" cy="24" r={radius}
              fill="none"
              stroke="rgba(42,107,124,0.15)"
              strokeWidth="3"
            />
            {/* Progress */}
            <circle
              cx="24" cy="24" r={radius}
              fill="none"
              stroke="#2A6B7C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              style={{ transition: 'stroke-dashoffset 0.2s ease' }}
            />
          </svg>

          {/* Button face */}
          <div
            className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #2A6B7C, #1a4a56)',
              boxShadow: '0 4px 16px rgba(42,107,124,0.4)',
            }}
          >
            {/* Arrow up */}
            <svg
              className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform duration-200"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7"/>
            </svg>
          </div>

          {/* Percent label — shows on hover */}
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ background: '#2A6B7C' }}
          >
            {scrollPercent}%
          </div>
        </button>
      )}
    </>
  )
}