<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your DevEvent Next.js App Router project. Here's a summary of all changes made:

- **`instrumentation-client.ts`** (new) — Initializes PostHog client-side using the Next.js 15.3+ instrumentation hook. Configured with a reverse proxy, automatic exception capture, and debug mode in development.
- **`next.config.ts`** (updated) — Added reverse proxy rewrites so PostHog requests route through `/ingest` on your own domain, reducing the chance of ad-blocker interference.
- **`.env.local`** (new) — Created with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`; covered by `.gitignore`.
- **`components/ExploreBtn.tsx`** (updated) — Captures `explore_events_clicked` when the hero CTA button is clicked.
- **`components/EventCard.tsx`** (updated) — Added `'use client'` directive and captures `event_card_clicked` with event metadata (title, slug, location, date, time) when an event card is clicked.
- **`components/Navbar.tsx`** (updated) — Added `'use client'` directive and captures `nav_link_clicked` with link label and href properties when any nav link is clicked.

## Tracked events

| Event | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the 'Explore Events' CTA button on the home page hero section. | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on a featured event card to view event details. Includes event title, slug, location, date, and time as properties. | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicked a navigation link in the top navbar. Includes the link label and href as properties. | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/456173/dashboard/1677112)
- [Explore Events Clicked](https://us.posthog.com/project/456173/insights/aQ1uuu2R)
- [Event Card Clicks](https://us.posthog.com/project/456173/insights/GtNzx2J8)
- [Nav Link Clicks](https://us.posthog.com/project/456173/insights/w795WsGs)
- [Most Popular Events](https://us.posthog.com/project/456173/insights/7sHMmLIn)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
