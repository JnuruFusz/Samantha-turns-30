import { useEffect, useRef } from 'react'

const STARS = 3

// The welcome-screen lucha mask, animated procedurally. Each frame:
//   - an idle Lissajous path (x and y sway at different frequencies) gives it a lazy figure-eight float,
//   - a damped spring eases its tilt toward the pointer, so it turns to "look" at you,
//   - its hard shadow slides opposite the tilt, like light from the top-left,
//   - three stars orbit on a tilted ellipse, shrinking and slipping behind the mask on the far side.
// Everything is written straight to CSS variables, so React never re-renders. Reduced motion leaves it still.
export default function MaskMedallion() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const stars = [...root.querySelectorAll('.mask-star')]
    const target = { x: 0, y: 0 } // pointer offset, -1..1
    const tilt = { x: 0, y: 0, vx: 0, vy: 0 } // spring state, degrees
    let frame = 0
    let last = performance.now()
    let running = true

    const onPointer = (event) => {
      const box = root.getBoundingClientRect()
      const cx = box.left + box.width / 2
      const cy = box.top + box.height / 2
      target.x = Math.max(-1, Math.min(1, (event.clientX - cx) / (window.innerWidth / 2)))
      target.y = Math.max(-1, Math.min(1, (event.clientY - cy) / (window.innerHeight / 2)))
    }
    const onLeave = () => {
      target.x = 0
      target.y = 0
    }

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const t = now / 1000

      // Idle figure-eight plus the pointer's pull.
      const goalY = 9 * Math.sin(t * 1.1) + 16 * target.x
      const goalX = -6 * Math.sin(t * 1.7) - 12 * target.y

      // Damped spring toward the goal (stiffness 60, damping 9).
      tilt.vy += (60 * (goalY - tilt.y) - 9 * tilt.vy) * dt
      tilt.vx += (60 * (goalX - tilt.x) - 9 * tilt.vx) * dt
      tilt.y += tilt.vy * dt
      tilt.x += tilt.vx * dt

      const bob = 5 * Math.sin(t * 2.2)
      const breathe = 1 + 0.018 * Math.sin(t * 2.2 + Math.PI / 2)

      root.style.setProperty('--tilt-x', `${tilt.x.toFixed(2)}deg`)
      root.style.setProperty('--tilt-y', `${tilt.y.toFixed(2)}deg`)
      root.style.setProperty('--bob', `${bob.toFixed(2)}px`)
      root.style.setProperty('--breathe', breathe.toFixed(4))
      // Shadow slides opposite the tilt and grows as the mask floats up.
      root.style.setProperty('--shadow-x', `${(6 - tilt.y * 0.35).toFixed(2)}px`)
      root.style.setProperty('--shadow-y', `${(6 + tilt.x * 0.35 - bob * 0.4).toFixed(2)}px`)

      const radius = root.offsetWidth / 2
      stars.forEach((star, i) => {
        const angle = t * 0.9 + (i * 2 * Math.PI) / STARS
        const depth = Math.sin(angle) // 1 = front, -1 = behind
        const x = Math.cos(angle) * radius * 1.12
        const y = depth * radius * 0.28 - radius * 0.18
        const scale = 0.7 + 0.3 * (depth + 1) / 2
        star.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${scale.toFixed(3)}) rotate(${(angle * 57.3).toFixed(0)}deg)`
        star.style.zIndex = depth > 0 ? 2 : 0
        star.style.opacity = (0.55 + 0.45 * (depth + 1) / 2).toFixed(2)
      })

      if (running) frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running && frame) return
      running = true
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
      frame = 0
    }

    // Only animate while the mask is on screen.
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    observer.observe(root)
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="welcome-mask" ref={rootRef}>
      <div className="mask-face">
        <img src="/art/lucha-mask.png" alt="A red and blue lucha libre mask" />
      </div>
      {Array.from({ length: STARS }, (_, i) => (
        <span key={i} className="mask-star" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}
