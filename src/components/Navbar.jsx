import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/tours',        label: 'Things To Do' },
  { to: '/directory',    label: 'Hotels'        },
  { to: '/events',       label: 'Events'        },
  { to: '/conservation', label: 'Conservation'  },
  { to: '/news',         label: 'News'          },
  { to: '/contact',      label: 'Contact'       },
]

export default function Navbar() {
  const [open,       setOpen]       = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const location = useLocation()

  // Detect if we're on the homepage
  const isHome = location.pathname === '/'

  // Add shadow + slight bg change on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location])

  return (
    <>
      <nav
        className="sticky top-0 z-50 w-full transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.98)' : '#ffffff',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 #e5e7eb',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2 flex-shrink-0 group"
            >
              {/* Icon mark — play button like the logo */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                style={{ background: '#E8731A' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 2.5L11 7L3 11.5V2.5Z" fill="white" />
                </svg>
              </div>

              {/* Wordmark */}
              <div className="flex items-baseline gap-0.5 leading-none">
                <span
                  className="font-black text-lg tracking-tight"
                  style={{ color: '#2A6B7C' }}
                >
                  Show
                </span>
                <span
                  className="font-black text-lg tracking-tight"
                  style={{ color: '#2A6B7C' }}
                >
                  Me
                </span>
                <span
                  className="font-black text-lg tracking-tight ml-1"
                  style={{ color: '#1a1a1a' }}
                >
                  Uganda
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav links ── */}
            <div className="hidden md:flex items-center gap-1">
              {links.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive ? { background: '#E8731A' } : {}
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* ── Desktop Right Actions ── */}
            <div className="hidden md:flex items-center gap-3">

              {/* List your business */}
              <Link
                to="/contact"
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
              >
                List a Business
              </Link>

              {/* Admin pill */}
              <Link
                to="/admin/login"
                className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border-2 transition-all hover:shadow-md"
                style={{
                  borderColor: '#2A6B7C',
                  color: '#2A6B7C',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#2A6B7C'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#2A6B7C'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Admin
              </Link>
            </div>

            {/* ── Mobile: hamburger ── */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{
                  background: '#1a1a1a',
                  transform: open ? 'translateY(8px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{
                  background: '#1a1a1a',
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{
                  background: '#1a1a1a',
                  transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: open ? '500px' : '0px',
            opacity: open ? 1 : 0,
          }}
        >
          <div className="px-4 pb-5 pt-2 border-t border-gray-100 bg-white">

            {/* Nav links */}
            <div className="flex flex-col gap-1 mb-4">
              {links.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive ? { background: '#E8731A' } : {}
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
              <Link
                to="/contact"
                className="text-center py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                List a Business
              </Link>
              <Link
                to="/admin/login"
                className="text-center py-2.5 rounded-xl text-sm font-bold text-white transition-colors"
                style={{ background: '#2A6B7C' }}
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}