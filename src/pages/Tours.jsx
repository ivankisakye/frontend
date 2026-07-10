import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/apiClient'
import Card from '../components/Card'

// ─── Why Book With Us ─────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { icon: '🦍', title: 'Expert Local Guides',    desc: 'All our guides are certified Ugandan locals with 10+ years experience.' },
  { icon: '✅', title: 'Verified Operators',      desc: 'Every tour operator is vetted and approved by our team.' },
  { icon: '💰', title: 'Best Price Guarantee',   desc: 'Find it cheaper elsewhere? We will match the price.' },
  { icon: '🛡️', title: 'Safe & Secure Booking',  desc: 'Your booking is protected and fully refundable up to 48hrs before.' },
]

// ─── Tour Stats ───────────────────────────────────────────────────────────────
const STATS = [
  { number: '50+',   label: 'Tour Packages'    },
  { number: '4.9★',  label: 'Average Rating'   },
  { number: '12K+',  label: 'Happy Travelers'  },
  { number: '15+',   label: 'Destinations'     },
]

// ─── Featured Destinations (sidebar) ─────────────────────────────────────────
const FEATURED = [
  { name: 'Bwindi Forest',      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80' },
  { name: 'Murchison Falls',    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' },
  { name: 'Lake Bunyonyi',      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&q=80' },
]

// ─── Stars Component ──────────────────────────────────────────────────────────
function Stars({ rating = 4.8 }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20"
          fill={i <= Math.round(rating) ? '#E8731A' : '#e5e7eb'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

// ─── Tour Card (rich version) ─────────────────────────────────────────────────
function TourCard({ post }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link to={`/post/${post.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-teal-100 to-orange-100 flex items-center justify-center">
              <span className="text-5xl">🦍</span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: '#E8731A' }}
            >
              {post.type === 'itinerary' ? '🗺️ Itinerary' : post.type === 'listing' ? '📍 Listing' : '🦍 Tour'}
            </span>
          </div>

          {/* Heart */}
          <button
            onClick={e => { e.preventDefault(); setLiked(!liked) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"
              fill={liked ? '#e53e3e' : 'none'}
              stroke={liked ? '#e53e3e' : '#6b7280'}
              strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        {/* Text below image */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>

          {/* Stars row */}
          <div className="flex items-center gap-2 mb-1.5">
            <Stars rating={4.8} />
            <span className="text-xs text-gray-400">(128 reviews)</span>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
              {post.excerpt}
            </p>
          )}

          {/* Price row */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <span className="text-xs text-gray-400">from </span>
              <span className="font-black text-gray-900 text-sm">$150</span>
              <span className="text-xs text-gray-400"> / person</span>
            </div>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
              style={{ background: '#2A6B7C' }}
            >
              View Tour →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Quick Contact Sidebar Form ───────────────────────────────────────────────
function ContactSidebar() {
  const [form, setForm]       = useState({ name: '', email: '', message: '', tour: '' })
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSent(true); setSending(false) }, 1200)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-5 text-white" style={{ background: '#2A6B7C' }}>
        <h3 className="font-black text-lg">Plan Your Trip</h3>
        <p className="text-white/80 text-xs mt-1">
          Talk to our Uganda travel experts. Free advice, no commitment.
        </p>
      </div>

      <div className="p-5">
        {sent ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">🎉</div>
            <p className="font-bold text-gray-900 text-sm">Message sent!</p>
            <p className="text-gray-500 text-xs mt-1">
              We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => { setSent(false); setForm({ name:'', email:'', message:'', tour:'' }) }}
              className="mt-4 text-xs font-semibold underline"
              style={{ color: '#E8731A' }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="John Doe"
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                placeholder="john@email.com"
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Interested Tour</label>
              <input
                type="text"
                value={form.tour}
                onChange={e => setForm({...form, tour: e.target.value})}
                placeholder="e.g. Gorilla Trekking"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                placeholder="Tell us your travel dates, group size..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full font-bold text-sm py-3 rounded-xl text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: '#E8731A' }}
            >
              {sending ? 'Sending...' : 'Send Enquiry 🚀'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── Why Book With Us Sidebar ─────────────────────────────────────────────────
function WhyBookSidebar() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-black text-gray-900 text-base mb-4">Why book with us?</h3>
      <div className="space-y-4">
        {TRUST_BADGES.map(badge => (
          <div key={badge.title} className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">{badge.icon}</span>
            <div>
              <div className="font-bold text-gray-900 text-xs">{badge.title}</div>
              <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">{badge.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Featured Destinations Sidebar ───────────────────────────────────────────
function FeaturedDestSidebar() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 pb-3">
        <h3 className="font-black text-gray-900 text-base">Top Destinations</h3>
        <p className="text-gray-500 text-xs mt-0.5">Most visited in Uganda</p>
      </div>
      <div className="flex flex-col gap-0">
        {FEATURED.map((dest, i) => (
          <Link
            key={dest.name}
            to="/tours"
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors border-t border-gray-50 group"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 text-sm">{dest.name}</div>
              <Stars rating={4.9} />
            </div>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Bottom CTA Banner ────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'linear-gradient(135deg, #2A6B7C 0%, #1a4a56 100%)' }}
        >
          <div className="text-white text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black mb-2">
              Can't find what you're looking for?
            </h3>
            <p className="text-white/70 max-w-md text-sm">
              Our Uganda travel experts build custom itineraries tailored exactly
              to your dates, budget, and interests.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="font-bold text-sm px-6 py-3 rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/contact"
              className="font-bold text-sm px-6 py-3 rounded-full transition-opacity hover:opacity-90"
              style={{ background: '#E8731A', color: 'white' }}
            >
              Build Custom Tour 🗺️
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Main Tours Page ──────────────────────────────────────────────────────────
export default function Tours() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [type,    setType]    = useState('all')

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await apiClient.get('/posts?category=tour')
        setPosts(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTours()
  }, [])

  const filtered = posts
    .filter(p => type === 'all' || p.type === type)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Banner ── */}
      <div
        className="relative text-white pt-36 pb-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a4a56 0%, #2A6B7C 60%, #1a4a56 100%)' }}
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&q=60')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(232,115,26,0.3)', color: '#fbb97a' }}
          >
            Adventures Await
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Tour Packages & <br className="hidden md:block" />
            <span style={{ color: '#fbb97a' }}>Experiences</span>
          </h1>
          <p className="text-white/70 max-w-xl text-base mb-8">
            Handpicked tours and itineraries across Uganda's most breathtaking
            destinations — guided by local experts.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6">
            {STATS.map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white">{stat.number}</div>
                <div className="text-white/60 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Filter Bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">

          {/* Search */}
          <div className="relative flex-1 w-full md:max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search tours..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          {/* Type filter */}
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 bg-white"
          >
            <option value="all">All Types</option>
            <option value="post">Tour</option>
            <option value="itinerary">Itinerary</option>
            <option value="listing">Listing</option>
          </select>

          {/* Result count */}
          {!loading && (
            <span className="text-xs text-gray-400 whitespace-nowrap ml-auto">
              {filtered.length} tour{filtered.length !== 1 ? 's' : ''} found
            </span>
          )}
        </div>
      </div>

      {/* ── Main Content: Cards + Sidebar ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: Tour Cards */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
                <p className="text-5xl mb-4">🦍</p>
                <p className="font-semibold text-gray-600 mb-1">No tours found</p>
                <p className="text-sm">Try adjusting your search or filter.</p>
                <button
                  onClick={() => { setSearch(''); setType('all') }}
                  className="mt-4 text-sm font-bold underline"
                  style={{ color: '#E8731A' }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(post => (
                  <TourCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0 space-y-6">
            <ContactSidebar />
            <WhyBookSidebar />
            <FeaturedDestSidebar />
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <BottomCTA />
    </div>
  )
}