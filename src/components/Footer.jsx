import { Link } from 'react-router-dom';

export default function Footer() {
  const brandOrange = "#E8731A";
  const brandTeal   = "#064554";

  const socialLinks = [
    {
      name: 'facebook',
      href: 'https://www.facebook.com/share/1Gh2fcNbCP/',
      icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.892h-2.33v6.987C18.343 21.128 22 16.991 22 12z',
    },
    {
      name: 'twitter',
      href: 'https://x.com/showmeuganda',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
    {
      name: 'instagram',
      href: 'https://www.instagram.com/showinguganda?igsh=cmI5cW94eGcwamNt',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.92-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.07 4.849-.07zM12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    },
    {
      name: 'tiktok',
      href: 'https://www.tiktok.com/@showinguganda?_r=1&_t=ZS-95xGlxzKuAv',
      icon: 'M16.6 5.82s.51.5 0 0A4.278 4.278 0 0115.54 3h-3.09v12.4a2.592 2.592 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 004.3 1.38V7.3s-1.88.09-3.24-1.48z',
    },
    {
      name: 'linkedin',
      href: 'https://www.linkedin.com/company/show-me-uganda/',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      name: 'youtube',
      href: 'https://youtube.com/@showmeuganda?si=R11X70DsfZRhpXNY',
      icon: 'M23.498 6.186a2.994 2.994 0 00-2.107-2.12C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.391.521A2.994 2.994 0 00.502 6.186 31.318 31.318 0 000 12a31.318 31.318 0 00.502 5.814 2.994 2.994 0 002.107 2.12c1.886.521 9.391.521 9.391.521s7.505 0 9.391-.521a2.994 2.994 0 002.107-2.12A31.318 31.318 0 0024 12a31.318 31.318 0 00-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
  ];

  return (
    <footer className="text-white mt-16" style={{ backgroundColor: brandTeal }}>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <img
                src="/logo2.png"
                alt="ShowMeUganda Logo"
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden">
                <h3 className="text-2xl font-black" style={{ color: brandOrange }}>ShowMeUganda</h3>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              Your ultimate guide to exploring the Pearl of Africa.
              Discover authentic tours, premium hotels, cultural events, and conservation stories.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 transition-colors duration-300 hover:text-[#E8731A]"
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>

          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-5">Explore</h4>
            <ul className="space-y-3">
              {[
                ['/tours',        'Tour Packages'],
                ['/directory',    'Hotel Directory'],
                ['/events',       'Events & Festivals'],
                ['/conservation', 'Conservation'],
                ['/news',         'News & Stories'],
                ['/destinations', 'Destinations'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/60 text-sm transition-colors duration-200 flex items-center gap-2 group hover:text-[#E8731A]"
                  >
                    <span
                      className="w-0 group-hover:w-2 h-0.5 transition-all duration-200"
                      style={{ backgroundColor: brandOrange }}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-5">Support</h4>
            <ul className="space-y-3">
              {[
                ['/about',   'About Us'],
                ['/contact', 'Contact Us'],
                ['/faq',     'FAQ'],
                ['/privacy', 'Privacy Policy'],
                ['/terms',   'Terms of Service'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/60 text-sm transition-colors duration-200 flex items-center gap-2 group hover:text-[#E8731A]"
                  >
                    <span
                      className="w-0 group-hover:w-2 h-0.5 transition-all duration-200"
                      style={{ backgroundColor: brandOrange }}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-5">Get in Touch</h4>
            <ul className="space-y-3 text-white/60 text-sm mb-6">
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 shrink-0 mt-0.5" style={{ color: brandOrange }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Workers House Level 9 | South Wing</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0" style={{ color: brandOrange }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@showmeuganda.com" className="transition-colors hover:text-[#E8731A]">
                  info@showmeuganda.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0" style={{ color: brandOrange }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+256758770888" className="transition-colors hover:text-[#E8731A]">
                  +256 758 770 888
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-4">
              <p className="text-sm text-white/80 mb-2">Subscribe for exclusive offers</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="text-white text-sm px-4 py-2 rounded-l-lg focus:outline-none w-full border"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderColor: 'rgba(255,255,255,0.15)',
                  }}
                />
                <button
                  type="submit"
                  className="text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors duration-200"
                  style={{ backgroundColor: brandOrange }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D35400'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = brandOrange}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}
        >
          <div className="text-white/40 text-xs">
            © {new Date().getFullYear()} ShowMeUganda.com — All rights reserved.
          </div>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <span
                key={item}
                className="text-white/40 text-xs hover:text-[#E8731A] transition-colors cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}