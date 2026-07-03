import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={className} style={{
      opacity:    inView ? 1 : 0,
      transform:  inView ? 'none' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Wildlife', 'Landscapes', 'Culture', 'Adventure', 'Video']

const MEDIA = [
  // ── Videos ──
  {
    id: 'v1', type: 'video', category: 'Video',
    thumb:   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    youtubeId: 'bq4ZD9Y8nIM',
    title:   'Gorilla Trekking in Bwindi Forest',
    location:'Bwindi, Uganda',
    duration: '4:32',
  },
  {
    id: 'v2', type: 'video', category: 'Video',
    thumb:   'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    youtubeId: 'JqJoB7Y4oMg',
    title:   'Queen Elizabeth National Park Safari',
    location:'Queen Elizabeth, Uganda',
    duration: '6:14',
  },
  {
    id: 'v3', type: 'video', category: 'Video',
    thumb:   'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    youtubeId: 'MFOYt7ETJJM',
    title:   'White Water Rafting — Source of the Nile',
    location:'Jinja, Uganda',
    duration: '5:47',
  },

  // ── Wildlife ──
  {
    id: 'p1', type: 'photo', category: 'Wildlife',
    src:      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1000&q=85',
    title:   'Mountain Gorilla',
    location:'Bwindi Impenetrable Forest',
    size: 'tall',
  },
  {
    id: 'p2', type: 'photo', category: 'Wildlife',
    src:      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1000&q=85',
    title:   'Elephant at Sunset',
    location:'Queen Elizabeth National Park',
    size: 'wide',
  },
  {
    id: 'p3', type: 'photo', category: 'Wildlife',
    src:      'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1000&q=85',
    title:   'Chimpanzee Tracking',
    location:'Kibale Forest',
    size: 'normal',
  },
  {
    id: 'p4', type: 'photo', category: 'Wildlife',
    src:      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&q=85',
    title:   'Lions of Kidepo Valley',
    location:'Kidepo Valley National Park',
    size: 'normal',
  },

  // ── Landscapes ──
  {
    id: 'p5', type: 'photo', category: 'Landscapes',
    src:      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=85',
    title:   'Murchison Falls',
    location:'Murchison Falls National Park',
    size: 'wide',
  },
  {
    id: 'p6', type: 'photo', category: 'Landscapes',
    src:      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1000&q=85',
    title:   'Lake Bunyonyi at Dawn',
    location:'South-Western Uganda',
    size: 'tall',
  },
  {
    id: 'p7', type: 'photo', category: 'Landscapes',
    src:      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=85',
    title:   'Rwenzori Mountains',
    location:'Mountains of the Moon',
    size: 'normal',
  },
  {
    id: 'p8', type: 'photo', category: 'Landscapes',
    src:      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1000&q=85',
    title:   'Source of the Nile',
    location:'Jinja, Uganda',
    size: 'normal',
  },

  // ── Culture ──
  {
    id: 'p9', type: 'photo', category: 'Culture',
    src:      'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1000&q=85',
    title:   'Kampala City Life',
    location:'Kampala, Uganda',
    size: 'wide',
  },
  {
    id: 'p10', type: 'photo', category: 'Culture',
    src:      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1000&q=85',
    title:   'Street Food Culture',
    location:'Kampala, Uganda',
    size: 'normal',
  },
  {
    id: 'p11', type: 'photo', category: 'Culture',
    src:      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1000&q=85',
    title:   'Nyege Nyege Festival',
    location:'Jinja, Uganda',
    size: 'normal',
  },

  // ── Adventure ──
  {
    id: 'p12', type: 'photo', category: 'Adventure',
    src:      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1000&q=85',
    title:   'Nile Kayaking',
    location:'Jinja, Uganda',
    size: 'wide',
  },
  {
    id: 'p13', type: 'photo', category: 'Adventure',
    src:      'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1000&q=85',
    title:   'Marathon at Entebbe',
    location:'Entebbe, Uganda',
    size: 'normal',
  },
  {
    id: 'p14', type: 'photo', category: 'Adventure',
    src:      'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1000&q=85',
    title:   'Wildlife Photography',
    location:'Queen Elizabeth Park',
    size: 'normal',
  },
]

// ─── Video Player Modal ───────────────────────────────────────────────────────
function VideoModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Close
        </button>

        {/* 16:9 YouTube embed */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={item.title}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Info */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-white font-black text-base sm:text-lg">{item.title}</h3>
            <p className="text-white/50 text-sm mt-0.5">📍 {item.location}</p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full text-white transition-opacity hover:opacity-80"
            style={{ background: '#FF0000' }}
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Photo Lightbox ───────────────────────────────────────────────────────────
function PhotoLightbox({ item, all, onClose }) {
  const photos = all.filter(m => m.type === 'photo')
  const idx    = photos.findIndex(m => m.id === item.id)
  const [current, setCurrent] = useState(idx)

  function prev() { setCurrent(i => (i - 1 + photos.length) % photos.length) }
  function next() { setCurrent(i => (i + 1) % photos.length) }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    function onKey(e) {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [current])

  const photo = photos[current]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full px-4" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button onClick={onClose}
          className="absolute -top-10 right-4 text-white/60 hover:text-white transition-colors flex items-center gap-1.5 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Close
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden" style={{ maxHeight: '75vh' }}>
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-contain"
            style={{ maxHeight: '75vh' }}
          />
        </div>

        {/* Caption */}
        <div className="mt-3 flex items-center justify-between px-1">
          <div>
            <p className="text-white font-bold text-sm">{photo.title}</p>
            <p className="text-white/40 text-xs mt-0.5">📍 {photo.location}</p>
          </div>
          <p className="text-white/30 text-xs">{current + 1} / {photos.length}</p>
        </div>

        {/* Arrows */}
        <button onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110 ml-1 sm:-ml-5"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110 mr-1 sm:-mr-5"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Media Card ───────────────────────────────────────────────────────────────
function MediaCard({ item, onOpen, delay }) {
  const [ref, inView] = useInView()
  const isVideo = item.type === 'video'

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'none' : 'translateY(20px) scale(0.98)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        aspectRatio: item.size === 'wide' ? '16/9' : item.size === 'tall' ? '3/4' : '1/1',
      }}
      onClick={() => onOpen(item)}
    >
      {/* Thumbnail */}
      <img
        src={isVideo ? item.thumb : item.src}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)', opacity: 0.7 }}
      />

      {/* Video play button */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <svg className="w-6 h-6 ml-1" fill="#E8731A" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Video duration badge */}
      {isVideo && (
        <div
          className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-md text-white"
          style={{ background: 'rgba(0,0,0,0.75)' }}
        >
          {item.duration}
        </div>
      )}

      {/* Video badge */}
      {isVideo && (
        <div
          className="absolute top-3 left-3 text-[10px] font-black px-2 py-1 rounded-md text-white flex items-center gap-1"
          style={{ background: '#FF0000' }}
        >
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
          </svg>
          YouTube
        </div>
      )}

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <p className="text-white font-bold text-xs sm:text-sm leading-snug line-clamp-1">
          {item.title}
        </p>
        <p className="text-white/60 text-[10px] sm:text-xs mt-0.5">
          📍 {item.location}
        </p>
      </div>

      {/* Hover zoom icon */}
      {!isVideo && (
        <div
          className="absolute top-3 right-3 w-7 h-7 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
          style={{ background: 'rgba(255,255,255,0.9)' }}
        >
          <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
          </svg>
        </div>
      )}
    </div>
  )
}

