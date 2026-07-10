import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/apiClient'

// ─── Placeholder Articles ─────────────────────────────────────────────────────
const PLACEHOLDER_NEWS = [
  { id: 'n1', title: 'Uganda Named Top Safari Destination 2025', excerpt: 'International travel publications have ranked Uganda among the top five safari destinations in Africa for the second year running.', image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', category: 'news', created_at: '2025-06-01', read_time: '4 min read', tag: 'Award' },
  { id: 'n2', title: 'New Direct Flights to Entebbe from Dubai', excerpt: 'Emirates Airlines announces new direct routes connecting Dubai to Entebbe International Airport starting September 2025, opening Uganda to more international visitors.', image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', category: 'news', created_at: '2025-05-28', read_time: '3 min read', tag: 'Travel' },
  { id: 'n3', title: 'Gorilla Permit Fees Updated for 2025 Season', excerpt: 'Uganda Wildlife Authority releases updated gorilla trekking permit pricing and new booking procedures for the upcoming season.', image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80', category: 'news', created_at: '2025-05-20', read_time: '5 min read', tag: 'Wildlife' },
  { id: 'n4', title: 'Kampala Named Among Africa\'s Top Cities for 2025', excerpt: 'The Pearl of Africa\'s capital city receives global recognition for its vibrant culture, food scene, and nightlife.', image_url: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80', category: 'news', created_at: '2025-05-15', read_time: '3 min read', tag: 'City' },
  { id: 'n5', title: 'Bwindi Impenetrable Forest Gets UNESCO Expansion', excerpt: 'The iconic gorilla habitat in southwestern Uganda has been granted an expanded UNESCO World Heritage Site boundary.', image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', category: 'news', created_at: '2025-05-10', read_time: '6 min read', tag: 'Conservation' },
  { id: 'n6', title: 'Uganda Tourism Revenue Hits Record High', excerpt: 'The Uganda Tourism Board reports record earnings from international visitors in Q1 2025, driven by gorilla trekking and safari tourism.', image_url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', category: 'news', created_at: '2025-05-05', read_time: '4 min read', tag: 'Economy' },
]

const CATEGORIES = ['All', 'Award', 'Wildlife', 'Travel', 'Conservation', 'City', 'Economy']

const TRENDING = [
  { title: 'Top 10 Things To Do in Kampala', image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=200&q=80' },
  { title: 'Best Time to Visit Uganda for Gorillas', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=200&q=80' },
  { title: 'Uganda vs Rwanda: Which Safari is Better?', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&q=80' },
  { title: 'Complete Guide to Murchison Falls', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=80' },
]

// ─── Featured Article (big card) ─────────────────────────────────────────────
function FeaturedCard({ post }) {
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.slug}` : '/news'
  return (
    <Link to={to} className="group block">
      <div className="relative rounded-3xl overflow-hidden h-80 md:h-96">
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {post.tag && (
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 text-white"
              style={{ background: '#E8731A' }}
            >
              {post.tag}
            </span>
          )}
          <h2 className="text-white font-black text-xl md:text-3xl leading-tight mb-2 group-hover:text-orange-300 transition-colors">
            {post.title}
          </h2>
          <p className="text-white/70 text-sm line-clamp-2 max-w-2xl mb-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span>📅 {new Date(post.created_at).toLocaleDateString('en-UG', { day:'numeric', month:'long', year:'numeric' })}</span>
            {post.read_time && <span>• ⏱ {post.read_time}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Standard News Card ───────────────────────────────────────────────────────
function NewsCard({ post }) {
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.slug}` : '/news'
  return (
    <Link to={to} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {post.tag && (
            <span
              className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: '#E8731A' }}
            >
              {post.tag}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400 pt-3 border-t border-gray-50">
            <span>📅 {new Date(post.created_at).toLocaleDateString('en-UG', { day:'numeric', month:'short', year:'numeric' })}</span>
            {post.read_time && <span>• ⏱ {post.read_time}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Horizontal News Card (for list view) ────────────────────────────────────
function NewsListCard({ post, index }) {
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.slug}` : '/news'
  return (
    <Link to={to} className="group flex gap-4 items-start p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-100 bg-white">
      <div className="text-2xl font-black flex-shrink-0 w-8 text-center"
        style={{ color: index === 0 ? '#E8731A' : '#d1d5db' }}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        {post.tag && (
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#E8731A' }}>
            {post.tag}
          </span>
        )}
        <h3 className="font-bold text-gray-900 text-sm leading-snug mt-0.5 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1.5">
          <span>{new Date(post.created_at).toLocaleDateString('en-UG', { day:'numeric', month:'short' })}</span>
          {post.read_time && <span>• {post.read_time}</span>}
        </div>
      </div>
    </Link>
  )
}

// ─── Sidebar: Trending ────────────────────────────────────────────────────────
function TrendingSidebar() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-black text-gray-900 text-base">🔥 Trending Now</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {TRENDING.map((item, i) => (
          <Link key={i} to="/news"
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Sidebar: Newsletter ──────────────────────────────────────────────────────
function NewsletterSidebar() {
  const [email, setEmail]   = useState('')
  const [done,  setDone]    = useState(false)

  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="p-6 text-white" style={{ background: 'linear-gradient(135deg, #2A6B7C, #1a4a56)' }}>
        <div className="text-3xl mb-3">✉️</div>
        <h3 className="font-black text-lg mb-1">Uganda Travel Newsletter</h3>
        <p className="text-white/70 text-xs leading-relaxed mb-4">
          Get the latest Uganda travel news, tips, and exclusive deals delivered to your inbox weekly.
        </p>
        {done ? (
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <p className="font-bold text-sm">🎉 You're subscribed!</p>
            <p className="text-white/70 text-xs mt-1">Welcome to the community.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-xl text-sm text-gray-900 focus:outline-none"
            />
            <button
              onClick={() => email && setDone(true)}
              className="w-full font-bold text-sm py-2.5 rounded-xl transition-opacity hover:opacity-90"
              style={{ background: '#E8731A', color: 'white' }}
            >
              Subscribe Free
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Sidebar: Categories ──────────────────────────────────────────────────────
function CategoriesSidebar({ active, onSelect }) {
  const cats = [
    { label: 'All News',     icon: '📰', key: 'All'          },
    { label: 'Wildlife',     icon: '🦍', key: 'Wildlife'     },
    { label: 'Travel',       icon: '✈️', key: 'Travel'       },
    { label: 'Conservation', icon: '🌿', key: 'Conservation' },
    { label: 'Awards',       icon: '🏆', key: 'Award'        },
    { label: 'City Life',    icon: '🏙️', key: 'City'         },
    { label: 'Economy',      icon: '📈', key: 'Economy'      },
  ]
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-black text-gray-900 text-base mb-4">Browse by Topic</h3>
      <div className="space-y-1">
        {cats.map(cat => (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
              active === cat.key ? 'text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={active === cat.key ? { background: '#E8731A' } : {}}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main News Page ───────────────────────────────────────────────────────────
export default function News() {
  const [posts,    setPosts]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [view,     setView]     = useState('grid') // 'grid' | 'list'

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await apiClient.get('/posts?category=news')
        setPosts(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  // Merge live + placeholders
  function merge(live, placeholders) {
    const combined = [...live]
    for (let i = 0; combined.length < 6 && i < placeholders.length; i++) {
      combined.push(placeholders[i])
    }
    return combined
  }

  const allPosts = merge(posts, PLACEHOLDER_NEWS)

  const filtered = allPosts
    .filter(p => category === 'All' || p.tag === category)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const featured  = filtered[0]
  const rest      = filtered.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Header ── */}
      <div
        className="relative text-white pt-36 pb-16 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=60')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(232,115,26,0.3)', color: '#fbb97a' }}
          >
            Latest Updates
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
            News & <span style={{ color: '#fbb97a' }}>Stories</span>
          </h1>
          <p className="text-white/60 max-w-xl text-sm">
            Stay informed with the latest travel news, wildlife updates, and stories from across Uganda.
          </p>
        </div>
      </div>

      {/* ── Filter + Search Bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full md:max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 text-xs font-bold px-3 py-2 rounded-full transition-all ${
                  category === cat ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={category === cat ? { background: '#E8731A' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl ml-auto flex-shrink-0">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: Articles */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-5xl mb-4">📭</p>
                <p className="font-semibold text-gray-600 mb-1">No articles found</p>
                <p className="text-gray-400 text-sm">Try a different search or category.</p>
                <button
                  onClick={() => { setSearch(''); setCategory('All') }}
                  className="mt-4 text-sm font-bold underline"
                  style={{ color: '#E8731A' }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">

                {/* Featured top article */}
                {featured && <FeaturedCard post={featured} />}

                {/* Rest of articles */}
                {view === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {rest.map((post, i) => (
                      <NewsCard key={post.id || i} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {rest.map((post, i) => (
                      <NewsListCard key={post.id || i} post={post} index={i} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0 space-y-6">
            <CategoriesSidebar active={category} onSelect={setCategory} />
            <TrendingSidebar />
            <NewsletterSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}