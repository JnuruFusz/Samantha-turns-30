import { useState } from 'react'
import { feast, gallery, party, schedule } from './content'
import {
  ChurroMascot,
  GuacMascot,
  SidekickMascot,
  StarBurst,
  Sunburst,
  TacoMascot,
  WrestlerMascot,
} from './illustrations'

function encode(data) {
  return new URLSearchParams(data).toString()
}

function Wordmark({ size = 'hero' }) {
  return (
    <p className={`wordmark ${size}`}>
      <span className="gold">NACHO</span>
      <span className="red">AVERAGE</span>
      <span className="gold">30TH</span>
      <span className="red">FIESTA</span>
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
      <div className="field-row">
        <label>
          <span>Your name</span>
          <input name="name" required placeholder="First and last name" />
        </label>
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
      </div>
      <div className="field-row">
        <label>
          <span>How many people are coming?</span>
          <select name="guests" defaultValue="1">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Ring name / costume</span>
          <input name="costume" placeholder="Your reality-TV alter ego" />
        </label>
      </div>
      <label>
        <span>Food allergies or notes</span>
        <input name="notes" placeholder="Anything we should know?" />
      </label>
      <label>
        <span>Birthday message for Samantha</span>
        <textarea name="message" placeholder="Sweet, funny, or both..." />
      </label>
      <button className="btn" type="submit">
        Claim your ring spot
      </button>
      {status === 'error' && <p>Something went wrong. Try again, or text us your RSVP.</p>}
    </form>
  )
}

function mascotFor(id) {
  if (id === 'guac') return <GuacMascot />
  if (id === 'churro') return <ChurroMascot />
  return <TacoMascot />
}

function Splash({ onEnter }) {
  return (
    <section className="splash">
      <div className="invite">
        <div className="invite-art">
          <Wordmark size="invite" />
          <div className="invite-mascots">
            <WrestlerMascot />
            <SidekickMascot />
          </div>
          <p className="invite-banner">Samantha turns 30!</p>
        </div>
        <div className="invite-copy">
          <p className="kicker">The main event</p>
          <h1>Get off your horse and drink your milk.</h1>
          <dl className="meta-list">
            <div>
              <dt>Who</dt>
              <dd>{party.name}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>
                {party.celebrating} · {party.time}
              </dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{party.location}</dd>
            </div>
            <div>
              <dt>Look</dt>
              <dd>{party.dressCode}</dd>
            </div>
          </dl>
          <button className="btn" type="button" onClick={onEnter}>
            Enter the fiesta
          </button>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const heroPhoto = gallery.find((item) => item.id === 'hero')
  const champPhoto = gallery.find((item) => item.id === 'champ')
  const partyPhoto = gallery.find((item) => item.id === 'party')
  const storyPhotos = gallery.filter((item) => !['hero', 'champ', 'party'].includes(item.id))

  if (!entered) {
    return <Splash onEnter={() => setEntered(true)} />
  }

  return (
    <div className="site">
      <header className="topbar">
        <span>SE · Thirty</span>
        <span>Nacho Average 30th</span>
        <a href="#rsvp">RSVP</a>
      </header>

      <section className="hero">
        <Sunburst className="sunburst" />
        <div className="hero-copy reveal">
          <Wordmark />
          <div className="hero-mascot">
            {heroPhoto?.src ? (
              <PhotoSlot {...heroPhoto} />
            ) : (
              <>
                <WrestlerMascot />
                <p className="hero-photo-hint">Photo slot waiting under Highlight Reel</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="band cream" id="card">
        <div className="section-head">
          <StarBurst />
          <h2>The Championship Card</h2>
          <p>A very official fight poster for a very official birthday.</p>
        </div>
        <article className="champ-card">
          <div className="champ-copy">
            <p className="kicker">Heavyweight birthday</p>
            <h3>{party.name} turns 30</h3>
            <dl className="meta-list">
              <div>
                <dt>Born</dt>
                <dd>{party.born}</dd>
              </div>
              <div>
                <dt>Main event</dt>
                <dd>{party.celebrating}</dd>
              </div>
              <div>
                <dt>Bell time</dt>
                <dd>{party.time}</dd>
              </div>
              <div>
                <dt>Arena</dt>
                <dd>{party.location}</dd>
              </div>
            </dl>
            <a className="btn" href="#rsvp">
              Claim your ring spot
            </a>
          </div>
          <PhotoSlot {...champPhoto} />
        </article>
      </section>

      <section className="band cyan" id="schedule">
        <div className="section-head light">
          <h2>Battle Royale Schedule</h2>
          <p>Keep your wrists taped and your plate ready.</p>
        </div>
        <ol className="schedule">
          {schedule.map((item, index) => (
            <li key={item.id}>
              <span className="badge">{String(index + 1).padStart(2, '0')}</span>
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
          <p>Write your name on the card. Stretchy pants optional. Joy required.</p>
        </div>
        <RsvpForm />
      </section>

      <footer className="site-footer">
        <Wordmark size="footer" />
        <p>“{party.quote}”</p>
        <p>
          {party.verse} · {party.born} · {party.celebrating}
        </p>
      </footer>
    </div>
  )
}
