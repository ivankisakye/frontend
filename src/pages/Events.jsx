import { useState, useEffect } from 'react'
import apiClient from '../services/apiClient'
import Card from '../components/Card'

export default function Events() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')

  useEffect(() => {
    async function fetch() {
      try {
        const res = await apiClient.get('/posts?category=event')
        setPosts(res.data.data)
      } catch (err) { console.error(err) }
      finally { setLoading(false) }
    }
    fetch()
  }, [])

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-uganda-yellow text-xs font-bold uppercase tracking-widest">
            What's Happening
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-2 mb-3">Events</h1>
          <p className="text-gray-400 max-w-xl">
            Discover festivals, cultural events, and experiences happening across Uganda.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-80 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🎉</p>
            <p className="text-sm">No events listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => <Card key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </div>
  )
}