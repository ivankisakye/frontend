import { useState } from 'react'

// ─── Brand ───────────────────────────────────────────────────────────────────
// Teal:   #2A6B7C
// Orange: #E8731A

const SUBJECTS = [
  'General enquiry',
  'List my business / hotel',
  'Tour operator partnership',
  'Media & press enquiry',
  'Advertising & sponsorship',
  'Report an issue',
  'Other',
]

const FAQS = [
  {
    q: 'How long does it take to get a response?',
    a: 'We aim to respond within 24 hours on business days (Mon–Fri, 8am–6pm EAT).',
  },
  {
    q: 'How do I list my tour or hotel?',
    a: 'Use the contact form above and choose "List my business / hotel" from the subject dropdown. We\'ll send you our listing pack.',
  },
  {
    q: 'Do you offer a media kit?',
    a: 'Yes — reach out via the form selecting "Media & press enquiry" and we\'ll send our media kit and pitch guidelines directly.',
  },
  {
    q: 'Can I advertise on ShowMeUganda?',
    a: 'Absolutely. Select "Advertising & sponsorship" in the form and our partnerships team will follow up with rate cards.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3.5 text-left gap-3"
      >
        <span className="text-sm font-semibold text-gray-800">{q}</span>
        <span
          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform duration-300"
          style={{ background: '#E8731A', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      {open && (
        <p className="text-sm text-gray-500 leading-relaxed pb-4 pr-8">{a}</p>
      )}
    </div>
  )
}

function InputField({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

const focusStyle = {
  onFocus: e => {
    e.target.style.borderColor = '#E8731A'
    e.target.style.boxShadow = '0 0 0 3px rgba(232,115,26,0.12)'
  },
  onBlur: e => {
    e.target.style.borderColor = '#e5e7eb'
    e.target.style.boxShadow = 'none'
  },
}

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400'

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSent(true)
      setSending(false)
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ─── HERO ─────────────────────────────────────────────────────────────
          Transparent navbar sits on top (~64px tall).
          pt-32 on mobile, pt-40 on desktop gives breathing room beneath it.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: '#0d1f24' }}
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1400&q=80"
          alt="Kampala Uganda"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />

        {/* Decorative teal glow */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: '#2A6B7C' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 pt-36 sm:pt-44 pb-16 sm:pb-20">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: 'rgba(232,115,26,0.18)', color: '#E8731A' }}
          >
            ✦ Get In Touch
          </span>
          <h1
            className="font-black text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
          >
            We'd love to<br />hear from you
          </h1>
          <p className="text-gray-400 max-w-lg leading-relaxed text-sm sm:text-base">
            Travelers, tour operators, hotels, and media partners — our inbox
            is always open. Expect a reply within 24 hours.
          </p>

          {/* Quick-stat strip */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { n: '< 24h', label: 'Response time' },
              { n: 'Mon–Fri', label: '8am – 6pm EAT' },
              { n: '100%', label: 'Free to list' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-white font-black text-lg">{s.n}</div>
                <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* ── LEFT SIDEBAR (2 cols) ───────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Contact details */}
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-1">Reach us directly</h2>
              <div className="w-8 h-0.5 mb-5" style={{ background: '#E8731A' }} />
              <div className="space-y-5">
                {[
                  { icon: '📍', label: 'Location', value: ' Workers House Level 9 | South Wing' },
                  { icon: '📧', label: 'Email',    value: 'info@showmeuganda.com',  href: 'mailto:info@showmeuganda.org' },
                  { icon: '📞', label: 'Phone',    value: '+256 758 770 888',       href: 'tel:+256758770888' },
                  { icon: '🕒', label: 'Hours',    value: 'Mon – Fri, 8am – 6pm EAT' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: 'rgba(232,115,26,0.1)' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-semibold text-gray-800 hover:underline mt-0.5 block"
                          style={{ color: '#1a1a1a' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#E8731A'}
                          onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Follow us</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Instagram', icon: '📸', href: '#' },
                  { label: 'Facebook',  icon: '📘', href: '#' },
                  { label: 'X / Twitter', icon: '🐦', href: '#' },
                  { label: 'YouTube',   icon: '▶️', href: '#' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-orange-300 transition-colors"
                    onMouseEnter={e => e.currentTarget.style.color = '#E8731A'}
                    onMouseLeave={e => e.currentTarget.style.color = ''}
                  >
                    <span>{s.icon}</span> {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Media kit */}
            <div
              className="rounded-2xl p-5"
              style={{ background: '#f0f9f5', border: '1px solid #d1ede3' }}
            >
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#2A6B7C' }}>
                🎤 Press & Media
              </p>
              <h4 className="font-black text-gray-900 text-base mb-1.5">
                Media kit & pitch guidelines
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">
                Journalists and content creators can request our media kit,
                brand assets, and editorial pitch guidelines via the contact form.
                Select <strong>"Media &amp; press enquiry"</strong> in the subject field.
              </p>
              <a
                href="mailto:press@showmeuganda.com"
                className="text-xs font-bold"
                style={{ color: '#2A6B7C' }}
              >
                press@showmeuganda.org →
              </a>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-black text-gray-900 text-base mb-4">Quick answers</h3>
              <div className="rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden px-4">
                {FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}
              </div>
            </div>
          </div>

          {/* ── RIGHT: CONTACT FORM (3 cols) ──────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">

              {sent ? (
                <div className="text-center py-16">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"
                    style={{ background: 'rgba(232,115,26,0.1)' }}
                  >
                    🎉
                  </div>
                  <h3 className="font-black text-gray-900 text-xl mb-2">Message sent!</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                    Thanks for reaching out. Our team will reply within 24 hours
                    on business days.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false)
                      setForm({ name: '', email: '', subject: '', message: '', newsletter: false })
                    }}
                    className="mt-6 text-sm font-bold underline"
                    style={{ color: '#E8731A' }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-black text-gray-900 text-xl">Send a message</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Fill in the form and we'll get back to you shortly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="Your Name">
                        <input
                          type="text"
                          value={form.name}
                          onChange={e => set('name', e.target.value)}
                          required
                          placeholder="Jane Nakato"
                          className={inputClass}
                          {...focusStyle}
                        />
                      </InputField>
                      <InputField label="Email Address">
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => set('email', e.target.value)}
                          required
                          placeholder="jane@example.com"
                          className={inputClass}
                          {...focusStyle}
                        />
                      </InputField>
                    </div>

                    {/* Subject dropdown */}
                    <InputField label="Subject">
                      <select
                        value={form.subject}
                        onChange={e => set('subject', e.target.value)}
                        required
                        className={inputClass}
                        style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236b7280'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', backgroundSize: '18px', cursor: 'pointer' }}
                        {...focusStyle}
                      >
                        <option value="" disabled>Choose a topic…</option>
                        {SUBJECTS.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </InputField>

                    {/* Message */}
                    <InputField label="Message">
                      <textarea
                        rows={6}
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        required
                        placeholder="Tell us what's on your mind…"
                        className={inputClass + ' resize-none'}
                        {...focusStyle}
                      />
                    </InputField>

                    {/* Newsletter opt-in */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={form.newsletter}
                          onChange={e => set('newsletter', e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className="w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
                          style={{
                            background: form.newsletter ? '#E8731A' : 'white',
                            borderColor: form.newsletter ? '#E8731A' : '#d1d5db',
                          }}
                        >
                          {form.newsletter && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 leading-relaxed">
                        Subscribe to our newsletter — Uganda travel guides, event alerts,
                        and destination inspiration, monthly in your inbox.
                      </span>
                    </label>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="relative w-full group overflow-hidden rounded-xl text-white font-bold py-3.5 text-sm transition-all duration-300 hover:shadow-lg disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #E8731A 0%, #f59e0b 100%)' }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {sending ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                            Sending…
                          </>
                        ) : 'Send Message →'}
                      </span>
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      We typically respond within 24 hours · No spam, ever
                    </p>

                  </form>
                </>
              )}
            </div>

            {/* Popular pages strip */}
            <div className="mt-6 rounded-2xl border border-gray-100 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Popular right now
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Gorilla Trekking', href: '/tours', emoji: '🦍' },
                  { label: 'Jinja Adventures', href: '/tours', emoji: '🚣' },
                  { label: 'Luxury Lodges',    href: '/directory', emoji: '🏨' },
                  { label: 'Kampala Guide',    href: '/tours', emoji: '🌆' },
                  { label: 'Safari Packages',  href: '/tours', emoji: '🐘' },
                  { label: 'List a Business',  href: '/contact', emoji: '📋' },
                ].map(p => (
                  <a
                    key={p.label}
                    href={p.href}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 px-3 py-2.5 rounded-xl border border-gray-100 hover:border-orange-200 bg-white transition-colors"
                    onMouseEnter={e => e.currentTarget.style.color = '#E8731A'}
                    onMouseLeave={e => e.currentTarget.style.color = ''}
                  >
                    <span>{p.emoji}</span> {p.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── MAP SECTION ───────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-14">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-gray-900">Find us in Kampala</h3>
              <p className="text-gray-500 text-sm mt-1">Workers House Level 9 | South Wing | Kampala </p>
            </div>
            <a
              href="https://maps.app.goo.gl/Ee1FVssDBS4dnZZi8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold group self-start sm:self-auto"
              style={{ color: '#E8731A' }}
            >
              <span>Open in Google Maps</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>

          {/* Live Google Maps embed */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: '360px' }}>
            <iframe
              title="ShowMeUganda — Kampala Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.758481879105!2d32.58008087496458!3d0.3137991996831212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbdcdff9015f5%3A0x4c5db19ba710cac5!2sWorkers%20house!5e0!3m2!1sen!2sug!4v1784187756630!5m2!1sen!2sug" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"          
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info row below map */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {[
              { icon: '🚗', title: 'By car', desc: '5 min from Nakasero Road. Free parking available.' },
              { icon: '🚕', title: 'By boda / taxi', desc: 'Ask for the ShowMeUganda offices, Kampala CBD.' },
              { icon: '✈️', title: 'From Entebbe Airport', desc: 'Approx 45 min via Entebbe Expressway.' },
            ].map(d => (
              <div key={d.title} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: 'rgba(42,107,124,0.1)' }}
                >
                  {d.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">{d.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}