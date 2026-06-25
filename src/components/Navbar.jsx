import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/tours',        label: 'Things To Do',  icon: '🦁', desc: 'Safaris, gorilla trekking & adventures' },
  { to: '/directory',    label: 'Directory',      icon: '📋', desc: 'Businesses, services & local listings'  },
  { to: '/events',       label: 'Events',         icon: '🥁', desc: 'Festivals, concerts & cultural shows'   },
  { to: '/conservation', label: 'Conservation',   icon: '🌿', desc: 'Wildlife & environmental initiatives'   },
  { to: '/news',         label: 'News',           icon: '📰', desc: 'Latest updates from across Uganda'      },
  { to: '/contact',      label: 'Contact',        icon: '✉️', desc: 'Get in touch with our team'            },
]

const destinations = [
  { name: 'Bwindi Forest',   region: 'South-West' },
  { name: 'Murchison Falls', region: 'North-West' },
  { name: 'Lake Victoria',   region: 'Central'    },
  { name: 'Queen Elizabeth', region: 'West'       },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Navbar ── */}
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

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <img
                src="/logo.png"
                alt="Show Me Uganda"
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
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
                  style={({ isActive }) => isActive ? { background: '#E8731A' } : {}}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/contact"
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
              >
                List a Business
              </Link>
              <Link
                to="/admin/login"
                className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border-2 transition-all hover:shadow-md"
                style={{ borderColor: '#2A6B7C', color: '#2A6B7C' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2A6B7C'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2A6B7C' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Admin
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-colors relative z-[110]"
              style={{ background: open ? '#E8731A' : 'transparent' }}
              aria-label="Toggle menu"
            >
              <span className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{ background: open ? 'white' : '#1a1a1a', transform: open ? 'translateY(8px) rotate(45deg)' : 'none' }} />
              <span className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{ background: open ? 'white' : '#1a1a1a', opacity: open ? 0 : 1 }} />
              <span className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{ background: open ? 'white' : '#1a1a1a', transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Sidebar Overlay ── */}
      <div
        className="md:hidden fixed inset-0 z-[100] transition-all duration-300"
        style={{
          pointerEvents: open ? 'all' : 'none',
          background: open ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0)',
          backdropFilter: open ? 'blur(3px)' : 'none',
        }}
        onClick={() => setOpen(false)}
      />

      {/* ── Mobile Sidebar Panel ── */}
      <div
        className="md:hidden fixed top-0 right-0 h-full z-[105] flex flex-col overflow-y-auto"
        style={{
          width: '88vw',
          maxWidth: 360,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32,0,0.15,1)',
          background: '#0f1c14',
        }}
      >
        {/* ── Hero Banner ── */}
        <div
          className="relative flex-shrink-0"
          style={{
            background: 'linear-gradient(145deg, #1a3a28 0%, #0f1c14 60%, #1a2a1a 100%)',
            padding: '28px 24px 24px',
            borderBottom: '1px solid rgba(232,115,26,0.25)',
          }}
        >
          {/* Decorative pattern */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, opacity: 0.06 }}>
            <svg viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="55" stroke="#E8731A" strokeWidth="1"/>
              <circle cx="60" cy="60" r="40" stroke="#E8731A" strokeWidth="1"/>
              <circle cx="60" cy="60" r="25" stroke="#E8731A" strokeWidth="1"/>
              <line x1="5" y1="60" x2="115" y2="60" stroke="#E8731A" strokeWidth="1"/>
              <line x1="60" y1="5" x2="60" y2="115" stroke="#E8731A" strokeWidth="1"/>
            </svg>
          </div>

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Logo area */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: '#E8731A' }}>🇺🇬</div>
            <div>
              <div className="text-white font-bold text-base leading-tight">Show Me Uganda</div>
              <div className="text-xs" style={{ color: '#a0b89a' }}>Discover the Pearl of Africa</div>
            </div>
          </div>

          {/* Weather / info strip */}
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: 13 }}>☀️</span>
              <span className="text-xs font-medium" style={{ color: '#c8dcc4' }}>Kampala · 26°C</span>
            </div>
            <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: 12 }}>🕐</span>
              <span className="text-xs" style={{ color: '#c8dcc4' }}>EAT (UTC+3)</span>
            </div>
          </div>
        </div>

        {/* ── Nav Links ── */}
        <div className="flex-shrink-0" style={{ padding: '20px 16px 8px' }}>
          <div className="text-xs font-bold tracking-widest mb-3 uppercase"
            style={{ color: '#E8731A', paddingLeft: 8 }}>Explore</div>

          <div className="flex flex-col gap-1">
            {links.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '11px 12px',
                  borderRadius: 14,
                  textDecoration: 'none',
                  transition: 'all 0.18s ease',
                  background: isActive ? 'rgba(232,115,26,0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(232,115,26,0.4)' : '1px solid transparent',
                  animationDelay: `${i * 40}ms`,
                })}
              >
                {({ isActive }) => (
                  <>
                    <span className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base"
                      style={{
                        background: isActive ? '#E8731A' : 'rgba(255,255,255,0.07)',
                        transition: 'background 0.18s',
                      }}>
                      {link.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold leading-tight"
                        style={{ color: isActive ? '#E8731A' : '#e8f0e6' }}>
                        {link.label}
                      </div>
                      <div className="text-xs mt-0.5 truncate" style={{ color: '#6b8a65' }}>
                        {link.desc}
                      </div>
                    </div>
                    {isActive && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8731A" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 24px' }} />

        {/* ── Popular Destinations ── */}
        <div className="flex-shrink-0" style={{ padding: '16px 16px 8px' }}>
          <div className="text-xs font-bold tracking-widest mb-3 uppercase"
            style={{ color: '#2A6B7C', paddingLeft: 8 }}>Popular Destinations</div>

          <div className="grid grid-cols-2 gap-2">
            {destinations.map(dest => (
              <Link
                key={dest.name}
                to={`/tours?destination=${encodeURIComponent(dest.name)}`}
                className="flex flex-col gap-0.5 rounded-xl p-3 transition-colors"
                style={{ background: 'rgba(42,107,124,0.12)', border: '1px solid rgba(42,107,124,0.2)' }}
              >
                <span className="text-xs font-semibold leading-tight" style={{ color: '#7ecfde' }}>
                  {dest.name}
                </span>
                <span className="text-xs" style={{ color: '#4a7a70' }}>{dest.region}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 24px' }} />

        {/* ── Contact Info ── */}
        <div className="flex-shrink-0" style={{ padding: '16px 24px 8px' }}>
          <div className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: '#a0b89a' }}>
            Get In Touch
          </div>

          <div className="flex flex-col gap-3">
            <a href="tel:+256700000000"
              className="flex items-center gap-3 group"
              style={{ textDecoration: 'none' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(232,115,26,0.15)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8731A" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.24 1.23 2 2 0 012.24 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.56-1.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs" style={{ color: '#6b8a65' }}>Call us</div>
                <div className="text-sm font-semibold" style={{ color: '#e8f0e6' }}>+256 700 000 000</div>
              </div>
            </a>

            <a href="mailto:info@showmeuganda.com"
              className="flex items-center gap-3"
              style={{ textDecoration: 'none' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(42,107,124,0.2)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2A6B7C" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <div className="text-xs" style={{ color: '#6b8a65' }}>Email us</div>
                <div className="text-sm font-semibold" style={{ color: '#e8f0e6' }}>info@showmeuganda.com</div>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(160,184,154,0.15)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0b89a" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div className="text-xs" style={{ color: '#6b8a65' }}>Location</div>
                <div className="text-sm font-semibold" style={{ color: '#e8f0e6' }}>Kampala, Uganda</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 24px' }} />

        {/* ── CTA Buttons ── */}
        <div className="flex-shrink-0" style={{ padding: '0 16px 16px' }}>
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 w-full rounded-2xl font-bold text-sm py-3.5 mb-2.5 transition-all"
            style={{ background: '#E8731A', color: 'white', textDecoration: 'none' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
            List Your Business
          </Link>
          <Link
            to="/admin/login"
            className="flex items-center justify-center gap-2 w-full rounded-2xl font-bold text-sm py-3.5 transition-all"
            style={{ background: 'rgba(42,107,124,0.2)', color: '#7ecfde', border: '1px solid rgba(42,107,124,0.4)', textDecoration: 'none' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Admin Login
          </Link>
        </div>

        {/* ── Social Links ── */}
        <div className="flex-shrink-0" style={{ padding: '0 24px 12px' }}>
          <div className="flex items-center gap-3 justify-center">
            {[
              { label: 'Facebook',  icon: 'f',  color: '#1877f2' },
              { label: 'Instagram', icon: '◉',  color: '#e1306c' },
              { label: 'Twitter',   icon: '𝕏',  color: '#e8f0e6' },
              { label: 'YouTube',   icon: '▶',  color: '#ff0000' },
            ].map(s => (
              <button key={s.label} title={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.07)', color: s.color }}>
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* ── Footer tagline ── */}
        <div className="flex-shrink-0 text-center pb-6 pt-1" style={{ color: '#3a5a36', fontSize: 11 }}>
          © 2025 Show Me Uganda · Pearl of Africa
        </div>
      </div>
    </>
  )
}