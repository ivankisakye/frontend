import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

function IcGrid()   { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg> }
function IcDoc()    { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> }
function IcPlus()   { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg> }
function IcLink()   { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg> }
function IcLogout() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg> }
function IcBell()   { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg> }
function IcSearch() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg> }
function IcEdit()   { return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg> }
function IcTrash()  { return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg> }
function IcMenu()   { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg> }
function IcClose()  { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg> }

// ── Line Chart ────────────────────────────────────────────────────────────────
function LineChart({ data = [], color = BLUE }) {
  const W = 500, H = 140
  if (data.length < 2) return <div className="h-36 flex items-center justify-center text-gray-300 text-sm">No data</div>
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1
  const pad = { t: 12, r: 8, b: 20, l: 32 }
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b
  const pts = data.map((v, i) => [
    pad.l + (i / (data.length - 1)) * w,
    pad.t + (1 - (v - min) / range) * h,
  ])
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const area = `${line} L${pts[pts.length-1][0]},${pad.t+h} L${pts[0][0]},${pad.t+h} Z`
  const yTicks = [0, 0.5, 1].map(t => ({ y: pad.t + (1-t)*h, v: Math.round(min + t*range) }))
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const xTicks = [0, Math.floor(data.length/2), data.length-1].map(i => ({
    x: pad.l + (i/(data.length-1))*w, label: months[i % 12]
  }))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.01"/>
        </linearGradient>
      </defs>
      {yTicks.map((t,i) => (
        <g key={i}>
          <line x1={pad.l} y1={t.y} x2={pad.l+w} y2={t.y} stroke="#f0f0f0" strokeWidth="1"/>
          <text x={pad.l-5} y={t.y+4} textAnchor="end" fontSize="9" fill="#c0c8d0">{t.v}</text>
        </g>
      ))}
      {xTicks.map((t,i) => (
        <text key={i} x={t.x} y={H-3} textAnchor="middle" fontSize="9" fill="#c0c8d0">{t.label}</text>
      ))}
      <path d={area} fill="url(#areaGrad)"/>
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="4" fill="white" stroke={color} strokeWidth="2.5"/>
    </svg>
  )
}

