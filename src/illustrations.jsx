export function NachoMascot({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
      <circle cx="80" cy="80" r="76" fill="#FFFDF8" />
      <path d="M36 108c10-44 78-44 88 0 3 12-8 24-22 28H58c-14-4-25-16-22-28z" fill="#F4C43A" stroke="#1C120C" strokeWidth="3" />
      <path d="M48 104c8-8 56-8 64 0-4 12-18 18-32 18s-28-6-32-18z" fill="#6FBF3A" />
      <path d="M56 100c6-4 32-4 40 0-2 8-12 12-20 12s-18-4-20-12z" fill="#C75B2A" />
      <circle cx="62" cy="98" r="3.2" fill="#E23A32" />
      <circle cx="80" cy="94" r="3.2" fill="#E23A32" />
      <circle cx="98" cy="98" r="3.2" fill="#E23A32" />
      <circle cx="68" cy="78" r="3" fill="#1C120C" />
      <circle cx="92" cy="78" r="3" fill="#1C120C" />
      <path d="M70 90c6 6 14 6 20 0" fill="none" stroke="#1C120C" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="104" cy="86" r="3" fill="#F4A18A" />
    </svg>
  )
}

export function MargaritaMascot({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
      <circle cx="80" cy="80" r="76" fill="#FFFDF8" />
      <path d="M56 128h48" stroke="#1C120C" strokeWidth="4" strokeLinecap="round" />
      <path d="M80 92v36" stroke="#1C120C" strokeWidth="4" />
      <path d="M48 54c0-8 64-8 64 0 2 18-10 30-32 30S46 72 48 54z" fill="#7BC143" stroke="#1C120C" strokeWidth="3" />
      <path d="M52 48h56" stroke="#F4C43A" strokeWidth="6" strokeLinecap="round" />
      <circle cx="68" cy="62" r="3" fill="#1C120C" />
      <circle cx="92" cy="62" r="3" fill="#1C120C" />
      <path d="M72 74c5 5 11 5 16 0" fill="none" stroke="#1C120C" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="44" cy="70" r="7" fill="#7BC143" stroke="#1C120C" strokeWidth="2.4" />
      <circle cx="116" cy="70" r="7" fill="#7BC143" stroke="#1C120C" strokeWidth="2.4" />
    </svg>
  )
}

export function ChurroMascot({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
      <circle cx="80" cy="80" r="76" fill="#FFFDF8" />
      <rect x="64" y="28" width="32" height="104" rx="14" fill="#E39A3A" stroke="#1C120C" strokeWidth="3" />
      <path d="M72 40v80M80 38v84M88 40v80" stroke="#C67A1C" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="72" cy="68" r="2.6" fill="#1C120C" />
      <circle cx="88" cy="68" r="2.6" fill="#1C120C" />
      <path d="M74 80c4 4 8 4 12 0" fill="none" stroke="#1C120C" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M64 86c-12 2-16-10-10-20" fill="none" stroke="#1C120C" strokeWidth="3" strokeLinecap="round" />
      <path d="M96 86c12 2 16-10 10-20" fill="none" stroke="#1C120C" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function Sunburst({ className = '' }) {
  const rays = 32
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="100" height="100" fill="#FFF6E4" />
      {Array.from({ length: rays }, (_, i) => (
        <path
          key={i}
          d="M50 50 L47.6 -18 L52.4 -18 Z"
          transform={`rotate(${(i * 360) / rays} 50 50)`}
          fill={i % 2 === 0 ? '#F7E2A8' : '#F8D2C2'}
        />
      ))}
    </svg>
  )
}

export function TicketStar({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#FFFDF8" />
      <path d="M24 10 27 20h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z" fill="#F4C43A" />
    </svg>
  )
}
