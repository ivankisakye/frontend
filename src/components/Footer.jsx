import { Link } from 'react-router-dom';

export default function Footer() {
  // Custom orange color extracted from the logo (#E67E22 or similar warm orange)
  const brandOrange = "#E67E22";
  
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Grid - 4 columns for more detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Brand Column with Logo */}
          <div className="space-y-4">
            {/* Logo and Brand Name */}
            <div className="flex flex-col gap-2">
              <img 
                src="/logo.png" 
                alt="ShowMeUganda Logo" 
                className="h-16 w-auto object-contain" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback text if logo fails to load */}
              <div className="hidden">
                <h3 className="text-2xl font-black" style={{ color: brandOrange }}>ShowMeUganda</h3>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate guide to exploring the Pearl of Africa. 
              Discover authentic tours, premium hotels, cultural events, and conservation stories.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-500 transition-colors duration-300 hover:text-[#E67E22]"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.892h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5" style={{ after: { backgroundColor: brandOrange } }}>
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                ['/tours', 'Tour Packages'],
                ['/directory', 'Hotel Directory'],
                ['/events', 'Events & Festivals'],
                ['/conservation', 'Conservation'],
                ['/news', 'News & Stories'],
                ['/destinations', 'Destinations'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 text-sm transition-colors duration-200 flex items-center gap-2 group hover:text-[#E67E22]"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 transition-all duration-200" style={{ backgroundColor: brandOrange }}></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5" style={{ after: { backgroundColor: brandOrange } }}>
              Support
            </h4>
            <ul className="space-y-3">
              {[
                ['/about', 'About Us'],
                ['/contact', 'Contact Us'],
                ['/faq', 'FAQ'],
                ['/privacy', 'Privacy Policy'],
                ['/terms', 'Terms of Service'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 text-sm transition-colors duration-200 flex items-center gap-2 group hover:text-[#E67E22]"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 transition-all duration-200" style={{ backgroundColor: brandOrange }}></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5" style={{ after: { backgroundColor: brandOrange } }}>
              Get in Touch
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm mb-6">
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 shrink-0 mt-0.5" style={{ color: brandOrange }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Kampala, Uganda</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0" style={{ color: brandOrange }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@showmeuganda.com" className="transition-colors hover:text-[#E67E22]">info@showmeuganda.com</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0" style={{ color: brandOrange }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+256700000000" className="transition-colors hover:text-[#E67E22]">+256 700 000 000</a>
              </li>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-2">Subscribe for exclusive offers</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-900 text-white text-sm px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 w-full border border-gray-800"
                  style={{ focus: { ringColor: brandOrange } }}
                />
                <button
                  type="submit"
                  className="text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors duration-200"
                  style={{ backgroundColor: brandOrange, hover: { backgroundColor: '#D35400' } }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D35400'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = brandOrange}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-xs">
            © {new Date().getFullYear()} ShowMeUganda.com — All rights reserved.
          </div>
          <div className="flex space-x-6">
            <span className="text-gray-600 text-xs hover:text-[#E67E22] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-gray-600 text-xs hover:text-[#E67E22] transition-colors cursor-pointer">Terms of Service</span>
            <span className="text-gray-600 text-xs hover:text-[#E67E22] transition-colors cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>

      <style>{`
        .after\\:bg-orange-custom::after {
          background-color: #E67E22;
        }
        .focus\\:ring-orange-custom:focus {
          --tw-ring-color: #E67E22;
        }
      `}</style>
    </footer>
  );
}