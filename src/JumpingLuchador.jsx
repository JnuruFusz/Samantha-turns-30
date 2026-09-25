import { useEffect, useRef } from 'react'

const PERIOD = 1.5 // seconds per hop
const HEIGHT = 0.42 // jump height as a share of the luchador's own height

// Procedural hop loop. Each cycle: crouch (squash), launch (stretch), a sine-arc flight with a
// little spin and cape flutter, then a landing squash that springs back. The ground shadow
// shrinks and fades as he rises. Values go straight to CSS variables; reduced motion keeps him still.
export default function JumpingLuchador({ className = '' }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0
    const start = performance.now()

    const tick = (now) => {
      const size = root.offsetHeight
      const p = (((now - start) / 1000) % PERIOD) / PERIOD // 0..1 through the hop

      let lift = 0 // 0 on the ground, 1 at the top
      let squash = 0 // + squashed flat, - stretched tall
      let spin = 0
      if (p < 0.14) {
        // crouch
        squash = Math.sin((p / 0.14) * Math.PI) * 0.16
      } else if (p < 0.8) {
        const u = (p - 0.14) / 0.66
        lift = Math.sin(u * Math.PI)
        squash = -0.1 * Math.cos(u * Math.PI) * (u < 0.5 ? 1 : 0) // stretch on the way up
        spin = 5 * Math.sin(u * Math.PI * 2)
      } else {
        // land and spring back (damped)
        const u = (p - 0.8) / 0.2
        squash = 0.2 * Math.exp(-5 * u) * Math.cos(u * Math.PI * 2.5)
      }

      const flutter = lift > 0 ? 3 * Math.sin(now / 90) : 0
      root.style.setProperty('--jump-y', `${(-lift * HEIGHT * size).toFixed(1)}px`)
      root.style.setProperty('--jump-sx', (1 + squash * 0.6).toFixed(3))
      root.style.setProperty('--jump-sy', (1 - squash).toFixed(3))
      root.style.setProperty('--jump-spin', `${spin.toFixed(2)}deg`)
      root.style.setProperty('--jump-skew', `${flutter.toFixed(2)}deg`)
      root.style.setProperty('--shadow-scale', (1 - 0.55 * lift).toFixed(3))
      root.style.setProperty('--shadow-alpha', (0.35 - 0.2 * lift).toFixed(3))
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame)
      if (entry.isIntersecting) frame = requestAnimationFrame(tick)
    })
    observer.observe(root)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={`jumper ${className}`} ref={rootRef} aria-hidden="true">
      <span className="jumper-shadow" />
      <img src="/art/luchador-jump.webp" alt="" />
    </div>
  )
}
