import { useState } from 'react'
import { chapters, loves, party, sampleNotes } from './content'

function encode(data) {
  return new URLSearchParams(data).toString()
}

function PhotoSlot({ title, hint, className = 'wide' }) {
  return (
    <div className={`photo-slot ${className}`}>
      <div>
        <p className="photo-label">{title}</p>
        <p className="caption">{hint}</p>
      </div>
    </div>
  )
}

function Splash({ onEnter }) {
  return (
    <section className="splash">
      <header className="splash-top">
        <span>SE • Thirty</span>
        <span>October 18</span>
      </header>
      <div className="splash-stage">
        <span className="sparkle s1">✦</span>
        <span className="sparkle s2">✦</span>
        <span className="sparkle s3">✦</span>
        <span className="sparkle s4">✦</span>
        <span className="sparkle s5">✦</span>
        <span className="sparkle s6">✦</span>
        <button className="invite-card" onClick={onEnter} type="button">
          <div className="invite-card-inner">
            <p className="eyebrow">Psalm 30 • a celebration of joy</p>
            <div className="big-30">30</div>
            <h1 className="invite-title">
              You&apos;re Invited to
              <br />
              Sammi&apos;s Birthday
            </h1>
            <p className="invite-sub">— Come Celebrate!</p>
            <div className="dot-row" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="enter-btn">Unfolding the celebration</span>
          </div>
        </button>
      </div>
      <p className="splash-bottom">“Joy comes in the morning.”</p>
    </section>
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
        <h3>You&apos;re on the list.</h3>
        <p>Thank you. We can&apos;t wait to celebrate Samantha with you.</p>
      </div>
    )
  }

  return (
    <form className="form" name="rsvp" method="POST" data-netlify="true" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="rsvp" />
      <p className="sr-only" aria-hidden="true">
        <label>
          Don’t fill this out: <input name="bot-field" tabIndex={-1} />
        </label>
      </p>
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
          <span>Who are you dressing as?</span>
          <input name="costume" placeholder="Your reality TV alter ego" />
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
        Send RSVP
      </button>
      {status === 'error' && (
        <p>Something went wrong. Try again, or text us your RSVP.</p>
      )}
    </form>
  )
}

function GuestbookForm() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'guestbook',
          from: form.from.value,
          note: form.note.value,
        }),
      })
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form success guestbook-form">
        <h3>Note saved.</h3>
        <p>We&apos;ll keep this for Samantha.</p>
      </div>
    )
  }

  return (
    <form className="form guestbook-form" name="guestbook" method="POST" data-netlify="true" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="guestbook" />
      <div className="field-row">
        <label>
          <span>Your name</span>
          <input name="from" required placeholder="Who is this from?" />
        </label>
        <label>
          <span>A note for Samantha</span>
          <input name="note" required placeholder="Sweet, funny, or both..." />
        </label>
      </div>
      <button className="btn" type="submit">
        Leave a birthday note
      </button>
      {status === 'error' && <p>Could not send just now. Please try again.</p>}
    </form>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return <Splash onEnter={() => setEntered(true)} />
  }

  return (
    <div className="site">
      <header className="topbar">
        <span>SE • Thirty</span>
        <span>Psalm 30 • a celebration of joy</span>
        <a href="#rsvp">RSVP</a>
      </header>

      <section className="hero reveal">
        <div>
          <p className="kicker">Psalm 30 • a celebration of joy</p>
          <h1 className="display">
            Samantha Elaine
            <br />
            Goodwin
            <br />
            Turns 30
          </h1>
          <p className="lede">
            Born {party.born} • Celebrating {party.celebrating}
          </p>
          <div className="btn-row">
            <a className="btn" href="#rsvp">
              RSVP
            </a>
            <a className="btn ghost" href="#story">
              Scroll Her Story ↓
            </a>
          </div>
        </div>
        <div className="hero-photo">
          <div className="photo-frame">
            <div>
              <p className="photo-label">A favorite photo of Samantha</p>
              <p className="caption">Drop a portrait in later — this frame is waiting.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="hero-note">
        <p>30 years of grace & good stories ♡</p>
        <p className="verse">“{party.quote}”</p>
      </div>

      <section className="section" id="story">
        <div className="section-head">
          <p className="kicker">Her story, so far</p>
          <h2>Thirty years of becoming</h2>
          <p>
            From baby photos to belly laughs, these are a few of the moments that
            made Samantha, Samantha.
          </p>
        </div>
        <div className="timeline">
          {chapters.map((chapter) => (
            <article className="chapter" key={chapter.id}>
              <PhotoSlot
                title={chapter.title}
                hint="Add a photo from this season"
                className={chapter.id === 'faith' || chapter.id === 'thirty' ? 'square' : 'wide'}
              />
              <div className="chapter-copy">
                <p className="kicker">{chapter.number}</p>
                <h3>{chapter.title}</h3>
                <p className="lede" style={{ marginBottom: 8 }}>
                  {chapter.kicker}
                </p>
                <p>{chapter.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="kicker">A very official list</p>
          <h2>Things Samantha loves</h2>
          <p>A little faith, a lot of funk, and just the right amount of reality-TV glam.</p>
        </div>
        <div className="loves-grid">
          {loves.map((item) => (
            <article className="love-card" key={item.title}>
              <div className="love-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="invite-band" id="invite">
        <div className="invite-wrap">
          <div className="invite-photo">
            <div>
              <p className="photo-label" style={{ color: '#fbf7f0' }}>
                Party photo
              </p>
              <p className="caption">A table, a night, a little glam.</p>
            </div>
          </div>
          <div className="invite-card-light">
            <p className="kicker">Save the date</p>
            <h2>You&apos;re invited to celebrate Samantha&apos;s 30th</h2>
            <dl className="meta-list">
              <div>
                <dt>Date</dt>
                <dd>{party.celebrating}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{party.time}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{party.location}</dd>
              </div>
              <div>
                <dt>Dress code</dt>
                <dd>{party.dressCode}</dd>
              </div>
            </dl>
            <a className="btn" href="#rsvp">
              RSVP now
            </a>
          </div>
        </div>
      </section>

      <section className="rsvp-section" id="rsvp">
        <div className="rsvp-copy">
          <p className="kicker">Will we see you there?</p>
          <h2>Say yes to the celebration</h2>
          <p>
            Bring your best character energy and leave Samantha a note for the
            next chapter.
          </p>
        </div>
        <RsvpForm />
      </section>

      <section className="section">
        <div className="section-head">
          <p className="kicker">A keepsake in the making</p>
          <h2>Sweet notes & funny stories</h2>
          <p>Leave a birthday note. We can print these for the party later.</p>
        </div>
        <div className="notes-grid">
          {sampleNotes.map((note) => (
            <article className="note-card" key={note.from}>
              <p>“{note.quote}”</p>
              <cite>— {note.from}</cite>
            </article>
          ))}
        </div>
        <GuestbookForm />
      </section>

      <footer className="site-footer">
        <p className="kicker">✦</p>
        <h2 className="footer-title">Joy comes in the morning.</h2>
        <p>Psalm 30</p>
        <p>Celebrating Samantha Elaine Goodwin</p>
        <p>October 14 • October 18</p>
      </footer>
    </div>
  )
}
