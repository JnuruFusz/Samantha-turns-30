export const party = {
  name: 'Samantha Elaine Goodwin',
  nickname: 'Sammi',
  born: 'October 14',
  celebrating: 'October 18',
  celebratingLong: 'Sunday, October 18',
  celebratingShort: 'Sun, Oct 18',
  verse: 'Psalm 30',
  quote: 'You turned my wailing into dancing.',
  time: 'Doors open @ 3:30 PM',
  timeShort: '3:30 PM',
  street: '2211 Sims Ave',
  city: 'Saint Louis, MO 63114',
  dressCode: 'Get your disguise ready.',
}

const address = `${party.street}, ${party.city}`

export const links = {
  directions: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  registry: 'https://www.amazon.com/registries/gl/guest-view/3QLYAL7CAAWON',
  // Keep public/sammi-30th.ics in step with these times (3:30–8:30 PM Central, Oct 18 2026).
  calendarFile: '/sammi-30th.ics',
  googleCalendar:
    'https://calendar.google.com/calendar/render?' +
    new URLSearchParams({
      action: 'TEMPLATE',
      text: "Sammi's Nacho Average 30th Fiesta",
      dates: '20261018T203000Z/20261019T013000Z',
      location: address,
      details: 'Lucha masks and capes encouraged! RSVP and details: https://sammibirthday.netlify.app',
    }).toString(),
}

export const schedule = [
  {
    id: 'doors',
    time: '3:30 PM',
    title: 'Doors Open & Nachos Bar',
    detail: 'Arrive in disguise and build your high-piled warm nacho plates at our custom loading dock.',
    mascot: 'taco',
  },
  {
    id: 'entrance',
    time: '4:30 PM',
    title: 'The Grand Entrance',
    detail: 'Behold the birthday champ as they make a glorious, masked arrival under dramatic fog.',
    mascot: 'taco-walk',
  },
  {
    id: 'dance',
    time: '5:30 PM',
    title: 'Dance Battle Royale',
    detail: 'Step into the ring. Our resident DJ drops retro latin beats for an epic dance-off championship.',
    mascot: 'pepper',
  },
  {
    id: 'cake',
    time: '6:30 PM',
    title: 'Cake Smash Championship',
    detail: 'Wrestling-level cake cutting ceremony. Will there be a wrestling smash? Be ready for anything.',
    mascot: 'agave',
  },
  {
    id: 'after',
    time: '7:30 PM',
    title: 'After-Party Libre',
    detail: 'Sip custom margaritas and talk about the golden days as we wind down the ring lights.',
    mascot: 'tequila',
  },
]

export const feast = [
  {
    id: 'tacos',
    title: 'Championship Tacos',
    detail: 'The official weigh-in snack. Extra cheese, no apologies.',
    mascot: 'taco',
  },
  {
    id: 'tequila',
    title: 'El Grande Tequila',
    detail: 'Salt on the rim. Championship energy in the glass.',
    mascot: 'tequila',
  },
  {
    id: 'avocado',
    title: 'Avocado Libre',
    detail: 'Holy guacamole, now with a skateboard.',
    mascot: 'avocado',
  },
]

export const marquee = [
  'Are you ready to rumble?',
  'Nacho Average 30th Fiesta',
  'Get your disguise ready',
]

export const gallery = [
  {
    id: 'baby',
    title: 'Baby Samantha',
    hint: 'Add a photo from this season',
    src: '',
    shape: 'wide',
  },
  {
    id: 'childhood',
    title: 'Childhood Joy',
    hint: 'Add a photo from this season',
    src: '',
    shape: 'wide',
  },
  {
    id: 'growing',
    title: 'Growing Up',
    hint: 'Add a photo from this season',
    src: '',
    shape: 'wide',
  },
  {
    id: 'faith',
    title: 'Faith, Family & Friends',
    hint: 'Add a photo from this season',
    src: '',
    shape: 'square',
  },
  {
    id: 'music',
    title: 'Love, Laughter & Music',
    hint: 'Add a photo from this season',
    src: '',
    shape: 'wide',
  },
  {
    id: 'thirty',
    title: '30 Years of Samantha',
    hint: 'Add a photo from this season',
    src: '',
    shape: 'square',
  },
  {
    id: 'party',
    title: 'The fiesta table',
    hint: 'A wide party or tablescape photo',
    src: '',
    shape: 'banner',
  },
]
