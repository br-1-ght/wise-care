# Wise Care — Doc2Door

Premium home-visit and phone/video consultation booking platform, rebuilt from the original
static HTML reference into a production-ready React + TypeScript application.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · React Router v6 · React Hook Form + Zod ·
Framer Motion · TanStack React Query · Axios · React Hot Toast · Lucide React icons

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build locally
npm run lint
```

Copy `.env.example` to `.env` and fill in real values before connecting to a live backend —
the app runs fully on mock data out of the box, so this step is optional for local development.

## What's implemented

- **Home page**: hero with the two required CTAs, emergency banner, services grid, how-it-works,
  features grid, provider showcase, testimonials, insurance partner strip, FAQ accordion, newsletter.
- **Booking flows**: multi-step wizards (React Hook Form + Zod validation, Framer Motion step
  transitions, progress indicator, back/next, localStorage autosave/draft-restore, no page
  refreshes) for both **Home Visit** and **Phone/Video Consultation**.
- **Post-booking**: a live home-visit tracking page (mocked ETA + stage timeline) and a phone
  consultation waiting room (mocked queue countdown + provider list).
- **Emergency Directory**: searchable/filterable by state, city, or ZIP — covers all 50 states
  + DC, plus a sample hospital directory.
- **Dashboard**: admin-style stats, recent bookings table, upcoming visits list, map placeholder —
  all on mock JSON, no backend required.
- **Supporting pages**: Providers, FAQ, About, Careers, Contact, Privacy, Terms, Cookies, 404.
- **Accessibility**: semantic landmarks, skip-to-content link, labeled form fields with error
  announcements, focus-visible rings, keyboard-operable cards/menus, aria-current on stepper.
- **Deployment**: `netlify.toml`, `_redirects` for SPA routing, `.env.example`, sitemap.xml,
  robots.txt, OG/Twitter meta tags, code-split routes + manual vendor chunks.

## Project structure

```
src/
  components/   # layout, ui, home, booking, emergency, dashboard
  layouts/      # RootLayout (Navbar + Outlet + Footer)
  pages/        # one file per route
  hooks/        # useAutosave
  services/     # axios client, react-query client
  types/        # provider, service, booking, emergency types
  utils/        # cn, format, zod schemas
  constants/    # nav links, footer links
  data/         # mock JSON-equivalent TS modules (services, providers, states, etc.)
  routes/       # react-router route table (lazy-loaded)
```

## Notes for going to production

- Swap the mock modules in `src/data/` for real API calls via `src/services/apiClient.ts` +
  React Query hooks — the component layer already expects the same shapes defined in `src/types/`.
- Wire the Paystack public key in `.env` and replace the "Confirm & Pay" button handlers with a
  real checkout call once a payment backend is available.
- The home-visit tracking and phone waiting-room pages currently simulate progress with local
  timers — replace with a WebSocket/polling subscription against your dispatch service.
# wise-care
