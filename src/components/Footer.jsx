import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h3 className="text-uganda-yellow font-black text-lg mb-3">
              ShowMeUganda
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate guide to exploring the Pearl of Africa.
              Discover tours, hotels, events and more.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2">
              {[
                ['/tours', 'Tour Packages'],
                ['/directory', 'Hotel Directory'],
                ['/events', 'Events'],
                ['/conservation', 'Conservation'],
                ['/news', 'News & Stories'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 text-sm hover:text-uganda-yellow transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Kampala, Uganda</li>
              <li>info@showmeuganda.com</li>
              <li>+256 700 000 000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} ShowMeUganda.com — All rights reserved.
        </div>
      </div>
    </footer>
  )
}