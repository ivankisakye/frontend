import { Link } from 'react-router-dom'

const TEAL   = '#2A6B7C'
const ORANGE = '#E8731A'

// ─── Team data — hierarchical (CEO first, then heads, then team) ──────────────
const LEADERSHIP = [
  {
    name:   'Gabriel Ssemakula',
    role:   'Founder & Chief Executive Officer',
    bio:    'A visionary Ugandan entrepreneur with over a decade of experience in tourism and digital media. Gabriel founded ShowMeUganda with one mission — to put Uganda on the global tourism map and share the Pearl of Africa with the world.',
    image:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    color:  TEAL,
    social: { linkedin: '#', twitter: '#' },
    fact:   'Has personally visited every national park in Uganda',
    tier:   'ceo',
  },
]

const HEADS = [
  {
    name:   'Patience Nakato',
    role:   'Head of Content & Editorial',
    bio:    'Patience leads the editorial team with journalism expertise from Makerere University. She crafts compelling destination stories that inspire travelers to explore Uganda\'s rich culture and wildlife.',
    image:  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
    color:  '#10B981',
    social: { linkedin: '#', twitter: '#' },
    fact:   'Spent 3 days tracking gorillas in Bwindi for a feature story',
  },
  {
    name:   'Frank Mutebi',
    role:   'Head of Partnerships',
    bio:    'Frank drives strategic relationships with hotels, tour operators, and Uganda Tourism Board. His 8 years of hospitality experience make him the bridge between ShowMeUganda and Uganda\'s tourism industry.',
    image:  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    color:  '#8B5CF6',
    social: { linkedin: '#', twitter: '#' },
    fact:   'Can identify every bird species in Queen Elizabeth Park',
  },
  {
    name:   'Ronald Tumusiime',
    role:   'Head of Technology',
    bio:    'Ronald architects the digital platform powering ShowMeUganda. A passionate Ugandan software engineer who believes technology should make Uganda\'s tourism accessible to every traveler on earth.',
    image:  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    color:  '#F59E0B',
    social: { linkedin: '#', twitter: '#' },
    fact:   'Built his first website at 14 years old in Mbarara',
  },
]

const TEAM = [
  {
    name:   'Smile Achieng',
    role:   'Digital Marketing Manager',
    image:  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    color:  ORANGE,
    social: { linkedin: '#' },
  },
  {
    name:   'Harriet Nambooze',
    role:   'Business Listings Manager',
    image:  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80',
    color:  '#E1306C',
    social: { linkedin: '#' },
  },
  {
    name:   'Moses Okello',
    role:   'SEO & Growth Analyst',
    image:  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80',
    color:  '#0A66C2',
    social: { linkedin: '#' },
  },
  {
    name:   'Diana Atim',
    role:   'Community Manager',
    image:  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    color:  '#059669',
    social: { linkedin: '#' },
  },
]

const VALUES = [
  { icon: '🌍', title: 'Authenticity',   desc: 'We tell genuine stories about Uganda — the real beauty, culture, and people of the Pearl of Africa.' },
  { icon: '🤝', title: 'Partnership',    desc: 'We grow together with tourism businesses, operators, and communities across Uganda.' },
  { icon: '🌿', title: 'Sustainability', desc: 'We champion responsible tourism that protects Uganda\'s wildlife and natural heritage.' },
  { icon: '💡', title: 'Innovation',     desc: 'We use modern technology to connect travelers with Uganda\'s finest experiences.' },
]

