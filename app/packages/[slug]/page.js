import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Icon from "../../components/Icon";
import { contact, packages } from "../../travel.mjs";
import {
  packageMetadata,
  packageStructuredData,
  serializeJsonLd,
} from "../../seo.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return packages.map((trip) => ({ slug: trip.id }));
}

async function getPackage(params) {
  const { slug } = await params;
  const trip = packages.find((item) => item.id === slug);
  if (!trip) notFound();
  return trip;
}

export async function generateMetadata({ params }) {
  return packageMetadata(await getPackage(params));
}

export default async function PackagePage({ params }) {
  const trip = await getPackage(params);
  const enquiry = `${contact.whatsapp}?text=${encodeURIComponent(`Namaste Lakshya Holidays! I am interested in the ${trip.name} package (${trip.nights} nights / ${trip.days} days, NPR ${trip.price.toLocaleString("en-IN")} per person). Please share departure dates, inclusions, availability, and the final quote.`)}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(packageStructuredData(trip)),
        }}
      />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="package-page container">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{trip.name}</span>
        </nav>
        <section className="package-intro">
          <div>
            <p className="eyebrow">PILGRIMAGE PACKAGES FROM BIRTAMODE, NEPAL</p>
            <h1>
              {trip.name}
              <br />
              <em>from Birtamode.</em>
            </h1>
            <p>{trip.description}</p>
            <p className="trip-facts">
              <span>
                <Icon name="clock" />
                {trip.nights} nights / {trip.days} days
              </span>
              <span>
                <Icon name="pin" />
                Nepal & India
              </span>
            </p>
          </div>
          <div className="package-cover">
            <Image
              src={trip.image}
              alt={trip.imageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              preload
              style={{ objectPosition: trip.imagePosition }}
            />
          </div>
        </section>
        <div className="package-detail-grid">
          <div className="package-content">
            <section>
              <p className="eyebrow">YOUR JOURNEY AT A GLANCE</p>
              <h2>{trip.days} days for a meaningful pilgrimage.</h2>
              <p>
                Plan your {trip.name} journey with Lakshya Holidays Travel and
                Tour Pvt. Ltd. in Birtamode, Jhapa. This sample package spans{" "}
                {trip.nights} nights and {trip.days} days, at NPR{" "}
                {trip.price.toLocaleString("en-IN")} per person.
              </p>
              <p>
                Use the destination list below to explore the package, then
                speak with our local team about your preferred travel dates and
                group size. We’ll discuss availability, the daily itinerary, and
                the final quote before you book.
              </p>
            </section>
            <section>
              <h2>Destinations in this package</h2>
              <p>
                These places appear on the original package sheet. This is a
                destination list; the travel order and day-by-day schedule will
                be confirmed with our team.
              </p>
              <ol className="trip-stops">
                {trip.stops.map((stop, index) => (
                  <li key={`${stop}-${index}`}>{stop}</li>
                ))}
              </ol>
              <a className="text-link" href={trip.brochure} download>
                Download the original package sheet <Icon name="document" />
              </a>
            </section>
            <section>
              <h2>Before you book</h2>
              <p>
                The sample price does not specify inclusions or exclusions. Ask
                us to confirm transport, accommodation, meals, permits, any
                additional costs, and payment and cancellation terms before
                making your booking.
              </p>
              <p>
                Departure dates and availability are confirmed on enquiry. Share
                any specific travel needs so we can discuss a suitable plan for
                your group.
              </p>
            </section>
            <section>
              <h2>Explore another pilgrimage</h2>
              {packages
                .filter((item) => item.id !== trip.id)
                .map((item) => (
                  <Link
                    key={item.id}
                    className="text-link"
                    href={`/packages/${item.id}`}
                  >
                    {item.name} · {item.days} days <Icon name="arrow" />
                  </Link>
                ))}
            </section>
          </div>
          <aside
            className="package-booking"
            aria-label="Package price and enquiry"
          >
            <p className="eyebrow">SAMPLE PACKAGE PRICE / PERSON</p>
            <p className="trip-price">
              <span>NPR</span> {trip.price.toLocaleString("en-IN")}
            </p>
            <p>
              {trip.nights} nights · {trip.days} days
            </p>
            <a
              className="button button-navy"
              href={enquiry}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp <Icon name="chat" />
            </a>
            <p className="form-note">
              Opens a message draft. Review and send it in WhatsApp to confirm
              the details with our team.
            </p>
            <hr />
            <h2>Talk to our Birtamode team</h2>
            <a className="text-link" href={contact.phoneLink}>
              {contact.phone} <Icon name="phone" />
            </a>
            <address>{contact.address}</address>
            <a
              className="text-link"
              href={contact.map}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find our office <Icon name="diagonal" />
            </a>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
