import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
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

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white"

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {hint && <span className="text-gray-400 font-normal ml-2 text-xs">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

// ─── Star Rating Display ──────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className="w-3 h-3" viewBox="0 0 20 20"
          fill={i <= Math.round(rating) ? ORANGE : '#e5e7eb'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs font-bold text-gray-700 ml-0.5">{rating}</span>
    </div>
  )
}

// ─── Upload a single image file to backend ─────────────────────────────────────
async function uploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await apiClient.post('/upload-image', formData)
  return res.data.url
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function IcPlus()   { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg> }
function IcTrash()  { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg> }
function IcUpload() { return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg> }
function IcClose()  { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg> }

// ── NEW: Toolbar Icons ──────────────────────────────────────────────────────
function IcBold() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/></svg> }
function IcItalic() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h8M14 4l-4 16M6 20h8"/></svg> }
function IcUnderline() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4v6a6 6 0 0012 0V4"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 20h12"/></svg> }
function IcStrike() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12h10M12 12v6M12 12V6"/></svg> }
function IcAlignLeft() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h10M4 14h16M4 18h10"/></svg> }
function IcAlignCenter() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M8 10h8M4 14h16M8 18h8"/></svg> }
function IcAlignRight() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M14 10h6M4 14h16M14 18h6"/></svg> }
function IcLink2() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"/></svg> }

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

