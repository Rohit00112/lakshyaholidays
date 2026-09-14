import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { packages } from "../travel.mjs";

export default function Packages({ onEnquire }) {
  return (
    <section id="packages" className="section packages-section">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">MEANINGFUL PLACES. MEMORABLE JOURNEYS.</p>
            <h2>Pilgrimage packages from Eastern Nepal.</h2>
          </div>
          <p>
            Leave the everyday behind. Explore our featured
            <br className="desktop-break" /> pilgrimages, starting from
            Eastern Nepal.
          </p>
        </div>
        <div className="package-grid">
          {packages.map((trip, index) => (
            <article className="package-card reveal" key={trip.id} id={trip.id}>
              <div className="package-photo">
                <Image
                  src={trip.image}
                  alt={trip.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  style={{ objectPosition: trip.imagePosition }}
                />
                <span className="photo-badge">
                  <Icon name="sun" />
                  {trip.label}
                </span>
                <span className="photo-number">0{index + 1}</span>
              </div>
              <div className="package-body">
                <p className="package-meta">
                  <span>
                    <Icon name="clock" />
                    {trip.nights} nights / {trip.days} days
                  </span>
                  <span>
                    <Icon name="pin" />
                    Nepal & India
                  </span>
                </p>
                <h3>
                  <Link href={`/packages/${trip.id}`}>{trip.name}</Link>
                </h3>
                <p className="package-description">{trip.description}</p>
                <Link
                  className="text-link package-details-link"
                  href={`/packages/${trip.id}`}
                >
                  View full package <Icon name="arrow" />
                </Link>
                <details className="route-details">
                  <summary>
                    Explore the destinations <Icon name="plus" />
                  </summary>
                  <div>
                    <p>
                      Destinations listed in the sample package. The daily
                      itinerary and travel order will be confirmed when you
                      enquire.
                    </p>
                    <ol>
                      {trip.stops.map((stop, i) => (
                        <li key={`${stop}-${i}`}>{stop}</li>
                      ))}
                    </ol>
                    <a className="text-link" href={trip.brochure} download>
                      Download package sheet <Icon name="document" />
                    </a>
                  </div>
                </details>
                <div className="package-price">
                  <div>
                    <small>PACKAGE PRICE / PERSON</small>
                    <p>
                      <span>NPR</span> {trip.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button
                    className="button button-navy"
                    onClick={() => onEnquire(trip.name)}
                  >
                    Enquire now <Icon name="arrow" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="package-note">
          <Icon name="document" /> Sample package prices. Contact us to confirm
          departure dates, availability, inclusions, and the final itinerary.
        </p>
      </div>
    </section>
  );
}
