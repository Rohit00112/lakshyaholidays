import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import {
  contact,
  destinations,
  packages,
  filterDestinations,
  enquiryUrl,
  destinationMapUrl,
  departureDateMinimum,
  shortlistTrip,
} from "../app/travel.mjs";

assert.deepEqual(
  packages.map(({ days, nights, price }) => [days, nights, price]),
  [
    [11, 10, 45000],
    [13, 12, 55000],
  ],
);
assert.deepEqual(packages[0].stops, [
  "Ayodhya",
  "Haridwar",
  "Kedarnath",
  "Badrinath",
  "Haridwar",
  "Kohalpur",
  "Hetauda",
  "Birtamode",
]);
assert.deepEqual(packages[1].stops, [
  ...packages[0].stops,
  "Rudraprayag",
  "Gangotri",
  "Yamunotri",
]);
for (const trip of packages)
  await access(new URL(`../public${trip.brochure}`, import.meta.url));
assert.equal(new Set(destinations.map((destination) => destination.name)).size, destinations.length, "No duplicate destination names");
for (const destination of destinations) {
  assert.ok(destination.description && destination.country && destination.type);
  if (destination.image) await access(new URL(`../public${destination.image}`, import.meta.url));
  if (destination.image?.startsWith("/temples/")) {
    assert.ok(destination.imageAlt && destination.imageCredit?.author && destination.imageCredit?.license);
    assert.equal(new URL(destination.imageCredit.source).hostname, "commons.wikimedia.org");
    assert.equal(new URL(destination.imageCredit.licenseUrl).hostname, "creativecommons.org");
  }
}
assert.equal(
  filterDestinations("All journeys", "").length,
  destinations.length,
);
assert.equal(filterDestinations("India", "").length, 10);
assert.equal(
  filterDestinations("Nepal", "  POKHARA  ")[0].name,
  "Pokhara Tourism Area Tour",
);
assert.equal(filterDestinations("Pilgrimage", "").length, 36);
assert.equal(filterDestinations("Nepal", "", "Pilgrimage").length, 27);
assert.equal(filterDestinations("India", "", "Culture").length, 0);
assert.ok(filterDestinations("Nepal", "", "Pilgrimage").every((destination) => destination.country === "Nepal" && destination.type === "Pilgrimage"));
assert.equal(filterDestinations("Nepal", "temple kathmandu", "Pilgrimage").some((destination) => destination.name === "Budhanilkantha Temple"), true);
assert.equal(filterDestinations("Nepal", "  पाथीभरा  ")[0].name, "Pathibhara Devi Darshan");
assert.equal(filterDestinations("Nepal", "Pathivara")[0].name, "Pathibhara Devi Darshan");
assert.equal(filterDestinations("Nepal", "sleeping vishnu")[0].name, "Budhanilkantha Temple");
assert.equal(filterDestinations("Nepal", "Bajura")[0].name, "Badimalika Temple");
assert.ok(filterDestinations("All journeys", "").slice(0, 6).every((destination) => destination.featured && destination.country === "Nepal"));
assert.equal(filterDestinations("India", "Pokhara").length, 0);
assert.equal(filterDestinations("All journeys", "no matching place").length, 0);
const draft = new URL(
  enquiryUrl({
    name: " Test Traveler ",
    phone: "",
    trip: packages[0].name,
    date: "",
    travelers: "2",
    message: "Namaste 🙏 & family + friends?",
  }),
);
assert.equal(`${draft.origin}${draft.pathname}`, contact.whatsapp);
assert.equal(draft.searchParams.size, 1);
assert.match(
  draft.searchParams.get("text"),
  /Name: Test Traveler\nInterested in: Ayodhya, Kedarnath & Badrinath\nTravelers: 2/,
);
assert.match(
  draft.searchParams.get("text"),
  /Namaste 🙏 & family \+ friends\?/,
);
assert.doesNotMatch(
  draft.searchParams.get("text"),
  /Phone:|Preferred departure:/,
);
const shortlistDraft = new URL(enquiryUrl({ name: "Family Traveler", phone: "+977 9800000000", trip: shortlistTrip, date: "2026-11-12", travelers: "4", message: "A family trip & temple visits", shortlist: ["Changu Narayan Temple", "Krishna Mandir, Patan"] }));
assert.match(shortlistDraft.searchParams.get("text"), /Places I'd like to visit: Changu Narayan Temple; Krishna Mandir, Patan/);
assert.match(shortlistDraft.searchParams.get("text"), /Preferred departure: 2026-11-12\nTravelers: 4/);
assert.match(shortlistDraft.searchParams.get("text"), /Phone: \+977 9800000000/);
assert.doesNotMatch(draft.searchParams.get("text"), /Places I'd like to visit/);
const map = new URL(destinationMapUrl({ name: "Rameshwaram & Kanyakumari", location: "Tamil Nadu", country: "India" }));
assert.equal(map.origin + map.pathname, "https://www.google.com/maps/search/");
assert.equal(map.searchParams.get("api"), "1");
assert.equal(map.searchParams.get("query"), "Rameshwaram & Kanyakumari, Tamil Nadu, India");
assert.equal(map.searchParams.size, 2);
assert.equal(departureDateMinimum(new Date("2026-10-09T18:14:59Z")), "2026-10-09");
assert.equal(departureDateMinimum(new Date("2026-10-09T18:15:00Z")), "2026-10-10");
console.log(
  "Package details, destination assets, combined filters, map links, Nepal departure dates, and WhatsApp shortlist drafts passed.",
);
