import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import apiClient from '../services/apiClient'

import DOMPurify from 'dompurify'

// ─── Brand Colors ─────────────────────────────────────────────────────────────
// Teal:   #2A6B7C
// Orange: #E8731A

// ─── Star Rating ──────────────────────────────────────────────────────────────
function Stars({ rating, size = 'md' }) {
  const sz = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={sz} viewBox="0 0 20 20"
          fill={i <= Math.round(rating) ? '#E8731A' : '#e5e7eb'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// ─── Category Badge ───────────────────────────────────────────────────────────
const CATEGORY_META = {
  hotel:        { label: 'Hotel & Lodge',    color: '#7C3AED', bg: '#EDE9FE', icon: '🏨' },
  event:        { label: 'Event',            color: '#D97706', bg: '#FEF3C7', icon: '🎉' },
  tour:         { label: 'Tour',             color: '#059669', bg: '#D1FAE5', icon: '🦍' },
  news:         { label: 'News',             color: '#2563EB', bg: '#DBEAFE', icon: '📰' },
  conservation: { label: 'Conservation',     color: '#16A34A', bg: '#DCFCE7', icon: '🌿' },
  directory:    { label: 'Directory',        color: '#E8731A', bg: '#FEF0E6', icon: '📍' },
}

function CategoryBadge({ category }) {
  const meta = CATEGORY_META[category] || { label: category, color: '#6B7280', bg: '#F3F4F6', icon: '📌' }
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
      style={{ color: meta.color, background: meta.bg }}
    >
      {meta.icon} {meta.label}
    </span>
  )
}

// ─── Related Post Card ────────────────────────────────────────────────────────
function RelatedCard({ post }) {
  return (
    <Link to={`/post/${post.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative h-44 overflow-hidden">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-4xl">🇺🇬</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <CategoryBadge category={post.category} />
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h4>




          {post.excerpt && (
              <div
                className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}
              />
            )}





          {post.rating && (
            <div className="flex items-center gap-2 mt-2">
              <Stars rating={post.rating} />
              <span className="text-xs text-gray-400">({post.reviews?.toLocaleString()})</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── Contact Form (EmailJS-ready) ─────────────────────────────────────────────
function ContactForm({ postTitle, category }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const placeholders = {
    hotel:  'Ask about availability, rates, or special requests…',
    event:  'Ask about tickets, dates, or group bookings…',
    tour:   'Ask about availability, group size, or custom itineraries…',
    default: 'Write your message here…',
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    // ── EmailJS integration ──────────────────────────────────────────────────
    // To activate: npm install @emailjs/browser
    // Then replace the block below with:
    //
    // import emailjs from '@emailjs/browser'
    // await emailjs.send(
    //   'YOUR_SERVICE_ID',
    //   'YOUR_TEMPLATE_ID',
    //   { from_name: form.name, from_email: form.email, message: form.message, post_title: postTitle },
    //   'YOUR_PUBLIC_KEY'
    // )
    //
    // For now we simulate a successful send:
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
          style={{ background: '#D1FAE5' }}>
          ✅
        </div>
        <h4 className="font-black text-gray-900 text-lg mb-1">Message sent!</h4>
        <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-semibold hover:underline"
          style={{ color: '#2A6B7C' }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
            Your Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
            Email Address
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
          Message
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder={placeholders[category] || placeholders.default}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full font-bold text-sm py-3 rounded-xl text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: '#E8731A' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

// ─── Hotel / Lodge Detail Layout ──────────────────────────────────────────────
function HotelDetail({ post }) {
  return (
    <>
      {/* Key Info Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {post.rating && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-black text-gray-900">{post.rating}</div>
            <Stars rating={post.rating} size="lg" />
            <div className="text-xs text-gray-400 mt-1">{post.reviews?.toLocaleString()} reviews</div>
          </div>
        )}
        {post.price && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Price</div>
            <div className="text-lg font-black" style={{ color: '#2A6B7C' }}>{post.price}</div>
          </div>
        )}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Type</div>
          <div className="text-lg font-black text-gray-900">Hotel & Lodge</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Location</div>
          <div className="text-lg font-black text-gray-900">Uganda</div>
        </div>
      </div>

      {/* Amenities (visual) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
        <h3 className="font-black text-gray-900 text-base mb-4">What's included</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Free WiFi', 'Breakfast', 'Airport Transfer', 'Game Drives', 'Swimming Pool', 'Guided Tours', '24hr Reception', 'Parking'].map(a => (
            <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500 font-bold">✓</span> {a}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Event Detail Layout ──────────────────────────────────────────────────────
function EventDetail({ post }) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <div className="text-2xl mb-1">📅</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">Date</div>
          <div className="text-sm font-black text-gray-900">
            {new Date(post.created_at).toLocaleDateString('en-UG', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
        {post.price && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-2xl mb-1">🎟️</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">Tickets</div>
            <div className="text-sm font-black" style={{ color: '#E8731A' }}>{post.price}</div>
          </div>
        )}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <div className="text-2xl mb-1">📍</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">Location</div>
          <div className="text-sm font-black text-gray-900">Uganda</div>
        </div>
      </div>
    </>
  )
}

// ─── Tour Detail Layout ───────────────────────────────────────────────────────
function TourDetail({ post }) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {post.rating && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-black text-gray-900">{post.rating}</div>
            <Stars rating={post.rating} size="lg" />
            <div className="text-xs text-gray-400 mt-1">{post.reviews?.toLocaleString()} reviews</div>
          </div>
        )}
        {post.price && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">From</div>
            <div className="text-lg font-black" style={{ color: '#2A6B7C' }}>{post.price}</div>
            <div className="text-xs text-gray-400">per person</div>
          </div>
        )}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Duration</div>
          <div className="text-lg font-black text-gray-900">Full Day</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Group Size</div>
          <div className="text-lg font-black text-gray-900">2–12</div>
        </div>
      </div>

      {/* What's included */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
        <h3 className="font-black text-gray-900 text-base mb-4">What's included</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Expert Guide', 'Transport', 'Lunch', 'Park Fees', 'Water', 'First Aid', 'Binoculars', 'Photos'].map(a => (
            <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500 font-bold">✓</span> {a}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Gallery Section ──────────────────────────────────────────────────────────
function GallerySection({ images }) {
  const [selected, setSelected] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="mb-10">
      <h2 className="font-black text-gray-900 text-xl mb-4">Gallery</h2>
      
      {/* Main selected image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-4" style={{ aspectRatio: '16/9' }}>
        <img 
          src={images[selected]} 
          alt={`Gallery ${selected + 1}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === selected ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative rounded-xl overflow-hidden transition-all ${
                i === selected ? 'ring-2 ring-offset-2' : 'opacity-60 hover:opacity-100'
              }`}
              style={{ 
                aspectRatio: '16/9',
                ringColor: i === selected ? '#2A6B7C' : 'transparent'
              }}
            >
              <img src={url} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[55vh] bg-gray-200 w-full mb-8" />
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-6 bg-gray-200 rounded w-24 mb-4" />
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-4 bg-gray-100 rounded w-full" />)}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN SinglePost PAGE ─────────────────────────────────────────────────────
export default function SinglePost() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    setNotFound(false)

    async function load() {
      try {
        const res = await apiClient.get(`/posts/slug/${slug}`)
        const p = res.data
        setPost(p)

        // Fetch related posts (same category, exclude current)
        const rel = await apiClient.get(`/posts?category=${p.category}`)
        const others = (rel.data.data || []).filter(r => r.id !== p.id).slice(0, 3)
        setRelated(others)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) return <Skeleton />

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🗺️</div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Post not found</h2>
        <p className="text-gray-500 text-sm mb-6">This page may have been removed or doesn't exist.</p>
        <button
          onClick={() => navigate(-1)}
          className="font-bold text-sm px-6 py-3 rounded-full text-white"
          style={{ background: '#E8731A' }}
        >
          ← Go back
        </button>
      </div>
    )
  }

  const meta = CATEGORY_META[post.category] || {}
  const isHotel = post.category === 'hotel'
  const isEvent = post.category === 'event'
  const isTour = post.category === 'tour'

  // Category → listing page map
  const listingPage = {
    hotel: '/directory',
    event: '/events',
    tour: '/tours',
    news: '/news',
    conservation: '/conservation',
    directory: '/directory',
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HERO IMAGE ────────────────────────────────────────────────────────── */}
      <div className="relative w-full" style={{ height: '60vh', minHeight: '400px' }}>
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-8xl"
            style={{ background: 'linear-gradient(135deg, #2A6B7C 0%, #1a4a57 100%)' }}>
            {meta.icon || '🇺🇬'}
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)' }} />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <button
            onClick={() => navigate(listingPage[post.category] || -1)}
            className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-full transition-opacity hover:opacity-80"
            style={{ background: 'rgba(0,0,0,0.45)' }}
          >
            ← Back
          </button>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-5xl mx-auto">
          <CategoryBadge category={post.category} />
          <h1
            className="text-white font-black leading-tight mt-3"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
          >
            {post.title}
          </h1>





          {post.excerpt && (
              <div
                className="text-white/80 mt-2 max-w-2xl text-sm md:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}
              />
            )}






          {/* Rating inline in hero for hotels/tours */}
          {post.rating && (isHotel || isTour) && (
            <div className="flex items-center gap-3 mt-3">
              <Stars rating={post.rating} size="lg" />
              <span className="text-white font-black text-lg">{post.rating}</span>
              <span className="text-white/70 text-sm">({post.reviews?.toLocaleString()} reviews)</span>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Main content ── */}
          <div className="lg:col-span-2">

            {/* Category-specific detail blocks */}
            {isHotel && <HotelDetail post={post} />}
            {isEvent && <EventDetail post={post} />}
            {isTour && <TourDetail post={post} />}

            {/* ── GALLERY SECTION ── */}
            {post.gallery && post.gallery.length > 0 && (
              <GallerySection images={post.gallery} />
            )}







            {/* Full content */}
            {post.content && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-8">
                <h2 className="font-black text-gray-900 text-xl mb-4">About</h2>
                <div
                  className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                />
              </div>
            )}







            {/* Published date */}
            <div className="text-xs text-gray-400 mb-8">
              Published {new Date(post.created_at).toLocaleDateString('en-UG', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </div>
          </div>

          {/* ── RIGHT: Sticky sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">

              {/* Price CTA card */}
              {post.price && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                    {isHotel ? 'Starting from' : 'Price'}
                  </div>
                  <div className="text-3xl font-black mb-1" style={{ color: '#2A6B7C' }}>
                    {post.price}
                  </div>
                  {isHotel && <div className="text-xs text-gray-400 mb-4">per night</div>}
                  {isTour && <div className="text-xs text-gray-400 mb-4">per person</div>}
                  <button
                    className="w-full font-bold text-sm py-3 rounded-xl text-white transition-opacity hover:opacity-90 mb-2"
                    style={{ background: '#E8731A' }}
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {isHotel ? 'Check Availability' : isEvent ? 'Get Tickets' : 'Book Now'}
                  </button>
                  <button
                    className="w-full font-bold text-sm py-3 rounded-xl border-2 transition-colors hover:bg-gray-50"
                    style={{ borderColor: '#2A6B7C', color: '#2A6B7C' }}
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Ask a Question
                  </button>
                </div>
              )}

              {/* Share card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Share</div>
                <div className="flex gap-2">
                  {[
                    { label: 'WhatsApp', icon: '💬', color: '#25D366', url: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}` },
                    { label: 'Twitter', icon: '🐦', color: '#1DA1F2', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}` },
                    { label: 'Copy', icon: '🔗', color: '#6B7280', action: () => navigator.clipboard.writeText(window.location.href) },
                  ].map(s => (
                    <button
                      key={s.label}
                      onClick={() => s.action ? s.action() : window.open(s.url, '_blank')}
                      className="flex-1 text-xs font-bold py-2 rounded-xl text-white transition-opacity hover:opacity-85"
                      style={{ background: s.color }}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* View all in category */}
              <Link
                to={listingPage[post.category] || '/'}
                className="block text-center font-bold text-sm py-3 rounded-xl border-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: '#2A6B7C', color: '#2A6B7C' }}
              >
                View all {meta.label || post.category}s →
              </Link>
            </div>
          </div>
        </div>

        {/* ── CONTACT FORM ──────────────────────────────────────────────────── */}
        <div id="contact-form" className="mt-4 mb-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 max-w-2xl">
            <h2 className="font-black text-gray-900 text-xl mb-1">
              {isHotel ? 'Check availability' : isEvent ? 'Get in touch about tickets' : isTour ? 'Book this experience' : 'Get in touch'}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Questions about <span className="font-semibold text-gray-700">{post.title}</span>?
              We'll get back to you within 24 hours.
            </p>
            <ContactForm postTitle={post.title} category={post.category} />
          </div>
        </div>

        {/* ── RELATED POSTS ─────────────────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-4">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900">More like this</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  More {meta.label || post.category}s you might enjoy
                </p>
              </div>
              <Link
                to={listingPage[post.category] || '/'}
                className="text-sm font-semibold hover:underline"
                style={{ color: '#2A6B7C' }}
              >
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(r => <RelatedCard key={r.id} post={r} />)}
            </div>
          </div>
        )}

        {/* Fallback if no related posts */}
        {related.length === 0 && (
          <div className="mt-4 text-center py-10 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400 text-sm mb-3">Explore more of Uganda</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {[
                { label: '🦍 Tours', to: '/tours' },
                { label: '🏨 Hotels', to: '/directory' },
                { label: '🎉 Events', to: '/events' },
                { label: '📰 News', to: '/news' },
              ].map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="font-bold text-sm px-4 py-2 rounded-full border transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#2A6B7C', color: '#2A6B7C' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}