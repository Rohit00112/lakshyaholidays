"use client";

import Image from "next/image";
import Icon from "./Icon";
import { destinations, destinationMapUrl, filterDestinations, shortlistTrip } from "../travel.mjs";

export default function Destinations({ filters, onFilterChange, shortlist, onToggleShortlist, onEnquire }) {
  const results = filterDestinations(filters.country, filters.search, filters.experience)
    .filter((destination) => !filters.savedOnly || shortlist.includes(destination.name));
  const visible = results.slice(0, filters.limit);
  const templeCount = destinations.filter((destination) => destination.country === "Nepal" && destination.type === "Pilgrimage").length;
  const hasFilters = filters.country !== "All journeys" || filters.experience !== "All experiences" || filters.search || filters.savedOnly;

  function changeFilters(changes) {
    onFilterChange({ ...filters, ...changes, limit: 6 });
  }

  function resetFilters() {
    changeFilters({ country: "All journeys", experience: "All experiences", search: "", savedOnly: false });
  }

  return (
    <section id="destinations" className="section destinations-section" aria-labelledby="destinations-heading">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">SACRED PLACES. YOUR OWN PATH.</p>
            <h2 id="destinations-heading">Find a place that<br /><em>speaks to you.</em></h2>
          </div>
          <p>From Nepal’s temple courtyards to India’s sacred trails. Explore, save your favourites, and let us bring your journey together.</p>
        </div>

        <div className="explorer-intro">
          <span className="value-icon"><Icon name="temple" /></span>
          <div>
            <strong>{templeCount} sacred journeys across Nepal</strong>
            <p>Kathmandu Valley, the eastern hills, Pokhara, and beyond.</p>
          </div>
          <span className="explorer-total">{destinations.length} destinations to discover</span>
        </div>

        <div className="destination-tools">
          <div className="filter-buttons" role="group" aria-label="Filter by country">
            {["All journeys", "Nepal", "India"].map((country) => (
              <button key={country} aria-pressed={filters.country === country} onClick={() => changeFilters({ country })}>
                {country}
              </button>
            ))}
            <button className="shortlist-filter" aria-pressed={filters.savedOnly} onClick={() => changeFilters({ savedOnly: !filters.savedOnly })}>
              <Icon name="heart" /> My shortlist <span>{shortlist.length}</span>
            </button>
          </div>
          <label className="destination-search">
            <Icon name="search" />
            <input type="search" aria-label="Search destinations" placeholder="Search temples, cities, or districts" value={filters.search} onChange={(event) => changeFilters({ search: event.target.value })} />
          </label>
        </div>

        <div className="experience-tools">
          <label htmlFor="destination-experience">Your kind of journey</label>
          <select id="destination-experience" value={filters.experience} onChange={(event) => changeFilters({ experience: event.target.value })}>
            <option>All experiences</option>
            {["Pilgrimage", "Culture", "Leisure", "Adventure", "Wildlife"].map((experience) => <option key={experience}>{experience}</option>)}
          </select>
          <p role="status" aria-live="polite">Showing {visible.length} of {results.length} {results.length === 1 ? "destination" : "destinations"}</p>
          {hasFilters && <button className="text-link" onClick={resetFilters}>Reset filters <Icon name="close" /></button>}
        </div>

        {shortlist.length > 0 && (
          <aside className="trip-shortlist" aria-label="Your trip shortlist">
            <div className="shortlist-heading">
              <div>
                <p className="eyebrow">A JOURNEY TAKING SHAPE</p>
                <h3>Your places, one thoughtful plan.</h3>
              </div>
              <button className="button button-gold" onClick={() => onEnquire(shortlistTrip)}>
                Plan my shortlist <Icon name="arrow" />
              </button>
            </div>
            <ul className="shortlist-places">
              {shortlist.map((name) => (
                <li key={name}>
                  <button aria-label={`Remove ${name} from shortlist`} onClick={() => onToggleShortlist(name)}>{name} <Icon name="close" /></button>
                </li>
              ))}
            </ul>
            <p>We’ll help confirm a suitable route. Your shortlist stays here while this page is open.</p>
          </aside>
        )}

        {visible.length > 0 && (
          <div className="destination-grid" id="destination-results">
            {visible.map((destination) => {
              const saved = shortlist.includes(destination.name);
              return (
                <article className="destination-card" key={destination.name}>
                  <div className={`destination-photo${destination.image ? "" : " destination-photo-empty"}`}>
                    {destination.image ? (
                      <Image src={destination.image} alt={destination.imageAlt || destination.name} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" />
                    ) : (
                      <div className="destination-placeholder"><Icon name={destination.type === "Pilgrimage" ? "temple" : "compass"} /><span>{destination.location || destination.country}</span></div>
                    )}
                    <span className="photo-badge">{destination.type === "Pilgrimage" ? "Sacred journey" : destination.type}</span>
                    <button className="destination-save" aria-label={`${saved ? "Remove" : "Save"} ${destination.name}${saved ? " from" : " to"} shortlist`} aria-pressed={saved} onClick={() => onToggleShortlist(destination.name)}>
                      <Icon name="heart" />
                    </button>
                  </div>
                  <div className="destination-body">
                    <p className="eyebrow country"><Icon name="pin" /> {destination.location ? `${destination.location}, ${destination.country}` : destination.country}</p>
                    <h3>{destination.name}</h3>
                    {destination.nepaliName && <span className="destination-nepali" lang="ne">{destination.nepaliName}</span>}
                    <p>{destination.description}</p>
                    <div className="destination-facts">
                      <span><Icon name="clock" /> {destination.days ? `${destination.days} days · sample tour` : "Custom trip · ask for a quote"}</span>
                    </div>
                    <details className="destination-details">
                      <summary>Visit details <Icon name="plus" /></summary>
                      <p>{destination.visitNote || "Tell us your travel dates and group size. We’ll confirm the route, access, inclusions, and price before you book."}</p>
                      <a className="text-link" href={destinationMapUrl(destination)} target="_blank" rel="noopener noreferrer" aria-label={`View ${destination.name} on Google Maps`}>View on map <Icon name="pin" /></a>
                      {destination.source && <a className="text-link" href={destination.source} target="_blank" rel="noopener noreferrer">Nepal Tourism Board guide <Icon name="diagonal" /></a>}
                      {destination.imageCredit && (
                        <p className="image-credit">Photo: <a href={destination.imageCredit.source} target="_blank" rel="noopener noreferrer">{destination.imageCredit.author}</a> · <a href={destination.imageCredit.licenseUrl} target="_blank" rel="noopener noreferrer">{destination.imageCredit.license}</a>. Resized and displayed with a crop.</p>
                      )}
                    </details>
                    <button className="destination-link" aria-label={`Plan a trip to ${destination.name}`} onClick={() => onEnquire(destination.name)}>
                      Plan this journey <span className="circle-icon"><Icon name="diagonal" /></span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {results.length > filters.limit && (
          <div className="destination-more">
            <button className="button button-navy" aria-controls="destination-results" onClick={() => onFilterChange({ ...filters, limit: filters.limit + 6 })}>
              Show more destinations <Icon name="plus" />
            </button>
            <span>{results.length - visible.length} more places to explore</span>
          </div>
        )}

        {results.length === 0 && (
          <div className="empty-state">
            <Icon name={filters.savedOnly ? "heart" : "compass"} />
            <h3>{filters.savedOnly && !shortlist.length ? "Your shortlist starts here." : "A different journey in mind?"}</h3>
            <p>{filters.savedOnly && !shortlist.length ? "Tap the heart on a destination to make it part of your plan." : "Try another place or reset your filters to explore more."}</p>
            <button className="button button-navy" onClick={resetFilters}>Explore all destinations <Icon name="arrow" /></button>
          </div>
        )}
        <p className="destination-note"><Icon name="document" /> Journeys from Eastern Nepal. Departure dates, routes, access, and pricing are confirmed with our team.</p>
      </div>
    </section>
  );
}
