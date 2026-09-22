import { useState } from 'react'
import { feast, gallery, marquee, party, schedule } from './content'
import { ChurroMascot, MargaritaMascot, NachoMascot, Sunburst, TicketStar } from './illustrations'

function encode(data) {
  return new URLSearchParams(data).toString()
}

function Wordmark({ size = 'hero' }) {
  return (
    <p className={`wordmark ${size}`}>
      <span>Nacho Average</span>
      <span>30th Fiesta</span>
    </p>
  )
}

function PhotoSlot({ id, title, hint, src, shape = 'wide' }) {
  return (
    <div className={`photo-slot ${shape}${src ? ' filled' : ''}`}>
      {src ? (
        <img src={src} alt={title} />
      ) : (
        <div className="photo-empty">
          <p className="photo-label">{title}</p>
          <p className="caption">{hint}</p>
          <p className="photo-path">public/photos/{id}.jpg</p>
        </div>
      )}
    </div>
  )
}

function RsvpForm() {
  const [attending, setAttending] = useState('Yes')
  const [status, setStatus] = useState('idle')

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
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form success">
        <h3>You&apos;re on the card.</h3>
        <p>Thank you. We can&apos;t wait to celebrate Samantha with you.</p>
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
      <p className="gate-label">Official entry gate</p>
      <p className="gate-sub">Fiesta commission licensed registration</p>
      <label>
        <span>Announce your name</span>
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
          <span>How many in your party?</span>
          <select name="guests" defaultValue="1">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>Ring name / disguise</span>
        <input name="costume" placeholder="Optional" />
      </label>
      <label>
        <span>Food notes</span>
        <input name="notes" placeholder="Allergies or anything we should know" />
      </label>
      <label>
        <span>Birthday message</span>
        <textarea name="message" placeholder="Sweet, funny, or both..." />
      </label>
      <button className="btn" type="submit">
        Book your spot
      </button>
      {status === 'error' && <p>Something went wrong. Try again, or text us your RSVP.</p>}
    </form>
  )
}

function mascotFor(id) {
  if (id === 'margarita') return <MargaritaMascot />
  if (id === 'churro') return <ChurroMascot />
  return <NachoMascot />
}

export default function App() {
  const storyPhotos = gallery.filter((item) => item.id !== 'party')
  const partyPhoto = gallery.find((item) => item.id === 'party')

  return (
    <div className="site">
      <a className="rsvp-chip" href="#rsvp">
        RSVP
      </a>

      <section className="hero">
        <Sunburst className="sunburst" />
        <div className="hero-copy">
          <Wordmark />
          <p className="hero-sub">A Nacho Libre-inspired birthday fiesta</p>
          <div className="hero-mascot-row">
            <span className="hero-badge">Free nachos</span>
            <div className="hero-mascot">
              <NachoMascot />
            </div>
            <span className="hero-badge">Stretchy pants</span>
          </div>
        </div>
      </section>

      <section className="band cream" id="card">
        <div className="section-head">
          <h2>The Championship Card</h2>
          <p>Inside the details of the main event.</p>
        </div>
        <article className="ticket">
          <div className="ticket-main">
            <p className="kicker">Heavyweight birthday clash</p>
            <h3>{party.name} turns 30</h3>
            <div className="ticket-meta">
              <div>
                <strong>{party.celebratingLong}</strong>
                <span>{party.time}</span>
              </div>
              <div>
                <strong>The Fiesta Dome</strong>
                <span>{party.location}</span>
              </div>
            </div>
          </div>
          <div className="ticket-stub">
            <p>Admit one</p>
            <TicketStar />
          </div>
        </article>
      </section>

      <section className="band cyan" id="schedule">
        <div className="section-head light">
          <h2>Battle Royale Schedule</h2>
          <p>A blow-by-blow itinerary of the fiesta.</p>
        </div>
        <ol className="schedule">
          {schedule.map((item) => (
            <li key={item.id} className={item.featured ? 'featured' : ''}>
              <span className="time">{item.time}</span>
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
          <p>Calories do not count inside the ring.</p>
        </div>
        <div className="feast-grid">
          {feast.map((item) => (
            <article key={item.id}>
              <div className="feast-art">{mascotFor(item.mascot)}</div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee, ...marquee].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="band cream" id="photos">
        <div className="section-head">
          <h2>The Highlight Reel</h2>
          <p>
            Photo frames are ready. Add images to <code>public/photos</code>, then set each
            <code> src </code> in <code>src/content.js</code>.
          </p>
        </div>
        <div className="gallery">
          {storyPhotos.map((photo) => (
            <PhotoSlot key={photo.id} {...photo} />
          ))}
        </div>
        <PhotoSlot {...partyPhoto} />
      </section>

      <section className="band cream rsvp-band" id="rsvp">
        <div className="section-head">
          <h2>Claim Your Ring Spot</h2>
          <p>Register your wrestling identity.</p>
        </div>
        <RsvpForm />
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
