const ROW_ONE = [
  { name: 'Booking.com',        logo: 'https://cf.bstatic.com/static/img/booking_logo/21f4b08b6c7bb0a8285a3b84b2d2ef0847b4f2a5.png',                     color: '#003580' },
  { name: 'TripAdvisor',        logo: 'https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg',               color: '#00aa6c' },
  { name: 'Airbnb',             logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',                                     color: '#FF5A5F' },
  { name: 'Expedia',            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Expedia_2012_logo.svg/320px-Expedia_2012_logo.svg.png',    color: '#FFC72C' },
  { name: 'Lonely Planet',      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lonely_Planet_Logo.svg/320px-Lonely_Planet_Logo.svg.png', color: '#006AFF' },
  { name: 'GetYourGuide',       logo: 'https://cdn.getyourguide.com/tf/assets/static/logo-dark.svg',                                                       color: '#FF5533' },
  { name: 'Viator',             logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Viator_Logo.svg/320px-Viator_Logo.svg.png',               color: '#5E2D91' },
  { name: 'Kenya Airways',      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Kenya_Airways_Logo.svg/320px-Kenya_Airways_Logo.svg.png', color: '#C8102E' },
]

const ROW_TWO = [
  { name: 'Emirates',           logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/320px-Emirates_logo.svg.png',            color: '#CC0001' },
  { name: 'Qatar Airways',      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Qatar_Airways_Logo.svg/320px-Qatar_Airways_Logo.svg.png',  color: '#5C0632' },
  { name: 'Mastercard',         logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/320px-Mastercard-logo.svg.png',        color: '#EB001B' },
  { name: 'Visa',               logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/320px-Visa_Inc._logo.svg.png',          color: '#1A1F71' },
  { name: 'PayPal',             logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/320px-PayPal.svg.png',                          color: '#003087' },
  { name: 'WWF',                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/WWF_logo.svg/320px-WWF_logo.svg.png',                      color: '#000000' },
  { name: 'Hilton',             logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hilton_logo.svg/320px-Hilton_logo.svg.png',                color: '#154E9C' },
  { name: 'Marriott',           logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Marriott_International_corporate_logo.svg/320px-Marriott_International_corporate_logo.svg.png', color: '#A51223' },
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
          // On fail — show a branded initials badge instead
          e.target.style.display = 'none'
          const fallback = e.target.parentNode.querySelector('.logo-fallback')
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      {/* Branded initials fallback */}
      <div
        className="logo-fallback items-center justify-center rounded-xl w-10 h-10 text-white text-sm font-black flex-shrink-0"
        style={{ display: 'none', background: partner.color || '#2A6B7C' }}
      >
        {initials}
      </div>
      {/* Name next to initials */}
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

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#E8731A' }}>
          Trusted by
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">
          Our Partners & Friends
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
          We work with the world's leading travel brands, airlines, and
          conservation organisations to bring you the best of Uganda.
        </p>
      </div>

      {/* Row 1 — slides left */}
      <div className="mb-4">
        <MarqueeRow items={ROW_ONE} direction="left" />
      </div>

      {/* Row 2 — slides right */}
      <MarqueeRow items={ROW_TWO} direction="right" />

      {/* CTA */}
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