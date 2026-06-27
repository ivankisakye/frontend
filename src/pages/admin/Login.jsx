import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../services/apiClient'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form,     setForm]     = useState({ email: '', password: '' })
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await apiClient.post('/login', form)
      localStorage.setItem('admin_token', res.data.token)
      localStorage.setItem('admin_user', JSON.stringify(res.data.admin))
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1f25 0%, #1a3a47 50%, #0d1f25 100%)' }}
    >
      {/* ── Decorative background circles ── */}
      <div
        className="absolute top-[-120px] right-[-120px] w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,115,26,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-100px] left-[-100px] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(42,107,124,0.2) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-[-60px] w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,115,26,0.06) 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-md relative z-10">

        {/* ── Logo block ── */}
        <div className="text-center mb-8">
          {/* Icon mark */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #E8731A, #f59e0b)' }}
          >
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>

          {/* Wordmark */}
          <div className="flex items-baseline justify-center gap-0.5 mb-1">
            <span className="font-black text-2xl tracking-tight" style={{ color: '#2A6B7C' }}>
              Show
            </span>
            <span className="font-black text-2xl tracking-tight" style={{ color: '#E8731A' }}>
              Me
            </span>
            <span className="font-black text-2xl tracking-tight text-white ml-1">
              Uganda
            </span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Content Management System
          </p>
        </div>

        {/* ── Glass card ── */}
        <div
          className="rounded-3xl p-8 relative"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
          }}
        >
          {/* Card header */}
          <div className="mb-7">
            <h2 className="text-white font-black text-2xl leading-none">
              Welcome back
            </h2>
            <p className="text-white/40 text-sm mt-1.5">
              Sign in to manage your content
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="flex items-center gap-3 text-sm px-4 py-3 rounded-2xl mb-6"
              style={{
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#fca5a5',
              }}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="gabriel@showmeuganda.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm text-white placeholder-white/25 focus:outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#E8731A'
                    e.target.style.background  = 'rgba(232,115,26,0.08)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.target.style.background  = 'rgba(255,255,255,0.07)'
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl text-sm text-white placeholder-white/25 focus:outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#E8731A'
                    e.target.style.background  = 'rgba(232,115,26,0.08)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.target.style.background  = 'rgba(255,255,255,0.07)'
                  }}
                />
                {/* Show/hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#E8731A'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                >
                  {showPass ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all hover:opacity-90 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                style={{
                  background: loading
                    ? 'rgba(232,115,26,0.6)'
                    : 'linear-gradient(135deg, #E8731A, #f59e0b)',
                  color: 'white',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(232,115,26,0.4)',
                }}
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />

                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Secure Access
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="rgba(255,255,255,0.25)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Protected by token-based authentication
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-1">
          <a
            href="/"
            className="text-xs font-semibold transition-colors block"
            style={{ color: 'rgba(255,255,255,0.25)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#E8731A'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
          >
            ← Back to ShowMeUganda.com
          </a>
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
            © {new Date().getFullYear()} ShowMeUganda. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  )
}