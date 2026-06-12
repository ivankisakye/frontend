import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/apiClient'
import Card from '../components/Card'

// ─── Hero Section ───────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90 z-10" />

      {/* Background pattern */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1612639512646-1d9d4c14e1e4?w=1400')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 py-24 md:py-36">
        <div className="max-w-2xl">

          {/* Tag */}
          <span className="inline-block bg-uganda-yellow text-black text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
            Pearl of Africa
          </span>

          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Discover the
            <span className="text-uganda-yellow block">Beauty of Uganda</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            Explore tours, hotels, events, and hidden gems across Uganda.
            Your adventure starts here.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/tours"
              className="bg-uganda-yellow text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors"
            >
              Explore Tours
            </Link>
            <Link
              to="/directory"
              className="border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-colors"
            >
              Find Hotels
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, linkTo, linkLabel }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="text-sm font-semibold text-uganda-red hover:underline whitespace-nowrap ml-4"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  )
}

// ─── Horizontal Scroll Section ───────────────────────────────────────────────
function HorizontalSection({ title, subtitle, linkTo, linkLabel, posts, loading }) {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          linkTo={linkTo}
          linkLabel={linkLabel}
        />

        {loading ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[280px] h-64 bg-gray-100 rounded-2xl animate-pulse flex-shrink-0" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">No content yet. Check back soon.</p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {posts.map(post => (
              <div key={post.id} className="min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start">
                <Card post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Stats Banner ─────────────────────────────────────────────────────────────
function StatsBanner() {
  const stats = [
    { number: '50+', label: 'Tour Packages' },
    { number: '100+', label: 'Hotels Listed' },
    { number: '20+', label: 'Destinations' },
    { number: '1000+', label: 'Happy Travelers' },
  ]

  return (
    <section className="bg-uganda-yellow py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-black text-black">{stat.number}</div>
              <div className="text-sm font-medium text-black/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Featured Categories ──────────────────────────────────────────────────────
function FeaturedCategories() {
  const categories = [
    { label: 'Tours',        icon: '🦍', to: '/tours',        bg: 'bg-green-50',   border: 'border-green-200' },
    { label: 'Hotels',       icon: '🏨', to: '/directory',    bg: 'bg-purple-50',  border: 'border-purple-200' },
    { label: 'Events',       icon: '🎉', to: '/events',       bg: 'bg-yellow-50',  border: 'border-yellow-200' },
    { label: 'Conservation', icon: '🌿', to: '/conservation', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'News',         icon: '📰', to: '/news',         bg: 'bg-blue-50',    border: 'border-blue-200' },
    { label: 'Contact',      icon: '📞', to: '/contact',      bg: 'bg-red-50',     border: 'border-red-200' },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Explore by Category"
          subtitle="Find exactly what you're looking for"
        />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className={`${cat.bg} ${cat.border} border rounded-2xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-gray-700 text-center">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Main Home Page ───────────────────────────────────────────────────────────
export default function Home() {
  const [news, setNews]           = useState([])
  const [tours, setTours]         = useState([])
  const [hotels, setHotels]       = useState([])
  const [events, setEvents]       = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    async function fetchAll() {
      try {
        const [newsRes, toursRes, hotelsRes, eventsRes] = await Promise.all([
          apiClient.get('/posts?category=news'),
          apiClient.get('/posts?category=tour'),
          apiClient.get('/posts?category=hotel'),
          apiClient.get('/posts?category=event'),
        ])
        setNews(newsRes.data.data.slice(0, 6))
        setTours(toursRes.data.data.slice(0, 6))
        setHotels(hotelsRes.data.data.slice(0, 6))
        setEvents(eventsRes.data.data.slice(0, 6))
      } catch (err) {
        console.error('Failed to load homepage data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Stats */}
      <StatsBanner />

      {/* Categories */}
      <FeaturedCategories />

      {/* Latest News */}
      <HorizontalSection
        title="Latest News & Stories"
        subtitle="Stay updated with Uganda's travel scene"
        linkTo="/news"
        linkLabel="All News"
        posts={news}
        loading={loading}
      />

      {/* Divider */}
      <div className="border-t border-gray-100 max-w-7xl mx-auto" />

      {/* Tour Packages */}
      <HorizontalSection
        title="Tour Packages"
        subtitle="Handpicked adventures across Uganda"
        linkTo="/tours"
        linkLabel="All Tours"
        posts={tours}
        loading={loading}
      />

      {/* Divider */}
      <div className="border-t border-gray-100 max-w-7xl mx-auto" />

      {/* Hotels */}
      <HorizontalSection
        title="Featured Hotels"
        subtitle="Where comfort meets nature"
        linkTo="/directory"
        linkLabel="All Hotels"
        posts={hotels}
        loading={loading}
      />

      {/* Divider */}
      <div className="border-t border-gray-100 max-w-7xl mx-auto" />

      {/* Events */}
      <HorizontalSection
        title="Upcoming Events"
        subtitle="Don't miss what's happening"
        linkTo="/events"
        linkLabel="All Events"
        posts={events}
        loading={loading}
      />
    </div>
  )
}