# Peighton & David · wedding site

One-page wedding site. Next.js (App Router) + Tailwind v4 + Motion + Lenis. No database: it builds to static HTML and deploys to Vercel as-is.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Edit the copy

Everything a guest reads lives in `src/content/`. Components only lay it out.

| File | What it holds |
| --- | --- |
| `site.ts` | Names, date and times, venue and map link, email and phone, RSVP endpoint, page title and Open Graph text |
| `nav.ts` | Sticky nav links |
| `hero.ts` | Eyebrow, name lines, buttons, the ticket card copy, hero photo (or a muted video loop) |
| `saveTheDate.ts` | The olive-black poster band (numerals, countdown labels) and the marquee line |
| `day.ts` | Day-plan timeline: times, titles, places, photos |
| `rsvp.ts` | Summary cards, headline, form labels, options, success and error copy |
| `travel.ts` | Three travel columns and the staggered stay cards |
| `story.ts` | Start and end years, chapters on the winding road, the two polaroid photos and captions |
| `gallery.ts` | Stills wall prints: captions, filename labels and images |
| `registry.ts` | Gift copy, amount chips, payment link, bank details |
| `faq.ts` | Questions and answers, sticker text, email button |
| `dressCode.ts` | Dress-code cards and the named swatches |
| `footer.ts` | Footer link columns, sign-off line, wordmark |
| `theme.ts` | Palette (mirrored in `src/app/globals.css` under `@theme`) |

Photos go in `public/images/`. Any item with `placeholder: "..."` instead of `image: {...}` renders as a striped block with that label until the photo exists.

## RSVP without a database

The form posts JSON to `rsvpEndpoint` in `src/content/site.ts`. Point it at Formspree, Basin, Getform, a Google Apps Script web app, or your own function. Leave it empty and the form opens the guest's mail client with the reply pre-filled instead.

Fields sent: `name`, `attending`, `meal`, `dietary`, `plusOne`.

## Gifts

Set `paymentUrl` in `src/content/registry.ts` (SnapScan, PayFast, Yoco, PayPal.me). The Give button opens it with `?amount=` and `?message=` appended. Leave it empty and the button reveals the bank details from the same file.

## Motion

- `src/components/motion/Providers.tsx`: Lenis smooth scroll and the global reduced-motion switch (`prefers-reduced-motion` turns the scroll-linked effects off).
- `Reveal`, `Stagger`, `StaggerItem`: fade-and-rise on scroll into view.
- `Parallax`: clipped frame with a drifting image layer. `Drift`: shifts a block on scroll for staggered columns.
- `SplitLines`: the hero names sliding up word by word; lines can sit left or right so they bleed off the frame.
- `DrawLineFrame`: the day-plan rule drawing itself as you scroll.
- `ImageReveal`: photos wipe in from a clipped edge while settling from a slight zoom.
- `Road`: the story's winding road, drawn on scroll with a stop per chapter.
- `Marquee`: the giant italic place-and-date line that drifts sideways and speeds up with the scroll.
- `Ghost`: translucent initials behind a section, moving at their own speed.
- The hero botanicals scroll at different rates and lean with the pointer on desktop.
- The nav collapses to a full-screen menu under 768px and shows a coral scroll-progress hairline.

## Deploy

Push to GitHub and import the repo in Vercel. No environment variables are required. Set the real domain in `siteMeta.url` (`src/content/site.ts`) so Open Graph links resolve.

## Kinetic album

`AlbumOverture` adds a native-scroll sticky tabletop between Travel and Story.
Three prints fan out with independent translation, rotation and perspective as
scroll progress advances; reversing the scroll reverses the composition. The
sticky ancestor does not clip, so it works with native touch scrolling.

`StillsWall` is an editorial photo deck with previous/next buttons and direct
selection. Controls work with touch and keyboard, announce the current index,
and keep covered photos out of the accessibility tree. New copy lives in
`src/content/gallery.ts`. Existing placeholder photos remain editable there.

Reduced motion removes the pinned scene in favour of a static three-print
layout and makes deck selection instant. Lenis wheel smoothing is also disabled.
No new runtime packages were added.