function SocialIcon({ type }) {
  if (type === 'linkedin') return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export default function Team() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden pt-36 pb-24"
        style={{ background: 'linear-gradient(135deg, #0B1F26 0%, #1a3a44 100%)' }}>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: ORANGE }}/>
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'rgba(255,255,255,0.06)' }}/>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5"
            style={{ background: 'rgba(232,115,26,0.18)', color: ORANGE }}>
            The People Behind the Platform
          </span>
          <h1 className="font-black text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)' }}>
            Meet Our Team
          </h1>
          <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            A passionate team of Ugandans dedicated to showcasing the Pearl of Africa to the world. Every story and experience on ShowMeUganda is powered by people who love this country deeply.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20 space-y-20">

        {/* ── CEO ── */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1" style={{ background: '#e5e7eb' }}/>
            <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: `${TEAL}12`, color: TEAL }}>
              Leadership
            </span>
            <div className="h-px flex-1" style={{ background: '#e5e7eb' }}/>
          </div>

          {LEADERSHIP.map((m, i) => (
            <div key={i}
              className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row"
              style={{ background: 'white' }}>

              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl" style={{ background: `linear-gradient(to bottom, ${m.color}, ${m.color}55)` }}/>

              {/* Photo */}
              <div className="md:w-72 h-64 md:h-auto overflow-hidden flex-shrink-0">
                <img src={m.image} alt={m.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"/>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest mb-1" style={{ color: m.color }}>
                      Founder
                    </p>
                    <h2 className="font-black text-gray-900 text-2xl sm:text-3xl">{m.name}</h2>
                    <p className="text-gray-500 text-sm mt-1">{m.role}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {Object.keys(m.social).map(type => (
                      <a key={type} href={m.social[type]} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: `${m.color}12`, color: m.color }}>
                        <SocialIcon type={type}/>
                      </a>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-lg">{m.bio}</p>
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-2xl w-fit"
                  style={{ background: `${m.color}08`, border: `1px solid ${m.color}18` }}>
                  <span className="text-base">⚡</span>
                  <p className="text-xs text-gray-500 italic leading-snug">{m.fact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Department Heads ── */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1" style={{ background: '#e5e7eb' }}/>
            <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: `${ORANGE}12`, color: ORANGE }}>
              Department Heads
            </span>
            <div className="h-px flex-1" style={{ background: '#e5e7eb' }}/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HEADS.map((m, i) => (
              <div key={i}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-400 hover:-translate-y-1">
                {/* Color top bar */}
                <div className="h-1" style={{ background: `linear-gradient(90deg, ${m.color}, ${m.color}55)` }}/>
                {/* Photo */}
                <div className="h-56 overflow-hidden">
                  <img src={m.image} alt={m.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-black text-gray-900 text-base">{m.name}</h3>
                      <p className="text-xs font-bold mt-0.5" style={{ color: m.color }}>{m.role}</p>
                    </div>
                    <div className="flex gap-1.5">
                      {Object.keys(m.social).map(type => (
                        <a key={type} href={m.social[type]} target="_blank" rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                          style={{ background: `${m.color}12`, color: m.color }}>
                          <SocialIcon type={type}/>
                        </a>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3">{m.bio}</p>
                  <div className="flex items-start gap-2 px-3 py-2 rounded-xl"
                    style={{ background: `${m.color}08`, border: `1px solid ${m.color}15` }}>
                    <span className="text-xs">⚡</span>
                    <p className="text-[10px] text-gray-400 italic leading-snug">{m.fact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team Members ── */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1" style={{ background: '#e5e7eb' }}/>
            <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: '#f3f4f6', color: '#6b7280' }}>
              Our Team
            </span>
            <div className="h-px flex-1" style={{ background: '#e5e7eb' }}/>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {TEAM.map((m, i) => (
              <div key={i}
                className="group text-center bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="h-40 overflow-hidden">
                  <img src={m.image} alt={m.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"/>
                </div>
                <div className="p-4">
                  <h4 className="font-black text-gray-900 text-sm">{m.name}</h4>
                  <p className="text-[11px] mt-0.5 mb-3" style={{ color: m.color }}>{m.role}</p>
                  <div className="flex justify-center gap-1.5">
                    {Object.keys(m.social).map(type => (
                      <a key={type} href={m.social[type]} target="_blank" rel="noopener noreferrer"
                        className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: `${m.color}12`, color: m.color }}>
                        <SocialIcon type={type}/>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Values ── */}
      <div className="py-14 sm:py-16" style={{ background: '#f8f8f8' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">What Drives Us</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              The values that guide every decision we make at ShowMeUganda
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h4 className="font-black text-gray-900 mb-2">{v.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Join CTA ── */}
      <div className="py-14 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-4xl mb-5 block">🚀</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Want to join our team?</h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            We are always looking for passionate people who love Uganda and want to help showcase it to the world.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 font-bold text-white px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            style={{ background: `linear-gradient(135deg, ${TEAL}, #1a4a56)` }}>
            Get in Touch →
          </Link>
        </div>
      </div>

    </div>
  )
}