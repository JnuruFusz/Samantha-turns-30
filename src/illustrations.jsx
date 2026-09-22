export function Character({ name, alt, className = '' }) {
  return <img className={`character ${className}`} src={`/characters/${name}.png`} alt={alt} />
}

export function TicketStar({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#FFFDF8" />
      <path d="M24 10 27 20h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z" fill="#F4C43A" />
    </svg>
  )
}
