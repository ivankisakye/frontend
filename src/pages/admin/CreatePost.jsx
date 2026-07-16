import { useState, useRef } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import apiClient from '../../services/apiClient'
// ── NEW: TipTap imports ──────────────────────────────────────────────────────
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'

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
function IcBell()   { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg> }
function IcMenu()   { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg> }
function IcClose()  { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg> }
function IcTrash()  { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg> }
function IcUpload() { return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg> }

// ── NEW: Toolbar Icons ──────────────────────────────────────────────────────
function IcBold() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/></svg> }
function IcItalic() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h8M14 4l-4 16M6 20h8"/></svg> }
function IcUnderline() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4v6a6 6 0 0012 0V4"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 20h12"/></svg> }
function IcStrike() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12h10M12 12v6M12 12V6"/></svg> }
function IcAlignLeft() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h10M4 14h16M4 18h10"/></svg> }
function IcAlignCenter() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M8 10h8M4 14h16M8 18h8"/></svg> }
function IcAlignRight() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M14 10h6M4 14h16M14 18h6"/></svg> }
function IcLink2() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"/></svg> }

// ── Upload a single image file to backend ─────────────────────────────────────
async function uploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await apiClient.post('/upload-image', formData)
  return res.data.url
}

// ── Photo Upload Box ──────────────────────────────────────────────────────────
function PhotoUploadBox({ label, hint, preview, uploading, onSelect, onRemove, multiple = false }) {
  const inputRef = useRef()

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">{label}</p>
      {hint && <p className="text-[11px] text-gray-400 mb-2">{hint}</p>}

      <div
        onClick={() => inputRef.current.click()}
        className="relative border-2 border-dashed rounded-2xl cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50"
        style={{ borderColor: uploading ? BLUE : '#e5e7eb', minHeight: '120px' }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={onSelect}
        />

        {uploading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <svg className="w-6 h-6 animate-spin" style={{ color: BLUE }} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <p className="text-xs font-semibold text-blue-500">Uploading & converting to WebP…</p>
          </div>
        ) : preview ? (
          <div className="p-2">
            <img src={preview} alt="preview" className="w-full h-32 object-cover rounded-xl"/>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onRemove() }}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <IcClose/>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-gray-400">
            <IcUpload/>
            <p className="text-xs font-semibold">Click to browse photos</p>
            <p className="text-[10px]">JPG, PNG, WebP accepted · Converted to WebP automatically</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Sidebar inner ─────────────────────────────────────────────────────────────
function SidebarInner({ setMobileOpen }) {
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

  return (
    <div className="flex flex-col h-full bg-white">
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
            <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">Admin Panel</div>
          </div>
        </div>
        <button onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400">
          <IcClose/>
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-3">Menu</p>
        <div className="space-y-0.5">
          {nav.map(item => (
            <RouterLink key={item.label} to={item.to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: item.active ? '#EEF2FF' : 'transparent',
                color:      item.active ? BLUE : '#6B7280',
                borderLeft: item.active ? `3px solid ${BLUE}` : '3px solid transparent',
              }}>
              <item.Icon/> {item.label}
            </RouterLink>
          ))}
          <RouterLink to="/" target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
            style={{ borderLeft: '3px solid transparent' }}>
            <IcLink/> View Live Site
          </RouterLink>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mt-6 mb-3">Categories</p>
        <div className="space-y-0.5">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
            <RouterLink key={key} to="/admin/create"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors group">
              <span>{cfg.icon}</span>
              <span className="group-hover:text-gray-800 transition-colors">{cfg.label}</span>
            </RouterLink>
          ))}
        </div>
      </nav>

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
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors p-1">
            <IcLogout/>
          </button>
        </div>
      </div>
    </div>
  )
}

function Sidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      <aside className="hidden md:flex flex-col flex-shrink-0"
        style={{ width: '220px', position: 'sticky', top: 0, height: '100vh', borderRight: '1px solid #F0F2F5', background: '#fff' }}>
        <SidebarInner setMobileOpen={setMobileOpen}/>
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)}/>
          <div className="relative z-10 flex flex-col w-72 max-w-[85vw] h-full shadow-2xl">
            <SidebarInner setMobileOpen={setMobileOpen}/>
          </div>
        </div>
      )}
    </>
  )
}

// ── Stars preview ─────────────────────────────────────────────────────────────
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

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white placeholder-gray-400"

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

