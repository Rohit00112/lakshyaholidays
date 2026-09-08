import Icon from "./Icon";

const services = [
  [
    "mountain",
    "Treks & adventures",
    "Find the right Himalayan trail for your experience and ambition.",
  ],
  [
    "sun",
    "Pilgrimages & culture",
    "Make meaningful connections with sacred places and living traditions.",
  ],
  [
    "plane",
    "Flight bookings",
    "Get help finding domestic and international flights that fit your plans.",
  ],
  [
    "bed",
    "Hotel reservations",
    "Find a comfortable stay for your route, preferences, and budget.",
  ],
  [
    "document",
    "Visa assistance",
    "Talk through documentation and application requirements with our team.",
  ],
  [
    "compass",
    "Tailor-made holidays",
    "Bring us your idea. We’ll help shape it into a journey that feels like you.",
  ],
];

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow light">
              THE LITTLE DETAILS. THE BIG PICTURE.
            </p>
            <h2>
              You dream it.
              <br />
              <em>We help you get there.</em>
            </h2>
          </div>
          <p>
            From the first conversation to the final itinerary,
            <br className="desktop-break" /> bring your travel plans together in
            one place.
          </p>
        </div>
        <div className="services-grid">
          {services.map(([icon, title, description], index) => (
            <a key={title} href="#contact" className="service-item reveal">
              <div className="service-top">
                <Icon name={icon} />
                <span>0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <Icon className="service-arrow" name="diagonal" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
