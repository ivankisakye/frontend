import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../../services/apiClient'

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }) {
  return (
    <div className={`${color} rounded-2xl p-5 flex items-center gap-4`}>
      <span className="text-3xl">{icon}</span>
      <div>
        <div className="text-2xl font-black text-gray-900">{value}</div>
        <div className="text-sm text-gray-600 font-medium">{label}</div>
      </div>
    </div>
  )
}

// ─── Post Row ─────────────────────────────────────────────────────────────────
function PostRow({ post, onDelete }) {
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!window.confirm(`Delete "${post.title}"?`)) return
    setDeleting(true)
    try {
      await apiClient.delete(`/posts/${post.id}`)
      onDelete(post.id)
    } catch (err) {
      alert('Failed to delete post.')
    } finally {
      setDeleting(false)
    }
  }

  const categoryColors = {
    news:         'bg-blue-100 text-blue-700',
    tour:         'bg-green-100 text-green-700',
    hotel:        'bg-purple-100 text-purple-700',
    event:        'bg-yellow-100 text-yellow-700',
    conservation: 'bg-emerald-100 text-emerald-700',
    directory:    'bg-orange-100 text-orange-700',
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="font-medium text-gray-900 text-sm line-clamp-1">{post.title}</div>
        <div className="text-xs text-gray-400 mt-0.5">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
          {post.category}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {post.published ? 'Published' : 'Draft'}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/edit/${post.id}`}
            className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {deleting ? '...' : 'Delete'}
          </button>
        </div>
      </td>
    </tr>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate  = useNavigate()
  const [posts, setPosts]   = useState([])
  const [stats, setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const admin = JSON.parse(localStorage.getItem('admin_user') || '{}')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [postsRes, statsRes] = await Promise.all([
        apiClient.get('/admin/posts'),
        apiClient.get('/admin/stats'),
      ])
      setPosts(postsRes.data.data)
      setStats(statsRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleDelete(id) {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  async function handleLogout() {
    try {
      await apiClient.post('/logout')
    } catch (_) {}
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login')
  }

  const filtered = posts
    .filter(p => filter === 'all' || p.category === filter)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Bar */}
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow">
        <h1 className="text-uganda-yellow font-black text-lg">
          ShowMe<span className="text-white">Uganda</span>
          <span className="text-gray-400 font-normal text-sm ml-2">Admin</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm hidden md:block">
            👋 {admin.name}
          </span>
          <Link
            to="/"
            target="_blank"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Posts"   value={stats.total}       icon="📝" color="bg-white shadow-sm" />
            <StatCard label="Published"     value={stats.published}   icon="✅" color="bg-green-50" />
            <StatCard label="Drafts"        value={stats.unpublished} icon="📋" color="bg-yellow-50" />
            <StatCard label="Categories"    value={stats.by_category?.length || 0} icon="🗂️" color="bg-purple-50" />
          </div>
        )}

        {/* Category Breakdown */}
        {stats?.by_category && (
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Posts by Category</h3>
            <div className="flex flex-wrap gap-3">
              {stats.by_category.map(item => (
                <div key={item.category} className="bg-gray-50 rounded-xl px-4 py-2 text-sm">
                  <span className="font-semibold text-gray-700 capitalize">{item.category}</span>
                  <span className="text-gray-400 ml-2">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Table Header */}
          <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-3 justify-between">
            <h3 className="font-bold text-gray-900">All Posts</h3>
            <div className="flex flex-col md:flex-row gap-3">

              {/* Search */}
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400 w-full md:w-48"
              />

              {/* Filter */}
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              >
                <option value="all">All Categories</option>
                <option value="news">News</option>
                <option value="tour">Tour</option>
                <option value="hotel">Hotel</option>
                <option value="event">Event</option>
                <option value="conservation">Conservation</option>
                <option value="directory">Directory</option>
              </select>

              {/* New Post Button */}
              <Link
                to="/admin/create"
                className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors text-center"
              >
                + New Post
              </Link>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading posts...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-sm">No posts found.</p>
              <Link to="/admin/create" className="text-sm text-black font-semibold underline mt-2 inline-block">
                Create your first post
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(post => (
                    <PostRow key={post.id} post={post} onDelete={handleDelete} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}