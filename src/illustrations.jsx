function Face({ cx, cy, scale = 1, mustache = false }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <ellipse cx="0" cy="2" rx="18" ry="16" fill="#F6C7A1" stroke="#1C120C" strokeWidth="2.4" />
      <circle cx="-6.5" cy="-1" r="1.6" fill="#1C120C" />
      <circle cx="6.5" cy="-1" r="1.6" fill="#1C120C" />
      <path d="M-5 7c3 3.4 7 3.4 10 0" fill="none" stroke="#1C120C" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="4" r="2.2" fill="#F09A86" />
      {mustache ? (
        <path
          d="M-9 5c3-3 7-3 9 0 2-3 6-3 9 0"
          fill="none"
          stroke="#1C120C"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ) : null}
    </g>
  )
}

export function WrestlerMascot({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
      <circle cx="80" cy="80" r="74" fill="#FFFDF6" stroke="#1C120C" strokeWidth="6" />
      <circle cx="80" cy="80" r="66" fill="#FFE8B8" />
      <ellipse cx="80" cy="128" rx="36" ry="14" fill="#E0362C" stroke="#1C120C" strokeWidth="2.4" />
      <path d="M52 118c4-16 14-24 28-24s24 8 28 24" fill="#E0362C" stroke="#1C120C" strokeWidth="2.4" />
      <path d="M68 108h24" stroke="#F5C518" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="80" cy="72" r="28" fill="#F6C7A1" stroke="#1C120C" strokeWidth="2.6" />
      <path d="M58 64c4-18 16-26 22-26 8 0 16 6 22 22" fill="#2A1810" stroke="#1C120C" strokeWidth="2" />
      <path d="M54 62c10-6 42-6 52 0" fill="#F5C518" stroke="#1C120C" strokeWidth="2.2" />
      <path d="M54 62c2 6 8 8 13 8s10-2 13-8" fill="#E0362C" />
      <circle cx="70" cy="72" r="2" fill="#1C120C" />
      <circle cx="90" cy="72" r="2" fill="#1C120C" />
      <path d="M68 82c4-3 8-3 12 0 4-3 8-3 12 0" fill="none" stroke="#1C120C" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M74 88c4 3.2 8 3.2 12 0" fill="none" stroke="#1C120C" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function SidekickMascot({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
      <circle cx="80" cy="80" r="74" fill="#FFFDF6" stroke="#1C120C" strokeWidth="6" />
      <circle cx="80" cy="80" r="66" fill="#FFD0C6" />
      <ellipse cx="80" cy="128" rx="34" ry="13" fill="#1C120C" />
      <path d="M54 118c5-18 14-26 26-26s21 8 26 26" fill="#1C120C" />
      <circle cx="80" cy="74" r="27" fill="#F6C7A1" stroke="#1C120C" strokeWidth="2.6" />
      <path d="M60 62c8-16 32-16 40 0v6H60z" fill="#3EB8CC" stroke="#1C120C" strokeWidth="2" />
      <circle cx="70" cy="74" r="2" fill="#1C120C" />
      <circle cx="90" cy="74" r="2" fill="#1C120C" />
      <path d="M74 86c4 3 8 3 12 0" fill="none" stroke="#1C120C" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function TacoMascot({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 180 180" width="180" height="180" aria-hidden="true">
      <ellipse cx="90" cy="158" rx="34" ry="7" fill="#1C120C" opacity="0.12" />
      <path d="M42 128c8 18 24 18 32 0" fill="none" stroke="#1C120C" strokeWidth="4" strokeLinecap="round" />
      <path d="M108 128c8 18 24 18 32 0" fill="none" stroke="#1C120C" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 104c8-46 116-46 124 0 2 14-10 28-28 34H56c-18-6-30-20-28-34z" fill="#F5C518" stroke="#1C120C" strokeWidth="3.2" />
      <path d="M40 100c10-8 90-8 100 0-6 16-26 26-50 26s-44-10-50-26z" fill="#7CB342" />
      <path d="M52 96c8-4 68-4 76 0-4 10-18 16-38 16s-34-6-38-16z" fill="#C75B39" />
      <circle cx="68" cy="98" r="4" fill="#E0362C" />
      <circle cx="90" cy="94" r="4" fill="#E0362C" />
      <circle cx="112" cy="98" r="4" fill="#E0362C" />
      <Face cx="90" cy="78" scale="1.05" />
      <path d="M28 92c-16-8-18-24-8-28" fill="none" stroke="#1C120C" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M152 92c16-8 18-24 8-28" fill="none" stroke="#1C120C" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

export function GuacMascot({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 180 180" width="180" height="180" aria-hidden="true">
      <ellipse cx="90" cy="158" rx="30" ry="7" fill="#1C120C" opacity="0.12" />
      <path d="M58 126c6 16 16 16 22 0" fill="none" stroke="#1C120C" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 126c6 16 16 16 22 0" fill="none" stroke="#1C120C" strokeWidth="4" strokeLinecap="round" />
      <path d="M90 28c28 0 52 28 52 64 0 28-18 48-52 48S38 120 38 92C38 56 62 28 90 28z" fill="#7CB342" stroke="#1C120C" strokeWidth="3.2" />
      <path d="M90 28c-8 10-10 22-6 34" fill="none" stroke="#5B8C2A" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="90" cy="86" rx="16" ry="12" fill="#F5C518" stroke="#1C120C" strokeWidth="2" />
      <circle cx="90" cy="86" r="6" fill="#6B4A2B" />
      <Face cx="90" cy="70" scale="0.92" />
      <path d="M40 78c-14-4-22-16-16-28" fill="none" stroke="#1C120C" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M140 78c14-4 22-16 16-28" fill="none" stroke="#1C120C" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

export function ChurroMascot({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 180 180" width="180" height="180" aria-hidden="true">
      <ellipse cx="90" cy="158" rx="28" ry="7" fill="#1C120C" opacity="0.12" />
      <path d="M70 128c4 16 12 16 16 0" fill="none" stroke="#1C120C" strokeWidth="4" strokeLinecap="round" />
      <path d="M96 128c4 16 12 16 16 0" fill="none" stroke="#1C120C" strokeWidth="4" strokeLinecap="round" />
      <rect x="70" y="36" width="40" height="100" rx="16" fill="#E8A23A" stroke="#1C120C" strokeWidth="3.2" />
      <path d="M78 48v76M90 46v80M102 48v76" stroke="#C67A1C" strokeWidth="3" strokeLinecap="round" />
      <Face cx="90" cy="78" scale="0.88" />
      <path d="M70 88c-16 2-24-10-18-24" fill="none" stroke="#1C120C" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M110 88c16 2 24-10 18-24" fill="none" stroke="#1C120C" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

export function Sunburst({ className = '' }) {
  const rays = 28
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: rays }, (_, i) => {
        const angle = (i * 360) / rays
        return (
          <path
            key={i}
            d="M50 50 L48.2 -8 L51.8 -8 Z"
            transform={`rotate(${angle} 50 50)`}
            fill={i % 2 === 0 ? '#FFE7C2' : '#FFD3C4'}
          />
        )
      })}
    </svg>
  )
}

export function StarBurst({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 1.6 13.6 9 21 10.4 13.6 11.8 12 19.2 10.4 11.8 3 10.4 10.4 9Z" fill="#F5C518" stroke="#1C120C" strokeWidth="1.2" />
    </svg>
  )
}
