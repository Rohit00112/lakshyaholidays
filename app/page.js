"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Packages from "./components/Packages";
import About from "./components/About";
import Destinations from "./components/Destinations";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { shortlistTrip } from "./travel.mjs";

export default function Home() {
  const [selectedTrip, setSelectedTrip] = useState("A custom journey");
  // shortcut: shortlist lasts for this page visit, persist it when return visits need saved plans.
  const [shortlist, setShortlist] = useState([]);
  const [destinationFilters, setDestinationFilters] = useState({
    country: "All journeys", experience: "All experiences", search: "", savedOnly: false, limit: 6,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function handleEnquire(trip) {
    setSelectedTrip(trip);
    document.getElementById("contact").scrollIntoView();
    document.getElementById("contact-name").focus({ preventScroll: true });
  }

  function toggleShortlist(name) {
    const next = shortlist.includes(name) ? shortlist.filter((place) => place !== name) : [...shortlist, name];
    setShortlist(next);
    if (!next.length && selectedTrip === shortlistTrip) setSelectedTrip("A custom journey");
  }

  function exploreTemples() {
    setDestinationFilters({ country: "Nepal", experience: "Pilgrimage", search: "", savedOnly: false, limit: 6 });
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero onExploreTemples={exploreTemples} />
        <Packages onEnquire={handleEnquire} />
        <Destinations filters={destinationFilters} onFilterChange={setDestinationFilters} shortlist={shortlist} onToggleShortlist={toggleShortlist} onEnquire={handleEnquire} />
        <About />
        <Services />
        <Contact selectedTrip={selectedTrip} onTripChange={setSelectedTrip} shortlist={shortlist} />
      </main>
      <Footer />
    </>
  );
}
