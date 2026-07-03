const ROW_ONE = [
  { name: 'Booking.com',        logo: '/partners/aout.png',     color: '#003580' },
  { name: 'TripAdvisor',        logo: 'https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg',               color: '#00aa6c' },
  { name: 'Airbnb',             logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',                                     color: '#FF5A5F' },
  { name: 'Expedia',            logo: '/partners/ewaffe.png',   color: '#FFC72C' },
  { name: 'Lonely Planet',      logo: '/partners/exug.png', color: '#006AFF' },
  { name: 'GetYourGuide',       logo: '/partners/kit.png',                                                       color: '#FF5533' },
  { name: 'Viator',             logo: '/partners/mint.png',               color: '#5E2D91' },
  { name: 'Kenya Airways',      logo: '/partners/poat.png', color: '#C8102E' },
]

const ROW_TWO = [
  { name: 'Emirates',           logo: '/partners/poat.png',            color: '#CC0001' },
  { name: 'Qatar Airways',      logo: '/partners/tugata1.png',  color: '#5C0632' },
  { name: 'Mastercard',         logo: '/partners/uta.png',        color: '#EB001B' },
  { name: 'Visa',               logo: '/partners/utb.png',          color: '#1A1F71' },
  { name: 'PayPal',             logo: '/partners/uwa1.png',                          color: '#003087' },
  { name: 'WWF',                logo: '/partners/aout.png',                      color: '#000000' },
  { name: 'Hilton',             logo: '/partners/ewaffe.png',                color: '#154E9C' },
  { name: 'Marriott',           logo: '/partners/exug.png', color: '#A51223' },
]

// ─── Logo Card ────────────────────────────────────────────────────────────────
function LogoCard({ partner }) {
  const initials = partner.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className="flex items-center justify-center bg-white rounded-2xl px-5 flex-shrink-0 group hover:shadow-lg transition-all duration-300 cursor-default"
      style={{ minWidth: '150px', height: '68px', border: '1px solid #efefef' }}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        loading="lazy"
        className="max-h-8 max-w-[110px] object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        onError={e => {
          e.target.style.display = 'none'
          const fallback = e.target.parentNode.querySelector('.logo-fallback')
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      <div
        className="logo-fallback items-center justify-center rounded-xl w-10 h-10 text-white text-sm font-black flex-shrink-0"
        style={{ display: 'none', background: partner.color || '#2A6B7C' }}
      >
        {initials}
      </div>
      <span
        className="logo-fallback-name text-xs font-bold text-gray-600 ml-2 hidden"
      >
        {partner.name}
      </span>
    </div>
  )
}

// ─── Marquee Row ──────────────────────────────────────────────────────────────
function MarqueeRow({ items, direction = 'left' }) {
  const triple   = [...items, ...items, ...items]
  const duration = items.length * 4
  const animName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight'

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        className="flex items-center gap-5 w-max"
        style={{
          animation: `${animName} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {triple.map((partner, i) => (
          <LogoCard key={i} partner={partner} />
        ))}
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function PartnersMarquee() {
  return (
    <section className="py-14 bg-gray-50" style={{ overflow: 'hidden' }}>
      <style>{`
        @keyframes marqueeLeft {
          0%   { transform: translateX(0);        }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0);        }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#E8731A' }}>
          Trusted by
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">
          Our Partners & Friends
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
          We work with the world's leading travel brands.
        </p>
      </div>

      <div className="mb-4">
        <MarqueeRow items={ROW_ONE} direction="left" />
      </div>

      <MarqueeRow items={ROW_TWO} direction="right" />

      <div className="text-center mt-10">
        <p className="text-gray-400 text-sm mb-3">Want to partner with us?</p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-all hover:shadow-md"
          style={{ borderColor: '#2A6B7C', color: '#2A6B7C' }}
        >
          Get in touch →
        </a>
      </div>
    </section>
  )
}