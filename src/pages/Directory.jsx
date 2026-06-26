import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/apiClient'

// ─── Placeholder Hotels ───────────────────────────────────────────────────────
const PLACEHOLDER_HOTELS = [
  { id: 'h1', title: 'Bwindi Lodge — Forest Luxury', excerpt: 'Perched on the edge of Bwindi Forest, this lodge offers unrivalled views and world-class service amid the gorilla habitat.', image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', category: 'hotel', rating: 4.9, reviews: 541, price: '$450', location: 'Bwindi', tag: 'Lodge', amenities: ['🦍 Gorilla Trekking', '🍽️ Fine Dining', '♾️ Pool'] },
  { id: 'h2', title: 'Murchison River Lodge', excerpt: 'Stunning Nile-side accommodation with game drives, boat cruises and a spectacular infinity pool overlooking the river.', image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', category: 'hotel', rating: 4.8, reviews: 389, price: '$280', location: 'Murchison', tag: 'Safari Lodge', amenities: ['🚐 Game Drives', '🛶 Boat Cruise', '♾️ Pool'] },
  { id: 'h3', title: 'Serena Kampala Hotel', excerpt: 'The finest five-star hotel in Uganda\'s capital, offering elegant rooms, top dining and a world-class spa in the city centre.', image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80', category: 'hotel', rating: 4.7, reviews: 1204, price: '$195', location: 'Kampala', tag: '5-Star', amenities: ['🧖 Spa', '🍽️ Restaurant', '🏋️ Gym'] },
  { id: 'h4', title: 'Wildwaters Jinja Eco Lodge', excerpt: 'Perched on a private island on the Nile, Wildwaters is a unique escape for adventure seekers near the Source of the Nile.', image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', category: 'hotel', rating: 4.8, reviews: 267, price: '$320', location: 'Jinja', tag: 'Eco Lodge', amenities: ['🚣 Rafting', '🎣 Fishing', '🌿 Eco'] },
  { id: 'h5', title: 'Clouds Mountain Gorilla Lodge', excerpt: 'Luxury tented suites with panoramic views over Bwindi, the perfect base for gorilla trekking in southwest Uganda.', image_url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&q=80', category: 'hotel', rating: 4.9, reviews: 312, price: '$680', location: 'Bwindi', tag: 'Luxury', amenities: ['🦍 Gorilla Trek', '🌄 Views', '🍷 Bar'] },
  { id: 'h6', title: 'Lake Bunyonyi Eco Resort', excerpt: 'Peaceful lakeside cottages on the shores of beautiful Lake Bunyonyi in southwest Uganda, perfect for relaxation.', image_url: 'https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=800&q=80', category: 'hotel', rating: 4.6, reviews: 198, price: '$120', location: 'Lake Bunyonyi', tag: 'Eco Resort', amenities: ['🚣 Kayaking', '🏊 Swimming', '🌿 Nature'] },
]

const HOTEL_TAGS   = ['All', 'Lodge', 'Safari Lodge', '5-Star', 'Eco Lodge', 'Luxury', 'Eco Resort']
const LOCATIONS    = ['All Locations', 'Kampala', 'Jinja', 'Bwindi', 'Murchison', 'Lake Bunyonyi', 'Entebbe']
const PRICE_RANGES = ['Any Price', 'Under $100', '$100–$300', '$300–$500', '$500+']

// ─── Tag color map ─────────────────────────────────────────────────────────────
const TAG_COLORS = {
  'Lodge':       { bg: '#E8F4F7', color: '#2A6B7C' },
  'Safari Lodge':{ bg: '#FEF3E8', color: '#E8731A' },
  '5-Star':      { bg: '#FFF8E8', color: '#C9960C' },
  'Eco Lodge':   { bg: '#F0FAF0', color: '#2D7D46' },
  'Luxury':      { bg: '#F5F0FF', color: '#7C3AED' },
  'Eco Resort':  { bg: '#EDFAF4', color: '#1E8A5C' },
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20"
          fill={i <= Math.round(rating) ? '#E8731A' : '#e5e7eb'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
      <span className="text-xs font-bold text-gray-700 ml-1">{rating}</span>
    </div>
  )
}

// ─── Featured Hotel Card (big horizontal) ────────────────────────────────────
function FeaturedHotelCard({ post }) {
  const [saved, setSaved] = useState(false)
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/directory'
  const tagColor = TAG_COLORS[post.tag] || { bg: '#f3f4f6', color: '#6b7280' }

  return (
    <Link to={to} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">

        {/* Image */}
        <div className="relative md:w-[45%] h-64 md:h-auto overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: tagColor.bg, color: tagColor.color }}
            >
              {post.tag}
            </span>
          </div>
          <button
            onClick={e => { e.preventDefault(); setSaved(!saved) }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"
              fill={saved ? '#E8731A' : 'none'}
              stroke={saved ? '#E8731A' : '#6b7280'}
              strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          {/* Featured badge */}
          <div className="absolute bottom-4 left-4">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
              style={{ background: '#E8731A' }}
            >
              ⭐ Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-[55%] p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500">📍 {post.location}</span>
            </div>
            <h3 className="font-black text-gray-900 text-xl leading-snug mb-2 group-hover:text-orange-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              {post.excerpt}
            </p>

            {/* Stars + reviews */}
            {post.rating && (
              <div className="flex items-center gap-2 mb-4">
                <Stars rating={post.rating} />
                <span className="text-xs text-gray-400">({post.reviews?.toLocaleString()} reviews)</span>
              </div>
            )}

            {/* Amenities */}
            {post.amenities && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.amenities.map(a => (
                  <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span className="text-xs text-gray-400">from </span>
              <span className="font-black text-gray-900 text-xl">{post.price}</span>
              <span className="text-xs text-gray-400"> /night</span>
            </div>
            <span
              className="font-bold text-sm px-5 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
              style={{ background: '#2A6B7C' }}
            >
              View Hotel →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Standard Hotel Card ──────────────────────────────────────────────────────
function HotelCard({ post }) {
  const [saved, setSaved] = useState(false)
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/directory'
  const tagColor = TAG_COLORS[post.tag] || { bg: '#f3f4f6', color: '#6b7280' }

  return (
    <Link to={to} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">

        {/* Image */}
        <div className="relative h-52 overflow-hidden flex-shrink-0">
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
          <button
            onClick={e => { e.preventDefault(); setSaved(!saved) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"
              fill={saved ? '#E8731A' : 'none'}
              stroke={saved ? '#E8731A' : '#6b7280'}
              strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>

        {/* Text below image */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs text-gray-400">📍</span>
            <span className="text-xs text-gray-500">{post.location}</span>
          </div>
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>

          {/* Stars */}
          {post.rating && (
            <div className="flex items-center gap-2 mb-2">
              <Stars rating={post.rating} />
              <span className="text-xs text-gray-400">({post.reviews?.toLocaleString()})</span>
            </div>
          )}

          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
            {post.excerpt}
          </p>

          {/* Amenities */}
          {post.amenities && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.amenities.slice(0, 2).map(a => (
                <span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {a}
                </span>
              ))}
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div>
              <span className="text-xs text-gray-400">from </span>
              <span className="font-black text-gray-900 text-sm">{post.price}</span>
              <span className="text-xs text-gray-400">/night</span>
            </div>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
              style={{ background: '#2A6B7C' }}
            >
              Book Now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Sidebar: Search & Filter ────────────────────────────────────────────────
function FilterSidebar({ location, setLocation, priceRange, setPriceRange, tag, setTag }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-6">
      <h3 className="font-black text-gray-900 text-base">🔍 Filter Hotels</h3>

      {/* Location */}
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
          Location
        </label>
        <div className="space-y-1">
          {LOCATIONS.map(loc => (
            <button
              key={loc}
              onClick={() => setLocation(loc)}
              className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-all font-medium ${
                location === loc ? 'text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={location === loc ? { background: '#E8731A' } : {}}
            >
              {loc === 'All Locations' ? '🌍 ' : '📍 '}{loc}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
          Price per Night
        </label>
        <div className="space-y-1">
          {PRICE_RANGES.map(p => (
            <button
              key={p}
              onClick={() => setPriceRange(p)}
              className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-all font-medium ${
                priceRange === p ? 'text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={priceRange === p ? { background: '#2A6B7C' } : {}}
            >
              💰 {p}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel type */}
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
          Hotel Type
        </label>
        <div className="space-y-1">
          {HOTEL_TAGS.map(t => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-all font-medium ${
                tag === t ? 'text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={tag === t ? { background: '#2A6B7C' } : {}}
            >
              🏨 {t}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={() => { setLocation('All Locations'); setPriceRange('Any Price'); setTag('All') }}
        className="w-full text-sm font-bold py-2.5 rounded-xl border-2 transition-colors hover:bg-gray-50"
        style={{ borderColor: '#E8731A', color: '#E8731A' }}
      >
        Clear All Filters
      </button>
    </div>
  )
}

// ─── Sidebar: List Your Hotel ─────────────────────────────────────────────────
function ListHotelSidebar() {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div
        className="p-6 text-white"
        style={{ background: 'linear-gradient(135deg, #2A6B7C, #1a4a56)' }}
      >
        <div className="text-3xl mb-3">🏨</div>
        <h3 className="font-black text-lg mb-1">Own a Hotel?</h3>
        <p className="text-white/70 text-xs leading-relaxed mb-4">
          List your property on ShowMeUganda and reach thousands of travelers looking for accommodation across Uganda.
        </p>
        <Link
          to="/contact"
          className="block text-center font-bold text-sm py-2.5 rounded-xl transition-opacity hover:opacity-90"
          style={{ background: '#E8731A', color: 'white' }}
        >
          List Your Property
        </Link>
      </div>
    </div>
  )
}

// ─── Sidebar: Popular Locations ───────────────────────────────────────────────
function PopularLocationsSidebar() {
  const locs = [
    { name: 'Kampala',       hotels: 24, image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=200&q=80' },
    { name: 'Jinja',         hotels: 12, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&q=80' },
    { name: 'Bwindi',        hotels: 8,  image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=200&q=80' },
    { name: 'Murchison',     hotels: 10, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=80' },
  ]
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50">
        <h3 className="font-black text-gray-900 text-base">📍 Popular Locations</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {locs.map(loc => (
          <div
            key={loc.name}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
                {loc.name}
              </div>
              <div className="text-xs text-gray-400">{loc.hotels} properties</div>
            </div>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Directory Page ──────────────────────────────────────────────────────
export default function Directory() {
  const [posts,      setPosts]      = useState([])
  const [loading,    setLoading]    = useState(true)
  const [search,     setSearch]     = useState('')
  const [tag,        setTag]        = useState('All')
  const [location,   setLocation]   = useState('All Locations')
  const [priceRange, setPriceRange] = useState('Any Price')

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await apiClient.get('/posts?category=hotel')
        setPosts(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchHotels()
  }, [])

  function merge(live, placeholders) {
    const combined = [...live]
    for (let i = 0; combined.length < 6 && i < placeholders.length; i++) {
      combined.push(placeholders[i])
    }
    return combined
  }

  const allPosts = merge(posts, PLACEHOLDER_HOTELS)

  const filtered = allPosts
    .filter(p => tag === 'All' || p.tag === tag)
    .filter(p => location === 'All Locations' || p.location === location)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const featured = filtered[0]
  const rest     = filtered.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <div
        className="relative text-white pt-36 pb-16 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #2d6b4a 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=60')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(232,115,26,0.3)', color: '#fbb97a' }}
          >
            Where to Stay
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
            Hotel <span style={{ color: '#fbb97a' }}>Directory</span>
          </h1>
          <p className="text-white/60 max-w-xl text-sm mb-8">
            Find the perfect place to stay — from luxury safari lodges to
            budget guesthouses across Uganda's top destinations.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { n: '100+', l: 'Properties Listed' },
              { n: '4.8★', l: 'Average Rating'    },
              { n: '15',   l: 'Locations'          },
              { n: '$80',  l: 'Avg per Night'      },
            ].map(s => (
              <div key={s.l}>
                <div className="text-2xl font-black text-white">{s.n}</div>
                <div className="text-white/60 text-xs">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Search Bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full md:max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search hotels..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
            />
          </div>
          {/* Quick location pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {LOCATIONS.map(loc => (
              <button
                key={loc}
                onClick={() => setLocation(loc)}
                className={`flex-shrink-0 text-xs font-bold px-3 py-2 rounded-full transition-all ${
                  location === loc ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={location === loc ? { background: '#2A6B7C' } : {}}
              >
                {loc === 'All Locations' ? '🌍 All' : loc}
              </button>
            ))}
          </div>
          {!loading && (
            <span className="text-xs text-gray-400 whitespace-nowrap ml-auto">
              {filtered.length} propert{filtered.length !== 1 ? 'ies' : 'y'} found
            </span>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: Hotel listings */}
          <div className="flex-1 min-w-0 space-y-6">
            {loading ? (
              <div className="space-y-5">
                <div className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
                  ))}
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-5xl mb-4">🏨</p>
                <p className="font-semibold text-gray-600 mb-1">No hotels found</p>
                <p className="text-gray-400 text-sm">Try adjusting your filters.</p>
                <button
                  onClick={() => { setSearch(''); setTag('All'); setLocation('All Locations'); setPriceRange('Any Price') }}
                  className="mt-4 text-sm font-bold underline"
                  style={{ color: '#E8731A' }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                {/* Featured hotel — big horizontal card */}
                {featured && <FeaturedHotelCard post={featured} />}

                {/* Rest — 2-col grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {rest.map((post, i) => (
                    <HotelCard key={post.id || i} post={post} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0 space-y-6">
            <FilterSidebar
              location={location}     setLocation={setLocation}
              priceRange={priceRange} setPriceRange={setPriceRange}
              tag={tag}               setTag={setTag}
            />
            <PopularLocationsSidebar />
            <ListHotelSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}