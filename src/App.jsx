import { useState } from 'react'
import { feast, gallery, marquee, party, schedule } from './content'
import { Character, TicketStar } from './illustrations'

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

function Invite() {
  return (
    <header className="invite">
      <div className="invite-poster">
        <p className="invite-tag">
          <span className="wide-only">★ Official championship invitation ★</span>
          <span className="narrow-only">★ Heavyweight birthday fiesta ★</span>
        </p>
        <h1 className="invite-title">
          <span>Nacho Average</span>
          <span>30th Fiesta</span>
        </h1>
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
            <p className="invite-value">{party.celebratingLong}</p>
            <p className="invite-note">{party.time}</p>
          </div>
          <div>
            <p className="invite-label">Arena location</p>
            <p className="invite-value">The Fiesta Dome</p>
            <p className="invite-note">{party.location}</p>
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
    </header>
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
  const storyPhotos = gallery.filter((item) => item.id !== 'party')
  const partyPhoto = gallery.find((item) => item.id === 'party')

  return (
    <div className="site">
      <a className="rsvp-chip" href="#rsvp">
        RSVP
      </a>

      <Invite />

      <Hero />

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
              <div className="feast-art">{mascotFor(item.mascot, item.title)}</div>
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
