import assert from "node:assert/strict";
import { packages, contact } from "../app/travel.mjs";
import { siteUrl, serializeJsonLd } from "../app/seo.mjs";

// Run against a running development or production server: npm run test:seo -- http://localhost:3001
const baseUrl = process.argv[2] || "http://localhost:3000";
const paths = ["/", ...packages.map((trip) => `/packages/${trip.id}`)];
const titles = new Set();
const descriptions = new Set();

async function read(path) {
  const response = await fetch(new URL(path, baseUrl));
  assert.equal(response.status, 200, path);
  return response.text();
}

for (const path of paths) {
  const html = await read(path);
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(([tag]) =>
    Object.fromEntries(
      [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [
        key,
        value,
      ]),
    ),
  );
  const canonical = tags.filter((tag) => tag.rel === "canonical");
  assert.equal(canonical.length, 1, `${path}: one canonical URL`);
  assert.equal(new URL(canonical[0].href).href, new URL(path, siteUrl).href);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = tags.find((tag) => tag.name === "description")?.content;
  assert.ok(title?.includes("Birtamode"), `${path}: local search title`);
  assert.ok(description?.length > 80, `${path}: useful search description`);
  assert.ok(!titles.has(title), `${path}: unique title`);
  assert.ok(!descriptions.has(description), `${path}: unique description`);
  titles.add(title);
  descriptions.add(description);
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    `${path}: one main heading`,
  );
  assert.ok(
    tags.some(
      (tag) =>
        tag.property === "og:image" && tag.content.startsWith(`${siteUrl}/`),
    ),
  );
  assert.ok(
    tags.some(
      (tag) =>
        tag.name === "twitter:card" && tag.content === "summary_large_image",
    ),
  );
  assert.ok(
    !tags.some(
      (tag) => tag.name === "robots" && tag.content.includes("noindex"),
    ),
  );
  const data = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].flatMap(([, json]) => JSON.parse(json)["@graph"]);
  const business = data.find((item) => item["@type"] === "TravelAgency");
  assert.equal(business.telephone, contact.phoneLink.slice(4));
  assert.equal(business.address.addressLocality, "Birtamode");
  assert.ok(
    !business.aggregateRating && !business.review && !business.openingHours,
  );
  const trip = packages.find((item) => path === `/packages/${item.id}`);
  if (trip) {
    const schema = data.find((item) => item["@type"] === "TouristTrip");
    assert.equal(schema.name, trip.name);
    assert.equal(schema.offers.price, trip.price);
    assert.equal(schema.offers.priceCurrency, "NPR");
    assert.equal(schema.provider["@id"], business["@id"]);
    assert.ok(data.some((item) => item["@type"] === "BreadcrumbList"));
    assert.ok(html.includes(`href="${trip.brochure}"`));
    for (const stop of trip.stops)
      assert.ok(
        html.includes(stop),
        `${path}: ${stop} rendered without JavaScript`,
      );
  } else {
    for (const trip of packages)
      assert.ok(
        html.includes(`href="/packages/${trip.id}"`),
        "Crawlable package link",
      );
  }
}
const sitemap = await read("/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  ([, url]) => new URL(url).href,
);
assert.deepEqual(
  urls.sort(),
  paths.map((path) => new URL(path, siteUrl).href).sort(),
);
const robots = await read("/robots.txt");
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /Allow: \//);
assert.ok(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));
assert.ok(!robots.includes("Disallow: /"));
assert.equal(
  (await fetch(new URL("/packages/not-a-real-package", baseUrl))).status,
  404,
);
const unsafe = { name: "</script><script>alert(1)</script>" };
assert.ok(!serializeJsonLd(unsafe).includes("<"));
assert.deepEqual(JSON.parse(serializeJsonLd(unsafe)), unsafe);
console.log(
  "SEO checks passed: metadata, canonical URLs, rendered content, structured data, sitemap, robots, and missing-page handling.",
);
