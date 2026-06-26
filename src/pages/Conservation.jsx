import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/apiClient'

// ─── Placeholder Articles ─────────────────────────────────────────────────────
const PLACEHOLDER_CONSERVATION = [
  { id: 'c1', title: 'Mountain Gorillas: Uganda\'s Greatest Conservation Success', excerpt: 'Once on the brink of extinction, mountain gorilla populations in Bwindi have grown to over 1,000 individuals thanks to decades of dedicated conservation work.', image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', tag: 'Gorillas', read_time: '6 min read', created_at: '2025-06-01' },
  { id: 'c2', title: 'Murchison Falls: Protecting the Nile\'s Most Powerful Waterfall', excerpt: 'How Uganda Wildlife Authority is balancing tourism and conservation at one of Africa\'s most spectacular natural wonders.', image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', tag: 'Parks', read_time: '5 min read', created_at: '2025-05-25' },
  { id: 'c3', title: 'Chimpanzee Habituation in Kibale Forest', excerpt: 'The long and patient process of habituating wild chimpanzees to human presence — and why it matters for both science and tourism.', image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80', tag: 'Primates', read_time: '7 min read', created_at: '2025-05-18' },
  { id: 'c4', title: 'Queen Elizabeth Park: Land of Giants', excerpt: 'Home to over 600 bird species and the famous tree-climbing lions, Queen Elizabeth National Park is Uganda\'s most biodiverse ecosystem.', image_url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', tag: 'Wildlife', read_time: '4 min read', created_at: '2025-05-10' },
  { id: 'c5', title: 'Lake Victoria: Saving Africa\'s Largest Lake', excerpt: 'The threats facing Lake Victoria — from invasive species to pollution — and the community-led efforts to restore its health.', image_url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80', tag: 'Wetlands', read_time: '5 min read', created_at: '2025-05-05' },
  { id: 'c6', title: 'Rwenzori Mountains: Climate Change at the Equator', excerpt: 'The legendary Mountains of the Moon are losing their glaciers. Scientists are racing to understand what this means for Uganda\'s water supply.', image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', tag: 'Climate', read_time: '8 min read', created_at: '2025-04-28' },
]

const CONSERVATION_TAGS = ['All', 'Gorillas', 'Primates', 'Parks', 'Wildlife', 'Wetlands', 'Climate']

// ─── Conservation stats ───────────────────────────────────────────────────────
const STATS = [
  { number: '10',     label: 'National Parks'     },
  { number: '1,063',  label: 'Mountain Gorillas'  },
  { number: '1,066',  label: 'Bird Species'       },
  { number: '345',    label: 'Mammal Species'      },
]

// ─── Park profiles (sidebar) ──────────────────────────────────────────────────
const PARKS = [
  { name: 'Bwindi Forest',     icon: '🦍', area: '331 km²',  image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=200&q=80' },
  { name: 'Murchison Falls',   icon: '💧', area: '3,840 km²', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=80' },
  { name: 'Queen Elizabeth',   icon: '🦁', area: '1,978 km²', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&q=80' },
  { name: 'Kibale Forest',     icon: '🐒', area: '776 km²',  image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=200&q=80' },
]

// ─── Tag colors ───────────────────────────────────────────────────────────────
const TAG_COLORS = {
  Gorillas: { bg: '#E8F4F7', color: '#2A6B7C' },
  Primates: { bg: '#F0FAF0', color: '#2D7D46' },
  Parks:    { bg: '#FEF3E8', color: '#E8731A' },
  Wildlife: { bg: '#FFF8E8', color: '#C9960C' },
  Wetlands: { bg: '#EEF2FF', color: '#4B5AE8' },
  Climate:  { bg: '#FEE8E8', color: '#C93030' },
}

// ─── Featured Article (big) ───────────────────────────────────────────────────
function FeaturedConservationCard({ post }) {
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/conservation'
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
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: tagColor.bg, color: tagColor.color }}
          >
            {post.tag}
          </span>
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
            style={{ background: 'rgba(42,107,124,0.85)' }}
          >
            ⭐ Editor's Pick
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h2 className="text-white font-black text-2xl md:text-3xl leading-tight mb-3 group-hover:text-green-300 transition-colors">
            {post.title}
          </h2>
          <p className="text-white/70 text-sm line-clamp-2 max-w-2xl mb-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            {post.created_at && (
              <span>📅 {new Date(post.created_at).toLocaleDateString('en-UG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            )}
            {post.read_time && <span>• ⏱ {post.read_time}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Conservation Article Card ────────────────────────────────────────────────
function ConservationCard({ post }) {
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/conservation'
  const tagColor = TAG_COLORS[post.tag] || { bg: '#f3f4f6', color: '#6b7280' }

  return (
    <Link to={to} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
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
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-3 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {post.created_at && (
                <span>{new Date(post.created_at).toLocaleDateString('en-UG', { day: 'numeric', month: 'short' })}</span>
              )}
              {post.read_time && <span>• ⏱ {post.read_time}</span>}
            </div>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
              style={{ background: '#2A6B7C' }}
            >
              Read →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Sidebar: National Parks ──────────────────────────────────────────────────
function ParksSidebar() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50">
        <h3 className="font-black text-gray-900 text-base">🏞️ National Parks</h3>
        <p className="text-gray-400 text-xs mt-0.5">Uganda's protected areas</p>
      </div>
      <div className="divide-y divide-gray-50">
        {PARKS.map(park => (
          <Link
            key={park.name}
            to="/tours"
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={park.image}
                alt={park.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors">
                {park.icon} {park.name}
              </div>
              <div className="text-xs text-gray-400">{park.area}</div>
            </div>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-green-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Sidebar: Topics Filter ───────────────────────────────────────────────────
function TopicsSidebar({ active, onSelect }) {
  const topics = [
    { key: 'All',      icon: '🌍', label: 'All Topics'  },
    { key: 'Gorillas', icon: '🦍', label: 'Gorillas'    },
    { key: 'Primates', icon: '🐒', label: 'Primates'    },
    { key: 'Parks',    icon: '🏞️', label: 'National Parks' },
    { key: 'Wildlife', icon: '🦁', label: 'Wildlife'    },
    { key: 'Wetlands', icon: '💧', label: 'Wetlands'    },
    { key: 'Climate',  icon: '🌡️', label: 'Climate'     },
  ]
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-black text-gray-900 text-base mb-4">Browse by Topic</h3>
      <div className="space-y-1">
        {topics.map(t => (
          <button
            key={t.key}
            onClick={() => onSelect(t.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
              active === t.key ? 'text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={active === t.key ? { background: '#2A6B7C' } : {}}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Sidebar: Support Conservation ───────────────────────────────────────────
function SupportSidebar() {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div
        className="p-6 text-white"
        style={{ background: 'linear-gradient(135deg, #1a3a2a, #2d6b4a)' }}
      >
        <div className="text-3xl mb-3">🌿</div>
        <h3 className="font-black text-lg mb-1">Support Conservation</h3>
        <p className="text-white/70 text-xs leading-relaxed mb-4">
          Your visit to Uganda directly supports wildlife conservation and local
          communities. Every gorilla permit funds protection efforts.
        </p>
        <Link
          to="/tours"
          className="block text-center font-bold text-sm py-2.5 rounded-xl transition-opacity hover:opacity-90"
          style={{ background: '#E8731A', color: 'white' }}
        >
          Book a Conservation Tour
        </Link>
      </div>
    </div>
  )
}

// ─── Wildlife Stats Bar ───────────────────────────────────────────────────────
function StatsBar() {
  return (
    <div
      className="py-8 px-4"
      style={{ background: '#2A6B7C' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(stat => (
            <div key={stat.label}>
              <div className="text-3xl font-black text-white">{stat.number}</div>
              <div className="text-white/60 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Conservation Page ───────────────────────────────────────────────────
export default function Conservation() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [tag,     setTag]     = useState('All')

  useEffect(() => {
    async function fetchConservation() {
      try {
        const res = await apiClient.get('/posts?category=conservation')
        setPosts(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchConservation()
  }, [])

  function merge(live, placeholders) {
    const combined = [...live]
    for (let i = 0; combined.length < 6 && i < placeholders.length; i++) {
      combined.push(placeholders[i])
    }
    return combined
  }

  const allPosts = merge(posts, PLACEHOLDER_CONSERVATION)

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
        style={{ background: 'linear-gradient(135deg, #0d2b1a 0%, #1a3a2a 50%, #2d6b4a 100%)' }}
      >
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
            Protect & Preserve
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
            Uganda <span style={{ color: '#86efac' }}>Conservation</span>
          </h1>
          <p className="text-white/60 max-w-xl text-sm mb-8">
            Learn about Uganda's extraordinary wildlife, national parks,
            and the conservation efforts protecting them for future generations.
          </p>
          <div className="flex flex-wrap gap-6">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="text-2xl font-black text-white">{s.number}</div>
                <div className="text-white/60 text-xs">{s.label}</div>
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
              placeholder="Search conservation articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {CONSERVATION_TAGS.map(t => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`flex-shrink-0 text-xs font-bold px-3 py-2 rounded-full transition-all ${
                  tag === t ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={tag === t ? { background: '#2A6B7C' } : {}}
              >
                {t}
              </button>
            ))}
          </div>
          {!loading && (
            <span className="text-xs text-gray-400 whitespace-nowrap ml-auto">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
            </span>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: Articles */}
          <div className="flex-1 min-w-0 space-y-6">
            {loading ? (
              <div className="space-y-5">
                <div className="h-80 bg-gray-100 rounded-3xl animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
                  ))}
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-5xl mb-4">🌿</p>
                <p className="font-semibold text-gray-600 mb-1">No articles found</p>
                <p className="text-gray-400 text-sm">Try a different search or topic.</p>
                <button
                  onClick={() => { setSearch(''); setTag('All') }}
                  className="mt-4 text-sm font-bold underline"
                  style={{ color: '#2A6B7C' }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {/* Featured */}
                {featured && <FeaturedConservationCard post={featured} />}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {rest.map((post, i) => (
                    <ConservationCard key={post.id || i} post={post} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0 space-y-6">
            <TopicsSidebar active={tag} onSelect={setTag} />
            <ParksSidebar />
            <SupportSidebar />
          </div>
        </div>
      </div>

      {/* ── Wildlife Stats Bar ── */}
      <StatsBar />
    </div>
  )
}