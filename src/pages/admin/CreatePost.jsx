import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import apiClient from '../../services/apiClient'

const TEAL   = '#2A6B7C'
const ORANGE = '#E8731A'
const BLUE   = '#4F6EF7'

const CATEGORY_CONFIG = {
  news:         { color: '#4F6EF7', label: 'News',         icon: '📰' },
  tour:         { color: '#10B981', label: 'Tours',        icon: '🦍' },
  hotel:        { color: '#8B5CF6', label: 'Hotels',       icon: '🏨' },
  event:        { color: '#F59E0B', label: 'Events',       icon: '🎉' },
  conservation: { color: '#059669', label: 'Conservation', icon: '🌿' },
  directory:    { color: '#E8731A', label: 'Directory',    icon: '📍' },
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function IcGrid()   { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg> }
function IcDoc()    { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> }
function IcPlus()   { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg> }
function IcLink()   { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg> }
function IcLogout() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg> }
function IcMenu()   { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg> }
function IcClose()  { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg> }
function IcChevron({ open }) { return <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg> }

// ── Stars ─────────────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20"
          fill={i <= Math.round(rating) ? ORANGE : '#E5E7EB'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
      <span className="text-xs font-bold text-gray-700 ml-1">{rating}</span>
    </div>
  )
}

// ── Field ─────────────────────────────────────────────────────────────────────
function Field({ label, hint, required, children }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
        {label}
        {hint && <span className="normal-case font-normal text-gray-400 ml-2 text-[11px]">{hint}</span>}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white placeholder-gray-400"

// ── Collapsible section (for mobile) ─────────────────────────────────────────
function Collapsible({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-black text-gray-900 text-sm">{title}</h3>
        <IcChevron open={open} />
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate()
  const admin = JSON.parse(localStorage.getItem('admin_user') || '{}')

  async function handleLogout() {
    try { await apiClient.post('/logout') } catch (_) {}
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login')
  }

  const nav = [
    { label: 'Dashboard', Icon: IcGrid, to: '/admin/dashboard', active: false },
    { label: 'All Posts', Icon: IcDoc,  to: '/admin/dashboard', active: false },
    { label: 'New Post',  Icon: IcPlus, to: '/admin/create',    active: true  },
  ]

  const Inner = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 flex-shrink-0 flex items-center justify-between"
        style={{ borderBottom: '1px solid #F0F2F5' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, #f59e0b)` }}>
            <span className="text-white font-black text-xs">S</span>
          </div>
          <div className="leading-tight">
            <div className="font-black text-sm">
              <span style={{ color: TEAL }}>Show</span>
              <span style={{ color: ORANGE }}>Me</span>
              <span className="text-gray-800"> Uganda</span>
            </div>
            <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">
              Admin Panel
            </div>
          </div>
        </div>
        <button onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
          <IcClose />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-3">Menu</p>
        <div className="space-y-0.5">
          {nav.map(item => (
            <Link key={item.label} to={item.to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background:  item.active ? '#EEF2FF' : 'transparent',
                color:       item.active ? BLUE : '#6B7280',
                borderLeft:  item.active ? `3px solid ${BLUE}` : '3px solid transparent',
              }}>
              <item.Icon />
              {item.label}
            </Link>
          ))}
          <Link to="/" target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
            style={{ borderLeft: '3px solid transparent' }}>
            <IcLink /> View Live Site
          </Link>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mt-6 mb-3">Categories</p>
        <div className="space-y-0.5">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
            <Link key={key} to="/admin/create"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors group">
              <span>{cfg.icon}</span>
              <span className="group-hover:text-gray-800 transition-colors">{cfg.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="px-4 py-4 flex-shrink-0" style={{ borderTop: '1px solid #F0F2F5' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, #f59e0b)` }}>
            {admin.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-800 truncate">{admin.name || 'Admin'}</p>
            <p className="text-[10px] text-gray-400 truncate">{admin.email || ''}</p>
          </div>
          <button onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
            title="Sign out">
            <IcLogout />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col flex-shrink-0"
        style={{ width: '220px', position: 'sticky', top: 0, height: '100vh', borderRight: '1px solid #F0F2F5' }}>
        <Inner />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex flex-col w-72 max-w-[85vw] h-full shadow-2xl">
            <Inner />
          </div>
        </div>
      )}
    </>
  )
}

// ── Publish Panel ─────────────────────────────────────────────────────────────
function PublishPanel({ form, handleChange, loading }) {
  return (
    <div className="space-y-3">
      {/* Toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl"
        style={{ background: '#F8FAFC', border: '1px solid #E5E7EB' }}>
        <div>
          <p className="text-sm font-semibold text-gray-700">
            {form.published ? '🟢 Public' : '⚪ Draft'}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {form.published ? 'Visible to all visitors' : 'Only you can see this'}
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" name="published" checked={form.published}
            onChange={handleChange} className="sr-only" />
          <div className="w-10 h-5 rounded-full transition-all relative"
            style={{ background: form.published ? BLUE : '#D1D5DB' }}>
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
              style={{ transform: form.published ? 'translateX(20px)' : 'translateX(0)' }} />
          </div>
        </label>
      </div>

      {/* Buttons */}
      <button type="button" disabled={loading}
        onClick={() => document.getElementById('create-form').requestSubmit()}
        className="w-full text-sm font-bold py-2.5 rounded-xl border hover:bg-gray-50 disabled:opacity-50 transition-colors"
        style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>
        💾 Save as Draft
      </button>
      <button type="submit" form="create-form" disabled={loading}
        className="w-full text-sm font-bold py-2.5 rounded-xl text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
        style={{ background: `linear-gradient(135deg, ${BLUE}, #6B8AF9)` }}>
        {loading ? '⏳ Saving…' : '🚀 Publish Post'}
      </button>
    </div>
  )
}

// ── Checklist ─────────────────────────────────────────────────────────────────
function Checklist({ form }) {
  const isTH = ['tour','hotel'].includes(form.category)
  const items = [
    { label: 'Title added',       done: !!form.title },
    { label: 'Excerpt written',   done: !!form.excerpt },
    { label: 'Content written',   done: form.content.length > 50 },
    { label: 'Image added',       done: !!form.image_url },
    { label: 'Category selected', done: !!form.category },
    ...(isTH ? [
      { label: 'Price set',  done: !!form.price  },
      { label: 'Rating set', done: !!form.rating },
    ] : []),
  ]
  const done = items.filter(i => i.done).length
  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">{done}/{items.length} complete</span>
        <span className="text-xs font-bold" style={{ color: done === items.length ? '#10B981' : BLUE }}>
          {Math.round((done/items.length)*100)}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 mb-4 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(done/items.length)*100}%`, background: done === items.length ? '#10B981' : BLUE }} />
      </div>
      <div className="space-y-2">
        {items.map((item,i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 transition-all ${
              item.done ? 'bg-emerald-500 text-white' : 'border-2 border-gray-200'
            }`}>
              {item.done && '✓'}
            </div>
            <span className={`text-xs transition-colors ${item.done ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CreatePost() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState('')
  const [success,    setSuccess]    = useState('')
  const [mobileTab,  setMobileTab]  = useState('content') // 'content' | 'settings'

  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', image_url: '',
    category: 'news', type: 'post', published: false,
    rating: '', reviews: '', price: '',
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccess('')
    setLoading(true)
    try {
      await apiClient.post('/posts', form)
      setSuccess('Post created! Redirecting…')
      setTimeout(() => navigate('/admin/dashboard'), 1400)
    } catch (err) {
      const msgs = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(' ')
        : 'Failed to create post.'
      setError(msgs)
    } finally { setLoading(false) }
  }

  const isTH = ['tour','hotel'].includes(form.category)
  const wordCount = form.content.trim() ? form.content.trim().split(/\s+/).length : 0
  const readTime  = Math.ceil(wordCount / 200)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F6F8FA' }}>

      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Right scrollable column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* ── Top bar ── */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white flex-shrink-0 sticky top-0 z-20"
          style={{ borderBottom: '1px solid #F0F2F5' }}>

          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <IcMenu />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <Link to="/admin/dashboard" className="text-gray-400 hover:text-gray-700 transition-colors hidden sm:block">
                Dashboard
              </Link>
              <span className="text-gray-300 hidden sm:block">/</span>
              <span className="font-bold text-gray-800">New Post</span>
            </div>
          </div>

          {/* Top bar actions */}
          <div className="flex items-center gap-2">
            <button type="button" disabled={loading}
              onClick={() => {
                setForm(f => ({...f, published: false}))
                setTimeout(() => document.getElementById('create-form').requestSubmit(), 0)
              }}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>
              💾 Draft
            </button>
            <button type="button" disabled={loading}
              onClick={() => {
                setForm(f => ({...f, published: true}))
                setTimeout(() => document.getElementById('create-form').requestSubmit(), 0)
              }}
              className="flex items-center gap-1.5 text-xs font-bold px-3 sm:px-4 py-2 rounded-xl text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              style={{ background: BLUE }}>
              {loading ? '⏳' : '🚀'} <span className="hidden sm:inline">{loading ? 'Saving…' : 'Publish'}</span>
            </button>
          </div>
        </header>

        {/* ── Mobile tab switcher ── */}
        <div className="md:hidden flex bg-white border-b border-gray-100 px-4">
          {['content', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className="flex-1 py-3 text-sm font-bold capitalize transition-colors border-b-2"
              style={{
                borderColor: mobileTab === tab ? BLUE : 'transparent',
                color:       mobileTab === tab ? BLUE : '#9CA3AF',
              }}
            >
              {tab === 'content' ? '✏️ Content' : '⚙️ Settings'}
            </button>
          ))}
        </div>

        {/* ── Form ── */}
        <main className="flex-1 p-4 sm:p-6">
          <form id="create-form" onSubmit={handleSubmit}>

            {/* Alerts */}
            {error && (
              <div className="mb-4 flex gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div className="mb-4 flex gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">
                ✅ {success}
              </div>
            )}

            {/* ─── DESKTOP layout: 3 columns ─── */}
            <div className="hidden md:grid md:grid-cols-3 gap-5 max-w-7xl mx-auto">

              {/* Left 2 cols — content */}
              <div className="md:col-span-2 space-y-5">

                {/* Title */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <Field label="Post Title" required>
                    <input type="text" name="title" value={form.title} onChange={handleChange}
                      className={inputCls + ' text-base font-semibold'}
                      placeholder="Enter a compelling title…" required />
                  </Field>
                  {form.title && (
                    <p className="text-[11px] text-gray-400 mt-1.5">
                      {form.title.length} chars
                      {form.title.length > 60 && <span className="text-amber-500 ml-2">⚠ Keep under 60</span>}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-black text-gray-900">Post Content</h2>
                    {wordCount > 0 && (
                      <span className="text-[11px] text-gray-400">{wordCount} words · ~{readTime} min read</span>
                    )}
                  </div>
                  <Field label="Excerpt" hint="shown on cards">
                    <textarea name="excerpt" value={form.excerpt} onChange={handleChange}
                      className={inputCls} placeholder="Brief 1–2 sentence summary…" rows={3} />
                  </Field>
                  <Field label="Full Content">
                    <textarea name="content" value={form.content} onChange={handleChange}
                      className={inputCls + ' font-mono text-[13px] leading-relaxed'}
                      placeholder="Write your full content here…" rows={16} />
                  </Field>
                </div>

                {/* Pricing — tour/hotel only */}
                {isTH && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                    <div>
                      <h2 className="font-black text-gray-900">Pricing & Rating</h2>
                      <p className="text-xs text-gray-400 mt-0.5">Shown on listing cards to visitors</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Rating" hint="0.0 – 5.0">
                        <input type="number" name="rating" value={form.rating} onChange={handleChange}
                          className={inputCls} placeholder="e.g. 4.9" min="0" max="5" step="0.1" />
                      </Field>
                      <Field label="Reviews">
                        <input type="number" name="reviews" value={form.reviews} onChange={handleChange}
                          className={inputCls} placeholder="e.g. 2847" min="0" />
                      </Field>
                    </div>
                    <Field label="Price" hint={form.category === 'tour' ? '"from X per person"' : '"from X /night"'}>
                      <input type="text" name="price" value={form.price} onChange={handleChange}
                        className={inputCls}
                        placeholder={form.category === 'tour' ? 'e.g. $700' : 'e.g. $450/night'} />
                    </Field>
                    {form.rating && (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                        style={{ background: '#F8FAFC', border: '1px solid #E5E7EB' }}>
                        <Stars rating={parseFloat(form.rating)} />
                        {form.reviews && <span className="text-xs text-gray-400">({Number(form.reviews).toLocaleString()} reviews)</span>}
                        {form.price && (
                          <span className="text-xs text-gray-500 ml-1">
                            · from <span className="font-bold text-gray-800">{form.price}</span>
                            {form.category === 'tour' ? ' per person' : ''}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right col — settings */}
              <div className="space-y-4">

                {/* Publish */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-black text-gray-900 mb-4">Publish</h3>
                  <PublishPanel form={form} handleChange={handleChange} loading={loading} />
                </div>

                {/* Category */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                  <h3 className="font-black text-gray-900">Classification</h3>
                  <Field label="Category">
                    <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                      {Object.entries(CATEGORY_CONFIG).map(([k,v]) => (
                        <option key={k} value={k}>{v.icon} {v.label}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Post Type">
                    <select name="type" value={form.type} onChange={handleChange} className={inputCls}>
                      <option value="post">📄 Standard Post</option>
                      <option value="listing">📍 Listing</option>
                      <option value="itinerary">🗺️ Itinerary</option>
                    </select>
                  </Field>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{
                      background: `${CATEGORY_CONFIG[form.category]?.color}12`,
                      border: `1px solid ${CATEGORY_CONFIG[form.category]?.color}25`,
                    }}>
                    <span>{CATEGORY_CONFIG[form.category]?.icon}</span>
                    <span className="text-xs font-bold" style={{ color: CATEGORY_CONFIG[form.category]?.color }}>
                      {CATEGORY_CONFIG[form.category]?.label}
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                  <h3 className="font-black text-gray-900">Featured Image</h3>
                  <Field label="Image URL" hint="paste link">
                    <input type="url" name="image_url" value={form.image_url} onChange={handleChange}
                      className={inputCls} placeholder="https://images.unsplash.com/…" />
                  </Field>
                  {form.image_url ? (
                    <div className="rounded-xl overflow-hidden h-40 border border-gray-100">
                      <img src={form.image_url} alt="preview" className="w-full h-full object-cover"
                        onError={e => e.target.style.display='none'} />
                    </div>
                  ) : (
                    <div className="h-28 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400">
                      <span className="text-2xl">🖼️</span>
                      <p className="text-xs">Paste an image URL above</p>
                    </div>
                  )}
                </div>

                {/* Checklist */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-black text-gray-900 mb-3">Checklist</h3>
                  <Checklist form={form} />
                </div>

              </div>
            </div>

            {/* ─── MOBILE layout: tabbed ─── */}
            <div className="md:hidden max-w-2xl mx-auto space-y-4">

              {/* Content tab */}
              {mobileTab === 'content' && (
                <>
                  {/* Title */}
                  <Collapsible title="✏️ Post Title" defaultOpen={true}>
                    <Field label="Title" required>
                      <input type="text" name="title" value={form.title} onChange={handleChange}
                        className={inputCls + ' font-semibold'}
                        placeholder="Enter a compelling title…" required />
                    </Field>
                    {form.title && (
                      <p className="text-[11px] text-gray-400 mt-1.5">
                        {form.title.length} chars
                        {form.title.length > 60 && <span className="text-amber-500 ml-2">⚠ Keep under 60</span>}
                      </p>
                    )}
                  </Collapsible>

                  {/* Excerpt */}
                  <Collapsible title="📋 Excerpt" defaultOpen={true}>
                    <Field label="Excerpt" hint="shown on cards">
                      <textarea name="excerpt" value={form.excerpt} onChange={handleChange}
                        className={inputCls} placeholder="Brief 1–2 sentence summary…" rows={3} />
                    </Field>
                  </Collapsible>

                  {/* Content */}
                  <Collapsible title="📝 Full Content" defaultOpen={true}>
                    {wordCount > 0 && (
                      <p className="text-[11px] text-gray-400 mb-3">{wordCount} words · ~{readTime} min read</p>
                    )}
                    <textarea name="content" value={form.content} onChange={handleChange}
                      className={inputCls + ' font-mono text-[13px] leading-relaxed'}
                      placeholder="Write your full content here…" rows={12} />
                  </Collapsible>

                  {/* Pricing (tour/hotel) */}
                  {isTH && (
                    <Collapsible title="💰 Pricing & Rating" defaultOpen={true}>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <Field label="Rating" hint="0–5">
                          <input type="number" name="rating" value={form.rating} onChange={handleChange}
                            className={inputCls} placeholder="4.9" min="0" max="5" step="0.1" />
                        </Field>
                        <Field label="Reviews">
                          <input type="number" name="reviews" value={form.reviews} onChange={handleChange}
                            className={inputCls} placeholder="2847" min="0" />
                        </Field>
                      </div>
                      <Field label="Price">
                        <input type="text" name="price" value={form.price} onChange={handleChange}
                          className={inputCls}
                          placeholder={form.category === 'tour' ? 'e.g. $700' : 'e.g. $450/night'} />
                      </Field>
                    </Collapsible>
                  )}
                </>
              )}

              {/* Settings tab */}
              {mobileTab === 'settings' && (
                <>
                  {/* Publish */}
                  <Collapsible title="🚀 Publish" defaultOpen={true}>
                    <PublishPanel form={form} handleChange={handleChange} loading={loading} />
                  </Collapsible>

                  {/* Category */}
                  <Collapsible title="🗂️ Classification" defaultOpen={true}>
                    <div className="space-y-4">
                      <Field label="Category">
                        <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                          {Object.entries(CATEGORY_CONFIG).map(([k,v]) => (
                            <option key={k} value={k}>{v.icon} {v.label}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Post Type">
                        <select name="type" value={form.type} onChange={handleChange} className={inputCls}>
                          <option value="post">📄 Standard Post</option>
                          <option value="listing">📍 Listing</option>
                          <option value="itinerary">🗺️ Itinerary</option>
                        </select>
                      </Field>
                    </div>
                  </Collapsible>

                  {/* Image */}
                  <Collapsible title="🖼️ Featured Image" defaultOpen={true}>
                    <Field label="Image URL" hint="paste link">
                      <input type="url" name="image_url" value={form.image_url} onChange={handleChange}
                        className={inputCls} placeholder="https://images.unsplash.com/…" />
                    </Field>
                    {form.image_url ? (
                      <div className="rounded-xl overflow-hidden h-40 border border-gray-100 mt-3">
                        <img src={form.image_url} alt="preview" className="w-full h-full object-cover"
                          onError={e => e.target.style.display='none'} />
                      </div>
                    ) : (
                      <div className="h-24 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 mt-3">
                        <span className="text-2xl">🖼️</span>
                        <p className="text-xs">Paste an image URL above</p>
                      </div>
                    )}
                  </Collapsible>

                  {/* Checklist */}
                  <Collapsible title="✅ Checklist" defaultOpen={true}>
                    <Checklist form={form} />
                  </Collapsible>
                </>
              )}

              {/* Mobile bottom sticky publish bar */}
              <div
                className="fixed bottom-0 left-0 right-0 px-4 py-3 flex gap-3 z-30"
                style={{ background: 'rgba(255,255,255,0.97)', borderTop: '1px solid #F0F2F5', backdropFilter: 'blur(8px)' }}
              >
                <button type="button" disabled={loading}
                  onClick={() => {
                    setForm(f => ({...f, published: false}))
                    setTimeout(() => document.getElementById('create-form').requestSubmit(), 0)
                  }}
                  className="flex-1 text-sm font-bold py-3 rounded-xl border hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>
                  💾 Draft
                </button>
                <button type="button" disabled={loading}
                  onClick={() => {
                    setForm(f => ({...f, published: true}))
                    setTimeout(() => document.getElementById('create-form').requestSubmit(), 0)
                  }}
                  className="flex-1 text-sm font-bold py-3 rounded-xl text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${BLUE}, #6B8AF9)` }}>
                  {loading ? '⏳ Saving…' : '🚀 Publish'}
                </button>
              </div>

              {/* Space for sticky bottom bar */}
              <div className="h-20" />
            </div>

          </form>
        </main>
      </div>
    </div>
  )
}