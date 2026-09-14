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

  /* Split results into cards (have images) and list-only items */
  const withImage = results.filter((d) => d.image);
  const visibleCards = showAll ? withImage : withImage.slice(0, 6);

  /* Group list items by country */
  const indiaList = results.filter((d) => d.country === "India");
  const nepalList = results.filter((d) => d.country === "Nepal");

  return (
    <section id="destinations" className="section destinations-section">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">
              EXPLORE NEPAL &amp; INDIA WITH LAKSHYA HOLIDAYS
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
          {results.length} destinations found.
        </p>

        {/* ── Featured image cards ────────────────────────── */}
        {visibleCards.length > 0 && (
          <div className="destination-grid">
            {visibleCards.map((destination) => (
              <article className="destination-card" key={destination.name}>
                <div className="destination-photo">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                  <span className="photo-badge">{destination.type}</span>
                </div>
                <div className="destination-body">
                  <p className="eyebrow country">
                    <Icon name="pin" />
                    {destination.country}
                    {destination.days && (
                      <span className="duration-badge">
                        {destination.days} days
                      </span>
                    )}
                  </p>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <button
                    className="destination-link"
                    aria-label={`Plan a trip to ${destination.name}`}
                    onClick={() => onEnquire(destination.name)}
                  >
                    Let&#39;s explore{" "}
                    <span className="circle-icon">
                      <Icon name="diagonal" />
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {withImage.length > 6 && (
          <div className="destination-more">
            <button
              className="text-link"
              aria-expanded={showAll}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? "Show fewer destinations"
                : `See all ${withImage.length} featured destinations`}
              <Icon name="arrow" />
            </button>
          </div>
        )}

        {/* ── Categorized tour list ──────────────────────── */}
        {(indiaList.length > 0 || nepalList.length > 0) && (
          <div className="tour-list-section">
            {indiaList.length > 0 && (
              <div className="tour-list-group">
                <h3 className="tour-list-heading">
                  <Icon name="pin" />
                  India Tours
                  <span className="tour-list-count">{indiaList.length}</span>
                </h3>
                <ul className="tour-list">
                  {indiaList.map((d) => (
                    <li key={d.name} className="tour-list-item">
                      <button onClick={() => onEnquire(d.name)}>
                        <span className="tour-list-name">{d.name}</span>
                        <span className="tour-list-meta">
                          {d.days && (
                            <span className="duration-badge">
                              {d.days} days
                            </span>
                          )}
                          <span className="tour-list-type">{d.type}</span>
                          <Icon name="arrow" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {nepalList.length > 0 && (
              <div className="tour-list-group">
                <h3 className="tour-list-heading">
                  <Icon name="pin" />
                  Nepal Tours
                  <span className="tour-list-count">{nepalList.length}</span>
                </h3>
                <ul className="tour-list">
                  {nepalList.map((d) => (
                    <li key={d.name} className="tour-list-item">
                      <button onClick={() => onEnquire(d.name)}>
                        <span className="tour-list-name">{d.name}</span>
                        <span className="tour-list-meta">
                          {d.days && (
                            <span className="duration-badge">
                              {d.days} days
                            </span>
                          )}
                          <span className="tour-list-type">{d.type}</span>
                          <Icon name="arrow" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

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
        <p className="destination-note">
          <Icon name="document" />
          All tours depart from Eastern Nepal. Contact us for departure
          dates, inclusions, and pricing.
        </p>
      </div>
    </section>
  );
}
