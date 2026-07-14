import { useState } from 'react'
import { Link } from 'react-router-dom'

const TEAL   = '#2A6B7C'
const ORANGE = '#E8731A'

const sections = [
  {
    number: '01',
    title: 'Introduction',
    content: `Welcome to Show Me Uganda.

Show Me Uganda ("we," "our," or "us") is a tourism discovery and digital media platform dedicated to showcasing Uganda's destinations, hospitality businesses, tourism experiences, attractions, and stories from the Pearl of Africa.

We are committed to protecting your privacy and ensuring that your personal information is handled responsibly, securely, and transparently.

This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, interact with our services, submit business listings, contact us, subscribe to updates, or use any features available on the Show Me Uganda platform.

By using our website, you agree to the practices described in this Privacy Policy.`,
  },
  {
    number: '02',
    title: 'Information We Collect',
    content: `We collect information to provide better services, improve user experiences, and connect travelers with tourism businesses.`,
    subsections: [
      {
        label: 'A. Information Provided by Users',
        items: [
          'Name', 'Email address', 'Phone number', 'WhatsApp contact',
          'Company / business name', 'Business location', 'Website links',
          'Social media profiles', 'Photos and videos', 'Business descriptions',
          'Travel preferences', 'Reviews and feedback',
          'Messages sent through contact forms',
        ],
      },
      {
        label: 'B. Business Listing Information',
        note: 'Tourism businesses submitting listings may provide:',
        items: [
          'Business registration details', 'Tourism licenses and certifications',
          'Business category', 'Contact information', 'Services offered',
          'Pricing information', 'Accommodation details',
          'Images and promotional materials', 'Awards and recognitions',
          'Sustainability initiatives', 'Booking information',
        ],
        footer: 'Some of this information may be publicly displayed to help travelers discover and connect with businesses.',
      },
      {
        label: 'C. Automatically Collected Information',
        note: 'When you visit our website, we may automatically collect certain technical information, including:',
        items: [
          'IP address', 'Browser type', 'Device information', 'Operating system',
          'Pages visited', 'Time spent on pages', 'Website interactions',
          'Referral sources', 'Location information derived from your IP address',
        ],
        footer: 'This information helps us understand how visitors use our platform and improve website performance.',
      },
    ],
  },
  {
    number: '03',
    title: 'How We Use Your Information',
    content: 'Show Me Uganda may use your information to:',
    items: [
      'Provide access to our platform and services',
      'Publish and manage business listings',
      'Connect travelers with tourism providers',
      'Respond to enquiries and requests',
      'Improve website functionality',
      'Personalise user experiences',
      'Send newsletters, updates, and tourism information',
      'Promote tourism businesses and destinations',
      'Analyse website performance and visitor behaviour',
      'Prevent fraud, misuse, or security issues',
      'Develop new services and features',
    ],
  },
  {
    number: '04',
    title: 'Publicly Available Information',
    content: 'Some information submitted by businesses may be displayed publicly on the Show Me Uganda website. This may include:',
    items: [
      'Business name', 'Description', 'Contact information', 'Location',
      'Website and social media links', 'Images and videos',
      'Services offered', 'Reviews', 'Promotional content',
    ],
    footer: 'Businesses are responsible for ensuring they have the necessary rights and permissions to submit content for publication.',
  },
  {
    number: '05',
    title: 'Sharing of Information',
    content: 'Show Me Uganda does not sell, rent, or trade personal information. We may share information only in the following circumstances:',
    subsections: [
      {
        label: 'A. With Listed Businesses',
        note: 'When travelers contact businesses through our platform, relevant information may be shared to facilitate communication.',
      },
      {
        label: 'B. With Service Providers',
        note: 'We may work with trusted third-party providers who support:',
        items: [
          'Website hosting', 'Analytics', 'Email communication',
          'Payment processing', 'Technical support', 'Digital marketing services',
        ],
        footer: 'These providers are required to protect your information.',
      },
      {
        label: 'C. Legal Requirements',
        note: 'We may disclose information where required by law, regulation, legal process, or government request.',
      },
    ],
  },
  {
    number: '06',
    title: 'Cookies and Tracking Technologies',
    content: 'Show Me Uganda uses cookies and similar technologies to improve website functionality and user experience. Cookies help us:',
    items: [
      'Remember user preferences', 'Understand website usage',
      'Improve performance', 'Measure marketing effectiveness', 'Provide relevant content',
    ],
    footer: 'You may choose to disable cookies through your browser settings. However, some website features may not function properly.',
  },
  {
    number: '07',
    title: 'Third-Party Links',
    content: 'Our website may contain links to external websites, including tourism businesses, hotels, tour operators, social media platforms, partner websites, and booking platforms.',
    footer: 'Show Me Uganda is not responsible for the privacy practices, security, or content of third-party websites. We encourage users to review the privacy policies of external websites before providing personal information.',
  },
  {
    number: '08',
    title: 'Data Security',
    content: 'We take reasonable measures to protect information collected through our platform. These measures include:',
    items: [
      'Secure website infrastructure', 'Access controls',
      'Data protection practices', 'Regular monitoring',
    ],
    footer: 'However, no online platform can guarantee complete security. Users should take care when sharing personal information online.',
  },
  {
    number: '09',
    title: 'Business Owner Responsibilities',
    content: 'Businesses listed on Show Me Uganda are responsible for:',
    items: [
      'Providing accurate information',
      'Ensuring submitted content is lawful',
      'Obtaining permission for images and media',
      'Protecting customer information received through enquiries',
      'Maintaining updated business details',
    ],
    footer: 'Show Me Uganda is not responsible for transactions, agreements, or communications between travelers and listed businesses.',
  },
  {
    number: '10',
    title: 'Your Privacy Rights',
    content: 'Depending on applicable laws, you may have the right to:',
    items: [
      'Request correction of inaccurate information',
      'Request deletion of your information',
      'Withdraw consent for communications',
      'Opt out of marketing messages',
    ],
    footer: 'To exercise these rights, contact the Show Me Uganda team.',
  },
  {
    number: '11',
    title: 'Marketing Communications',
    content: 'With your permission, we may send:',
    items: [
      'Travel inspiration', 'Destination stories', 'Tourism updates',
      'Business opportunities', 'Campaign announcements', 'Events and promotions',
    ],
    footer: 'You may unsubscribe from marketing communications at any time by following the unsubscribe instructions or contacting us directly.',
  },
  {
    number: '12',
    title: "Children's Privacy",
    content: "Show Me Uganda does not knowingly collect personal information from children without appropriate consent. Users under the required legal age should use our platform under the guidance of a parent or guardian. The website content is not age restricted.",
  },
  {
    number: '13',
    title: 'Changes to This Privacy Policy',
    content: 'We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or privacy practices. Any updates will be posted on this page with the revised date.',
  },
  {
    number: '14',
    title: 'Contact Us',
    content: 'If you have questions, concerns, or requests regarding this Privacy Policy, please contact us:',
    contact: true,
  },
]

