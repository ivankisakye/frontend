import { useState } from 'react'

// ─── Config ───────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '256758770888'
const WHATSAPP_DEFAULT_MESSAGE = 'Hello! I found you on ShowMeUganda.org and I would like to enquire about your tours and services.'

// ─── Quick reply options ──────────────────────────────────────────────────────
const QUICK_REPLIES = [
  { label: '🦍 Book a Gorilla Trek',    message: 'Hi! I\'d like to book a gorilla trekking tour. Can you help me?'          },
  { label: '🏨 Find a Hotel',           message: 'Hi! I\'m looking for hotel accommodation in Uganda. Can you assist me?'    },
  { label: '🚐 Plan a Safari',          message: 'Hi! I want to plan a safari in Uganda. What packages do you offer?'        },
  { label: '📅 Check Availability',     message: 'Hi! I\'d like to check availability for a tour. Can you help me?'          },
  { label: '💰 Get a Price Quote',      message: 'Hi! Can I get a price quote for a Uganda tour package?'                    },
  { label: '🎉 Enquire About an Event', message: 'Hi! I saw an event on ShowMeUganda.org and I\'d like more information.'    },
  { label: '📍 List My Business',       message: 'Hi! I\'d like to list my tourism business on ShowMeUganda. How do I start?'},
  { label: '✈️ Custom Itinerary',       message: 'Hi! I\'d like a custom Uganda travel itinerary built for me.'              },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isBusinessHours() {
  const now  = new Date()
  const hour = now.getUTCHours() + 3
  const day  = now.getDay()
  return day >= 1 && day <= 5 && hour >= 8 && hour < 18
}

function buildWhatsAppURL(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}




// ─── Floating Chat Button ─────────────────────────────────────────────────────
export function WhatsAppFloat() {
  const [open,    setOpen]    = useState(false)
  const [message, setMessage] = useState(WHATSAPP_DEFAULT_MESSAGE)
  const online = isBusinessHours()

  function sendMessage(msg) {
    window.open(buildWhatsAppURL(msg || message), '_blank')
  }

  return (
    <>
      <style>{`
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        .gentle-bounce { animation: gentleBounce 2.8s ease-in-out infinite; }

        .glass-popup {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .glass-input {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: white;
        }
        .glass-input::placeholder { color: rgba(255,255,255,0.5); }
        .glass-input:focus { outline: none; border-color: rgba(255,255,255,0.5); }
        .glass-chip {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          color: white;
          transition: all 0.2s;
        }
        .glass-chip:hover {
          background: rgba(255,255,255,0.25);
        }
      `}</style>

      {/* ── Glassmorphism popup ── */}
      {open && (
        <div
          className="glass-popup fixed bottom-24 left-4 sm:left-6 z-50 w-72 rounded-3xl overflow-hidden"
          style={{
            boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            background: 'linear-gradient(135deg, rgba(42,107,124,0.85) 0%, rgba(26,74,86,0.92) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {/* ── Header ── */}
          <div className="px-4 pt-4 pb-3 flex items-center gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                🦍
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                style={{
                  borderColor: 'rgba(42,107,124,0.9)',
                  background: online ? '#4ade80' : '#9ca3af',
                }}
              />
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="font-black text-white text-sm leading-none">ShowMeUganda</p>
              <p className="text-white/60 text-[10px] mt-0.5">
                {online ? '● Online now' : '● Away'}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
            >
              <svg className="w-3.5 h-3.5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Thin divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />

          {/* ── Message bubble ── */}
          <div className="px-4 py-3">
            <div
              className="rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs text-white/90 leading-relaxed"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              👋 Hi! How can we help you explore Uganda today?
            </div>
            <p className="text-white/30 text-[9px] mt-1 ml-1">
              {new Date().toLocaleTimeString('en-UG', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {/* ── Quick chips ── */}
          <div className="px-4 pb-3 flex flex-wrap gap-1.5">
            {QUICK_REPLIES.slice(0, 4).map((qr, i) => (
              <button
                key={i}
                onClick={() => sendMessage(qr.message)}
                className="glass-chip text-[10px] font-semibold px-2.5 py-1 rounded-full"
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Thin divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

          {/* ── Input row ── */}
          <div className="px-3 py-3 flex items-end gap-2">
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={2}
              placeholder="Type a message..."
              className="glass-input flex-1 rounded-2xl px-3 py-2 text-xs resize-none leading-relaxed"
            />
            <button
              onClick={() => sendMessage()}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 hover:scale-105 active:scale-95 transition-transform"
              style={{ background: '#E8731A', boxShadow: '0 4px 12px rgba(232,115,26,0.4)' }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>

          {/* ── Footer ── */}
          <div className="px-4 pb-3 text-center">
            <p className="text-white/25 text-[9px] tracking-wide uppercase">
              ShowMeUganda · Chat Support
            </p>
          </div>
        </div>
      )}

      {/* ── Floating button ── */}
      <div className="fixed bottom-5 left-4 sm:left-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${!open ? 'gentle-bounce' : ''}`}
          style={{
            background: open
              ? '#E8731A'
              : 'linear-gradient(135deg, #2A6B7C, #1a4a56)',
            boxShadow: open
              ? '0 6px 24px rgba(232,115,26,0.45)'
              : '0 6px 24px rgba(42,107,124,0.45)',
          }}
          aria-label="Chat with us"
        >
          {open ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          )}
        </button>

        {!open && (
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-white px-2.5 py-1 rounded-full pointer-events-none"
            style={{ background: '#2A6B7C' }}
          >
            Chat with us
          </div>
        )}
      </div>
    </>
  )
}






// ─── Full WhatsApp Page ───────────────────────────────────────────────────────
export default function WhatsApp() {
  const [message,  setMessage]  = useState(WHATSAPP_DEFAULT_MESSAGE)
  const [selected, setSelected] = useState(null)
  const online = isBusinessHours()

  function sendMessage(msg) {
    window.open(buildWhatsAppURL(msg || message), '_blank')
  }

  function selectQuick(i) {
    setSelected(i)
    setMessage(QUICK_REPLIES[i].message)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div
        className="relative text-white py-16 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg"
            style={{ background: '#25D366' }}
          >
            💬
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
            Chat with us on <span style={{ color: '#25D366' }}>WhatsApp</span>
          </h1>
          <p className="text-white/70 max-w-md mx-auto text-sm leading-relaxed">
            Get instant answers about tours, hotels, events, and anything Uganda.
            Our team is ready to help you plan the perfect trip.
          </p>
          <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-white/15 text-sm font-semibold">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: online ? '#4ade80' : '#9ca3af' }} />
            {online ? "We're online · Replies within minutes" : 'Currently offline · Replies within a few hours'}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

        {/* Quick reply grid */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-black text-gray-900 text-lg mb-1">What do you need help with?</h2>
          <p className="text-gray-500 text-sm mb-5">Tap a topic to pre-fill your message, or write your own below.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_REPLIES.map((qr, i) => (
              <button
                key={i}
                onClick={() => selectQuick(i)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-all hover:shadow-md"
                style={{
                  borderColor: selected === i ? '#25D366' : '#e5e7eb',
                  background:  selected === i ? '#f0fdf4' : '#fff',
                  color:       selected === i ? '#15803d' : '#374151',
                }}
              >
                <span className="text-xl flex-shrink-0">{qr.label.split(' ')[0]}</span>
                <span className="text-sm font-semibold leading-snug">
                  {qr.label.split(' ').slice(1).join(' ')}
                </span>
                {selected === i && (
                  <svg className="w-4 h-4 ml-auto flex-shrink-0" fill="none" stroke="#25D366" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message + send */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-black text-gray-900 text-lg mb-1">Your message</h2>
          <p className="text-gray-500 text-sm mb-4">Edit the message below then click Send on WhatsApp.</p>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none resize-none leading-relaxed mb-4"
            style={{ background: '#f8f8f8' }}
            onFocus={e => e.target.style.borderColor = '#25D366'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!message.trim()}
            className="w-full flex items-center justify-center gap-3 font-black text-white py-4 rounded-2xl hover:opacity-90 disabled:opacity-40 shadow-lg text-sm transition-opacity"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 8px 24px rgba(37,211,102,0.35)' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Open WhatsApp & Send
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            Opens WhatsApp with your message pre-filled. Works on mobile & desktop.
          </p>
        </div>

        {/* Other contact */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-black text-gray-900 text-base mb-4">Other ways to reach us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '📞', label: 'Call us',   value: '+256 758 770 888',       href: 'tel:+256758770888'                        },
              { icon: '📧', label: 'Email us',  value: 'info@showmeuganda.org',  href: 'mailto:info@showmeuganda.org'             },
              { icon: '📍', label: 'Visit us',  value: 'Kampala, Uganda',        href: 'https://maps.google.com/?q=Kampala,Uganda'},
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.icon === '📍' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'rgba(37,211,102,0.1)' }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.label}</div>
                  <div className="text-sm font-semibold text-gray-800 truncate group-hover:text-green-700 transition-colors">
                    {item.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Office hours */}
        <div className="rounded-3xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #075E54, #128C7E)' }}>
          <h3 className="font-black text-lg mb-4">🕒 Office Hours</h3>
          <div className="space-y-2">
            {[
              { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM EAT', active: true  },
              { day: 'Saturday',        hours: '9:00 AM – 1:00 PM EAT', active: false },
              { day: 'Sunday',          hours: 'Closed',                 active: false },
            ].map(item => (
              <div key={item.day} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <span className="text-white/80 text-sm">{item.day}</span>
                <span
                  className="text-sm font-bold px-3 py-1 rounded-full"
                  style={{
                    background: item.active ? 'rgba(74,222,128,0.25)' : 'rgba(255,255,255,0.1)',
                    color:      item.active ? '#4ade80' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {item.hours}
                </span>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-xs mt-4">
            All times in East Africa Time (EAT, UTC+3). We reply outside office hours too — just give us a bit longer.
          </p>
        </div>

      </div>
    </div>
  )
}