// ─── Main Gallery Page ────────────────────────────────────────────────────────
export default function Gallery() {
  const [loaded,    setLoaded]    = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [lightbox,  setLightbox]  = useState(null) // photo lightbox
  const [videoModal, setVideoModal] = useState(null) // video modal

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  const filtered = activeTab === 'All'
    ? MEDIA
    : MEDIA.filter(m => m.category === activeTab)

  function openItem(item) {
    if (item.type === 'video') setVideoModal(item)
    else setLightbox(item)
  }

  const videos = MEDIA.filter(m => m.type === 'video')
  const photos = filtered.filter(m => m.type === 'photo')

  return (
    <div className="min-h-screen bg-white">

      {/* ── PAGE HEADER ── */}
      <div
        className="py-16 sm:py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #0d1f25 0%, #1a3a47 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(16px)', transition: 'all 0.6s ease 0.05s' }}>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(232,115,26,0.25)', color: '#fbb97a' }}
            >
              Media Gallery
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(24px)', transition: 'all 0.7s ease 0.15s' }}
          >
            Uganda Through Our Lens
          </h1>
          <p
            className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(18px)', transition: 'all 0.7s ease 0.25s' }}
          >
            Photos and videos from across the Pearl of Africa — wildlife, landscapes,
            culture and adventure.
          </p>
        </div>
      </div>

      {/* ── FEATURED VIDEOS ROW ── */}
      <section className="py-10 sm:py-14 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: '#FF0000' }}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">Featured Videos</h2>
            </div>
            <p className="text-gray-400 text-sm mt-1.5 ml-11">
              Watch Uganda come alive — click any video to play
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 100}>
                <div
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{ aspectRatio: '16/9' }}
                  onClick={() => setVideoModal(v)}
                >
                  <img src={v.thumb} alt={v.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />

                  {/* YouTube badge */}
                  <div
                    className="absolute top-3 left-3 text-[10px] font-black px-2 py-1 rounded-md text-white flex items-center gap-1"
                    style={{ background: '#FF0000' }}
                  >
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                    </svg>
                    YouTube
                  </div>

                  {/* Duration */}
                  <div
                    className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-md text-white"
                    style={{ background: 'rgba(0,0,0,0.7)' }}
                  >
                    {v.duration}
                  </div>

                  {/* Play */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                    >
                      <svg className="w-5 h-5 ml-0.5" fill="#E8731A" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-sm leading-snug">{v.title}</p>
                    <p className="text-white/50 text-xs mt-0.5">📍 {v.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4">

          {/* Header + filter tabs */}
          <Reveal className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">Photo Gallery</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {filtered.filter(m => m.type === 'photo').length} photos · Click to view full size
                </p>
              </div>

              {/* Category tabs — scrollable on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {CATEGORIES.filter(c => c !== 'Video').map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className="flex-shrink-0 text-xs font-bold px-3.5 py-2 rounded-full transition-all"
                    style={{
                      background: activeTab === cat ? '#E8731A' : '#f3f4f6',
                      color:      activeTab === cat ? 'white'   : '#6b7280',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Masonry-style grid */}
          {photos.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">🖼️</p>
              <p className="text-sm">No photos in this category yet.</p>
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
              {photos.map((item, i) => (
                <div
                  key={item.id}
                  className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"
                  onClick={() => setLightbox(item)}
                  style={{
                    opacity:    1,
                    transition: `opacity 0.5s ease ${i * 40}ms`,
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      aspectRatio: item.size === 'wide' ? '4/3' : item.size === 'tall' ? '3/4' : '1/1',
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }}
                  >
                    <p className="text-white font-bold text-xs leading-snug">{item.title}</p>
                    <p className="text-white/60 text-[10px]">📍 {item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 sm:py-16 border-t border-gray-100" style={{ background: '#fafafa' }}>
        <Reveal>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">
              Experience Uganda in person
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              These photos and videos are just a glimpse. The real Uganda is waiting for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/tours"
                className="font-bold text-white px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
                style={{ background: '#E8731A' }}
              >
                Explore Tours
              </Link>
              <Link
                to="/about"
                className="font-bold px-7 py-3.5 rounded-full border-2 hover:bg-white transition-colors text-sm"
                style={{ borderColor: '#2A6B7C', color: '#2A6B7C' }}
              >
                About Us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Modals ── */}
      {videoModal && <VideoModal item={videoModal} onClose={() => setVideoModal(null)} />}
      {lightbox   && <PhotoLightbox item={lightbox} all={MEDIA} onClose={() => setLightbox(null)} />}

    </div>
  )
}