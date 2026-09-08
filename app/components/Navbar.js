"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { contact } from "../travel.mjs";

const links = [
  ["Our journeys", "/#packages"],
  ["Destinations", "/#destinations"],
  ["Why Lakshya", "/#about"],
  ["Travel services", "/#services"],
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container">
          <span>Thoughtfully planned journeys across Nepal & India</span>
          <a href={contact.phoneLink}>
            <Icon name="phone" /> {contact.phone}
          </a>
        </div>
      </div>
      <nav className="container navigation" aria-label="Main navigation">
        <Link href="/#home" className="brand" aria-label="Lakshya Holidays home">
          <Image src="/logo.png" alt="" width={52} height={52} />
          <span>
            Lakshya Holidays<small>TRAVEL & TOUR PVT. LTD.</small>
          </span>
        </Link>
        <div className="desktop-nav">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <Link href="/#contact" className="button button-navy nav-cta">
          Let’s plan a trip <Icon name="diagonal" />
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">
            <span />
            <span />
            <span />
          </summary>
          <div className="mobile-links">
            {[...links, ["Plan a trip", "/#contact"]].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={(event) =>
                  event.currentTarget.closest("details").removeAttribute("open")
                }
              >
                {label}
                <Icon name="arrow" />
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
