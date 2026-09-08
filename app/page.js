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

export default function Home() {
  const [selectedTrip, setSelectedTrip] = useState("A custom journey");

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

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Packages onEnquire={handleEnquire} />
        <Destinations onEnquire={handleEnquire} />
        <About />
        <Services />
        <Contact selectedTrip={selectedTrip} onTripChange={setSelectedTrip} />
      </main>
      <Footer />
    </>
  );
}
