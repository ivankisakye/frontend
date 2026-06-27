import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../services/apiClient'
import AdSlot from '../components/AdSlot'
import PartnersMarquee from '../components/PartnersMarquee'

// ─── Brand Colors ─────────────────────────────────────────────────────────────
// Teal:   #2A6B7C  |  Orange: #E8731A

// ─── Scroll Animation Hook ────────────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.12, ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

// ─── Animated wrapper ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, inView] = useInView()
  const transforms = {
    up:    'translateY(40px)',
    down:  'translateY(-40px)',
    left:  'translateX(50px)',
    right: 'translateX(-50px)',
    none:  'none',
  }
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'none' : transforms[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Placeholder Data ─────────────────────────────────────────────────────────
const PLACEHOLDER_TOURS = [
  { id: 'p1', title: 'Gorilla Trekking in Bwindi Forest',      excerpt: 'Come face to face with mountain gorillas in their natural habitat.',        image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', category: 'tour', rating: 4.9, reviews: 2847, price: '$700' },
  { id: 'p2', title: 'Queen Elizabeth National Park Safari',    excerpt: 'Spot lions, elephants and hippos on a classic Ugandan safari.',             image_url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80', category: 'tour', rating: 4.8, reviews: 1923, price: '$180' },
  { id: 'p3', title: 'Source of the Nile — Jinja Adventure',   excerpt: 'White-water rafting and kayaking at the legendary source of the Nile.',      image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80', category: 'tour', rating: 4.7, reviews: 1456, price: '$95'  },
  { id: 'p4', title: 'Murchison Falls National Park',           excerpt: "Witness the world's most powerful waterfall on this unforgettable tour.",   image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', category: 'tour', rating: 4.9, reviews: 3102, price: '$220' },
  { id: 'p5', title: 'Kibale Forest Chimp Tracking',            excerpt: 'Trek through Kibale Forest to track chimpanzees in the wild.',               image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80', category: 'tour', rating: 4.8, reviews: 987,  price: '$150' },
  { id: 'p6', title: 'Rwenzori Mountains Hiking',               excerpt: 'Climb the legendary Mountains of the Moon for breathtaking views.',          image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', category: 'tour', rating: 4.6, reviews: 654,  price: '$320' },
  { id: 'p7', title: 'Lake Bunyonyi Island Escape',             excerpt: "Explore the beautiful islands of one of Africa's most scenic lakes.",       image_url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80', category: 'tour', rating: 4.7, reviews: 789,  price: '$85'  },
  { id: 'p8', title: 'Kidepo Valley Safari',                    excerpt: "One of Africa's most remote and pristine national parks.",                  image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80', category: 'tour', rating: 4.9, reviews: 432,  price: '$380' },
]

const PLACEHOLDER_HOTELS = [
  { id: 'h1', title: 'Bwindi Lodge — Forest Luxury',    excerpt: 'Perched on the edge of Bwindi Forest with unrivalled views.',          image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', category: 'hotel', rating: 4.9, reviews: 541,  price: '$450/night' },
  { id: 'h2', title: 'Murchison River Lodge',           excerpt: 'Stunning Nile-side accommodation with game drives and boat cruises.',  image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', category: 'hotel', rating: 4.8, reviews: 389,  price: '$280/night' },
  { id: 'h3', title: 'Serena Kampala Hotel',            excerpt: "The finest five-star hotel in Uganda's capital.",                     image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80', category: 'hotel', rating: 4.7, reviews: 1204, price: '$195/night' },
  { id: 'h4', title: 'Wildwaters Jinja Eco Lodge',      excerpt: 'Perched on a private island on the Nile for adventure seekers.',      image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80', category: 'hotel', rating: 4.8, reviews: 267,  price: '$320/night' },
]

const PLACEHOLDER_NEWS = [
  { id: 'n1', title: 'Uganda Named Top Safari Destination 2025',  excerpt: 'International travel publications have ranked Uganda among the top five safari destinations in Africa for the second year running.', image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', category: 'news' },
  { id: 'n2', title: 'New Direct Flights to Entebbe from Dubai',  excerpt: 'Emirates Airlines announces new direct routes connecting Dubai to Entebbe International Airport starting September 2025.',           image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80', category: 'news' },
  { id: 'n3', title: 'Gorilla Permit Fees Updated for 2025',      excerpt: 'Uganda Wildlife Authority releases updated gorilla trekking permit pricing and new booking procedures for the upcoming season.',    image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80', category: 'news' },
]

const PLACEHOLDER_EVENTS = [
  { id: 'e1', title: 'Kampala International Jazz Festival',   excerpt: 'Three days of world-class jazz performances in the heart of Kampala. Artists from 15 countries.',            image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80', category: 'event', date: 'Aug 15–17, 2025' },
  { id: 'e2', title: 'Nyege Nyege Music Festival — Jinja',    excerpt: "East Africa's biggest music festival returns to the banks of the Nile for its 10th anniversary edition.",    image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80', category: 'event', date: 'Sep 5–8, 2025'  },
  { id: 'e3', title: 'Uganda Wildlife Photography Week',      excerpt: "A guided photography safari across Uganda's top national parks with professional wildlife photographers.",   image_url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80', category: 'event', date: 'Oct 12–19, 2025'},
]

const EXPLORE_CATEGORIES = [
  { label: 'Outdoors', icon: '🦍', to: '/tours',        img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300&q=80' },
  { label: 'Wildlife', icon: '🐘', to: '/tours',        img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=300&q=80' },
  { label: 'Culture',  icon: '🎭', to: '/events',       img: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=300&q=80' },
  { label: 'Water',    icon: '🚣', to: '/tours',        img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&q=80' },
]

const DESTINATIONS = [
  { name: 'Kampala',   sub: 'Capital City',   image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=500&q=80' },
  { name: 'Jinja',     sub: 'Source of Nile', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80' },
  { name: 'Bwindi',    sub: 'Gorilla Forest', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&q=80' },
  { name: 'Murchison', sub: 'National Park',  image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80' },
]

// ─── Stars ────────────────────────────────────────────────────────────────────
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

// ─── Tour Card ────────────────────────────────────────────────────────────────
function TourCard({ post, delay = 0 }) {
  const [liked, setLiked] = useState(false)
  const [ref, inView] = useInView()
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/tours'

  return (
    <div
      ref={ref}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'none' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <Link to={to} className="group block w-full">
        <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <img src={post.image_url} alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <button
              onClick={e => { e.preventDefault(); setLiked(!liked) }}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.92)' }}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24"
                fill={liked ? '#e53e3e' : 'none'} stroke={liked ? '#e53e3e' : '#374151'} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
          <div className="pt-2.5 sm:pt-3 pb-1 px-1">
            <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-snug mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
              {post.title}
            </h3>
            {post.rating && (
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <Stars rating={post.rating} />
                <span className="text-[11px] sm:text-xs text-gray-400">({post.reviews?.toLocaleString()})</span>
              </div>
            )}
            {post.price && (
              <p className="text-[11px] sm:text-xs text-gray-500">
                from <span className="font-bold text-gray-800">{post.price}</span> per person
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

// ─── Hotel Card ───────────────────────────────────────────────────────────────
function HotelCard({ post, delay = 0 }) {
  const [liked, setLiked] = useState(false)
  const [ref, inView] = useInView()
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/directory'

  return (
    <div
      ref={ref}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'none' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <Link to={to} className="group block">
        <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-48 overflow-hidden rounded-2xl">
            <img src={post.image_url} alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <button
              onClick={e => { e.preventDefault(); setLiked(!liked) }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.92)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"
                fill={liked ? '#e53e3e' : 'none'} stroke={liked ? '#e53e3e' : '#374151'} strokeWidth="2">
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
    </div>
  )
}

// ─── News Card ────────────────────────────────────────────────────────────────
function NewsCard({ post }) {
  const isReal = typeof post.id === 'number'
  const to = isReal ? `/post/${post.id}` : '/news'
  return (
    <Link to={to} className="group flex gap-3 sm:gap-4 items-start hover:bg-gray-50 rounded-2xl p-2 transition-colors">
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden">
        <img src={post.image_url} alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider" style={{ color: '#E8731A' }}>
          {post.category}
        </span>
        <h3 className="font-bold text-gray-900 text-sm leading-snug mt-0.5 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">{post.excerpt}</p>
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
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-44 overflow-hidden rounded-2xl">
          <img src={post.image_url} alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {post.date && (
            <div className="absolute top-3 left-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: '#E8731A' }}>
                📅 {post.date}
              </span>
            </div>
          )}
        </div>
        <div className="pt-3 pb-1 px-1">
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{post.excerpt}</p>
        </div>
      </div>
    </Link>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, linkTo }) {
  return (
    <Reveal className="flex items-end justify-between mb-5 sm:mb-6 gap-3">
      <div className="min-w-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{subtitle}</p>}
      </div>
      <Link to={linkTo} className="text-xs sm:text-sm font-semibold whitespace-nowrap ml-2 hover:underline flex-shrink-0"
        style={{ color: '#2A6B7C' }}>
        See all →
      </Link>
    </Reveal>
  )
}

// ─── Category Grid ────────────────────────────────────────────────────────────
function CategoryImageGrid() {
  return (
    <section className="py-8 sm:py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-1">
            Find things to do by interest
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mb-5 sm:mb-6">Whatever you're into, we've got it</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {EXPLORE_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 100}>
              <Link to={cat.to} className="group relative rounded-2xl overflow-hidden aspect-video md:aspect-square block">
                <img src={cat.img} alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3">
                  <div className="text-white font-black text-sm sm:text-base">{cat.label}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Tours Section ────────────────────────────────────────────────────────────
function ToursSection({ posts }) {
  const display = posts.slice(0, 8)
  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Experiences travelers love" subtitle="Travelers' Choice — Best of the Best" linkTo="/tours" />
        <div className="hidden md:grid grid-cols-4 gap-5">
          {display.map((post, i) => <TourCard key={post.id || i} post={post} delay={i * 80} />)}
        </div>


        <div className="md:hidden flex gap-3 overflow-x-auto pb-3 snap-x scrollbar-hide -mx-4 px-4">
          {display.map((post, i) => (
            <div key={post.id || i} className="w-[44vw] max-w-[200px] flex-shrink-0 snap-start">
              <TourCard post={post} delay={i * 60} />
            </div>
          ))}
        </div>


        
      </div>
    </section>
  )
}

// ─── Promo Banner ─────────────────────────────────────────────────────────────
function PromoBanner() {
  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal direction="up">
          <div className="rounded-2xl overflow-hidden flex flex-col sm:flex-row"
            style={{ background: '#f0f9f5', border: '1px solid #d1ede3' }}>
            <div className="sm:w-1/3 h-40 sm:h-48 overflow-hidden flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80"
                alt="Uganda tourism" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center gap-2 px-6 py-4 sm:py-0 sm:px-8">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2A6B7C' }}>
                ✦ ShowMeUganda
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                Show some love to Uganda's hidden gems
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                From remote national parks to vibrant Kampala neighbourhoods — discover the places most tourists never find.
              </p>
              <Link to="/tours" className="self-start text-sm font-bold px-5 py-2.5 rounded-full text-white mt-1 hover:opacity-90 transition-opacity"
                style={{ background: '#E8731A' }}>
                Discover now
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Inspiration Section ──────────────────────────────────────────────────────
function InspirationSection({ posts }) {
  const display = posts.slice(0, 3)
  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Inspiration to get you going" subtitle="Stories and guides from across Uganda" linkTo="/news" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {display.map((post, i) => {
            const isReal = typeof post.id === 'number'
            const to = isReal ? `/post/${post.id}` : '/news'
            return (
              <Reveal key={post.id || i} delay={i * 120} direction="up">
                <Link to={to} className="group block">
                  <div className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-44 sm:h-48 overflow-hidden">
                      <img src={post.image_url} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="pt-3">
                      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#E8731A' }}>
                        {post.category}
                      </p>
                      <h3 className="font-black text-gray-900 text-sm sm:text-base leading-snug group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Hotels Section ───────────────────────────────────────────────────────────
function HotelsSection({ posts }) {
  const display = posts.slice(0, 4)
  return (
    <section className="py-8 sm:py-10" style={{ background: '#f8f8f8' }}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Top-rated hotels & lodges" subtitle="Where comfort meets Uganda's wild beauty" linkTo="/directory" />
        <div className="hidden md:grid grid-cols-4 gap-5">
          {display.map((post, i) => <HotelCard key={post.id || i} post={post} delay={i * 90} />)}
        </div>
        <div className="md:hidden flex gap-4 overflow-x-auto pb-3 snap-x scrollbar-hide">
          {display.map((post, i) => (
            <div key={post.id || i} className="min-w-[72vw] flex-shrink-0 snap-start">
              <HotelCard post={post} delay={i * 70} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Destinations Section ─────────────────────────────────────────────────────
function DestinationsSection() {
  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Iconic places you need to see" subtitle="Uganda's most breathtaking destinations" linkTo="/tours" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {DESTINATIONS.map((dest, i) => (
            <Reveal key={dest.name} delay={i * 100} direction="up">
              <Link to="/tours" className="group relative rounded-2xl overflow-hidden block" style={{ aspectRatio: '3/4' }}>
                <img src={dest.image} alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-3 sm:p-4">
                  <div className="text-white font-black text-base sm:text-lg leading-none">{dest.name}</div>
                  <div className="text-white/70 text-xs mt-0.5">{dest.sub}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── News + Events ────────────────────────────────────────────────────────────
function NewsAndEvents({ news, events }) {
  return (
    <section className="py-8 sm:py-10" style={{ background: '#f8f8f8' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <Reveal direction="right">
            <div className="flex items-end justify-between mb-4 sm:mb-5">
              <h2 className="text-lg sm:text-xl font-black text-gray-900">Latest news</h2>
              <Link to="/news" className="text-xs sm:text-sm font-semibold hover:underline" style={{ color: '#2A6B7C' }}>See all →</Link>
            </div>
            <div className="flex flex-col gap-2">
              {news.slice(0, 3).map((post, i) => <NewsCard key={post.id || i} post={post} />)}
            </div>
          </Reveal>
          <Reveal direction="left" delay={150}>
            <div className="flex items-end justify-between mb-4 sm:mb-5">
              <h2 className="text-lg sm:text-xl font-black text-gray-900">Upcoming events</h2>
              <Link to="/events" className="text-xs sm:text-sm font-semibold hover:underline" style={{ color: '#2A6B7C' }}>See all →</Link>
            </div>
            <div className="flex flex-col gap-4">
              {events.slice(0, 3).map((post, i) => <EventCard key={post.id || i} post={post} />)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Community Banner ─────────────────────────────────────────────────────────
function CommunityBanner() {
  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal direction="up">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch"
            style={{ background: '#1a1a1a', minHeight: '280px' }}>
            <div className="md:w-[55%] flex flex-col justify-center p-6 sm:p-8 md:p-14">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5"
                style={{ background: '#E8731A' }}>🏆</div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                Travelers' Choice<br />Best of Uganda
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                Among our top picks for places, stays, eats, and experiences — decided by the community.
              </p>
              <Link to="/tours" className="self-start font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                style={{ background: '#E8731A', color: 'white' }}>
                See the winners
              </Link>
            </div>
            <div className="md:w-[45%] h-48 sm:h-56 md:h-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&q=80"
                alt="Uganda wildlife" className="w-full h-full object-cover opacity-70" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Join Banner ──────────────────────────────────────────────────────────────
function JoinBanner() {
  return (
    <section className="py-10 sm:py-12 bg-white border-t border-gray-100">
      <Reveal direction="up">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-3">
            ShowMeUganda: join the largest Uganda travel community
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Read reviews, post photos, and share your Uganda experiences with thousands of travelers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/tours" className="font-bold text-sm px-8 py-3 rounded-full text-white hover:opacity-90 transition-opacity"
              style={{ background: '#E8731A' }}>
              Start Exploring
            </Link>
            <Link to="/contact" className="font-bold text-sm px-8 py-3 rounded-full border-2 hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#2A6B7C', color: '#2A6B7C' }}>
              List Your Business
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [activeTab,    setActiveTab]    = useState('all')
  const [search,       setSearch]       = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroLoaded,   setHeroLoaded]   = useState(false)

  const cardSlides = [
    { image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80', credit: 'Bwindi Forest',      bg: '#E8731A', heading: 'Find interesting things to do',    sub: 'Browse thousands of experiences across Uganda.',           btnLabel: 'Explore now',        btnBg: '#2A6B7C', to: '/tours'   },
    { image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80',   credit: 'Queen Elizabeth',    bg: '#2A6B7C', heading: 'Find safari tour packages',         sub: "Curated safari experiences across Uganda's finest parks.", btnLabel: 'Explore now',        btnBg: '#E8731A', to: '/tours'   },
    { image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80',credit: 'Luxury Lodges',      bg: '#E8731A', heading: 'Find luxury destinations',          sub: "World-class lodges in the heart of Uganda's wild beauty.", btnLabel: 'Explore now',        btnBg: '#2A6B7C', to: '/directory'},
    { image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&q=80', credit: 'Tourism Facilities', bg: '#2A6B7C', heading: 'List your tourism facilities',     sub: 'Reach thousands of travelers. Add your business today.',   btnLabel: 'List your business', btnBg: '#E8731A', to: '/contact' },
  ]

  const tabs = [
    { key: 'all',    label: 'Search All',   icon: '🏠' },
    { key: 'tours',  label: 'Things to Do', icon: '🦍' },
    { key: 'hotel',  label: 'Hotels',       icon: '🏨' },
    { key: 'events', label: 'Events',       icon: '🎉' },
    { key: 'news',   label: 'News',         icon: '📰' },
  ]

  const tabRoutes = { all: '/tours', tours: '/tours', hotel: '/directory', events: '/events', news: '/news' }

  const [cardSlide,    setCardSlide]    = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  // Hero load animation
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Slideshow
  useEffect(() => {
    const t = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => { setCardSlide(prev => (prev + 1) % cardSlides.length); setTransitioning(false) }, 400)
    }, 4500)
    return () => clearInterval(t)
  }, [])

  function goTo(i) {
    if (i === cardSlide) return
    setTransitioning(true)
    setTimeout(() => { setCardSlide(i); setTransitioning(false) }, 400)
  }

  function handleSearch(e) {
    e.preventDefault()
    window.location.href = tabRoutes[activeTab] + (search ? `?search=${search}` : '')
  }

  const s = cardSlides[cardSlide]

  return (
    <>
      {/* ── FULL-BLEED PHOTO HERO ── */}
      <section className="relative w-full" style={{ height: '92vh', minHeight: '480px' }}>
        <img src="/images/cvr.jpg" alt="Uganda Safari"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)' }} />

        {/* Hero text — flies in on load */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

          {/* Tag line */}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4 text-white/80"
            style={{
              opacity:    heroLoaded ? 1 : 0,
              transform:  heroLoaded ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}
          >
            ✦ ShowMeUganda
          </p>

          {/* Main heading — slides up */}
          <h1
            className="font-black text-white leading-tight mb-5"
            style={{
              fontSize:   'clamp(2.1rem, 9vw, 5rem)',
              textShadow: '0 2px 24px rgba(0,0,0,0.4)',
              opacity:    heroLoaded ? 1 : 0,
              transform:  heroLoaded ? 'none' : 'translateY(35px)',
              transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
            }}
          >
            Unforgettable<br />Adventures
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/85 mb-8 max-w-lg leading-relaxed"
            style={{
              fontSize:   'clamp(0.9rem, 2.4vw, 1.15rem)',
              textShadow: '0 1px 8px rgba(0,0,0,0.3)',
              opacity:    heroLoaded ? 1 : 0,
              transform:  heroLoaded ? 'none' : 'translateY(25px)',
              transition: 'opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s',
            }}
          >
            Discover curated tours and safari experiences designed to create
            lasting memories across breathtaking destinations.
          </p>

          {/* CTA button */}
          <div
            style={{
              opacity:    heroLoaded ? 1 : 0,
              transform:  heroLoaded ? 'none' : 'translateY(20px) scale(0.95)',
              transition: 'opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s',
            }}
          >
            <Link to="/tours"
              className="font-bold text-white px-7 sm:px-8 py-3 sm:py-3.5 rounded-full hover:opacity-90 transition-opacity inline-block"
              style={{ background: '#E8731A', fontSize: '0.9rem' }}>
              Read More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60"
          style={{
            opacity:    heroLoaded ? 1 : 0,
            transition: 'opacity 1s ease 1.2s',
          }}
        >
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── WHERE TO? SEARCH SECTION ── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 pt-8 sm:pt-10 pb-6 sm:pb-8 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 sm:mb-8 tracking-tight"
            style={{ color: '#1a1a1a' }}>
            Where to?
          </h1>
          <div className="flex items-center justify-center gap-0 mb-6 border-b border-gray-200 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 -mb-px whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.key ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}>
                <span className="text-sm sm:text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-full border border-gray-200 px-4 sm:px-5 py-2.5 sm:py-3"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Places to go, things to do, hotels..."
                className="flex-1 min-w-0 text-gray-700 text-xs sm:text-sm focus:outline-none bg-transparent placeholder-gray-400" />
              <button type="submit"
                className="font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full text-white hover:opacity-90 transition-opacity flex-shrink-0"
                style={{ background: '#E8731A' }}>
                Search
              </button>
            </div>
          </form>
        </div>

        {/* ── ANIMATED SLIDESHOW CARD ── */}
        <div className="max-w-6xl mx-auto px-4 pb-8 sm:pb-10">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col md:flex-row transition-colors duration-700"
            style={{ background: s.bg, minHeight: '340px' }}>

            {/* Left image */}
            <div className="relative md:w-[55%] h-52 sm:h-64 md:h-auto overflow-hidden">
              {cardSlides.map((slide, i) => (
                <div key={i} className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: cardSlide === i ? 1 : 0 }}>
                  <img src={slide.image} alt={slide.credit} className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                    <span className="text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.45)' }}>
                      📍 {slide.credit}
                    </span>
                  </div>
                </div>
              ))}
              {/* Dots */}
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-1.5 z-10">
                {cardSlides.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all"
                    style={{ width: cardSlide === i ? '20px' : '8px', height: '8px',
                      background: cardSlide === i ? 'white' : 'rgba(255,255,255,0.5)' }} />
                ))}
              </div>
            </div>

            {/* Right text */}
            <div className="md:w-[45%] flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 text-center">
              <div style={{
                opacity:    transitioning ? 0 : 1,
                transform:  transitioning ? 'translateY(12px)' : 'translateY(0)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}>
                <h2 className="font-black leading-tight mb-3 sm:mb-4 text-white"
                  style={{ fontSize: 'clamp(1.35rem, 4.5vw, 2.6rem)' }}>
                  {s.heading}
                </h2>
                <p className="text-white/80 text-sm md:text-base mb-6 sm:mb-8">{s.sub}</p>
                <Link to={s.to}
                  className="font-black text-white text-sm px-7 sm:px-8 py-3 sm:py-3.5 rounded-full hover:opacity-90 transition-opacity inline-block"
                  style={{ background: s.btnBg }}>
                  {s.btnLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Hero />
      <CategoryImageGrid />

        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdSlot size="leaderboard" />
        </div>


      <ToursSection     posts={merge(liveTours,  PLACEHOLDER_TOURS)}    />
      <PromoBanner />

        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdSlot size="billboard" />
        </div>


      <InspirationSection posts={merge(liveNews, PLACEHOLDER_NEWS, 3)}  />
      <HotelsSection    posts={merge(liveHotels, PLACEHOLDER_HOTELS, 4)} />

        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdSlot size="leaderboard" />
        </div>


      <DestinationsSection />
      <NewsAndEvents
        news={merge(liveNews,   PLACEHOLDER_NEWS,   3)}
        events={merge(liveEvents, PLACEHOLDER_EVENTS, 3)}
      />
      <CommunityBanner />

        <div className="sm:hidden px-4 py-3">
          <AdSlot size="mobilebanner" />
        </div>

      <PartnersMarquee />

      <JoinBanner />
    </div>
  )
}