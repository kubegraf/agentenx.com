# agentenx.com

The AgentenX landing page.

**Live:** https://kubegraf.github.io/agentenx.com/

AgentenX is an AI-native infrastructure platform for developers. It is a product
brand operated by Orkastor Limited, and it is deliberately presented as its own
independent brand rather than as a sub-brand of Orkastor.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173/agentenx.com/
npm run build      # typecheck + production build into dist/
npm run preview
```

## Deploying

A push to `main` builds and publishes to GitHub Pages. Nothing else is needed.

## ⚠ The base path

The site is served from a **subpath**, `https://kubegraf.github.io/agentenx.com/`.
`base` in `vite.config.ts` is `/agentenx.com/` and must stay equal to the repo
name. If it is wrong the deploy still goes green, but every visitor gets a page
with no CSS, no fonts and no JavaScript. The deploy workflow greps the built
`index.html` and fails rather than publishing that.

## Structure

| Path | What it is |
|---|---|
| `src/styles/index.css` | Design tokens, in one place. Colours are defined on bare `:root` first, then redefined for dark. |
| `src/content/site.ts` | Every repeated string and list on the page. |
| `src/components/` | One component per section, plus `ui/Primitives.tsx` for the shared shells. |
| `public/brand/` | The mark, favicon and OG image, all generated from the supplied brand sheet. |

## Content rules

The page must not claim things that are not true. No customers, no user counts,
no revenue, no uptime figures, no certifications, no compliance claims, no
benchmarks, no funding, no testimonials, and no prices.

AgentenX has not launched. Those are the exact claims that are tempting to add
to an infrastructure landing page and impossible to walk back, so the copy says
plainly that pricing is not set and that there are no certifications to quote.

## Brand

The mark is a single traced path with `fill="currentColor"`, so one asset serves
light and dark. It came from the supplied brand sheet
(`Gemini_Generated_Image_uu0bq5uu0bq5uu0b.jpeg`), vectorised with potrace rather
than cropped as a bitmap, so it stays sharp at every size including the favicon.

`Mark` and `Logo` live in `src/components/Mark.tsx`. Do not add a second copy of
the artwork — that is how a mark goes stale in one place and not another.
