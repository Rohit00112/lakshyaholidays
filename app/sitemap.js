import { siteUrl } from "./seo.mjs";
import { packages } from "./travel.mjs";

export default function sitemap() {
  return [
    { url: siteUrl },
    ...packages.map((trip) => ({ url: `${siteUrl}/packages/${trip.id}` })),
  ];
}
