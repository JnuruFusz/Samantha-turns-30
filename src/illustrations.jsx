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
