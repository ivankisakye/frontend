import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PILLARS = [
  { icon: '📸', title: 'Visual Storytelling', desc: 'We capture Uganda through powerful imagery and documentary-style content that reveals the real texture of this extraordinary country.' },
  { icon: '🧭', title: 'Curated Experiences', desc: 'Every tour, hotel and destination we feature is handpicked and verified by people who know Uganda deeply.' },
  { icon: '🌿', title: 'Conservation First',  desc: "We partner with conservation organisations to ensure Uganda's wildlife and natural heritage are celebrated and protected." },
  { icon: '🤝', title: 'Community Impact',    desc: 'We work with local creatives, journalists and communities so that tourism growth benefits the people who call Uganda home.' },
]

const WHO_WE_SERVE = [
  { icon: '✈️', label: 'The Traveler'         },
  { icon: '📖', label: 'The Storyteller'      },
  { icon: '🔭', label: 'Curious Explorers'    },
  { icon: '🏕️', label: 'Tour Operators'       },
  { icon: '🌍', label: 'Conservation Bodies'  },
  { icon: '🏛️', label: 'Tourism Government'   },
]

const PHOTOS = [
  'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
  'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=600&q=80',
  'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80',
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* ── PAGE HEADER ── */}
      <div
        className="py-16 sm:py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #0d1f25 0%, #1a3a47 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div
            style={{
              opacity:    loaded ? 1 : 0,
              transform:  loaded ? 'none' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.05s, transform 0.7s ease 0.05s',
            }}
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(232,115,26,0.25)', color: '#fbb97a' }}
            >
              About Us
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 px-2"
            style={{
              opacity:    loaded ? 1 : 0,
              transform:  loaded ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.75s ease 0.15s, transform 0.75s ease 0.15s',
            }}
          >
            Showing Uganda to the World
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{
              opacity:    loaded ? 1 : 0,
              transform:  loaded ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.75s ease 0.28s, transform 0.75s ease 0.28s',
            }}
          >
            A destination marketing platform dedicated to capturing, curating and
            sharing the true essence of Uganda.
          </p>
        </div>
      </div>

      {/* ── WHO WE ARE ── */}
      <section className="py-14 sm:py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

            {/* Text */}
            <Reveal>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: '#E8731A' }}
              >
                Who We Are
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-5">
                Beyond the postcard.<br />
                <span style={{ color: '#2A6B7C' }}>Beyond the cliché.</span>
              </h2>
              <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
                <p>
                  Show Me Uganda is a destination marketing platform dedicated to
                  capturing, curating and sharing the true essence of Uganda with
                  the world. We exist to go beyond the ordinary — to uncover the
                  people, places, cultures and experiences that define Uganda's identity.
                </p>
                <p>
                  At our core, we believe Uganda is a place to experience, to understand
                  and to feel. Through powerful storytelling, visual content and curated
                  travel insights, we position Uganda as a destination of depth and
                  authenticity.
                </p>
                <p>
                  We work with creatives, journalists, tour operators, communities,
                  conservation organizations and tourism government bodies to showcase
                  experiences that matter — driving visibility, inspiring more travelers
                  and contributing to the growth of Uganda's tourism ecosystem.
                </p>
              </div>
            </Reveal>

            {/* Image */}
            <Reveal delay={120}>
              <div
                className="rounded-2xl sm:rounded-3xl overflow-hidden w-full"
                style={{ height: '320px', maxHeight: '420px' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80"
                  alt="Uganda gorillas"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section
        className="py-14 sm:py-16 md:py-20 border-b border-gray-100"
        style={{ background: '#fafafa' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: '#E8731A' }}
            >
              Our Mission
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 leading-snug mb-6 px-2">
              Show Me Uganda is built for the traveler, the storyteller, and the
              curious explorer — for{' '}
              <span style={{ color: '#2A6B7C' }}>
                anyone ready to discover Uganda, differently.
              </span>
            </h2>
            <div
              className="w-14 h-1 rounded-full mx-auto"
              style={{ background: '#E8731A' }}
            />
          </Reveal>
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section className="py-14 sm:py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal className="mb-8 sm:mb-10">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: '#E8731A' }}
            >
              What We Stand For
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Our four pillars
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {PILLARS.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300 bg-white h-full">
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0"
                    style={{
                      background: i % 2 === 0
                        ? 'rgba(232,115,26,0.08)'
                        : 'rgba(42,107,124,0.08)',
                    }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section
        className="py-14 sm:py-16 md:py-20 border-b border-gray-100"
        style={{ background: '#fafafa' }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <Reveal className="mb-8 sm:mb-10">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: '#E8731A' }}
            >
              Built For
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Everyone who loves Uganda
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {WHO_WE_SERVE.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-gray-100 bg-white text-center hover:shadow-sm transition-shadow h-full">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-semibold text-gray-700 leading-tight">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <section className="overflow-hidden">

        {/* Desktop — 5 images side by side */}
        <div className="hidden sm:flex">
          {PHOTOS.map((src, i) => (
            <div key={i} className="flex-1 min-w-0" style={{ height: '200px' }}>
              <img
                src={src}
                alt={`Uganda ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        {/* Mobile — horizontal scroll */}
        <div
          className="sm:hidden flex overflow-x-auto scrollbar-hide gap-2 px-4 py-2"
        >
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-xl overflow-hidden"
              style={{ width: '68vw', height: '160px' }}
            >
              <img
                src={src}
                alt={`Uganda ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
              Ready to discover Uganda?
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Browse curated tours, find the finest hotels, and let us show you
              a Uganda you have never seen before.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/tours"
                className="font-bold text-white px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
                style={{ background: '#E8731A' }}
              >
                Explore Tours
              </Link>
              <Link
                to="/contact"
                className="font-bold px-8 py-3.5 rounded-full border-2 hover:bg-gray-50 transition-colors text-sm"
                style={{ borderColor: '#2A6B7C', color: '#2A6B7C' }}
              >
                Get In Touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}