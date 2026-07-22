import DOMPurify from 'dompurify'

export default function PostContent({ html }) {
  const clean = DOMPurify.sanitize(html)
  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}