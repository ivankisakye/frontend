import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/',        label: 'Home',  icon: '🦁', desc: 'Safaris, gorilla trekking & adventures' },
  { to: '/news',         label: 'Stories',      icon: '📋', desc: 'Businesses, services & local listings'  },
  { to: '/tours',         label: 'Tour Packages',           icon: '📰', desc: 'Latest updates from across Uganda'      },
  { to: '/conservation', label: 'Destinations',   icon: '🗺️', desc: 'Explore amazing places in Uganda'      },
  { to: '/events',       label: 'Events',         icon: '🥁', desc: 'Festivals, concerts & cultural shows'   },
  { to: '/shop',       label: 'Shop',         icon: '🥁', desc: 'Shop with us today'   },
  
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
  const [time,     setTime]     = useState('')
  const location = useLocation()

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-UG', {
        timeZone: 'Africa/Kampala',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.10)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {!scrolled && (
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)',
            pointerEvents: 'none', zIndex: 0,
          }} />
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">



            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <img
                src={scrolled ? "/logo.png" : "/logo2.png"}
                alt="Show Me Uganda"
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                style={{ filter: scrolled ? 'none' : 'drop-shadow(0 1px 4px rgba(0,0,0,0.4))' }}
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
                        : scrolled
                          ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          : 'text-white/90 hover:text-white hover:bg-white/15'
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
                className="text-sm font-semibold transition-colors px-3 py-2"
                style={{ color: scrolled ? '#4b5563' : 'rgba(255,255,255,0.9)' }}
                onMouseEnter={e => { e.currentTarget.style.color = scrolled ? '#111827' : 'white' }}
                onMouseLeave={e => { e.currentTarget.style.color = scrolled ? '#4b5563' : 'rgba(255,255,255,0.9)' }}
              >
                Contact Us
              </Link>
              <Link
                to="/directory"
                className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border-2 transition-all hover:shadow-md"
                style={
                  scrolled
                    ? { borderColor: '#2A6B7C', color: '#2A6B7C', background: 'transparent' }
                    : { borderColor: 'rgba(255,255,255,0.8)', color: 'white', background: 'rgba(255,255,255,0.1)' }
                }
                onMouseEnter={e => {
                  if (scrolled) { e.currentTarget.style.background = '#2A6B7C'; e.currentTarget.style.color = 'white' }
                  else { e.currentTarget.style.background = 'rgba(255,255,255,0.25)' }
                }}
                onMouseLeave={e => {
                  if (scrolled) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2A6B7C' }
                  else { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white' }
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Directory
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
                style={{ background: open ? 'white' : (scrolled ? '#1a1a1a' : 'white'), transform: open ? 'translateY(8px) rotate(45deg)' : 'none' }} />
              <span className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{ background: open ? 'white' : (scrolled ? '#1a1a1a' : 'white'), opacity: open ? 0 : 1 }} />
              <span className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{ background: open ? 'white' : (scrolled ? '#1a1a1a' : 'white'), transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Overlay ── */}
      <div
        className="md:hidden fixed inset-0 z-[100] transition-all duration-300"
        style={{
          pointerEvents: open ? 'all' : 'none',
          background: open ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)',
          backdropFilter: open ? 'blur(4px)' : 'none',
        }}
        onClick={() => setOpen(false)}
      />

      {/* ── Mobile Sidebar — clean white/glass professional ── */}
      <div
        className="md:hidden fixed top-0 right-0 h-full z-[105] flex flex-col overflow-y-auto"
        style={{
          width: '85vw',
          maxWidth: 340,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.32,0,0.15,1)',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
        }}
      >

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #f0f0f0' }}>
          <div className="flex items-center gap-3">

            <img src={scrolled ? "/logo.png" : "/logo2.png"} alt="ShowMeUganda" className="h-9 w-auto object-contain" />

          </div>
          <div className="flex items-center gap-3">
            {/* Live time */}
            <span className="text-[11px] font-semibold text-gray-400">
              🕐 {time}
            </span>
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-gray-100"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Main Nav ── */}
        <div className="flex-shrink-0 px-4 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-3">
            Explore Uganda
          </p>
          <div className="space-y-1">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 px-3 py-3 rounded-2xl transition-all"
                style={({ isActive }) => ({
                  background: isActive ? 'rgba(232,115,26,0.08)' : 'transparent',
                  borderLeft: isActive ? '3px solid #E8731A' : '3px solid transparent',
                  textDecoration: 'none',
                })}
              >
                {({ isActive }) => (
                  <>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                      style={{
                        background: isActive ? '#E8731A' : '#f5f5f5',
                      }}
                    >
                      {link.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold leading-none"
                        style={{ color: isActive ? '#E8731A' : '#1a1a1a' }}
                      >
                        {link.label}
                      </p>
                      <p className="text-xs mt-0.5 text-gray-400 truncate">
                        {link.desc}
                      </p>
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
        <div className="mx-5 flex-shrink-0" style={{ height: 1, background: '#f0f0f0' }} />

        {/* ── Destinations ── */}
        <div className="flex-shrink-0 px-4 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-3">
            Top Destinations
          </p>
          <div className="grid grid-cols-2 gap-2">
            {destinations.map(dest => (
              <Link
                key={dest.name}
                to={`/tours?destination=${encodeURIComponent(dest.name)}`}
                className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50"
                style={{ background: '#f8f8f8', textDecoration: 'none', border: '1px solid #efefef' }}
              >
                <span className="text-xs font-bold text-gray-800 leading-tight">{dest.name}</span>
                <span className="text-[11px] text-gray-400">{dest.region}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 flex-shrink-0" style={{ height: 1, background: '#f0f0f0' }} />

        {/* ── Contact strip ── */}
        <div className="flex-shrink-0 px-4 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-3">
            Contact
          </p>
          <div className="space-y-2">
            <a href="tel:+256758770888"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              style={{ textDecoration: 'none' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(232,115,26,0.1)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E8731A" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.24 1.23 2 2 0 012.24 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.56-1.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Call us</p>
                <p className="text-sm font-semibold text-gray-800">+256 758 770 888</p>
              </div>
            </a>

            <a href="mailto:info@showmeuganda.com"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              style={{ textDecoration: 'none' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(42,107,124,0.1)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2A6B7C" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Email us</p>
                <p className="text-sm font-semibold text-gray-800">info@showmeuganda.org</p>
              </div>
            </a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 flex-shrink-0" style={{ height: 1, background: '#f0f0f0' }} />

        {/* ── CTA Buttons ── */}
        <div className="flex-shrink-0 px-4 py-4 space-y-2.5">
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 w-full rounded-2xl font-bold text-sm py-3.5 transition-opacity hover:opacity-90"
            style={{ background: '#E8731A', color: 'white', textDecoration: 'none' }}
          >
            Contact Us
          </Link>
          <Link
            to="/directory"
            className="flex items-center justify-center gap-2 w-full rounded-2xl font-bold text-sm py-3.5 transition-colors hover:bg-gray-100"
            style={{ background: '#f5f5f5', color: '#2A6B7C', border: '1px solid #e5e7eb', textDecoration: 'none' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Directory
          </Link>
        </div>

        {/* ── Social ── */}
        <div className="flex-shrink-0 px-4 pb-6 pt-1">
          <div className="flex items-center justify-center gap-3">
            {[
              { label: 'Facebook',  icon: 'f',  color: '#1877f2' },
              { label: 'Instagram', icon: '◉',  color: '#e1306c' },
              { label: 'Twitter',   icon: '𝕏',  color: '#374151' },
              { label: 'YouTube',   icon: '▶',  color: '#ff0000' },
            ].map(s => (
              <button key={s.label} title={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-110"
                style={{ background: '#f5f5f5', color: s.color, border: '1px solid #efefef' }}>
                {s.icon}
              </button>
            ))}
          </div>
          <p className="text-center text-[11px] text-gray-300 mt-4">
            © {new Date().getFullYear()} ShowMeUganda · Pearl of Africa
          </p>
        </div>

      </div>
    </>
  )
}