// ── Category bar ──────────────────────────────────────────────────────────────
function CategoryBar({ data }) {
  if (!data?.length) return null
  const total = data.reduce((s,d) => s + parseInt(d.count), 0) || 1
  const colors = Object.values(CATEGORY_CONFIG).map(c => c.color)
  return (
    <div>
      <div className="flex rounded-full overflow-hidden h-2.5 mb-4 gap-0.5">
        {data.map((d,i) => (
          <div key={i} style={{ width: `${(parseInt(d.count)/total)*100}%`, background: colors[i] || '#e5e7eb' }}/>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {data.slice(0,3).map((d,i) => {
          const cfg = CATEGORY_CONFIG[d.category] || { label: d.category }
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="w-2.5 h-2.5 rounded-sm mt-1 flex-shrink-0" style={{ background: colors[i] }}/>
              <div>
                <p className="text-xl font-black text-gray-900">{d.count}</p>
                <p className="text-xs text-gray-400">{cfg.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Weekly bars ───────────────────────────────────────────────────────────────
function WeekBars() {
  const days = [
    { d: 'Sun', v: 42 }, { d: 'Mon', v: 68 }, { d: 'Tue', v: 82, active: true },
    { d: 'Wed', v: 35 }, { d: 'Thu', v: 51 }, { d: 'Fr',  v: 28 }, { d: 'Sat', v: 19 },
  ]
  const max = Math.max(...days.map(d => d.v))
  return (
    <div className="flex items-end gap-2" style={{ height: 110 }}>
      {days.map((d,i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
          {d.active
            ? <span className="text-[10px] font-black text-gray-700">{d.v}</span>
            : <span className="text-[10px] text-transparent select-none">0</span>}
          <div className="w-full rounded-t-md" style={{
            height: `${(d.v/max)*72}px`,
            background: d.active ? BLUE : '#E8EDF3',
          }}/>
          <span className={`text-[10px] ${d.active ? 'font-black text-gray-800' : 'text-gray-400'}`}>{d.d}</span>
        </div>
      ))}
    </div>
  )
}

// ── Gauge ─────────────────────────────────────────────────────────────────────
function Gauge({ pct = 68 }) {
  const R = 62, cx = 80, cy = 78
  const circ = Math.PI * R
  const dash = (pct/100) * circ
  return (
    <svg viewBox="0 0 160 90" className="w-full" style={{ height: 110 }}>
      <path d={`M ${cx-R} ${cy} A ${R} ${R} 0 0 1 ${cx+R} ${cy}`}
        fill="none" stroke="#E8EDF3" strokeWidth="10" strokeLinecap="round"/>
      <path d={`M ${cx-R} ${cy} A ${R} ${R} 0 0 1 ${cx+R} ${cy}`}
        fill="none" stroke="#10B981" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}/>
      <text x={cx} y={cy-12} textAnchor="middle" fontSize="22" fontWeight="900" fill="#111827">{pct}%</text>
      <text x={cx} y={cy+5} textAnchor="middle" fontSize="8" fill="#9CA3AF">On track for 80% target</text>
    </svg>
  )
}

// ── Trend badge ───────────────────────────────────────────────────────────────
function Trend({ v, up = true }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded"
      style={{ background: up ? '#ECFDF5' : '#FEF2F2', color: up ? '#059669' : '#DC2626' }}>
      {up ? '▲' : '▼'} {v}
    </span>
  )
}

// ── Post row ──────────────────────────────────────────────────────────────────
function PostRow({ post, onDelete }) {
  const [del, setDel] = useState(false)
  const cfg = CATEGORY_CONFIG[post.category] || { color: '#9ca3af', label: post.category, icon: '📄' }

  async function doDelete() {
    if (!window.confirm(`Delete "${post.title}"?`)) return
    setDel(true)
    try { await apiClient.delete(`/posts/${post.id}`); onDelete(post.id) }
    catch { alert('Failed.') }
    finally { setDel(false) }
  }

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
      <td className="py-3.5 pl-6 pr-3 text-xs font-bold text-gray-300 w-12">
        #{String(post.id).padStart(4,'0')}
      </td>
      <td className="py-3.5 px-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
            style={{ background: `${cfg.color}15` }}>
            {cfg.icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {post.title}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {new Date(post.created_at).toLocaleDateString('en-UG', { day:'numeric', month:'short', year:'numeric' })}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3.5 px-3 hidden sm:table-cell">
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg"
          style={{ background: `${cfg.color}12`, color: cfg.color }}>
          {cfg.label}
        </span>
      </td>
      <td className="py-3.5 px-3 hidden md:table-cell">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg ${
          post.published ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-emerald-500' : 'bg-gray-300'}`}/>
          {post.published ? 'Published' : 'Draft'}
        </span>
      </td>
      <td className="py-3.5 px-3 pr-4">
        <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Link to={`/admin/edit/${post.id}`}
            className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg text-white"
            style={{ background: TEAL }}>
            <IcEdit/> <span className="hidden sm:inline">Edit</span>
          </Link>
          <button onClick={doDelete} disabled={del}
            className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg text-white bg-red-500 hover:bg-red-600 disabled:opacity-40">
            <IcTrash/> <span className="hidden sm:inline">{del ? '…' : 'Del'}</span>
          </button>
        </div>
      </td>
    </tr>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, admin, onLogout, mobileOpen, setMobileOpen }) {
  const nav = [
    { key: 'dashboard', label: 'Dashboard', Icon: IcGrid },
    { key: 'posts',     label: 'All Posts', Icon: IcDoc  },
  ]

  const SidebarInner = () => (
    <div className="flex flex-col h-full" style={{ background: '#fff' }}>

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
        {/* Close button — mobile only */}
        <button onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400">
          <IcClose/>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-3">Menu</p>
        <div className="space-y-0.5">
          {nav.map(item => {
            const isActive = active === item.key
            return (
              <button key={item.key}
                onClick={() => { setActive(item.key); setMobileOpen(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all"
                style={{
                  background: isActive ? '#EEF2FF' : 'transparent',
                  color:      isActive ? BLUE : '#6B7280',
                  borderLeft: isActive ? `3px solid ${BLUE}` : '3px solid transparent',
                }}>
                <item.Icon/>
                {item.label}
              </button>
            )
          })}

          <Link to="/admin/create" onClick={() => setMobileOpen(false)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
            style={{ borderLeft: '3px solid transparent' }}>
            <IcPlus/> New Post
          </Link>

          <Link to="/" target="_blank"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
            style={{ borderLeft: '3px solid transparent' }}>
            <IcLink/> View Live Site
          </Link>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mt-6 mb-3">Quick Create</p>
        <div className="space-y-0.5">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
            <Link key={key} to="/admin/create" onClick={() => setMobileOpen(false)}
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
          <button onClick={onLogout}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
            title="Sign out">
            <IcLogout/>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* ── DESKTOP: sticky sidebar, never moves ── */}
      <aside className="hidden md:flex flex-col flex-shrink-0"
        style={{
          width: '220px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          borderRight: '1px solid #F0F2F5',
          background: '#fff',
        }}>
        <SidebarInner/>
      </aside>

      {/* ── MOBILE: full-screen drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}/>
          {/* Drawer */}
          <div className="relative z-10 flex flex-col w-72 max-w-[85vw] h-full shadow-2xl"
            style={{ background: '#fff' }}>
            <SidebarInner/>
          </div>
        </div>
      )}
    </>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate()
  const [posts,      setPosts]      = useState([])
  const [stats,      setStats]      = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [search,     setSearch]     = useState('')
  const [filter,     setFilter]     = useState('all')
  const [active,     setActive]     = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  const admin = JSON.parse(localStorage.getItem('admin_user') || '{}')
  const sparkline = [3,5,4,7,6,9,8,11,9,13,11,15,13,17,15,18]

  useEffect(() => { load() }, [])

  async function load() {
    try {
      const [pr, sr] = await Promise.all([
        apiClient.get('/admin/posts'),
        apiClient.get('/admin/stats'),
      ])
      setPosts(pr.data.data)
      setStats(sr.data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  function removePost(id) {
    setPosts(p => p.filter(x => x.id !== id))
    setStats(s => s ? { ...s, total: s.total - 1 } : s)
  }

  async function logout() {
    try { await apiClient.post('/logout') } catch (_) {}
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login')
  }

  const filtered = posts
    .filter(p => filter === 'all' || p.category === filter)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const recent = [...posts]
    .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  const pubPct = stats ? Math.round((stats.published / (stats.total || 1)) * 100) : 68
  const now = new Date()

  return (
    /*
      KEY LAYOUT:
      - Outer div: flex row, full viewport height, no overflow
      - Desktop sidebar: sticky, height 100vh — never scrolls
      - Right column: flex-1, overflow-y-auto — only this scrolls
    */
    <div className="flex h-screen overflow-hidden" style={{ background: '#F6F8FA' }}>

      <Sidebar
        active={active} setActive={setActive}
        admin={admin} onLogout={logout}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
      />

      {/* Scrollable right side */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Top bar — sticks to top of the scrollable column */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white flex-shrink-0 sticky top-0 z-20"
          style={{ borderBottom: '1px solid #F0F2F5' }}>

          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <IcMenu/>
            </button>
            <h1 className="font-black text-gray-900 text-base sm:text-lg">
              {active === 'dashboard' ? 'Dashboard' : 'All Posts'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden lg:block text-xs font-semibold text-gray-500 px-3 py-2 rounded-xl border border-gray-200">
              📅 {now.toLocaleDateString('en-UG', { day:'numeric', month:'short', year:'numeric' })}
            </span>
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <IcBell/>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500"/>
            </button>
            <Link to="/admin/create"
              className="flex items-center gap-1.5 text-xs font-bold px-3 sm:px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: BLUE }}>
              <IcPlus/> <span className="hidden sm:inline">New Post</span>
            </Link>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, #f59e0b)` }}>
              {admin.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">

          {/* ── DASHBOARD ── */}
          {active === 'dashboard' && (
            <div className="space-y-4 sm:space-y-5 max-w-7xl mx-auto">

              {/* Stat cards — 2 col on mobile, 4 on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {loading ? (
                  [...Array(4)].map((_,i) => (
                    <div key={i} className="h-24 sm:h-28 bg-white rounded-2xl animate-pulse border border-gray-100"/>
                  ))
                ) : [
                  { label: 'Total Posts',  value: stats?.total,       icon: '📝', trend: '15.5%', up: true  },
                  { label: 'Published',    value: stats?.published,   icon: '✅', trend: '8.4%',  up: true  },
                  { label: 'Drafts',       value: stats?.unpublished, icon: '📋', trend: '10.5%', up: false },
                  { label: 'Categories',   value: stats?.by_category?.length || 6, icon: '🗂️', trend: '4.4%', up: true },
                ].map((c,i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wide leading-tight">{c.label}</p>
                      <span className="text-base sm:text-lg">{c.icon}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 sm:gap-2 mb-1 flex-wrap">
                      <span className="text-xl sm:text-2xl font-black text-gray-900">{c.value ?? '—'}</span>
                      <Trend v={c.trend} up={c.up}/>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-gray-400">vs. last period</p>
                  </div>
                ))}
              </div>

              {/* Middle row — stacks on mobile, side by side on xl */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5">

                {/* Left: charts */}
                <div className="xl:col-span-2 space-y-4 sm:space-y-5">

                  {/* Line chart */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Total Posts</p>
                    <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-5 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-black text-gray-900">{stats?.total ?? 0}</span>
                      <Trend v="24.4%" up={true}/>
                      <span className="text-xs text-gray-400">vs. last period</span>
                    </div>
                    <LineChart data={sparkline} color={BLUE}/>
                  </div>

                  {/* Category bar */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
                    <p className="text-sm font-black text-gray-900 mb-4">Content by Category</p>
                    {stats?.by_category
                      ? <CategoryBar data={stats.by_category}/>
                      : <div className="h-16 bg-gray-50 rounded-xl animate-pulse"/>
                    }
                  </div>
                </div>

                {/* Right: widgets — 2 col on tablet, stacked on mobile */}
                <div className="grid grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-5">

                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100">
                    <p className="text-sm font-black text-gray-900 mb-3">Most Active Day</p>
                    <WeekBars/>
                  </div>

                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100">
                    <p className="text-sm font-black text-gray-900 mb-1">Publish Rate</p>
                    <Gauge pct={pubPct}/>
                    <p className="text-center text-xs font-bold mt-1" style={{ color: TEAL }}>
                      {pubPct}% published
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent posts table */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-4 sm:px-6 py-4 flex items-center justify-between"
                  style={{ borderBottom: '1px solid #F0F2F5' }}>
                  <div>
                    <p className="text-sm font-black text-gray-900">Recent Posts</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Latest content on ShowMeUganda</p>
                  </div>
                  <button onClick={() => setActive('posts')}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-colors text-gray-600"
                    style={{ borderColor: '#E5E7EB' }}>
                    See all →
                  </button>
                </div>

                {loading ? (
                  <div className="p-4 sm:p-6 space-y-3">
                    {[...Array(3)].map((_,i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse"/>)}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px]">
                      <thead style={{ background: '#FAFAFA', borderBottom: '1px solid #F0F2F5' }}>
                        <tr>
                          <th className="text-left text-[10px] font-bold uppercase tracking-widest py-3 pl-6 pr-3 text-gray-400">ID</th>
                          <th className="text-left text-[10px] font-bold uppercase tracking-widest py-3 px-3 text-gray-400">Title</th>
                          <th className="text-left text-[10px] font-bold uppercase tracking-widest py-3 px-3 text-gray-400 hidden sm:table-cell">Category</th>
                          <th className="text-left text-[10px] font-bold uppercase tracking-widest py-3 px-3 text-gray-400 hidden md:table-cell">Status</th>
                          <th className="text-left text-[10px] font-bold uppercase tracking-widest py-3 px-3 pr-4 text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recent.length === 0
                          ? <tr><td colSpan={5} className="text-center py-10 text-gray-400 text-sm">No posts yet</td></tr>
                          : recent.map(p => <PostRow key={p.id} post={p} onDelete={removePost}/>)
                        }
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── ALL POSTS ── */}
          {active === 'posts' && (
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

                <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
                  style={{ borderBottom: '1px solid #F0F2F5' }}>
                  <div>
                    <h3 className="font-black text-gray-900">All Posts</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">{filtered.length} posts</p>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 sm:flex-none"
                      style={{ borderColor: '#E5E7EB' }}>
                      <IcSearch/>
                      <input type="text" placeholder="Search…" value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent text-sm focus:outline-none w-full sm:w-32 text-gray-700 placeholder-gray-400"/>
                    </div>
                    <select value={filter} onChange={e => setFilter(e.target.value)}
                      className="px-3 py-2 text-sm rounded-xl border text-gray-600 focus:outline-none bg-white"
                      style={{ borderColor: '#E5E7EB' }}>
                      <option value="all">All</option>
                      {Object.entries(CATEGORY_CONFIG).map(([k,v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                    <Link to="/admin/create"
                      className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl text-white"
                      style={{ background: BLUE }}>
                      <IcPlus/> New
                    </Link>
                  </div>
                </div>

                {loading ? (
                  <div className="p-8 text-center text-gray-400 text-sm">Loading…</div>
                ) : filtered.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-5xl mb-4">📭</p>
                    <p className="font-semibold text-gray-600 mb-1">No posts found</p>
                    <p className="text-sm text-gray-400 mb-5">Try adjusting your search or filter</p>
                    <Link to="/admin/create" className="text-sm font-bold underline" style={{ color: BLUE }}>
                      Create your first post
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px]">
                      <thead style={{ background: '#FAFAFA', borderBottom: '1px solid #F0F2F5' }}>
                        <tr>
                          <th className="text-left text-[10px] font-bold uppercase tracking-widest py-3 pl-6 pr-3 text-gray-400">ID</th>
                          <th className="text-left text-[10px] font-bold uppercase tracking-widest py-3 px-3 text-gray-400">Title</th>
                          <th className="text-left text-[10px] font-bold uppercase tracking-widest py-3 px-3 text-gray-400 hidden sm:table-cell">Category</th>
                          <th className="text-left text-[10px] font-bold uppercase tracking-widest py-3 px-3 text-gray-400 hidden md:table-cell">Status</th>
                          <th className="text-left text-[10px] font-bold uppercase tracking-widest py-3 px-3 pr-4 text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(p => <PostRow key={p.id} post={p} onDelete={removePost}/>)}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}