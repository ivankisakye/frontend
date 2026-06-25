import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/apiClient'

// ─── Brand Colors ─────────────────────────────────────────────────────────────
// Teal:   #2A6B7C
// Orange: #E8731A

// ─── Placeholder Data ─────────────────────────────────────────────────────────
const PLACEHOLDER_TOURS = [
  { id: 'p1', title: 'Gorilla Trekking in Bwindi Forest', excerpt: 'Come face to face with mountain gorillas in their natural habitat.', image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', category: 'tour', rating: 4.9, reviews: 2847, price: '$700' },
  { id: 'p2', title: 'Queen Elizabeth National Park Safari', excerpt: 'Spot lions, elephants and hippos on a classic Ugandan safari.', image_url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80', category: 'tour', rating: 4.8, reviews: 1923, price: '$180' },
  { id: 'p3', title: 'Source of the Nile — Jinja Adventure', excerpt: 'White-water rafting and kayaking at the legendary source of the Nile.', image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80', category: 'tour', rating: 4.7, reviews: 1456, price: '$95' },
  { id: 'p4', title: 'Murchison Falls National Park', excerpt: 'Witness the world\'s most powerful waterfall on this unforgettable tour.', image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', category: 'tour', rating: 4.9, reviews: 3102, price: '$220' },
  { id: 'p5', title: 'Kibale Forest Chimp Tracking', excerpt: 'Trek through Kibale Forest to track chimpanzees in the wild.', image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80', category: 'tour', rating: 4.8, reviews: 987, price: '$150' },
  { id: 'p6', title: 'Rwenzori Mountains Hiking', excerpt: 'Climb the legendary Mountains of the Moon for breathtaking views.', image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', category: 'tour', rating: 4.6, reviews: 654, price: '$320' },
  { id: 'p7', title: 'Lake Bunyonyi Island Escape', excerpt: 'Explore the beautiful islands of one of Africa\'s most scenic lakes.', image_url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80', category: 'tour', rating: 4.7, reviews: 789, price: '$85' },
  { id: 'p8', title: 'Kidepo Valley Safari', excerpt: 'One of Africa\'s most remote and pristine national parks.', image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80', category: 'tour', rating: 4.9, reviews: 432, price: '$380' },
]

const PLACEHOLDER_HOTELS = [
  { id: 'h1', title: 'Bwindi Lodge — Forest Luxury', excerpt: 'Perched on the edge of Bwindi Forest with unrivalled views.', image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', category: 'hotel', rating: 4.9, reviews: 541, price: '$450/night' },
  { id: 'h2', title: 'Murchison River Lodge', excerpt: 'Stunning Nile-side accommodation with game drives and boat cruises.', image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', category: 'hotel', rating: 4.8, reviews: 389, price: '$280/night' },
  { id: 'h3', title: 'Serena Kampala Hotel', excerpt: 'The finest five-star hotel in Uganda\'s capital.', image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80', category: 'hotel', rating: 4.7, reviews: 1204, price: '$195/night' },
  { id: 'h4', title: 'Wildwaters Jinja Eco Lodge', excerpt: 'Perched on a private island on the Nile for adventure seekers.', image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80', category: 'hotel', rating: 4.8, reviews: 267, price: '$320/night' },
]

const PLACEHOLDER_NEWS = [
  { id: 'n1', title: 'Uganda Named Top Safari Destination 2025', excerpt: 'International travel publications have ranked Uganda among the top five safari destinations in Africa for the second year running.', image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', category: 'news' },
  { id: 'n2', title: 'New Direct Flights to Entebbe from Dubai', excerpt: 'Emirates Airlines announces new direct routes connecting Dubai to Entebbe International Airport starting September 2025.', image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80', category: 'news' },
  { id: 'n3', title: 'Gorilla Permit Fees Updated for 2025 Season', excerpt: 'Uganda Wildlife Authority releases updated gorilla trekking permit pricing and new booking procedures for the upcoming season.', image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80', category: 'news' },
]

const PLACEHOLDER_EVENTS = [
  { id: 'e1', title: 'Kampala International Jazz Festival', excerpt: 'Three days of world-class jazz performances in the heart of Kampala. Artists from 15 countries performing across 6 stages.', image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80', category: 'event', date: 'Aug 15–17, 2025' },
  { id: 'e2', title: 'Nyege Nyege Music Festival — Jinja', excerpt: 'East Africa\'s biggest music festival returns to the banks of the Nile in Jinja for its 10th anniversary edition.', image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80', category: 'event', date: 'Sep 5–8, 2025' },
  { id: 'e3', title: 'Uganda Wildlife Photography Safari Week', excerpt: 'A guided photography safari across Uganda\'s top national parks with professional wildlife photographers as tutors.', image_url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80', category: 'event', date: 'Oct 12–19, 2025' },
]

const EXPLORE_CATEGORIES = [
  { label: 'Outdoors',      icon: '🦍', to: '/tours',         bg: '#E8F4F7', color: '#2A6B7C', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300&q=80' },
  { label: 'Wildlife',      icon: '🐘', to: '/tours',         bg: '#FEF3E8', color: '#E8731A', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=300&q=80' },
  { label: 'Culture',       icon: '🎭', to: '/events',        bg: '#F0FAF0', color: '#2D7D46', img: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=300&q=80' },
  { label: 'Water',         icon: '🚣', to: '/tours',         bg: '#EEF2FF', color: '#4B5AE8', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&q=80' },
]

const DESTINATIONS = [
  { name: 'Kampala',   sub: 'Capital City',    image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=500&q=80' },
  { name: 'Jinja',     sub: 'Source of Nile',  image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80' },
  { name: 'Bwindi',    sub: 'Gorilla Forest',  image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&q=80' },
  { name: 'Murchison', sub: 'National Park',   image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80' },
]

// ─── Star Rating ──────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="w-3 h-3" viewBox="0 0 20 20"
          fill={i <= Math.round(rating) ? '#E8731A' : '#e5e7eb'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
      <span className="text-xs font-bold text-gray-700 ml-0.5">{rating}</span>
    </div>
  )
}

// ─── Tour Card (text BELOW image, TripAdvisor style) ─────────────────────────
function TourCard({ post }) {
  const [liked, setLiked] = useState(false)
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/tours'

  return (
    <Link to={to} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">

        {/* Image — clean, no text on top */}
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Heart button — only icon, no text overlay */}
          <button
            onClick={e => { e.preventDefault(); setLiked(!liked) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"
              fill={liked ? '#e53e3e' : 'none'}
              stroke={liked ? '#e53e3e' : '#374151'}
              strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        {/* Text BELOW image */}
        <div className="pt-3 pb-1 px-1">
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>

          {/* Stars + reviews */}
          {post.rating && (
            <div className="flex items-center gap-2 mb-1.5">
              <Stars rating={post.rating} />
              <span className="text-xs text-gray-400">
                ({post.reviews?.toLocaleString()})
              </span>
            </div>
          )}

          {/* Price */}
          {post.price && (
            <p className="text-xs text-gray-500">
              from <span className="font-bold text-gray-800">{post.price}</span> per person
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── Hotel Card ───────────────────────────────────────────────────────────────
function HotelCard({ post }) {
  const [liked, setLiked] = useState(false)
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/directory'

  return (
    <Link to={to} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative h-48 overflow-hidden rounded-2xl">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button
            onClick={e => { e.preventDefault(); setLiked(!liked) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"
              fill={liked ? '#e53e3e' : 'none'}
              stroke={liked ? '#e53e3e' : '#374151'}
              strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        <div className="pt-3 pb-1 px-1">
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>
          {post.rating && (
            <div className="flex items-center gap-2 mb-1.5">
              <Stars rating={post.rating} />
              <span className="text-xs text-gray-400">({post.reviews?.toLocaleString()})</span>
            </div>
          )}
          {post.price && (
            <p className="text-xs text-gray-500">
              from <span className="font-bold text-gray-800">{post.price}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── News Card (horizontal layout) ───────────────────────────────────────────
function NewsCard({ post }) {
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/news'
  return (
    <Link to={to} className="group flex gap-4 items-start hover:bg-gray-50 rounded-2xl p-2 transition-colors">
      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: '#E8731A' }}
        >
          {post.category}
        </span>
        <h3 className="font-bold text-gray-900 text-sm leading-snug mt-0.5 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </Link>
  )
}

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ post }) {
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/events'
  return (
    <Link to={to} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative h-44 overflow-hidden rounded-2xl">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {post.date && (
            <div className="absolute top-3 left-3">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: '#E8731A' }}
              >
                📅 {post.date}
              </span>
            </div>
          )}
        </div>
        <div className="pt-3 pb-1 px-1">
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, linkTo }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
      <Link
        to={linkTo}
        className="text-sm font-semibold whitespace-nowrap ml-4 hover:underline"
        style={{ color: '#2A6B7C' }}
      >
        See all →
      </Link>
    </div>
  )
}

// ─── 1. Category Image Grid (like TripAdvisor "Find by interest") ─────────────
function CategoryImageGrid() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
          Find things to do by interest
        </h2>
        <p className="text-gray-500 text-sm mb-6">Whatever you're into, we've got it</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {EXPLORE_CATEGORIES.map(cat => (
            <Link
              key={cat.label}
              to={cat.to}
              className="group relative rounded-2xl overflow-hidden aspect-video md:aspect-square block"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3">
                <div className="text-white font-black text-base">{cat.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 2. Tours Section — 4-col horizontal scroll ───────────────────────────────
function ToursSection({ posts }) {
  const display = posts.slice(0, 8)
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Experiences travelers love"
          subtitle="Travelers' Choice — Best of the Best"
          linkTo="/tours"
        />
        {/* Desktop 4-col grid */}
        <div className="hidden md:grid grid-cols-4 gap-5">
          {display.map((post, i) => <TourCard key={post.id || i} post={post} />)}
        </div>

        

        {/* Mobile scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-3 snap-x scrollbar-hide">
          {display.map((post, i) => (
            <div key={post.id || i} className="min-w-[70vw] flex-shrink-0 snap-start">
              <TourCard post={post} />
            </div>
          ))}
        </div>



      </div>
    </section>
  )
}

// ─── 3. Split Promo Banner (like TripAdvisor's "Kiva" banner) ────────────────
function PromoBanner() {
  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row"
          style={{ background: '#f0f9f5', border: '1px solid #d1ede3' }}>
          {/* Left image */}
          <div className="md:w-[45%] h-56 md:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=700&q=80"
              alt="Uganda tourism"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right text */}
          <div className="md:w-[55%] flex flex-col justify-center p-8 md:p-12">
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#2A6B7C' }}
            >
              ✦ ShowMeUganda
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-3">
              Show some love to Uganda's hidden gems
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              From remote national parks to vibrant Kampala neighbourhoods —
              discover the places most tourists never find. Our local experts
              are ready to guide you.
            </p>
            <Link
              to="/tours"
              className="self-start font-bold text-sm px-6 py-3 rounded-full text-white transition-opacity hover:opacity-90"
              style={{ background: '#E8731A' }}
            >
              Discover now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 4. Inspiration Section — 3 wide cards (like TripAdvisor articles) ───────
function InspirationSection({ posts }) {
  const display = posts.slice(0, 3)
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Inspiration to get you going"
          subtitle="Stories and guides from across Uganda"
          linkTo="/news"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {display.map((post, i) => {
            const isReal = typeof post.id === 'number'
            const to = isReal ? `/post/${post.id}` : '/news'
            return (
              <Link key={post.id || i} to={to} className="group block">
                <div className="rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="pt-3">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#E8731A' }}>
                      {post.category}
                    </p>
                    <h3 className="font-black text-gray-900 text-base leading-snug group-hover:text-orange-600 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── 5. Hotels Section ────────────────────────────────────────────────────────
function HotelsSection({ posts }) {
  const display = posts.slice(0, 4)
  return (
    <section className="py-10" style={{ background: '#f8f8f8' }}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Top-rated hotels & lodges"
          subtitle="Where comfort meets Uganda's wild beauty"
          linkTo="/directory"
        />
        {/* Desktop 4-col */}
        <div className="hidden md:grid grid-cols-4 gap-5">
          {display.map((post, i) => <HotelCard key={post.id || i} post={post} />)}
        </div>
        {/* Mobile scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-3 snap-x scrollbar-hide">
          {display.map((post, i) => (
            <div key={post.id || i} className="min-w-[72vw] flex-shrink-0 snap-start">
              <HotelCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 6. Destinations — Iconic Places ─────────────────────────────────────────
function DestinationsSection() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Iconic places you need to see"
          subtitle="Uganda's most breathtaking destinations"
          linkTo="/tours"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DESTINATIONS.map(dest => (
            <Link key={dest.name} to="/tours"
              className="group relative rounded-2xl overflow-hidden block"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <div className="text-white font-black text-lg leading-none">{dest.name}</div>
                <div className="text-white/70 text-xs mt-0.5">{dest.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 7. News + Events Side by Side ───────────────────────────────────────────
function NewsAndEvents({ news, events }) {
  return (
    <section className="py-10" style={{ background: '#f8f8f8' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* News — stacked horizontal cards */}
          <div>
            <div className="flex items-end justify-between mb-5">
              <h2 className="text-xl font-black text-gray-900">Latest news</h2>
              <Link to="/news" className="text-sm font-semibold hover:underline" style={{ color: '#2A6B7C' }}>
                See all →
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {news.slice(0, 3).map((post, i) => (
                <NewsCard key={post.id || i} post={post} />
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="flex items-end justify-between mb-5">
              <h2 className="text-xl font-black text-gray-900">Upcoming events</h2>
              <Link to="/events" className="text-sm font-semibold hover:underline" style={{ color: '#2A6B7C' }}>
                See all →
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {events.slice(0, 3).map((post, i) => (
                <EventCard key={post.id || i} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 8. Awards / Community Banner ────────────────────────────────────────────
function CommunityBanner() {
  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch"
          style={{ background: '#1a1a1a', minHeight: '280px' }}
        >
          {/* Left text */}
          <div className="md:w-[55%] flex flex-col justify-center p-8 md:p-14">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
              style={{ background: '#E8731A' }}
            >
              🏆
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              Travelers' Choice<br />Best of Uganda
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Among our top picks for places, stays, eats, and experiences
              — decided by the community.
            </p>
            <Link
              to="/tours"
              className="self-start font-bold text-sm px-6 py-3 rounded-full transition-opacity hover:opacity-90"
              style={{ background: '#E8731A', color: 'white' }}
            >
              See the winners
            </Link>
          </div>
          {/* Right image */}
          <div className="md:w-[45%] h-56 md:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&q=80"
              alt="Uganda wildlife"
              className="w-full h-full object-cover opacity-70"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 9. Join Community Footer Banner ─────────────────────────────────────────
function JoinBanner() {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
          ShowMeUganda: join the largest Uganda travel community
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
          Read reviews, post photos, and share your Uganda experiences with
          thousands of travelers. It's free, and it helps everyone plan better trips.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/tours"
            className="font-bold text-sm px-8 py-3 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ background: '#E8731A' }}
          >
            Start Exploring
          </Link>
          <Link
            to="/contact"
            className="font-bold text-sm px-8 py-3 rounded-full border-2 transition-colors hover:bg-gray-50"
            style={{ borderColor: '#2A6B7C', color: '#2A6B7C' }}
          >
            List Your Business
          </Link>
        </div>
      </div>
    </section>
  )
}






// ─── Hero (UPDATED — full-bleed photo hero + existing search section below) ──
function Hero() {
  const [activeTab,    setActiveTab]    = useState('all')
  const [search,       setSearch]       = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80', credit: 'Bwindi Forest' },
    { image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=80', credit: 'Jinja, Source of Nile' },
    { image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80', credit: 'Queen Elizabeth Park' },
    { image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80', credit: 'Murchison Falls' },
  ]

  const tabs = [
    { key: 'all',    label: 'Search All',   icon: '🏠' },
    { key: 'tours',  label: 'Things to Do', icon: '🦍' },
    { key: 'hotel',  label: 'Hotels',       icon: '🏨' },
    { key: 'events', label: 'Events',       icon: '🎉' },
    { key: 'news',   label: 'News',         icon: '📰' },
  ]

  const tabRoutes = { all: '/tours', tours: '/tours', hotel: '/directory', events: '/events', news: '/news' }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    window.location.href = tabRoutes[activeTab] + (search ? `?search=${search}` : '')
  }

  return (
    <>
      {/* ── FULL-BLEED PHOTO HERO ── */}
      <section className="relative w-full" style={{ height: '92vh', minHeight: '560px' }}>
        {/* Background image */}
        <img
          src="/images/cvr.jpg"
          alt="Uganda Safari"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay — dark bottom, slight top darkening for navbar legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Centered text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4 text-white/80"
          >
            ✦ ShowMeUganda
          </p>
          <h1
            className="font-black text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', textShadow: '0 2px 24px rgba(0,0,0,0.4)' }}
          >
            Unforgettable<br />Adventures
          </h1>
          <p
            className="text-white/85 mb-8 max-w-lg leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
          >
            Discover curated tours and safari experiences designed to create
            lasting memories across breathtaking destinations.
          </p>
          <Link
            to="/tours"
            className="font-bold text-white px-8 py-3.5 rounded-full transition-opacity hover:opacity-90"
            style={{ background: '#E8731A', fontSize: '0.9rem' }}
          >
            Read More
          </Link>
        </div>

        {/* Scroll-down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60">
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>



      {/* ── EXISTING "WHERE TO?" SEARCH SECTION — untouched ── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight" style={{ color: '#1a1a1a' }}>
            Where to?
          </h1>
          <div className="flex items-center justify-center gap-0 mb-6 border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === tab.key ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-white rounded-full shadow-md border border-gray-200 px-5 py-3"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Places to go, things to do, hotels..."
                className="flex-1 text-gray-700 text-sm focus:outline-none bg-transparent placeholder-gray-400"
              />
              <button type="submit"
                className="font-bold text-sm px-5 py-2 rounded-full text-white transition-opacity hover:opacity-90 flex-shrink-0"
                style={{ background: '#E8731A' }}>
                Search
              </button>
            </div>
          </form>
        </div>


              {/*  slder part   */}
        {/* ── ANIMATED SLIDESHOW CARD ── */}
<div className="max-w-6xl mx-auto px-4 pb-10">
  {(() => {
    const cardSlides = [
      {
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80',
        credit: 'Bwindi Forest',
        bg: '#E8731A',
        heading: 'Find things to do for everything you\'re into',
        sub: 'Browse thousands of experiences across Uganda and book with us.',
        btnLabel: 'Explore now',
        btnBg: '#2A6B7C',
        to: '/tours',
      },
      {
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80',
        credit: 'Queen Elizabeth Park',
        bg: '#2A6B7C',
        heading: 'Find safari tour packages',
        sub: 'Curated safari experiences across Uganda\'s finest national parks.',
        btnLabel: 'Explore now',
        btnBg: '#E8731A',
        to: '/tours',
      },
      {
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80',
        credit: 'Luxury Lodges',
        bg: '#E8731A',
        heading: 'Find luxury destinations',
        sub: 'World-class lodges and stays in the heart of Uganda\'s wild beauty.',
        btnLabel: 'Explore now',
        btnBg: '#2A6B7C',
        to: '/directory',
      },
      {
        image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=900&q=80',
        credit: 'Tourism Facilities',
        bg: '#2A6B7C',
        heading: 'List your tourism facilities',
        sub: 'Reach thousands of travelers. Add your business to ShowMeUganda today.',
        btnLabel: 'List your business',
        btnBg: '#E8731A',
        to: '/contact',
      },
    ]

    const [cardSlide, setCardSlide] = useState(0)
    const [transitioning, setTransitioning] = useState(false)

    useEffect(() => {
      const t = setInterval(() => {
        setTransitioning(true)
        setTimeout(() => {
          setCardSlide(prev => (prev + 1) % cardSlides.length)
          setTransitioning(false)
        }, 400)
      }, 4500)
      return () => clearInterval(t)
    }, [])

    function goTo(i) {
      if (i === cardSlide) return
      setTransitioning(true)
      setTimeout(() => {
        setCardSlide(i)
        setTransitioning(false)
      }, 400)
    }

    const s = cardSlides[cardSlide]

    return (
      <div
        className="rounded-3xl overflow-hidden flex flex-col md:flex-row transition-colors duration-700"
        style={{ background: s.bg, minHeight: '380px' }}
      >
        {/* Left — image */}
        <div className="relative md:w-[55%] h-64 md:h-auto overflow-hidden">
          {cardSlides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: cardSlide === i ? 1 : 0 }}
            >
              <img src={slide.image} alt={slide.credit} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4">
                <span
                  className="text-white text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(0,0,0,0.45)' }}
                >
                  📍 {slide.credit}
                </span>
              </div>
            </div>
          ))}
          {/* Dots */}
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
            {cardSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all"
                style={{
                  width: cardSlide === i ? '20px' : '8px',
                  height: '8px',
                  background: cardSlide === i ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right — sliding text */}
        <div className="md:w-[45%] flex flex-col items-center justify-center p-8 md:p-12 text-center">
          <div
            className="transition-all duration-400"
            style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(12px)' : 'translateY(0)' }}
          >
            <h2
              className="font-black leading-tight mb-4 text-white"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
            >
              {s.heading}
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-8">
              {s.sub}
            </p>
            <Link
              to={s.to}
              className="font-black text-white text-sm px-8 py-3.5 rounded-full transition-all hover:opacity-90 inline-block"
              style={{ background: s.btnBg }}
            >
              {s.btnLabel}
            </Link>
          </div>
        </div>
      </div>
    )
  })()}
</div>




      </section>



    </>
  )
}








// ─── MAIN HOME PAGE ───────────────────────────────────────────────────────────
export default function Home() {
  const [liveTours,  setLiveTours]  = useState([])
  const [liveHotels, setLiveHotels] = useState([])
  const [liveNews,   setLiveNews]   = useState([])
  const [liveEvents, setLiveEvents] = useState([])

  useEffect(() => {
    async function fetchLive() {
      try {
        const [t, h, n, e] = await Promise.all([
          apiClient.get('/posts?category=tour'),
          apiClient.get('/posts?category=hotel'),
          apiClient.get('/posts?category=news'),
          apiClient.get('/posts?category=event'),
        ])
        setLiveTours(t.data.data   || [])
        setLiveHotels(h.data.data  || [])
        setLiveNews(n.data.data    || [])
        setLiveEvents(e.data.data  || [])
      } catch (_) {}
    }
    fetchLive()
  }, [])

  function merge(live, placeholders, max = 8) {
    const combined = [...live]
    for (let i = 0; combined.length < max && i < placeholders.length; i++) {
      combined.push(placeholders[i])
    }
    return combined
  }

  return (
    <div className="min-h-screen bg-white">

      {/* 1. Hero — UNTOUCHED */}
      <Hero />

      {/* 2. Category image grid */}
      <CategoryImageGrid />

      {/* 3. Tours — 4-col cards, text below image */}
      <ToursSection posts={merge(liveTours, PLACEHOLDER_TOURS)} />

      {/* 4. Promo split banner */}
      <PromoBanner />

      {/* 5. Inspiration — 3 wide article cards */}
      <InspirationSection posts={merge(liveNews, PLACEHOLDER_NEWS, 3)} />

      {/* 6. Hotels — 4-col cards */}
      <HotelsSection posts={merge(liveHotels, PLACEHOLDER_HOTELS, 4)} />

      {/* 7. Iconic destinations */}
      <DestinationsSection />

      {/* 8. News + Events side by side */}
      <NewsAndEvents
        news={merge(liveNews, PLACEHOLDER_NEWS, 3)}
        events={merge(liveEvents, PLACEHOLDER_EVENTS, 3)}
      />

      {/* 9. Awards / Community dark banner */}
      <CommunityBanner />

      {/* 10. Join community CTA */}
      <JoinBanner />

    </div>
  )
}