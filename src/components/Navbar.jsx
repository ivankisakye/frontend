import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/news', label: 'News' },
  { to: '/directory', label: 'Directory' },
  { to: '/tours', label: 'Tours' },
  { to: '/events', label: 'Events' },
  { to: '/conservation', label: 'Conservation' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-bold text-xl">
          ShowMeUganda
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-400 font-semibold'
                  : 'text-gray-300 hover:text-yellow-400'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black px-4 pb-4">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-300 hover:text-yellow-400"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}