// ─── Live Card Preview ────────────────────────────────────────────────────────
function CardPreview({ form }) {
  const isTourOrHotel = ['tour', 'hotel'].includes(form.category)

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        👁️ Card Preview
        <span className="text-xs font-normal text-gray-400">how it appears on the site</span>
      </h3>

      <div className="bg-gray-50 rounded-xl p-3">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm max-w-[220px] mx-auto">

          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            {form.image_url ? (
              <img
                src={form.image_url}
                alt="preview"
                className="w-full h-full object-cover"
                onError={e => e.target.style.display = 'none'}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">
                🖼️
              </div>
            )}
          </div>

          {/* Text below image */}
          <div className="pt-3 pb-2 px-2">
            <h3 className="font-bold text-gray-900 text-xs leading-snug mb-1.5 line-clamp-2">
              {form.title || 'Your title will appear here'}
            </h3>

            {/* Stars — only for tour/hotel */}
            {isTourOrHotel && form.rating && (
              <div className="flex items-center gap-2 mb-1.5">
                <Stars rating={parseFloat(form.rating)} />
                {form.reviews && (
                  <span className="text-xs text-gray-400">
                    ({Number(form.reviews).toLocaleString()})
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            {isTourOrHotel && form.price && (
              <p className="text-xs text-gray-500">
                from <span className="font-bold text-gray-800">{form.price}</span>
                {form.category === 'tour' ? ' per person' : ''}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditPost() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState('')
  
  // Gallery upload states
  const [galleryUploading, setGalleryUploading] = useState(false)
  const [coverUploading, setCoverUploading] = useState(false)

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

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await apiClient.get(`/admin/posts`)
        const all  = res.data.data
        const post = all.find(p => p.id === parseInt(id))
        if (!post) throw new Error('Not found')
        setForm({
          title:     post.title     || '',
          excerpt:   post.excerpt   || '',
          content:   post.content   || '',
          image_url: post.image_url || '',
          gallery:   post.gallery   || [],
          category:  post.category  || 'news',
          type:      post.type      || 'post',
          published: post.published || false,
          rating:    post.rating    || '',
          reviews:   post.reviews   || '',
          price:     post.price     || '',
        })
      } catch (err) {
        setError('Failed to load post.')
      } finally {
        setFetching(false)
      }
    }
    fetchPost()
  }, [id])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
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
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await apiClient.put(`/posts/${id}`, form)
      setSuccess('Post updated successfully!')
      setTimeout(() => navigate('/admin/dashboard'), 1200)
    } catch (err) {
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat()
        setError(messages.join(' '))
      } else {
        setError('Failed to update post.')
      }
    } finally {
      setLoading(false)
    }
  }

  const isTourOrHotel = ['tour', 'hotel'].includes(form.category)

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading post...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Bar */}
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow">
        <h1 className="text-uganda-yellow font-black text-lg">
          ShowMe<span className="text-white">Uganda</span>
          <span className="text-gray-400 font-normal text-sm ml-2">Edit Post</span>
        </h1>
        <RouterLink
          to="/admin/dashboard"
          className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          ← Back
        </RouterLink>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* ── Left: Main Content ── */}
            <div className="md:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
                <h2 className="font-bold text-gray-900 text-lg">Edit Content</h2>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl">
                    {success}
                  </div>
                )}

                <Field label="Title" hint="required">
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Excerpt" hint="short summary">
                  {/* ── REPLACED textarea with RichTextEditor ── */}
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

                <Field label="Content" hint="full article body">
                  {/* ── REPLACED textarea with RichTextEditor ── */}
                  <RichTextEditor
                    value={form.content}
                    onChange={(html) => setForm(prev => ({ ...prev, content: html }))}
                    placeholder="Write your full content here…"
                    minHeight="300px"
                  />
                </Field>
              </div>

              {/* ── PHOTOS SECTION ── */}
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">Photos</h2>
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

              {/* ── Pricing & Rating — only shown for tour or hotel ── */}
              {isTourOrHotel && (
                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
                  <div>
                    <h2 className="font-bold text-gray-900 text-lg">Pricing & Rating</h2>
                    <p className="text-xs text-gray-400 mt-0.5">These appear on the card shown to visitors</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Rating" hint="0.0 – 5.0">
                      <input
                        type="number"
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g. 4.9"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </Field>

                    <Field label="Number of Reviews">
                      <input
                        type="number"
                        name="reviews"
                        value={form.reviews}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g. 2847"
                        min="0"
                      />
                    </Field>
                  </div>

                  <Field
                    label="Price"
                    hint={form.category === 'tour' ? 'shown as "from X per person"' : 'shown as "from X"'}
                  >
                    <input
                      type="text"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder={form.category === 'tour' ? 'e.g. $700' : 'e.g. $450/night'}
                    />
                  </Field>

                  {/* Star preview */}
                  {form.rating && (
                    <div className="flex items-center gap-3 pt-1">
                      <Stars rating={parseFloat(form.rating)} />
                      {form.reviews && (
                        <span className="text-xs text-gray-400">
                          ({Number(form.reviews).toLocaleString()} reviews)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Right: Settings ── */}
            <div className="space-y-5">

              {/* Publish */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">Publish</h3>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Status</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {form.published ? 'Visible to public' : 'Saved as draft'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="published"
                      checked={form.published}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white font-bold py-2.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm"
                >
                  {loading ? 'Saving...' : '💾 Update Post'}
                </button>
              </div>

              {/* Category */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">Classification</h3>
                <div className="space-y-4">
                  <Field label="Category">
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="news">📰 News</option>
                      <option value="tour">🦍 Tour</option>
                      <option value="hotel">🏨 Hotel</option>
                      <option value="event">🎉 Event</option>
                      <option value="conservation">🌿 Conservation</option>
                      <option value="directory">📍 Directory</option>
                    </select>
                  </Field>

                  <Field label="Type">
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="post">Post</option>
                      <option value="listing">Listing</option>
                      <option value="itinerary">Itinerary</option>
                    </select>
                  </Field>
                </div>
              </div>

              {/* Image */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">Featured Image</h3>
                <Field label="Image URL">
                  <input
                    type="text"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="https://..."
                  />
                </Field>
                {form.image_url && (
                  <div className="mt-3 rounded-xl overflow-hidden h-36">
                    <img
                      src={form.image_url}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onError={e => e.target.style.display = 'none'}
                    />
                  </div>
                )}
              </div>

              {/* Live Card Preview */}
              <CardPreview form={form} />

            </div>
          </div>
        </form>
      </div>
    </div>
  )
}