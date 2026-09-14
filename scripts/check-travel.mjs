import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import {
  contact,
  destinations,
  packages,
  filterDestinations,
  enquiryUrl,
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
assert.equal(
  filterDestinations("All journeys", "").length,
  destinations.length,
);
assert.equal(filterDestinations("India", "").length, 10);
assert.equal(
  filterDestinations("Nepal", "  POKHARA  ")[0].name,
  "Pokhara Tourism Area Tour",
);
assert.equal(filterDestinations("Pilgrimage", "").length, 24);
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
console.log(
  "Package details, brochure files, search filters, and WhatsApp draft checks passed.",
);
