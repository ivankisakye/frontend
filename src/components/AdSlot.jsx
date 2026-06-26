// src/components/AdSlot.jsx
export default function AdSlot({ size = 'leaderboard', className = '' }) {
  const sizes = {
    leaderboard:      { w: '100%', h: '90px',  label: 'Advertisement (728×90)'  },
    billboard:        { w: '100%', h: '250px', label: 'Advertisement (970×250)' },
    rectangle:        { w: '300px', h: '250px', label: 'Advertisement (300×250)' },
    halfpage:         { w: '300px', h: '600px', label: 'Advertisement (300×600)' },
    mobilebanner:     { w: '100%', h: '50px',  label: 'Advertisement (320×50)'  },
  }
  const s = sizes[size] || sizes.leaderboard

  return (
    <div
      className={`flex items-center justify-center mx-auto ${className}`}
      style={{
        width: s.w,
        height: s.h,
        maxWidth: s.w === '100%' ? '970px' : s.w,
        background: '#f3f4f6',
        border: '1px dashed #d1d5db',
        borderRadius: '8px',
        color: '#9ca3af',
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}
    >
      {s.label}
    </div>
  )
}