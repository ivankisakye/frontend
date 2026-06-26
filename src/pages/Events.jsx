import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/apiClient'

// ─── Placeholder Events ───────────────────────────────────────────────────────
const PLACEHOLDER_EVENTS = [
  { id: 'e1', title: 'Kampala International Jazz Festival', excerpt: 'Three days of world-class jazz performances in the heart of Kampala. Artists from 15 countries performing across 6 stages.', image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80', category: 'event', date: 'Aug 15–17, 2025', location: 'Kampala', tag: 'Music', price: 'From $20', created_at: '2025-06-01' },
  { id: 'e2', title: 'Nyege Nyege Music Festival — Jinja', excerpt: 'East Africa\'s biggest music festival returns to the banks of the Nile in Jinja for its 10th anniversary edition.', image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', category: 'event', date: 'Sep 5–8, 2025', location: 'Jinja', tag: 'Festival', price: 'From $35', created_at: '2025-06-02' },
  { id: 'e3', title: 'Uganda Wildlife Photography Week', excerpt: 'A guided photography safari across Uganda\'s top national parks with professional wildlife photographers as tutors.', image_url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80', category: 'event', date: 'Oct 12–19, 2025', location: 'Murchison Falls', tag: 'Adventure', price: 'From $450', created_at: '2025-06-03' },
  { id: 'e4', title: 'Rolex Festival — Kampala Street Food', excerpt: 'Celebrating Uganda\'s most beloved street food with cooking competitions, live music and food stalls across the city.', image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', category: 'event', date: 'Jul 20, 2025', location: 'Kampala', tag: 'Food', price: 'Free entry', created_at: '2025-06-04' },
  { id: 'e5', title: 'Gorilla Naming Ceremony — Bwindi', excerpt: 'Attend the annual Kwita Izina gorilla naming ceremony in Bwindi, one of Uganda\'s most unique cultural traditions.', image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', category: 'event', date: 'Aug 30, 2025', location: 'Bwindi', tag: 'Culture', price: 'Free entry', created_at: '2025-06-05' },
  { id: 'e6', title: 'Pearl Marathon — Entebbe', excerpt: 'Uganda\'s most scenic marathon routes through Entebbe town and along the shores of Lake Victoria.', image_url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80', category: 'event', date: 'Nov 2, 2025', location: 'Entebbe', tag: 'Sports', price: 'From $15', created_at: '2025-06-06' },
]

const EVENT_TAGS = ['All', 'Music', 'Festival', 'Adventure', 'Food', 'Culture', 'Sports']

const UPCOMING_MONTHS = [
  { month: 'July 2025',    count: 3 },
  { month: 'August 2025',  count: 5 },
  { month: 'September 2025', count: 4 },
  { month: 'October 2025', count: 6 },
  { month: 'November 2025', count: 3 },
]

// ─── Tag color map ────────────────────────────────────────────────────────────
const TAG_COLORS = {
  Music:     { bg: '#EEF2FF', color: '#4B5AE8' },
  Festival:  { bg: '#FEF3E8', color: '#E8731A' },
  Adventure: { bg: '#E8F4F7', color: '#2A6B7C' },
  Food:      { bg: '#F0FAF0', color: '#2D7D46' },
  Culture:   { bg: '#FFF8E8', color: '#C9960C' },
  Sports:    { bg: '#FEE8E8', color: '#C93030' },
}

// ─── Featured Event Card (big) ────────────────────────────────────────────────
function FeaturedEventCard({ post }) {
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/events'
  const tagColor = TAG_COLORS[post.tag] || { bg: '#f3f4f6', color: '#6b7280' }

  return (
    <Link to={to} className="group block">
      <div className="relative rounded-3xl overflow-hidden h-80 md:h-96">
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Featured badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
            style={{ background: '#E8731A' }}
          >
            ⭐ Featured Event
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {post.tag && (
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
              style={{ background: tagColor.bg, color: tagColor.color }}
            >
              {post.tag}
            </span>
          )}
          <h2 className="text-white font-black text-2xl md:text-3xl leading-tight mb-3 group-hover:text-orange-300 transition-colors">
            {post.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            {post.date && (
              <span className="flex items-center gap-1.5">
                <span>📅</span> {post.date}
              </span>
            )}
            {post.location && (
              <span className="flex items-center gap-1.5">
                <span>📍</span> {post.location}
              </span>
            )}
            {post.price && (
              <span
                className="font-bold text-white px-3 py-1 rounded-full text-xs"
                style={{ background: 'rgba(232,115,26,0.8)' }}
              >
                {post.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ post }) {
  const [saved, setSaved] = useState(false)
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/events'
  const tagColor = TAG_COLORS[post.tag] || { bg: '#f3f4f6', color: '#6b7280' }

  return (
    <Link to={to} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Save button */}
          <button
            onClick={e => { e.preventDefault(); setSaved(!saved) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"
              fill={saved ? '#E8731A' : 'none'}
              stroke={saved ? '#E8731A' : '#6b7280'}
              strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          {/* Tag */}
          {post.tag && (
            <div className="absolute top-3 left-3">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: tagColor.bg, color: tagColor.color }}
              >
                {post.tag}
              </span>
            </div>
          )}
        </div>

        {/* Text below image */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>

          {/* Date + location */}
          <div className="space-y-1.5 mb-3">
            {post.date && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>📅</span>
                <span className="font-medium">{post.date}</span>
              </div>
            )}
            {post.location && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>📍</span>
                <span>{post.location}</span>
              </div>
            )}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-900">
              {post.price || 'Free entry'}
            </span>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
              style={{ background: '#E8731A' }}
            >
              Get Tickets →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Sidebar: Submit Event ────────────────────────────────────────────────────
function SubmitEventSidebar() {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div
        className="p-6 text-white"
        style={{ background: 'linear-gradient(135deg, #2A6B7C, #1a4a56)' }}
      >
        <div className="text-3xl mb-3">🎪</div>
        <h3 className="font-black text-lg mb-1">Host an Event?</h3>
        <p className="text-white/70 text-xs leading-relaxed mb-4">
          List your Uganda event and reach thousands of travelers and locals looking for things to do.
        </p>
        <Link
          to="/contact"
          className="block text-center font-bold text-sm py-2.5 rounded-xl transition-opacity hover:opacity-90"
          style={{ background: '#E8731A', color: 'white' }}
        >
          Submit Your Event
        </Link>
      </div>
    </div>
  )
}

// ─── Sidebar: Upcoming by Month ───────────────────────────────────────────────
function UpcomingMonthsSidebar() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-black text-gray-900 text-base mb-4">📆 Upcoming by Month</h3>
      <div className="space-y-2">
        {UPCOMING_MONTHS.map(item => (
          <div
            key={item.month}
            className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
              {item.month}
            </span>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: '#2A6B7C' }}
            >
              {item.count} events
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Sidebar: Filter by Tag ───────────────────────────────────────────────────
function TagFilterSidebar({ active, onSelect }) {
  const tags = [
    { key: 'All',       icon: '🎯', label: 'All Events'  },
    { key: 'Music',     icon: '🎵', label: 'Music'       },
    { key: 'Festival',  icon: '🎪', label: 'Festivals'   },
    { key: 'Adventure', icon: '🦍', label: 'Adventure'   },
    { key: 'Food',      icon: '🍽️', label: 'Food & Drink' },
    { key: 'Culture',   icon: '🎭', label: 'Culture'     },
    { key: 'Sports',    icon: '🏃', label: 'Sports'      },
  ]
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-black text-gray-900 text-base mb-4">Filter by Type</h3>
      <div className="space-y-1">
        {tags.map(tag => (
          <button
            key={tag.key}
            onClick={() => onSelect(tag.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
              active === tag.key ? 'text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={active === tag.key ? { background: '#E8731A' } : {}}
          >
            <span>{tag.icon}</span>
            <span>{tag.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Events Page ─────────────────────────────────────────────────────────
export default function Events() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [tag,     setTag]     = useState('All')

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await apiClient.get('/posts?category=event')
        setPosts(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  function merge(live, placeholders) {
    const combined = [...live]
    for (let i = 0; combined.length < 6 && i < placeholders.length; i++) {
      combined.push(placeholders[i])
    }
    return combined
  }

  const allPosts = merge(posts, PLACEHOLDER_EVENTS)

  const filtered = allPosts
    .filter(p => tag === 'All' || p.tag === tag)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const featured = filtered[0]
  const rest     = filtered.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <div
        className="relative text-white pt-36 pb-16 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=60')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(232,115,26,0.3)', color: '#fbb97a' }}
          >
            What's Happening
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
            Events & <span style={{ color: '#fbb97a' }}>Festivals</span>
          </h1>
          <p className="text-white/60 max-w-xl text-sm mb-8">
            Discover concerts, cultural festivals, food fairs, and experiences happening across Uganda.
          </p>
          {/* Quick stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { n: '30+', l: 'Events This Month' },
              { n: '12',  l: 'Cities Covered'    },
              { n: 'Free', l: 'Entry Events'      },
              { n: '5★',  l: 'Avg Experience'    },
            ].map(s => (
              <div key={s.l}>
                <div className="text-2xl font-black text-white">{s.n}</div>
                <div className="text-white/60 text-xs">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Filter Bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full md:max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {EVENT_TAGS.map(t => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`flex-shrink-0 text-xs font-bold px-3 py-2 rounded-full transition-all ${
                  tag === t ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={tag === t ? { background: '#E8731A' } : {}}
              >
                {t}
              </button>
            ))}
          </div>
          {!loading && (
            <span className="text-xs text-gray-400 whitespace-nowrap ml-auto">
              {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
            </span>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: Events */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-5xl mb-4">🎉</p>
                <p className="font-semibold text-gray-600 mb-1">No events found</p>
                <p className="text-gray-400 text-sm">Try a different search or filter.</p>
                <button
                  onClick={() => { setSearch(''); setTag('All') }}
                  className="mt-4 text-sm font-bold underline"
                  style={{ color: '#E8731A' }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Featured */}
                {featured && <FeaturedEventCard post={featured} />}
                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {rest.map((post, i) => (
                    <EventCard key={post.id || i} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0 space-y-6">
            <TagFilterSidebar active={tag} onSelect={setTag} />
            <UpcomingMonthsSidebar />
            <SubmitEventSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}