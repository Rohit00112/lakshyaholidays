"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "./Icon";
import { filterDestinations } from "../travel.mjs";

export default function Destinations({ onEnquire }) {
  const [category, setCategory] = useState("All journeys");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const results = filterDestinations(category, search);
  const visible = showAll ? results : results.slice(0, 3);

  return (
    <section id="destinations" className="section destinations-section">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">
              EXPLORE NEPAL & INDIA WITH LAKSHYA HOLIDAYS
            </p>
            <h2>Where will your curiosity take you?</h2>
          </div>
          <p>
            Find your kind of escape, from a quiet lakeside
            <br className="desktop-break" /> morning to a trail above the
            clouds.
          </p>
        </div>
        <div className="destination-tools">
          <div
            className="filter-buttons"
            role="group"
            aria-label="Filter destinations"
          >
            {["All journeys", "Nepal", "India", "Pilgrimage"].map((filter) => (
              <button
                key={filter}
                aria-pressed={category === filter}
                onClick={() => {
                  setCategory(filter);
                  setShowAll(false);
                }}
              >
                {filter === "Pilgrimage" ? "Pilgrimages" : filter}
              </button>
            ))}
          </div>
          <label className="destination-search">
            <Icon name="search" />
            <input
              type="search"
              aria-label="Search destinations"
              placeholder="Find a destination"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setShowAll(false);
              }}
            />
          </label>
        </div>
        <p className="sr-only" role="status">
          {results.length} destinations found. Showing {visible.length}.
        </p>
        <div className="destination-grid">
          {visible.map((destination) => (
            <article className="destination-card" key={destination.name}>
              <div className="destination-photo">
                {destination.image ? (
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                ) : (
                  <div className="destination-placeholder">
                    <Icon name="compass" />
                    <span>Your next discovery</span>
                  </div>
                )}
                <span className="photo-badge">{destination.type}</span>
              </div>
              <div className="destination-body">
                <p className="eyebrow country">
                  <Icon name="pin" />
                  {destination.country}
                </p>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <button
                  className="destination-link"
                  aria-label={`Plan a trip to ${destination.name}`}
                  onClick={() => onEnquire(destination.name)}
                >
                  Let’s explore{" "}
                  <span className="circle-icon">
                    <Icon name="diagonal" />
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
        {results.length === 0 && (
          <div className="empty-state">
            <Icon name="compass" />
            <h3>A different journey in mind?</h3>
            <p>Try another destination or let us plan something for you.</p>
            <button
              className="button button-navy"
              onClick={() => {
                setSearch("");
                setCategory("All journeys");
              }}
            >
              Show all destinations <Icon name="arrow" />
            </button>
          </div>
        )}
        {results.length > 3 && (
          <div className="destination-more">
            <button
              className="text-link"
              aria-expanded={showAll}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? "Show fewer destinations"
                : `Explore all ${results.length} destinations`}
              <Icon name="arrow" />
            </button>
            <span>Every journey can be made your own.</span>
          </div>
        )}
      </div>
    </section>
  );
}
