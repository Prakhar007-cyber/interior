# Atelier Véra — Interior Architecture & Design

A production-quality, highly animated marketing site for a fictional premium
interior-design studio in India. Built as a portfolio / client-acquisition demo:
editorial, quiet, architectural — designed to look like an international studio,
and to stay beautiful even with every animation disabled.

> **Brand:** Atelier Véra · _"Spaces, shaped around you."_

## Tech stack

| Concern       | Choice                                          |
| ------------- | ----------------------------------------------- |
| Framework     | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling       | Tailwind CSS v4 (CSS-first `@theme` tokens)     |
| Animation     | Motion (Framer Motion) + GSAP + ScrollTrigger   |
| Smooth scroll | Lenis (wired into the GSAP ticker)              |
| Components    | React Bits (adapted), Swiper, Lucide icons      |
| Fonts         | Fraunces (serif display) + Archivo (grotesque)  |
| Images        | Unsplash via optimised `next/image`             |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx           # fonts, smooth scroll, cursor, preloader, transitions
│   ├── (site)/              # public pages with nav + footer chrome
│   │   ├── page.tsx         # homepage (composes every section)
│   │   ├── projects/[slug]/ # case-study detail pages
│   │   └── journal/[slug]/  # editorial article pages
│   └── (auth)/              # signin + signup (no chrome)
├── components/
│   ├── layout/              # Navbar, MobileMenu, Footer, Preloader, SmoothScroll…
│   ├── sections/            # one file per homepage section
│   ├── animations/          # Reveal, Parallax, RevealImage (reusable wrappers)
│   ├── reactbits/           # React Bits components (CountUp, SplitText, ScrollReveal…)
│   ├── ui/                  # Button, SectionLabel, ComparisonSlider
│   └── auth/                # AuthExperience (shared signin/signup)
├── data/                    # projects, services, materials, process, journal, site…
└── lib/                     # cn(), unsplash() URL helper, scroll helper
```

All content lives in plain typed files under `data/` — no CMS, no state library.

## Notable techniques

- **Lenis + ScrollTrigger** are synced through `gsap.ticker` so scroll-driven
  animations never drift (`components/layout/SmoothScroll.tsx`).
- **Branded page transitions** — a persistent overlay wipes with the wordmark,
  the router swaps underneath, then the panel lifts (`PageTransition.tsx`).
- **Cinematic auth transition** — sign in ↔ sign up share one persistent
  component; the image panel slides across while forms crossfade, and the URL is
  swapped with `history.replaceState` so nothing remounts (`AuthExperience.tsx`).
- **Before/After slider** works with mouse, touch and keyboard via pointer events
  and `clip-path` (`ui/ComparisonSlider.tsx`).
- **Accessibility** — respects `prefers-reduced-motion`, semantic HTML, alt text,
  keyboard-operable controls, and a custom cursor only on fine-pointer devices.

_All photography is from Unsplash. Atelier Véra is a fictional studio._
