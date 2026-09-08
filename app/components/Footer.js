import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { contact } from "../travel.mjs";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/#home" className="brand">
              <Image src="/logo.png" alt="" width={52} height={52} />
              <span>
                Lakshya Holidays<small>TRAVEL & TOUR PVT. LTD.</small>
              </span>
            </Link>
            <p>
              Rooted in Nepal.
              <br />
              Here for wherever life takes you.
            </p>
          </div>
          <div>
            <h3>Find your journey</h3>
            <Link href="/#packages">Pilgrimage packages</Link>
            <Link href="/#destinations">Explore destinations</Link>
            <Link href="/#services">Travel services</Link>
            <Link href="/#contact">Plan a custom trip</Link>
          </div>
          <div>
            <h3>A little about us</h3>
            <Link href="/#about">Why Lakshya</Link>
            <Link href="/#faq">Common questions</Link>
            <a href={contact.map} target="_blank" rel="noopener noreferrer">
              Visit our Birtamode office
            </a>
          </div>
          <div className="footer-contact">
            <h3>Let’s make plans</h3>
            <a href={contact.phoneLink}>{contact.phone}</a>
            <span>
              5 Kankai Road, Birtamode
              <br />
              Jhapa, Nepal
            </span>
            <a
              className="text-link"
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp <Icon name="diagonal" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Lakshya Holidays Travel and Tour Pvt.
            Ltd.
          </span>
          <span>Made for meaningful journeys.</span>
          <Link href="/#home">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
