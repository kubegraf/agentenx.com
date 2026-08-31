# CLAUDE.md — agentenx.com

The AgentenX landing page. Vite + React + TypeScript + Tailwind, deployed to
GitHub Pages at https://kubegraf.github.io/agentenx.com/ on every push to main.

## Three things to know before changing anything

1. **The site is served from a SUBPATH.** `base` in `vite.config.ts` is
   `/agentenx.com/` and must equal the repo name. Get it wrong and the deploy
   goes green while every visitor gets an unstyled page. `deploy.yml` greps the
   built HTML and fails instead of publishing that.
2. **Do not invent facts.** No customers, user counts, revenue, uptime figures,
   certifications, compliance claims, benchmarks, funding, testimonials or
   prices. AgentenX has not launched. The copy says so where it matters, and
   that honesty is deliberate rather than a gap to fill in.
3. **AgentenX is the brand, Orkastor Limited is the company.** Orkastor appears
   once, in the footer. Do not turn this into "Orkastor Cloud powered by
   AgentenX" — the whole point is that AgentenX stands on its own.

## This is not Orkastor Cloud or KubeGraf

Different product, different repo, different everything. Nothing here shares code
with `kubegraf-*` or `orkastor-*`, and it does not deploy to either cluster. If
you are here because of a change to those, you are in the wrong repository.

## Design system

Tokens live in `src/styles/index.css` and nowhere else. Colours are defined on
bare `:root` first and then REDEFINED under both `prefers-color-scheme: dark` and
`[data-theme="dark"]`, so the toggle wins in both directions. A colour defined
only inside a media query vanishes in the other theme.

Contrast was measured rather than eyeballed, and the ratios are in the comments.
The accent is `#2A5FE8` because it clears AA at 5.38:1 both as a fill behind
white text and as text on white. The more obvious `#2F6BFF` measured exactly
4.50:1 both ways — passing with no margin — so it was rejected. If you change the
accent, measure it again.

One accent. Not five.

## Animation

Sequences are driven by `useSequence` in `src/lib/hooks.ts`. Under
`prefers-reduced-motion` it jumps to the FINAL step rather than animating fast,
because the end state is the informative one. The CSS also neutralises animation
globally, which is a second belt for any component that forgets.

Watch the off-by-one: `useSequence(n)` yields `0..n-1`. Both the hero pipeline
and the deploy terminal shipped a bug where the last stage never resolved, so
the mock claimed "deployed" while the final node still read as pending.

## Icons

Hand-drawn on one 24x24 grid in `src/components/Icons.tsx`, zero dependencies.
Do not add an icon library for one glyph.

## Verify by rendering

`npm run build` passing proves nothing about how the page looks. Screenshot it
at several widths in both themes before calling a visual change done. Every
defect found while building this was visible in a screenshot and invisible in the
type checker.
