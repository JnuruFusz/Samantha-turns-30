export function Character({ name, alt, className = '' }) {
  return <img className={`character ${className}`} src={`/characters/${name}.png`} alt={alt} />
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
