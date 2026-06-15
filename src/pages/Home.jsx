import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/apiClient'

// ─── Brand Colors (from ShowMeUganda logo) ───────────────────────────────────
// Teal:   #2A6B7C  (Show Uganda text)
// Orange: #E8731A  (Uganda map shape)

// ─── Placeholder Data ─────────────────────────────────────────────────────────
const PLACEHOLDER_TOURS = [
  { id: 'p1', title: 'Gorilla Trekking in Bwindi Forest', excerpt: 'Come face to face with mountain gorillas in their natural habitat deep in Bwindi Impenetrable Forest.', image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', category: 'tour', likes: 124 },
  { id: 'p2', title: 'Queen Elizabeth National Park Safari', excerpt: 'Spot lions, elephants, and hippos on a classic Ugandan safari through Queen Elizabeth National Park.', image_url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80', category: 'tour', likes: 98 },
  { id: 'p3', title: 'Source of the Nile — Jinja Adventure', excerpt: 'White-water rafting, kayaking, and bungee jumping at the legendary source of the River Nile.', image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80', category: 'tour', likes: 87 },
  { id: 'p4', title: 'Murchison Falls National Park', excerpt: 'Cruise along the Nile and witness the world\'s most powerful waterfall on this unforgettable tour.', image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80', category: 'tour', likes: 76 },
  { id: 'p5', title: 'Kibale Forest Chimp Tracking', excerpt: 'Trek through Kibale Forest to track chimpanzees and other primates in their natural environment.', image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80', category: 'tour', likes: 65 },
  { id: 'p6', title: 'Rwenzori Mountains Hiking', excerpt: 'Climb the legendary Mountains of the Moon for breathtaking views and rare Afro-alpine vegetation.', image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', category: 'tour', likes: 54 },
  { id: 'p7', title: 'Lake Bunyonyi Island Escape', excerpt: 'Explore the beautiful islands of Lake Bunyonyi, one of Africa\'s most scenic lakes.', image_url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80', category: 'tour', likes: 43 },
  { id: 'p8', title: 'Kidepo Valley Safari', excerpt: 'One of Africa\'s most remote and pristine national parks, home to lions, cheetahs, and ostriches.', image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80', category: 'tour', likes: 38 },
]

const PLACEHOLDER_HOTELS = [
  { id: 'h1', title: 'Bwindi Lodge — Forest Luxury', excerpt: 'Perched on the edge of Bwindi Forest, this lodge offers unrivalled views and world-class service.', image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', category: 'hotel', likes: 211 },
  { id: 'h2', title: 'Murchison River Lodge', excerpt: 'Stunning Nile-side accommodation with game drives, boat cruises, and a spectacular pool.', image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', category: 'hotel', likes: 178 },
  { id: 'h3', title: 'Serena Kampala Hotel', excerpt: 'The finest five-star hotel in Uganda\'s capital, offering elegant rooms and top dining.', image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80', category: 'hotel', likes: 156 },
  { id: 'h4', title: 'Wildwaters Jinja Eco Lodge', excerpt: 'Perched on a private island on the Nile, Wildwaters is a unique escape for adventure seekers.', image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80', category: 'hotel', likes: 134 },
  { id: 'h5', title: 'Clouds Mountain Gorilla Lodge', excerpt: 'Luxury tented suites with panoramic views over Bwindi, the perfect base for gorilla trekking.', image_url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=600&q=80', category: 'hotel', likes: 122 },
  { id: 'h6', title: 'Chimpanzee Forest Guest House', excerpt: 'A peaceful retreat in Kibale, surrounded by forest and the sounds of wild chimpanzees.', image_url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', category: 'hotel', likes: 98 },
  { id: 'h7', title: 'Paraa Safari Lodge', excerpt: 'A classic Ugandan safari lodge on the northern bank of the Nile in Murchison Falls.', image_url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&q=80', category: 'hotel', likes: 87 },
  { id: 'h8', title: 'Lake Bunyonyi Eco Resort', excerpt: 'Peaceful lakeside cottages on the shores of beautiful Lake Bunyonyi in southwest Uganda.', image_url: 'https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=600&q=80', category: 'hotel', likes: 76 },
]

const PLACEHOLDER_NEWS = [
  { id: 'n1', title: 'Uganda Named Top Safari Destination 2025', excerpt: 'International travel publications have ranked Uganda among the top five safari destinations in Africa.', image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', category: 'news', likes: 45 },
  { id: 'n2', title: 'New Direct Flights to Entebbe from Dubai', excerpt: 'Emirates Airlines announces new direct routes connecting Dubai to Entebbe International Airport.', image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80', category: 'news', likes: 38 },
  { id: 'n3', title: 'Gorilla Permit Fees Updated for 2025', excerpt: 'Uganda Wildlife Authority releases updated gorilla trekking permit pricing and booking procedures.', image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80', category: 'news', likes: 32 },
  { id: 'n4', title: 'Kampala Named Among Africa\'s Top Cities', excerpt: 'The Pearl of Africa\'s capital city receives global recognition for its culture, food, and nightlife.', image_url: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=600&q=80', category: 'news', likes: 28 },
]

const PLACEHOLDER_EVENTS = [
  { id: 'e1', title: 'Kampala International Jazz Festival', excerpt: 'Three days of world-class jazz performances in the heart of Kampala. Artists from 15 countries.', image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80', category: 'event', likes: 67 },
  { id: 'e2', title: 'Nyege Nyege Music Festival — Jinja', excerpt: 'East Africa\'s biggest music festival returns to the banks of the Nile in Jinja.', image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80', category: 'event', likes: 54 },
  { id: 'e3', title: 'Uganda Wildlife Photography Safari', excerpt: 'A guided photography safari across Uganda\'s top national parks with professional tutors.', image_url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80', category: 'event', likes: 43 },
  { id: 'e4', title: 'Rolex Festival — Kampala Street Food', excerpt: 'Celebrating Uganda\'s most beloved street food — the rolex — with cooking competitions and live music.', image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', category: 'event', likes: 38 },
]

const EXPLORE_CATEGORIES = [
  { label: 'Things To Do',  icon: '🦍', to: '/tours',         bg: '#E8F4F7', color: '#2A6B7C' },
  { label: 'Hotels',        icon: '🏨', to: '/directory',     bg: '#FEF3E8', color: '#E8731A' },
  { label: 'Restaurants',   icon: '🍽️', to: '/directory',     bg: '#F0FAF0', color: '#2D7D46' },
  { label: 'Events',        icon: '🎉', to: '/events',        bg: '#FFF8E8', color: '#C9960C' },
  { label: 'Conservation',  icon: '🌿', to: '/conservation',  bg: '#EDFAF4', color: '#1E8A5C' },
  { label: 'News',          icon: '📰', to: '/news',          bg: '#EEF2FF', color: '#4B5AE8' },
]

const DESTINATIONS = [
  { name: 'Kampala',   country: 'Capital City',  image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=400&q=80' },
  { name: 'Jinja',     country: 'Source of Nile', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80' },
  { name: 'Bwindi',    country: 'Gorilla Forest', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80' },
  { name: 'Murchison', country: 'National Park',  image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' },
]

// ─── Like Button ──────────────────────────────────────────────────────────────
function LikeButton({ count }) {
  const [liked, setLiked] = useState(false)
  const [num,   setNum]   = useState(count || 0)
  return (
    <button
      onClick={e => { e.preventDefault(); setLiked(!liked); setNum(n => liked ? n - 1 : n + 1) }}
      className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'}`}
    >
      <span>{liked ? '❤️' : '🤍'}</span>
      <span>{num}</span>
    </button>
  )
}

// ─── Square Card (TripAdvisor style) ─────────────────────────────────────────
function SquareCard({ post, isPlaceholder }) {
  const to = isPlaceholder ? '#' : `/post/${post.id}`
  return (
    <Link to={to} className="group block">
      <div className="relative rounded-2xl overflow-hidden aspect-square bg-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Like button top right */}
        <div className="absolute top-3 right-3">
          <LikeButton count={post.likes || 0} />
        </div>

        {/* Content bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-bold text-sm leading-snug line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-gray-300 text-xs mt-1 line-clamp-1 hidden md:block">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── Section with 4-col 2-row Grid ───────────────────────────────────────────
function GridSection({ title, subtitle, linkTo, linkLabel, posts }) {
  // Show max 8 items (4 cols × 2 rows)
  const display = posts.slice(0, 8)

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
          </div>
          <Link
            to={linkTo}
            className="text-sm font-semibold hover:underline whitespace-nowrap ml-4"
            style={{ color: '#2A6B7C' }}
          >
            See all →
          </Link>
        </div>

        {/* Desktop: 4 cols × 2 rows grid */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {display.map((post, i) => (
            <SquareCard key={post.id || i} post={post} isPlaceholder={typeof post.id === 'string' && post.id.startsWith('p') || post.id?.toString().startsWith('h') || post.id?.toString().startsWith('n') || post.id?.toString().startsWith('e')} />
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
          {display.map((post, i) => (
            <div key={post.id || i} className="min-w-[72vw] flex-shrink-0 snap-start">
              <SquareCard key={post.id || i} post={post} isPlaceholder={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Navbar (redesigned with logo colors) ────────────────────────────────────
// NOTE: Update your Navbar.jsx separately — this is just the Home page






// ─── Hero Section (TripAdvisor Style) ────────────────────────────────────────
function Hero() {
  const [activeTab,    setActiveTab]    = useState('all')
  const [search,       setSearch]       = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80',
      credit: 'Bwindi Forest',
    },
    {
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=80',
      credit: 'Jinja, Source of Nile',
    },
    {
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80',
      credit: 'Queen Elizabeth Park',
    },
    {
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80',
      credit: 'Murchison Falls',
    },
  ]

  const tabs = [
    { key: 'all',      label: 'Search All',    icon: '🏠' },
    { key: 'tours',    label: 'Things to Do',  icon: '🦍' },
    { key: 'hotel',    label: 'Hotels',        icon: '🏨' },
    { key: 'events',   label: 'Events',        icon: '🎉' },
    { key: 'news',     label: 'News',          icon: '📰' },
  ]

  const tabRoutes = {
    all:    '/tours',
    tours:  '/tours',
    hotel:  '/directory',
    events: '/events',
    news:   '/news',
  }

  // Auto-slide every 4 seconds
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
    <section className="bg-white">

      {/* ── "Where to?" + tabs + search ── */}
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-8 text-center">

        {/* Big heading */}
        <h1
          className="text-5xl md:text-6xl font-black mb-8 tracking-tight"
          style={{ color: '#1a1a1a' }}
        >
          Where to?
        </h1>

        {/* Tab navigation */}
        <div className="flex items-center justify-center gap-0 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all border-b-2 -mb-px whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div
            className="flex items-center gap-3 bg-white rounded-full shadow-md border border-gray-200 px-5 py-3"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
          >
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
            <button
              type="submit"
              className="font-bold text-sm px-5 py-2 rounded-full text-white transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ background: '#E8731A' }}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* ── Split Banner: Slideshow + CTA ── */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div
          className="rounded-3xl overflow-hidden flex flex-col md:flex-row"
          style={{ background: '#E8731A', minHeight: '380px' }}
        >

          {/* Left: Photo slideshow */}
          <div className="relative md:w-[55%] h-64 md:h-auto overflow-hidden">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: currentSlide === i ? 1 : 0 }}
              >
                <img
                  src={slide.image}
                  alt={slide.credit}
                  className="w-full h-full object-cover"
                />
                {/* Credit pill */}
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

            {/* Slide dots */}
            <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="rounded-full transition-all"
                  style={{
                    width:  currentSlide === i ? '20px' : '8px',
                    height: '8px',
                    background: currentSlide === i ? 'white' : 'rgba(255,255,255,0.5)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: CTA text */}
          <div className="md:w-[45%] flex flex-col items-center justify-center p-8 md:p-12 text-center">
            <h2
              className="font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', color: '#1a1a1a' }}
            >
              Find things to do for everything you're into
            </h2>
            <p className="text-black/70 text-sm md:text-base mb-8">
              Browse thousands of experiences across Uganda and book with us.
            </p>
            <Link
              to="/tours"
              className="font-black text-white text-sm px-8 py-3.5 rounded-full transition-opacity hover:opacity-90"
              style={{ background: '#1a1a1a' }}
            >
              Explore now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}









// ─── Category Pills (TripAdvisor style) ──────────────────────────────────────
function CategoryPills() {
  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg font-black text-gray-900 mb-4">Find things to do by interest</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {EXPLORE_CATEGORIES.map(cat => (
            <Link
              key={cat.to + cat.label}
              to={cat.to}
              className="flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl font-semibold text-sm transition-transform hover:scale-105 min-w-[90px]"
              style={{ background: cat.bg, color: cat.color }}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs text-center leading-tight">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Destinations Banner ──────────────────────────────────────────────────────
function DestinationsBanner() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5">Iconic places you need to see</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DESTINATIONS.map(dest => (
            <Link key={dest.name} to="/tours" className="group relative rounded-2xl overflow-hidden aspect-video md:aspect-square block">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3">
                <div className="text-white font-black text-base">{dest.name}</div>
                <div className="text-white/70 text-xs">{dest.country}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="rounded-3xl overflow-hidden relative flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12"
          style={{ background: 'linear-gradient(135deg, #2A6B7C, #1a4a56)' }}
        >
          <div className="text-white text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black mb-2">
              Join Uganda's travel community
            </h3>
            <p className="text-white/70 max-w-md">
              Discover, share, and explore the Pearl of Africa with thousands of fellow travelers.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              to="/tours"
              className="font-bold px-6 py-3 rounded-xl text-sm transition-colors text-white border border-white/30 hover:bg-white/10"
            >
              Explore Tours
            </Link>
            <Link
              to="/contact"
              className="font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              style={{ background: '#E8731A', color: 'white' }}
            >
              List Your Business
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Main Home ────────────────────────────────────────────────────────────────
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
        setLiveTours(t.data.data  || [])
        setLiveHotels(h.data.data || [])
        setLiveNews(n.data.data   || [])
        setLiveEvents(e.data.data || [])
      } catch (err) {
        // silently fall back to placeholders
      }
    }
    fetchLive()
  }, [])

  // Merge: live posts first, then fill with placeholders up to 8
  function merge(live, placeholders) {
    const combined = [...live]
    for (let i = 0; combined.length < 8 && i < placeholders.length; i++) {
      combined.push(placeholders[i])
    }
    return combined
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <CategoryPills />

      <GridSection
        title="Experiences travelers love"
        subtitle="Uganda's best tours and adventures, chosen by our community"
        linkTo="/tours"
        linkLabel="See all tours"
        posts={merge(liveTours, PLACEHOLDER_TOURS)}
      />

      <div className="border-t border-gray-100" />

      <GridSection
        title="Top-rated hotels & lodges"
        subtitle="Where comfort meets the wild beauty of Uganda"
        linkTo="/directory"
        linkLabel="See all hotels"
        posts={merge(liveHotels, PLACEHOLDER_HOTELS)}
      />

      <DestinationsBanner />

      <GridSection
        title="Latest news & stories"
        subtitle="Stay in the loop with Uganda's travel scene"
        linkTo="/news"
        linkLabel="See all news"
        posts={merge(liveNews, PLACEHOLDER_NEWS)}
      />

      <div className="border-t border-gray-100" />

      <GridSection
        title="Upcoming events"
        subtitle="Festivals, concerts, and experiences not to miss"
        linkTo="/events"
        linkLabel="See all events"
        posts={merge(liveEvents, PLACEHOLDER_EVENTS)}
      />

      <CTABanner />
    </div>
  )
}