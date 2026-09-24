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
    icon: '/art/nacho-chip.png',
  },
  {
    id: 'entrance',
    time: '4:30 PM',
    title: 'The Grand Entrance',
    detail: 'Behold the birthday champ as they make a glorious, masked arrival under dramatic fog.',
    icon: '/art/grand-entrance.png',
  },
  {
    id: 'dance',
    time: '5:30 PM',
    title: 'Dance Battle Royale',
    detail: 'Step into the ring. Our resident DJ drops retro latin beats for an epic dance-off championship.',
    icon: '/art/dj-record.png',
  },
  {
    id: 'cake',
    time: '6:30 PM',
    title: 'Cake Smash Championship',
    detail: 'Wrestling-level cake cutting ceremony. Will there be a wrestling smash? Be ready for anything.',
    icon: '/art/cake-smash.png',
  },
  {
    id: 'after',
    time: '7:30 PM',
    title: 'After-Party Libre',
    detail: 'Sip ice-cold lemonade and talk about the golden days as we wind down the ring lights.',
    mascot: 'lemonade',
  },
]

export const feast = [
  {
    id: 'nachos',
    title: 'Championship Nachos',
    detail: 'Crispy tortilla chips drowned in warm, legendary liquid cheese, jalapeños, and spiced crema.',
    art: '/art/nachos.jpg',
  },
  {
    id: 'lemonade',
    title: 'El Grande Lemonade',
    detail: 'Fresh lemonade, sodas, and ice-cold water to keep every luchador hydrated.',
    mascot: 'lemonade',
  },
  {
    id: 'churros',
    title: 'Champion Churros',
    detail: 'Deep-fried golden pastry sticks rolled in thick cinnamon sugar, served with molten chocolate dip.',
    art: '/art/churros.jpg',
  },
]

export const marquee = [
  'Are you ready to rumble?',
  'Nacho Average 30th Fiesta',
  'Get your disguise ready',
]

// Sammi's story, oldest first. Add a chapter by dropping the photo in public/photos/.
export const story = [
  {
    id: 'rookie-debut',
    chapter: 'Chapter 1',
    title: 'The Rookie Debut',
    caption: 'Fresh in the ring, bonnet on, already undefeated.',
    src: '/photos/01-rookie-debut.jpg',
  },
  {
    id: 'entrance-music',
    chapter: 'Chapter 2',
    title: 'First Entrance Music',
    caption: 'Composing her walk-out song since day one.',
    src: '/photos/02-entrance-music.jpg',
  },
  {
    id: 'tag-team',
    chapter: 'Chapter 3',
    title: 'The Tag-Team Years',
    caption: 'Her very first tag-team partner, and the fluffiest.',
    src: '/photos/03-tag-team.jpg',
  },
  {
    id: 'too-cool',
    chapter: 'Chapter 4',
    title: 'Too Cool For The Ring',
    caption: 'Mysterious. Masked (sort of). Iconic.',
    src: '/photos/04-too-cool.jpg',
  },
  {
    id: 'crowd-favorite',
    chapter: 'Chapter 5',
    title: 'Crowd Favorite',
    caption: 'Hyping up the whole arena, arms wide open.',
    src: '/photos/05-crowd-favorite.jpg',
  },
  {
    id: 'espresso-shot',
    chapter: 'Chapter 6',
    title: 'Espresso Shot Champion',
    caption: 'Fueling up between rounds, one tiny cup at a time.',
    src: '/photos/06-espresso-shot.jpg',
  },
  {
    id: 'home-crowd',
    chapter: 'Chapter 7',
    title: 'Home Crowd Hero',
    caption: 'Cardinals red from cap to jersey, cheering with her daughter Ezzy, the littlest tag-team partner.',
    src: '/photos/07-home-crowd.jpg',
  },
]

// Parts for the RSVP form's "Roll one" ring-name generator.
export const ringNameParts = {
  titles: ['El', 'La', 'Señor', 'Señora', 'The Great', 'Mighty', 'Captain', 'Lil'],
  firsts: ['Nacho', 'Guacamole', 'Churro', 'Salsa', 'Queso', 'Jalapeño', 'Tamale', 'Taco', 'Burrito', 'Tortilla', 'Pico', 'Horchata'],
  lasts: ['Supremo', 'Grande', 'Diablo', 'Libre', 'Loco', 'Magnífico', 'Macho', 'Misterioso', 'Fuego', 'Picante', 'Relámpago', 'del Ring'],
}
