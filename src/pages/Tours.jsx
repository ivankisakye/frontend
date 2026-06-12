import { useState, useEffect } from 'react'
import apiClient from '../services/apiClient'
import Card from '../components/Card'

export default function Tours() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [type,    setType]    = useState('all')

  useEffect(() => {
    async function fetch() {
      try {
        const res = await apiClient.get('/posts?category=tour')
        setPosts(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const filtered = posts
    .filter(p => type === 'all' || p.type === type)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <div className="bg-black text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-uganda-yellow text-xs font-bold uppercase tracking-widest">
            Adventures Await
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-2 mb-3">
            Tour Packages
          </h1>
          <p className="text-gray-400 max-w-xl">
            Handpicked tours and itineraries across Uganda's most breathtaking destinations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Search tours..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-80 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400"
          />
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="all">All Types</option>
            <option value="post">Post</option>
            <option value="itinerary">Itinerary</option>
            <option value="listing">Listing</option>
          </select>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🦍</p>
            <p className="text-sm">No tours found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <Card key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}