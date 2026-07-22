import { Link } from 'react-router-dom'

import DOMPurify from 'dompurify'

export default function Card({ post }) {
  const categoryColors = {
    news:         'bg-blue-100 text-blue-700',
    tour:         'bg-green-100 text-green-700',
    hotel:        'bg-purple-100 text-purple-700',
    event:        'bg-uganda-yellow text-black',
    conservation: 'bg-emerald-100 text-emerald-700',
    directory:    'bg-orange-100 text-orange-700',
  }

  return (
    <Link to={`/post/${post.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">

        {/* Image */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <span className="text-gray-400 text-4xl">🇺🇬</span>
            </div>
          )}

          {/* Category badge */}
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-uganda-red transition-colors">
            {post.title}
          </h3>




          {post.excerpt && (
            <div
              className="text-gray-500 text-sm line-clamp-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}
            />
          )}




          <div className="mt-3 text-xs text-gray-400">
            {new Date(post.created_at).toLocaleDateString('en-UG', {
              day: 'numeric', month: 'short', year: 'numeric'
            })}
          </div>
        </div>
      </div>
    </Link>
  )
}