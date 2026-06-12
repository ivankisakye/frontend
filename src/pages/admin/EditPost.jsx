import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import apiClient from '../../services/apiClient'

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

export default function EditPost() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState('')

  const [form, setForm] = useState({
    title:     '',
    excerpt:   '',
    content:   '',
    image_url: '',
    category:  'news',
    type:      'post',
    published: false,
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
          category:  post.category  || 'news',
          type:      post.type      || 'post',
          published: post.published || false,
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
        <Link
          to="/admin/dashboard"
          className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          ← Back
        </Link>
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
                  <textarea
                    name="excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    className={inputClass}
                    rows={3}
                  />
                </Field>

                <Field label="Content" hint="full article body">
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    className={inputClass}
                    rows={12}
                  />
                </Field>
              </div>
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

            </div>
          </div>
        </form>
      </div>
    </div>
  )
}