function Steps({ current }) {
  return (
    <div className="flex items-center gap-2">
      {['Content','Media','Publish'].map((s,i) => (
        <div key={s} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
              style={{ background: i <= current ? BLUE : '#E5E7EB', color: i <= current ? 'white' : '#9CA3AF' }}>
              {i < current ? '✓' : i+1}
            </div>
            <span className={`text-xs font-semibold hidden sm:inline ${i <= current ? 'text-gray-800' : 'text-gray-400'}`}>{s}</span>
          </div>
          {i < 2 && <div className="w-4 sm:w-6 h-px" style={{ background: i < current ? BLUE : '#E5E7EB' }}/>}
        </div>
      ))}
    </div>
  )
}

// ── NEW: Rich Text Editor Component ──────────────────────────────────────────
function RichTextEditor({ value, onChange, placeholder, minHeight = '200px' }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Write your content here…',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-gray-100 bg-gray-50/50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Bold"
        >
          <IcBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Italic"
        >
          <IcItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('underline') ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Underline"
        >
          <IcUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('strike') ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Strikethrough"
        >
          <IcStrike />
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <button
          onClick={toggleLink}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('link') ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Insert Link"
        >
          <IcLink2 />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-400 text-xs font-bold"
          title="Remove Link"
        >
          🔗✕
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Align Left"
        >
          <IcAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Align Center"
        >
          <IcAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Align Right"
        >
          <IcAlignRight />
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Numbered List"
        >
          1. List
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors text-xs font-semibold ${editor.isActive('paragraph') ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Paragraph"
        >
          ¶
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors text-xs font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors text-xs font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-gray-900' : 'text-gray-500'}`}
          title="Heading 3"
        >
          H3
        </button>
      </div>

      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 focus:outline-none"
        style={{ minHeight }}
      />
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CreatePost() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState('')

  // Cover photo
  const [coverUploading, setCoverUploading] = useState(false)

  // Gallery photos
  const [galleryUploading, setGalleryUploading] = useState(false)

  const [form, setForm] = useState({
    title:     '',
    excerpt:   '',
    content:   '',
    image_url: '',
    gallery:   [],
    category:  'news',
    type:      'post',
    published: false,
    rating:    '',
    reviews:   '',
    price:     '',
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  // ── Upload cover photo ────────────────────────────────────────────────────
  async function handleCoverSelect(e) {
    const file = e.target.files[0]
    if (!file) return
    setCoverUploading(true)
    try {
      const url = await uploadImage(file)
      setForm(prev => ({ ...prev, image_url: url }))
    } catch {
      setError('Cover photo upload failed. Please try again.')
    } finally {
      setCoverUploading(false)
    }
  }

  // ── Upload gallery photos ─────────────────────────────────────────────────
  async function handleGallerySelect(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return

    const remaining = 5 - form.gallery.length
    if (remaining <= 0) {
      setError('Maximum 5 gallery photos allowed.')
      return
    }

    const toUpload = files.slice(0, remaining)
    setGalleryUploading(true)
    try {
      const urls = await Promise.all(toUpload.map(f => uploadImage(f)))
      setForm(prev => ({ ...prev, gallery: [...prev.gallery, ...urls] }))
    } catch {
      setError('One or more gallery photos failed to upload.')
    } finally {
      setGalleryUploading(false)
    }
  }

  function removeGalleryPhoto(index) {
    setForm(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccess('')
    setLoading(true)
    try {
      await apiClient.post('/posts', form)
      setSuccess('Post created successfully! Redirecting…')
      setTimeout(() => navigate('/admin/dashboard'), 1400)
    } catch (err) {
      const msgs = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(' ')
        : 'Failed to create post.'
      setError(msgs)
    } finally { setLoading(false) }
  }

  const isTH = ['tour','hotel'].includes(form.category)
  const wordCount = form.content.trim() ? form.content.trim().replace(/<[^>]*>/g, '').split(/\s+/).length : 0
  const readTime  = Math.ceil(wordCount / 200)
  const stepCurrent = form.image_url ? (form.title && form.content ? 2 : 1) : (form.title ? 1 : 0)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F6F8FA' }}>
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Top bar */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white flex-shrink-0 sticky top-0 z-20"
          style={{ borderBottom: '1px solid #F0F2F5' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-xl hover:bg-gray-100">
              <IcMenu/>
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2 text-sm">
              <RouterLink to="/admin/dashboard" className="text-gray-400 hover:text-gray-700 transition-colors">Dashboard</RouterLink>
              <span className="text-gray-300">/</span>
              <span className="font-bold text-gray-800">New Post</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block"><Steps current={stepCurrent}/></div>
            <button className="relative p-2 rounded-xl hover:bg-gray-100"><IcBell/></button>
            <button type="button" disabled={loading}
              onClick={() => { setForm(f=>({...f,published:false})); document.getElementById('pf').requestSubmit() }}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 sm:px-4 py-2 rounded-xl border hover:bg-gray-50"
              style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>
              💾 Save Draft
            </button>
            <button type="button" disabled={loading}
              onClick={() => { setForm(f=>({...f,published:true})); document.getElementById('pf').requestSubmit() }}
              className="flex items-center gap-1.5 text-xs font-bold px-3 sm:px-4 py-2 rounded-xl text-white hover:opacity-90 disabled:opacity-50"
              style={{ background: BLUE }}>
              {loading ? '⏳' : '🚀'} <span className="hidden sm:inline">{loading ? 'Saving…' : 'Publish'}</span>
            </button>
          </div>
        </header>

        {/* Form */}
        <main className="flex-1 p-4 sm:p-6">
          <form id="pf" onSubmit={handleSubmit}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">

              {/* ── LEFT: content ── */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-5">

                {error && (
                  <div className="flex gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    ⚠️ {error}
                  </div>
                )}
                {success && (
                  <div className="flex gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">
                    ✅ {success}
                  </div>
                )}

                {/* Title */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
                  <Field label="Post Title" required>
                    <input type="text" name="title" value={form.title} onChange={handleChange}
                      className={inputCls + ' text-base font-semibold'}
                      placeholder="Enter a compelling title…" required/>
                  </Field>
                  {form.title && (
                    <p className="text-[11px] text-gray-400 mt-1.5">
                      {form.title.length} chars
                      {form.title.length > 60 && <span className="text-amber-500 ml-2">⚠ Keep under 60 for SEO</span>}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-black text-gray-900">Post Content</h2>
                    {wordCount > 0 && (
                      <span className="text-[11px] text-gray-400">{wordCount} words · ~{readTime} min read</span>
                    )}
                  </div>
                  <Field label="Excerpt" hint="shown on cards and search">
                    <RichTextEditor
                      value={form.excerpt}
                      onChange={(html) => setForm(prev => ({ ...prev, excerpt: html }))}
                      placeholder="Brief 1–2 sentence summary…"
                      minHeight="100px"
                    />
                    <div className="flex justify-between mt-1">
                      <p className="text-[11px] text-gray-400">
                        {form.excerpt.replace(/<[^>]*>/g, '').length} characters
                      </p>
                      <p className="text-[11px] text-gray-400">Supports bold, italic, links</p>
                    </div>
                  </Field>
                  <Field label="Full Content" hint="complete article body">
                    <RichTextEditor
                      value={form.content}
                      onChange={(html) => setForm(prev => ({ ...prev, content: html }))}
                      placeholder="Write your full content here…"
                      minHeight="300px"
                    />
                  </Field>
                </div>

                {/* ── PHOTOS SECTION ── */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 space-y-6">
                  <div>
                    <h2 className="font-black text-gray-900">Photos</h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Use landscape photos (wider than tall) for best results. All photos are automatically converted to WebP.
                    </p>
                  </div>

                  {/* Cover photo */}
                  <PhotoUploadBox
                    label="Cover Photo"
                    hint="This appears as the hero image at the top of the post"
                    preview={form.image_url}
                    uploading={coverUploading}
                    onSelect={handleCoverSelect}
                    onRemove={() => setForm(f => ({ ...f, image_url: '' }))}
                  />

                  {/* Divider */}
                  <div className="border-t border-gray-100 pt-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Gallery Photos
                          <span className="ml-2 normal-case font-normal text-gray-400">
                            ({form.gallery.length}/5 added)
                          </span>
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Additional photos shown as visitors scroll through the post
                        </p>
                      </div>
                      {form.gallery.length < 5 && (
                        <label className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition-colors hover:opacity-90"
                          style={{ background: `${TEAL}15`, color: TEAL }}>
                          <IcPlus/>
                          {galleryUploading ? 'Uploading…' : 'Add Photos'}
                          <input type="file" accept="image/*" multiple className="hidden"
                            onChange={handleGallerySelect} disabled={galleryUploading}/>
                        </label>
                      )}
                    </div>

                    {/* Gallery preview grid */}
                    {form.gallery.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                        {form.gallery.map((url, i) => (
                          <div key={i} className="relative rounded-xl overflow-hidden group" style={{ aspectRatio: '16/9' }}>
                            <img src={url} alt={`gallery ${i+1}`} className="w-full h-full object-cover"/>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors"/>
                            <button type="button" onClick={() => removeGalleryPhoto(i)}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                              <IcTrash/>
                            </button>
                            <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded-md">
                              {i + 1}
                            </span>
                          </div>
                        ))}

                        {/* Add more slot */}
                        {form.gallery.length < 5 && (
                          <label className="relative rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                            style={{ aspectRatio: '16/9' }}>
                            {galleryUploading ? (
                              <svg className="w-5 h-5 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                              </svg>
                            ) : (
                              <>
                                <IcPlus/>
                                <span className="text-[10px] text-gray-400 font-semibold">Add more</span>
                              </>
                            )}
                            <input type="file" accept="image/*" multiple className="hidden"
                              onChange={handleGallerySelect} disabled={galleryUploading}/>
                          </label>
                        )}
                      </div>
                    )}

                    {form.gallery.length === 0 && !galleryUploading && (
                      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl py-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                        <IcUpload/>
                        <p className="text-xs font-semibold text-gray-400">Click to add gallery photos</p>
                        <p className="text-[10px] text-gray-300">Up to 5 photos · Landscape recommended</p>
                        <input type="file" accept="image/*" multiple className="hidden"
                          onChange={handleGallerySelect}/>
                      </label>
                    )}
                  </div>
                </div>

                {/* Pricing — tour/hotel only */}
                {isTH && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 space-y-4 sm:space-y-5">
                    <div>
                      <h2 className="font-black text-gray-900">Pricing & Rating</h2>
                      <p className="text-xs text-gray-400 mt-0.5">Shown on the listing card to visitors</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Rating" hint="0.0–5.0">
                        <input type="number" name="rating" value={form.rating} onChange={handleChange}
                          className={inputCls} placeholder="e.g. 4.9" min="0" max="5" step="0.1"/>
                      </Field>
                      <Field label="Reviews">
                        <input type="number" name="reviews" value={form.reviews} onChange={handleChange}
                          className={inputCls} placeholder="e.g. 2847" min="0"/>
                      </Field>
                    </div>
                    <Field label="Price" hint={form.category === 'tour' ? '"from X per person"' : '"from X /night"'}>
                      <input type="text" name="price" value={form.price} onChange={handleChange}
                        className={inputCls}
                        placeholder={form.category === 'tour' ? 'e.g. $700' : 'e.g. $450/night'}/>
                    </Field>
                    {form.rating && (
                      <div className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl"
                        style={{ background: '#F8FAFC', border: '1px solid #E5E7EB' }}>
                        <Stars rating={parseFloat(form.rating)}/>
                        {form.reviews && <span className="text-xs text-gray-400">({Number(form.reviews).toLocaleString()} reviews)</span>}
                        {form.price && <span className="text-xs text-gray-500">· from <span className="font-bold text-gray-800">{form.price}</span></span>}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── RIGHT: settings ── */}
              <div className="space-y-4">

                {/* Publish */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
                  <h3 className="font-black text-gray-900 mb-4">Publish</h3>
                  <div className="flex items-center justify-between p-3 rounded-xl mb-4"
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
                        onChange={handleChange} className="sr-only"/>
                      <div className="w-10 h-5 rounded-full transition-all relative"
                        style={{ background: form.published ? BLUE : '#D1D5DB' }}>
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                          style={{ transform: form.published ? 'translateX(20px)' : 'translateX(0)' }}/>
                      </div>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <button type="button" disabled={loading}
                      onClick={() => { setForm(f=>({...f,published:false})); document.getElementById('pf').requestSubmit() }}
                      className="w-full text-sm font-bold py-2.5 rounded-xl border hover:bg-gray-50 disabled:opacity-50"
                      style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>
                      💾 Save as Draft
                    </button>
                    <button type="button" disabled={loading}
                      onClick={() => { setForm(f=>({...f,published:true})); document.getElementById('pf').requestSubmit() }}
                      className="w-full text-sm font-bold py-2.5 rounded-xl text-white hover:opacity-90 disabled:opacity-50"
                      style={{ background: `linear-gradient(135deg, ${BLUE}, #6B8AF9)` }}>
                      {loading ? '⏳ Saving…' : '🚀 Publish Post'}
                    </button>
                  </div>
                </div>

                {/* Classification */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-4">
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

                {/* Checklist */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
                  <h3 className="font-black text-gray-900 mb-3">Checklist</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Title added',       done: !!form.title },
                      { label: 'Excerpt written',   done: !!form.excerpt },
                      { label: 'Content written',   done: form.content.length > 50 },
                      { label: 'Cover photo added', done: !!form.image_url },
                      { label: 'Gallery photos',    done: form.gallery.length > 0 },
                      { label: 'Category selected', done: !!form.category },
                      ...(isTH ? [
                        { label: 'Price set',  done: !!form.price  },
                        { label: 'Rating set', done: !!form.rating },
                      ] : []),
                    ].map((item,i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                          item.done ? 'bg-emerald-500 text-white' : 'border-2 border-gray-200'
                        }`}>
                          {item.done && '✓'}
                        </div>
                        <span className={`text-xs ${item.done ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}