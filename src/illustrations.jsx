export function Character({ name, alt, className = '' }) {
  return <img className={`character ${className}`} src={`/characters/${name}.png`} alt={alt} />
}

export function TicketStar({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="100" height="100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="none" stroke="#2D1E1B" strokeWidth="3" />
      <path
        d="M50 18 58.8 38.2 80.4 40.1 64.2 54.6 69 76 50 64.8 31 76 35.8 54.6 19.6 40.1 41.2 38.2Z"
        fill="none"
        stroke="#2D1E1B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <text x="50" y="56" textAnchor="middle" fontFamily="'Dela Gothic One', sans-serif" fontSize="10" fill="#2D1E1B">
        30
      </text>
    </svg>
  )
}

export function LuchaMask({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 140" aria-hidden="true">
      <path
        d="M60 6C30 6 14 32 15 64c1 34 20 62 45 70 25-8 44-36 45-70C106 32 90 6 60 6Z"
        fill="#2F68B4"
        stroke="#2D1E1B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M60 8c-7 12-9 28-6 44h12c3-16 1-32-6-44Z" fill="#C83A2A" stroke="#2D1E1B" strokeWidth="3" strokeLinejoin="round" />
      <path
        d="M18 50c10-6 22-6 30 2M102 50c-10-6-22-6-30 2"
        fill="none"
        stroke="#C83A2A"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M22 92c10 10 22 16 38 17 16-1 28-7 38-17"
        fill="none"
        stroke="#C83A2A"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M24 60c8-4 20-3 28 6-4 10-16 12-25 6-3-3-4-8-3-12Z"
        fill="#F5E8D3"
        stroke="#2D1E1B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M96 60c-8-4-20-3-28 6 4 10 16 12 25 6 3-3 4-8 3-12Z"
        fill="#F5E8D3"
        stroke="#2D1E1B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="39" cy="66" r="4" fill="#2D1E1B" />
      <circle cx="81" cy="66" r="4" fill="#2D1E1B" />
      <ellipse cx="60" cy="112" rx="11" ry="7" fill="#F5E8D3" stroke="#2D1E1B" strokeWidth="3" />
      <path d="M60 60v22" stroke="#2D1E1B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function Bolt({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
