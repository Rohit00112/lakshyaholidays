# Lakshya Holidays

A responsive travel website for Lakshya Holidays Travel and Tour Pvt. Ltd., Birtamode, Nepal. Built with Next.js 16, React 19, and CSS; no animation or component libraries required.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Check and build

```sh
npm run lint
npm test
npm run build
npm start
```

The checks verify the supplied package details, brochure and destination image files, combined destination filters, Google Maps links, Nepal date boundaries, and encoded WhatsApp drafts with multiple destinations.

## Explore and plan

The destination explorer includes 12 additional Nepal temple destinations, for 48 destinations in total. Visitors can combine country and experience filters and search English names, Nepali temple names, aliases, descriptions, cities, and districts. Nepal temple journeys are featured first, and more cards load in groups of six. Each card has visit details, a map link, a shortlist button, and a trip enquiry action.

The homepage’s “Nepal temple trails” shortcut opens Nepal pilgrimage results. Visitors can add several destinations to a shortlist and carry them into a single WhatsApp enquiry. The shortlist is kept while the homepage remains open; refreshing or leaving the page clears it. No personal form details are stored. Departure dates must be today or later, using Nepal time.

New temple descriptions and locations were checked against [Nepal Tourism Board pilgrimage guides](https://ntb.gov.np/pilgrimage-tours), including its individual temple pages. Photographs are from Wikimedia Commons; each photograph’s author, source, license, and crop notice appears under “Visit details” and in `public/image-credits.txt`. Destinations are custom enquiry ideas, without invented prices or availability.

The framework and its lint configuration are patched to 16.3.8. The production dependency audit is clean. Five audit findings remain in the development-only lint dependency chain (`braces` → `micromatch` → `fast-glob` → the Next.js lint plugin/config); the proposed automated fix downgrades the lint configuration to Next.js 14, so it was not applied.

## Update content

- `app/travel.mjs`: contact information, package prices, durations, destinations, and enquiry message.
- `public/packages/`: original package sheets supplied by the business.
- `app/globals.css`: responsive styling and motion, including reduced-motion support.
- `public/image-credits.txt`: source and license for the Kedarnath photograph.

Enquiries open a prefilled WhatsApp draft using the supplied business number. Visitors must send the message in WhatsApp. The site does not collect submissions on a server, take payments, or confirm bookings. Confirm the business number is enabled for WhatsApp before publishing; direct phone links are also available.

The supplied sheets do not specify departures or inclusions. Those details remain subject to confirmation with the business. Existing stock testimonials and statistics are not displayed.

## Search engine setup

The homepage and both package pages have individual titles, descriptions, canonical URLs, and social previews. `app/seo.mjs` holds the production domain and structured data. The package pages are generated from `app/travel.mjs` at build time. `/sitemap.xml` includes the three canonical pages; `/robots.txt` allows crawling and points to the sitemap. Business and package markup uses the supplied information, without invented ratings, opening hours, or availability.

With the site running, check its actual HTML and indexing files:

```sh
npm run test:seo
# To check a production server on another port:
npm run test:seo -- http://localhost:3001
```

Before launch, connect `lakshyaholidays.com.np` to the hosting provider and confirm HTTPS works. The domain did not resolve from the development environment during the SEO check. Configure hosting to redirect HTTP and the www hostname to the canonical HTTPS hostname.

After publishing, verify domain ownership in Google Search Console, submit `https://lakshyaholidays.com.np/sitemap.xml`, and inspect the three page URLs. Review the structured data with Google's Rich Results Test or the Schema.org validator. Keep the business name, address, and phone consistent with the Google Business Profile. These account and DNS steps have not been performed in this project.

References: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), and [TouristTrip schema](https://schema.org/TouristTrip).
