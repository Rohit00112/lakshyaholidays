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

The checks verify the supplied package details, brochure files, destination filters, and encoded WhatsApp drafts.

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
