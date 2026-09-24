import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { feast, links, marquee, party, ringNameParts, schedule, story } from './content'
import { Bolt, Character, LuchaMask, TicketStar } from './illustrations'

function encode(data) {
  return new URLSearchParams(data).toString()
}

function Wordmark({ size }) {
  return (
    <p className={`wordmark ${size}`}>
      <span>Nacho Average</span>
      <span>30th Fiesta</span>
    </p>
  )
}

function CalendarLinks({ className = '' }) {
  return (
    <div className={`calendar-links ${className}`}>
      <a className="chip-btn" href={links.googleCalendar} target="_blank" rel="noreferrer">
        Google Calendar
      </a>
      <a className="chip-btn" href={links.calendarFile} download="sammi-30th.ics">
        Apple / Outlook
      </a>
    </div>
  )
}

const isApple = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)

function CalendarSheet() {
  const [open, setOpen] = useState(false)
  const sheetRef = useRef(null)

  // While the sheet is up: lock page scroll, focus the first choice, and let Escape close it.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    sheetRef.current.querySelector('.sheet-btn').focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const apple = (
    <a key="apple" className="sheet-btn" href={links.calendarFile} download="sammi-30th.ics" onClick={() => setOpen(false)}>
      Apple / Outlook
    </a>
  )
  const google = (
    <a
      key="google"
      className="sheet-btn"
      href={links.googleCalendar}
      target="_blank"
      rel="noreferrer"
      onClick={() => setOpen(false)}
    >
      Google Calendar
    </a>
  )
  const choices = isApple ? [apple, google] : [google, apple]

  return (
    <>
      <button type="button" className="chip-btn" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        Add to calendar
      </button>
      {/* Portal to <body>: the welcome screen's entrance animation would otherwise trap the fixed sheet inside it. */}
      {open &&
        createPortal(
          <div className="sheet-backdrop" onClick={() => setOpen(false)}>
            <div
              className="sheet"
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="sheet-title"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="sheet-title" id="sheet-title">
                Add to your calendar
              </p>
              <p className="sheet-when">
                {party.celebratingLong} · {party.timeShort}
                <br />
                {party.street}, {party.city}
              </p>
              <div className="sheet-choices">
                {choices}
              </div>
              <button type="button" className="sheet-cancel" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

function RegistryLink({ className = 'chip-btn' }) {
  return (
    <a className={className} href={links.registry} target="_blank" rel="noreferrer">
      Gift registry ↗
    </a>
  )
}

function Address() {
  return (
    <>
      {party.city} ·{' '}
      <a className="directions" href={links.directions} target="_blank" rel="noreferrer">
        Directions
      </a>
    </>
  )
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function rollRingName(current) {
  const { titles, firsts, lasts } = ringNameParts
  let name = current
  while (name === current) name = `${pick(titles)} ${pick(firsts)} ${pick(lasts)}`
  return name
}

function RsvpForm() {
  const [attending, setAttending] = useState('Yes')
  const [status, setStatus] = useState('idle')
  const [ringName, setRingName] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = {
      'form-name': 'rsvp',
      name: form.name.value,
      attending,
      guests: form.guests.value,
      costume: form.costume.value,
      notes: form.notes.value,
      message: form.message.value,
    }

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data),
      })
      setStatus('sent')
      form.reset()
      setRingName('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    const coming = attending !== 'No'
    return (
      <div className="form success" role="status">
        <h3>{coming ? 'You\u2019re on the card!' : 'Thanks for letting us know'}</h3>
        <p>
          {coming
            ? `See you ${party.celebratingShort} at ${party.timeShort}. Lock it into your calendar:`
            : 'We\u2019ll miss you in the ring. You can still send Sammi some love:'}
        </p>
        {coming && <CalendarLinks />}
        <RegistryLink className="btn" />
      </div>
    )
  }

  return (
    <form className="form" name="rsvp" method="POST" data-netlify="true" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="rsvp" />
      <input type="hidden" name="attending" value={attending} />
      <p className="sr-only" aria-hidden="true">
        <label>
          Don’t fill this out: <input name="bot-field" tabIndex={-1} />
        </label>
      </p>
      <div className="gate-head">
        <p className="gate-label">Official entry gate</p>
        <p className="gate-sub">Fiesta commission licensed registration</p>
      </div>
      <hr />
      <label>
        <span>Your name</span>
        <input name="name" required placeholder="First and last name" />
      </label>
      <div className="field-row">
        <div>
          <span className="field-label">Are you coming?</span>
          <div className="choice" role="group" aria-label="Are you coming?">
            {['Yes', 'No', 'Maybe'].map((option) => (
              <button
                key={option}
                type="button"
                className={attending === option ? 'active' : ''}
                onClick={() => setAttending(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <label>
          <span>Tag-team size (total guests)</span>
          <select name="guests" defaultValue="1">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n === 1 ? 'Just me (solo wrestler)' : `${n} luchadores`}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <div className="ring-name-head">
          <label className="field-label" htmlFor="ring-name">
            Ring name
          </label>
          <button type="button" className="roll-btn" onClick={() => setRingName(rollRingName(ringName))}>
            <span aria-hidden="true">🎲</span> Roll one
          </button>
        </div>
        <input
          id="ring-name"
          name="costume"
          placeholder="Optional, or tap Roll one"
          value={ringName}
          onChange={(event) => setRingName(event.target.value)}
        />
      </div>
      <label>
        <span>Food notes</span>
        <input name="notes" placeholder="Allergies or anything we should know" />
      </label>
      <label>
        <span>Birthday message</span>
        <textarea name="message" placeholder="Sweet, funny, or both..." />
      </label>
      <button className="btn" type="submit">
        Book my ring spot!
      </button>
      {status === 'error' && <p>Something went wrong. Try again, or text us your RSVP.</p>}
    </form>
  )
}

function Welcome({ sectionRef }) {
  return (
    <section className="welcome" id="welcome" ref={sectionRef} data-chip-watch="welcome">
      <p className="welcome-bg" aria-hidden="true">
        Gran lucha libre · Gran lucha libre · Gran lucha libre
      </p>
      <div className="welcome-inner">
        <p className="welcome-tag">★ Official championship invitation ★</p>
        <p className="welcome-intro">You&apos;re invited to {party.nickname}&apos;s</p>
        <h1 className="welcome-title">
          <span>Nacho Average</span>
          <span className="welcome-thirty">
            <Bolt className="welcome-bolt" />
            30th
            <Bolt className="welcome-bolt" />
          </span>
        </h1>
        <p className="welcome-sub">A Nacho Libre-inspired birthday fiesta</p>
        <div className="welcome-art">
          <p className="welcome-badge">
            Cold drinks
            <small>Lemonade &amp; sodas</small>
          </p>
          <div className="welcome-mask">
            <LuchaMask />
          </div>
          <p className="welcome-badge">
            Best costume
            <small>Wins a trophy</small>
          </p>
        </div>
        <div className="welcome-name">
          <p>
            Samantha <span>turns 30!</span>
          </p>
          <p>And she is the champion of this fiesta</p>
        </div>
        <div className="welcome-actions">
          <a className="welcome-btn primary" href="#rsvp">
            RSVP now
          </a>
          <a className="welcome-btn secondary" href="#story">
            See {party.nickname}&apos;s story ↓
          </a>
        </div>
        <div className="welcome-extras">
          <CalendarSheet />
          <RegistryLink />
        </div>
        <p className="welcome-date">
          {party.celebratingShort} · {party.timeShort} · St. Louis
        </p>
      </div>
    </section>
  )
}

// Chapters appear in order as guests scroll, like watching Sammi grow up. On phones a
// rope line down the middle fills in behind them. Without motion, everything just shows.
function StoryReel() {
  const listRef = useRef(null)
  const [animated, setAnimated] = useState(false)
  const [seen, setSeen] = useState(() => new Set())

  useEffect(() => {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }
    const list = listRef.current
    setAnimated(true)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          observer.unobserve(entry.target)
          setSeen((current) => new Set(current).add(entry.target.dataset.id))
        }
      },
      { threshold: 0.25 },
    )
    list.querySelectorAll('.story-card').forEach((card) => observer.observe(card))

    let frame = 0
    const update = () => {
      frame = 0
      const box = list.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - box.top) / box.height))
      list.style.setProperty('--progress', progress.toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <ol className={`story${animated ? ' is-animated' : ''}`} ref={listRef}>
      {story.map((item, index) => (
        <li
          key={item.id}
          data-id={item.id}
          className={`story-card${seen.has(item.id) ? ' is-in' : ''}`}
          style={{ '--delay': `${(index % 4) * 120}ms` }}
        >
          <img src={item.src} alt={`${party.nickname}: ${item.title}`} loading="lazy" />
          <div className="story-text">
            <p className="story-chapter">{item.chapter}</p>
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function Invite() {
  return (
    <section className="invite">
      <div className="invite-poster">
        <p className="invite-tag">
          <span className="wide-only">★ Official championship invitation ★</span>
          <span className="narrow-only">★ Heavyweight birthday fiesta ★</span>
        </p>
        <h2 className="invite-title">
          <span>Nacho Average</span>
          <span>30th Fiesta</span>
        </h2>
        <div className="invite-bout">
          <div className="invite-mascot">
            <Character name="taco-walk" alt="Nacho the taco" />
          </div>
          <p className="invite-vs" aria-hidden="true">
            VS
          </p>
          <div className="invite-mascot">
            <Character name="pepper" alt="The chili pepper" />
          </div>
        </div>
        <div className="invite-celebrant">
          <p>
            <span className="wide-only">Featuring the heavyweight champion</span>
            <span className="narrow-only">Starring the champion</span>
          </p>
          <p className="invite-name">
            <span className="wide-only">Samantha turns 30!</span>
            <span className="narrow-only">Samantha!</span>
          </p>
        </div>
      </div>

      <div className="invite-ticket">
        <div className="invite-ticket-head">
          <h2>The Main Event</h2>
          <p>Fiesta commission licensed</p>
        </div>
        <hr />
        <div className="invite-details">
          <div>
            <p className="invite-label">Date &amp; time</p>
            <p className="invite-value">{party.celebratingShort}</p>
            <p className="invite-note">{party.time}</p>
          </div>
          <div>
            <p className="invite-label">Arena location</p>
            <p className="invite-value">{party.street}</p>
            <p className="invite-note">
              <Address />
            </p>
          </div>
          <div className="invite-attire">
            <p>★ Attire in the ring ★</p>
            <p>Lucha libre masks, bright capes, or festive retro party wear highly encouraged!</p>
          </div>
        </div>
        <hr />
        <div className="invite-cta">
          <a className="invite-btn" href="#rsvp">
            <span className="wide-only">Claim your ring spot!</span>
            <span className="narrow-only">Claim your spot</span>
          </a>
          <p>Admit one luchador · Ready to rumble!</p>
        </div>
      </div>
    </section>
  )
}

function Hero() {
  return (
    <section className="hero" id="fiesta">
      <img className="hero-sunburst" src="/sunburst.svg" alt="" />
      <p className="hero-ribbon">★ The main event of the decade ★</p>
      <h2 className="hero-title">
        <span>Nacho Average</span>
        <span>30th Fiesta</span>
      </h2>
      <p className="hero-pill">A Nacho Libre-inspired birthday fiesta</p>
      <div className="hero-art">
        <p className="hero-badge gold">Free guaca-mole!</p>
        <div className="hero-mascot">
          <Character name="taco-walk" alt="Nacho the taco" />
        </div>
        <p className="hero-badge red">Dance battle!</p>
      </div>
    </section>
  )
}

function mascotFor(id, title) {
  return <Character name={id} alt={title} />
}

export default function App() {
  const welcomeRef = useRef(null)
  const rsvpRef = useRef(null)
  const [visible, setVisible] = useState({ welcome: true, rsvp: false })
  const hideChip = visible.welcome || visible.rsvp

  // The floating RSVP chip is redundant on the welcome screen (it has its own button) and on the form itself.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((current) => {
          const next = { ...current }
          for (const entry of entries) next[entry.target.dataset.chipWatch] = entry.isIntersecting
          return next
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(welcomeRef.current)
    observer.observe(rsvpRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="site">
      <a
        className={`rsvp-chip${hideChip ? ' is-hidden' : ''}`}
        href="#rsvp"
        aria-hidden={hideChip}
        tabIndex={hideChip ? -1 : undefined}
      >
        RSVP
      </a>

      <Welcome sectionRef={welcomeRef} />

      <Hero />

      <Invite />

      <section className="band cream" id="card">
        <div className="section-head">
          <h2>The Championship Card</h2>
          <p>Behold the details of the century</p>
        </div>
        <article className="ticket">
          <div className="ticket-main">
            <div>
              <h3>Heavyweight birthday clash</h3>
              <p className="kicker">Starring the birthday champion</p>
            </div>
            <hr />
            <div className="ticket-meta">
              <div>
                <span className="ticket-label">When / date</span>
                <strong>{party.celebratingShort}</strong>
                <span>{party.time}</span>
              </div>
              <div>
                <span className="ticket-label">Where / arena</span>
                <strong>{party.street}</strong>
                <span>
                  <Address />
                </span>
              </div>
            </div>
          </div>
          <div className="ticket-stub">
            <p>Admit one</p>
            <TicketStar />
            <p className="ticket-number">№ 00030</p>
          </div>
        </article>
      </section>

      <section className="band cyan" id="schedule">
        <div className="section-head light">
          <h2>Battle Royale Schedule</h2>
          <p>A blow-by-blow itinerary of the fiesta</p>
        </div>
        <ol className="schedule">
          {schedule.map((item) => (
            <li key={item.id}>
              <span className="time">{item.time}</span>
              <span className="schedule-icon">
                <Character name={item.mascot} alt="" />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="band red" id="feast">
        <div className="section-head light">
          <h2>El Feast Magnífico</h2>
          <p>Wrestling-grade fuel for the warriors</p>
        </div>
        <div className="feast-grid">
          {feast.map((item) => (
            <article key={item.id}>
              <div className="feast-art">{mascotFor(item.mascot, item.title)}</div>
              <div className="feast-body">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee, ...marquee].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <span className="marquee-star">★</span>
            </span>
          ))}
        </div>
      </div>

      <section className="band cream" id="story">
        <div className="section-head">
          <h2>The Highlight Reel</h2>
          <p>30 years of {party.nickname}, round by round</p>
        </div>
        <StoryReel />
        <a className="btn story-cta" href="#rsvp">
          RSVP for the party
        </a>
      </section>

      <section className="band cream rsvp-band" id="rsvp" ref={rsvpRef} data-chip-watch="rsvp">
        <div className="section-head">
          <h2>Claim Your Ring Spot</h2>
          <p>Register your wrestling tag-team status</p>
        </div>
        <RsvpForm />
      </section>

      <section className="band cyan save-date" id="save-the-date">
        <div className="section-head light">
          <h2>Before The Bell</h2>
          <p>
            {party.celebratingLong} · {party.timeShort} · {party.street}
          </p>
        </div>
        <div className="save-date-actions">
          <CalendarLinks />
          <RegistryLink className="btn" />
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <Wordmark size="footer" />
          <p>A Nacho Libre-inspired birthday fiesta</p>
        </div>
        <p>
          {party.verse} · {party.born} · {party.celebrating}
        </p>
      </footer>
    </div>
  )
}
