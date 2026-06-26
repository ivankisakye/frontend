// src/components/WhatsApp.jsx - No icons needed!
import React, { useState, useRef, useEffect } from 'react'

export default () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey there! 👋', isOwn: false, time: '10:30 AM', read: true },
    { id: 2, text: 'Hi! How are you?', isOwn: true, time: '10:32 AM', read: true },
    { id: 3, text: "I'm great! Working on a new project 🚀", isOwn: false, time: '10:33 AM', read: true },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMsg = {
      id: Date.now(),
      text: input.trim(),
      isOwn: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    }

    setMessages([...messages, newMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const replies = [
        "That's interesting! Tell me more 😊",
        'Got it! 👍',
        'Awesome! Keep going 🎉',
        'I see what you mean!',
        'Cool! 😎'
      ]
      const reply = {
        id: Date.now() + 1,
        text: replies[Math.floor(Math.random() * replies.length)],
        isOwn: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      }
      setMessages(prev => [...prev, reply])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 420,
      margin: 'auto',
      background: '#ece5dd',
      fontFamily: 'Segoe UI, sans-serif',
      boxShadow: '0 0 20px rgba(0,0,0,0.2)'
    }}>
      <div style={{
        background: '#075e54',
        color: '#fff',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#128c7e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 'bold'
        }}>J</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>John Doe</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            {isTyping ? 'typing...' : 'online'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 15, fontSize: 20 }}>
          <span>📞</span>
          <span>📹</span>
          <span>⋮</span>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '15px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZGRkZGRkIiBmaWxsLW9wYWNpdHk9IjAuMjAiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2c+PC9zdmc+")',
        backgroundSize: '40px 40px'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.isOwn ? 'flex-end' : 'flex-start',
              animation: 'slideIn 0.3s ease'
            }}
          >
            <div style={{
              maxWidth: '75%',
              background: msg.isOwn ? '#dcf8c6' : '#fff',
              padding: '8px 12px',
              borderRadius: msg.isOwn ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
              boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: 14.5, wordWrap: 'break-word' }}>{msg.text}</div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 4,
                marginTop: 4,
                fontSize: 10,
                color: '#667781'
              }}>
                <span>{msg.time}</span>
                {msg.isOwn && (
                  <span style={{ color: msg.read ? '#53bdeb' : '#8696a0' }}>
                    {msg.read ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              background: '#fff',
              padding: '10px 15px',
              borderRadius: '8px 8px 8px 2px',
              boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
            }}>
              <span style={{ display: 'flex', gap: 4 }}>
                <span style={{ animation: 'dot 1.4s infinite', animationDelay: '0s' }}>•</span>
                <span style={{ animation: 'dot 1.4s infinite', animationDelay: '0.2s' }}>•</span>
                <span style={{ animation: 'dot 1.4s infinite', animationDelay: '0.4s' }}>•</span>
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={sendMessage} style={{
        display: 'flex',
        padding: '8px 12px',
        background: '#f0f0f0',
        gap: 8,
        alignItems: 'center',
        borderTop: '1px solid #d1d8db'
      }}>
        <div style={{ display: 'flex', gap: 6, fontSize: 22, color: '#54656f' }}>
          <span style={{ cursor: 'pointer' }}>😊</span>
          <span style={{ cursor: 'pointer' }}>📎</span>
        </div>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '10px 16px',
            border: 'none',
            borderRadius: 20,
            outline: 'none',
            fontSize: 14,
            background: '#fff'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 18px',
            background: input.trim() ? '#075e54' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            cursor: input.trim() ? 'pointer' : 'default',
            fontSize: 16,
            transition: 'background 0.3s'
          }}
        >
          {input.trim() ? 'Send' : '🎤'}
        </button>
      </form>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dot {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}