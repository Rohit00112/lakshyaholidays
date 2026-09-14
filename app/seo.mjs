import { contact } from "./travel.mjs";

export const siteUrl = "https://lakshyaholidays.com.np";
const title = "Travel Agency in Birtamode, Nepal | Lakshya Holidays";
const description =
  "Plan Nepal and India tours with Lakshya Holidays in Birtamode, Jhapa. Explore Char Dham, Kedarnath and Badrinath packages, treks and custom holidays.";

export const homeMetadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Lakshya Holidays",
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-image-preview": "large" },
  },
  openGraph: {
    title,
    description,
    siteName: "Lakshya Holidays",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1376,
        height: 768,
        alt: "The Himalayas at golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero-bg.jpg"],
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export const businessStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${siteUrl}/#travel-agency`,
      name: "Lakshya Holidays",
      legalName: "Lakshya Holidays Travel and Tour Pvt. Ltd.",
      url: siteUrl,
      description,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}/hero-bg.jpg`,
      telephone: contact.phoneLink.slice(4),
      address: {
        "@type": "PostalAddress",
        streetAddress: "5 Kankai Road",
        addressLocality: "Birtamode",
        addressRegion: "Jhapa",
        addressCountry: "NP",
      },
      areaServed: [
        { "@type": "Country", name: "Nepal" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Lakshya Holidays",
      url: siteUrl,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#travel-agency` },
    },
  ],
};

export function packageMetadata(trip) {
  const title = `${trip.name} from Eastern Nepal | Lakshya Holidays`;
  const description = `${trip.days}-day ${trip.name} package from Eastern Nepal: ${trip.nights} nights at NPR ${trip.price.toLocaleString("en-IN")} per person. View destinations and enquire about departure dates.`;
  const url = `${siteUrl}/packages/${trip.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...homeMetadata.openGraph,
      title,
      description,
      url,
      images: [{ url: trip.image, alt: trip.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [trip.image],
    },
  };
}

export function packageStructuredData(trip) {
  const url = `${siteUrl}/packages/${trip.id}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${url}#trip`,
        name: trip.name,
        description: `${trip.description} ${trip.nights} nights / ${trip.days} days. Sample package; travel order and inclusions are confirmed on enquiry.`,
        url,
        image: `${siteUrl}${trip.image}`,
        touristType: "Pilgrimage travelers",
        provider: { "@id": `${siteUrl}/#travel-agency` },
        offers: {
          "@type": "Offer",
          url,
          price: trip.price,
          priceCurrency: "NPR",
          description:
            "Sample package price per person. Departure dates, availability, inclusions, and final quote must be confirmed with Lakshya Holidays.",
          seller: { "@id": `${siteUrl}/#travel-agency` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: trip.name, item: url },
        ],
      },
    ],
  };
}

export const serializeJsonLd = (data) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
