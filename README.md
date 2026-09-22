# Nacho Average 30th Fiesta

A birthday invitation site for Samantha Elaine Goodwin.

Born October 14. Celebrating October 18.

## Local

```bash
npm install
npm run dev
```

## Host on Netlify

1. Push this folder to GitHub.
2. In Netlify, add a new site from that GitHub repo.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. After the first deploy, Netlify Forms will collect RSVPs.

RSVPs show up in Netlify → Forms.

## Adding photos

Photo frames are already on the page. To fill one:

1. Drop the image in `public/photos/` using the filename shown on the frame, for example `hero.jpg` or `baby.jpg`.
2. Open `src/content.js` and set that item's `src` to `/photos/your-file.jpg`.

Frames waiting:

- `baby`, `childhood`, `growing`, `faith`, `music`, `thirty` — highlight reel
- `party` — wide fiesta / table photo

## Still needed

- Party time and address
- Photos for the highlight reel
