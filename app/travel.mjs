export const contact = {
  phone: "+977 9714579525",
  phoneLink: "tel:+9779714579525",
  whatsapp: "https://wa.me/9779714579525",
  address: "5 Kankai Road, Birtamode, Jhapa, Nepal",
  map: "https://www.google.com/maps/search/?api=1&query=5+Kankai+Road+Birtamode+Jhapa+Nepal",
};

export const packages = [
  {
    id: "kedarnath-badrinath",
    name: "Ayodhya, Kedarnath & Badrinath",
    label: "A journey of faith",
    days: 11,
    nights: 10,
    price: 45000,
    image: "/kedarnath.webp",
    imagePosition: "center 24%",
    imageAlt: "Kedarnath Temple against the snow-covered Himalayas",
    description:
      "Sacred temples, Himalayan views, and time to reconnect. Discover Ayodhya and the holy shrines of Kedarnath and Badrinath.",
    stops: [
      "Ayodhya",
      "Haridwar",
      "Kedarnath",
      "Badrinath",
      "Haridwar",
      "Kohalpur",
      "Hetauda",
      "Birtamode",
    ],
    brochure: "/packages/11-day-pilgrimage.png",
  },
  {
    id: "char-dham",
    name: "Char Dham & Ayodhya Yatra",
    label: "The complete sacred circuit",
    days: 13,
    nights: 12,
    price: 55000,
    image: "/char-dham.jpg",
    imagePosition: "center",
    imageAlt: "Illustration of Himalayan pilgrimage temples",
    description:
      "Make space for something meaningful. Bring together Yamunotri, Gangotri, Kedarnath, Badrinath, and the sacred city of Ayodhya.",
    stops: [
      "Ayodhya",
      "Haridwar",
      "Kedarnath",
      "Badrinath",
      "Haridwar",
      "Kohalpur",
      "Hetauda",
      "Birtamode",
      "Rudraprayag",
      "Gangotri",
      "Yamunotri",
    ],
    brochure: "/packages/13-day-char-dham.png",
  },
];

export const destinations = [
  {
    name: "Pokhara Lakeside",
    country: "Nepal",
    type: "Leisure",
    image: "/pokhara.jpg",
    description: "Slow mornings by the lake. Mountains on the horizon.",
  },
  {
    name: "Everest Base Camp",
    country: "Nepal",
    type: "Adventure",
    image: "/everest.jpg",
    description: "Follow Himalayan trails to an extraordinary view.",
  },
  {
    name: "Kathmandu Valley",
    country: "Nepal",
    type: "Culture",
    image: "/kathmandu.jpg",
    description: "Living heritage, temple courtyards, and untold stories.",
  },
  {
    name: "Char Dham Yatra",
    country: "India",
    type: "Pilgrimage",
    image: "/char-dham.jpg",
    description: "Four sacred shrines. One deeply meaningful journey.",
  },
  {
    name: "Annapurna Circuit",
    country: "Nepal",
    type: "Adventure",
    image: "/annapurna.jpg",
    description: "From green valleys to the heart of the Himalayas.",
  },
  {
    name: "Lumbini",
    country: "Nepal",
    type: "Pilgrimage",
    image: "/lumbini.jpg",
    description: "A quiet journey to the birthplace of Lord Buddha.",
  },
  {
    name: "Chitwan National Park",
    country: "Nepal",
    type: "Wildlife",
    image: "/chitwan.jpg",
    description: "A different side of Nepal, beneath the jungle canopy.",
  },
  {
    name: "Parsuram Kund & Kamakhya",
    country: "India",
    type: "Pilgrimage",
    image: "/kamakhya.jpg",
    description: "Explore sacred places and traditions in northeast India.",
  },
  {
    name: "Tirupati Balaji",
    country: "India",
    type: "Pilgrimage",
    image: "/tirupati.jpg",
    description: "A pilgrimage to Sri Venkateswara Temple in Tirumala.",
  },
  {
    name: "Rameshwaram & Kanyakumari",
    country: "India",
    type: "Pilgrimage",
    description: "Sacred temples and coastal landscapes of southern India.",
  },
  {
    name: "Jagannath Puri",
    country: "India",
    type: "Pilgrimage",
    description: "Temple traditions and time by the coast in Odisha.",
  },
  {
    name: "Goa & Cherrapunji",
    country: "India",
    type: "Leisure",
    description: "Ask us to plan a beach escape or a journey to Meghalaya.",
  },
];

export function filterDestinations(category, search) {
  const query = search.trim().toLowerCase();
  return destinations.filter(
    (destination) =>
      (category === "All journeys" ||
        destination.country === category ||
        destination.type === category) &&
      `${destination.name} ${destination.country} ${destination.type}`
        .toLowerCase()
        .includes(query),
  );
}

export function enquiryUrl({ name, phone, trip, date, travelers, message }) {
  const text = [
    "Namaste Lakshya Holidays! I would like to plan a trip.",
    `Name: ${name.trim()}`,
    phone.trim() && `Phone: ${phone.trim()}`,
    `Interested in: ${trip}`,
    date && `Preferred departure: ${date}`,
    `Travelers: ${travelers}`,
    message.trim() && `Message: ${message.trim()}`,
    "Please share availability, inclusions, and the final quote.",
  ]
    .filter(Boolean)
    .join("\n");
  return `${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