function SectionCard({ section, isOpen, onToggle }) {
  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all duration-300"
      style={{ borderColor: isOpen ? `${TEAL}30` : '#e5e7eb', background: isOpen ? '#fafffe' : 'white' }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left group"
      >
        <span
          className="text-xs font-black tracking-widest flex-shrink-0 w-8"
          style={{ color: isOpen ? ORANGE : '#d1d5db' }}
        >
          {section.number}
        </span>
        <h3 className="flex-1 font-black text-gray-900 text-base sm:text-lg group-hover:text-teal-700 transition-colors">
          {section.title}
        </h3>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? ORANGE : '#f3f4f6',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke={isOpen ? 'white' : '#6b7280'} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
          </svg>
        </div>
      </button>

      {/* Body */}
      {isOpen && (
        <div className="px-6 pb-6 pt-1 space-y-5" style={{ borderTop: '1px solid #f0f4f4' }}>
          {section.content && (
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
          )}

          {section.items && (
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: ORANGE }}/>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {section.subsections && section.subsections.map((sub, i) => (
            <div key={i} className="rounded-xl p-4 space-y-3" style={{ background: '#f8fafc', border: '1px solid #e5e7eb' }}>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: TEAL }}>{sub.label}</p>
              {sub.note && <p className="text-sm text-gray-600 leading-relaxed">{sub.note}</p>}
              {sub.items && (
                <ul className="space-y-1.5">
                  {sub.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: TEAL }}/>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {sub.footer && <p className="text-xs text-gray-500 italic leading-relaxed">{sub.footer}</p>}
            </div>
          ))}

          {section.footer && !section.subsections && (
            <p className="text-xs text-gray-500 italic leading-relaxed border-l-2 pl-3" style={{ borderColor: ORANGE }}>
              {section.footer}
            </p>
          )}

          {section.contact && (
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:info@showmeuganda.org"
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                style={{ background: `${TEAL}12`, color: TEAL }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                info@showmeuganda.org
              </a>
              <a href="tel:+256758770888"
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                style={{ background: `${ORANGE}12`, color: ORANGE }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +256 (0) 758 770 888
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Policies() {
  const [openIndex, setOpenIndex] = useState(0)

  function toggle(i) {
    setOpenIndex(prev => prev === i ? null : i)
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden pt-36 pb-16" style={{ background: 'linear-gradient(135deg, #0B1F26 0%, #1a3a44 100%)' }}>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: ORANGE }}/>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: TEAL }}/>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5"
            style={{ background: 'rgba(232,115,26,0.18)', color: ORANGE }}>
            Legal
          </span>
          <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
            Privacy Policy
          </h1>
          
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Show Me Uganda is committed to protecting your privacy and handling your information responsibly, securely, and transparently.
          </p>
        </div>
      </div>

      {/* ── Quick nav strip ── */}
      <div className="border-b border-gray-100 bg-gray-50 sticky top-0 z-10 overflow-x-auto">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex-shrink-0">Jump to:</span>
          {['Introduction','Data We Collect','How We Use It','Your Rights','Contact'].map((label, i) => {
            const map = { 0:0, 1:1, 2:2, 3:9, 4:13 }
            return (
              <button key={label}
                onClick={() => setOpenIndex(map[i])}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-full flex-shrink-0 transition-colors hover:text-white"
                style={{ background: openIndex === map[i] ? ORANGE : '#e5e7eb', color: openIndex === map[i] ? 'white' : '#6b7280' }}>
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Accordion sections ── */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="space-y-3">
          {sections.map((section, i) => (
            <SectionCard
              key={i}
              section={section}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #0B1F26, #1a3a44)' }}>
          <h3 className="font-black text-white text-xl mb-2">Still have questions?</h3>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">
            Our team is happy to help with any privacy-related concerns or requests.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
            style={{ background: ORANGE }}>
            Contact Us →
          </Link>
        </div>
      </div>
    </div>
  )
}