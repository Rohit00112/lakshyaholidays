"use client";

import { useState } from "react";
import Icon from "./Icon";
import { contact, destinations, packages, enquiryUrl } from "../travel.mjs";

const questions = [
  [
    "How do I book a package?",
    "Choose a journey and send us an enquiry on WhatsApp, or call our Birtamode team. We’ll confirm departure dates, availability, the itinerary, and payment details with you before you book.",
  ],
  [
    "What is included in the package price?",
    "The sample sheets list destinations, duration, and a price per person. Ask our team for the complete inclusions and exclusions, including transport, accommodation, meals, permits, and any additional costs, before confirming.",
  ],
  [
    "Can you arrange a custom or family trip?",
    "Yes. Tell us your preferred destinations, group size, travel dates, and budget. We can help plan a trip around your group and discuss any specific travel needs.",
  ],
  [
    "Are the departure dates and itinerary fixed?",
    "Departure dates and the day-by-day itinerary are confirmed during your enquiry. The destination lists shown here come from our sample packages; travel order may differ in the final plan.",
  ],
];

export default function Contact({ selectedTrip, onTripChange }) {
  const [draft, setDraft] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const url = enquiryUrl(data);
    setDraft({ url, trip: data.trip });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <section className="section faq-section" id="faq">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">A LITTLE HELP BEFORE YOU GO</p>
            <h2>
              Wondering about
              <br />
              the details?
            </h2>
            <p>Every great journey starts with a few questions.</p>
            <a href={contact.phoneLink} className="text-link">
              Let’s talk <Icon name="arrow" />
            </a>
          </div>
          <div className="faq-list">
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Icon name="plus" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-copy reveal">
            <p className="eyebrow">YOUR NEXT JOURNEY STARTS WITH A HELLO</p>
            <h2>
              Where do you
              <br />
              <em>want to go?</em>
            </h2>
            <p>
              Tell us what you have in mind. We’ll help turn
              <br className="desktop-break" /> “one day” into a plan.
            </p>
            <a className="contact-detail" href={contact.phoneLink}>
              <span className="value-icon">
                <Icon name="phone" />
              </span>
              <span>
                <small>GIVE US A CALL</small>
                <strong>{contact.phone}</strong>
              </span>
              <Icon name="diagonal" />
            </a>
            <a
              className="contact-detail"
              href={contact.map}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="value-icon">
                <Icon name="pin" />
              </span>
              <span>
                <small>COME SAY NAMASTE</small>
                <strong>5 Kankai Road, Birtamode</strong>
                <span>Jhapa, Nepal</span>
              </span>
              <Icon name="diagonal" />
            </a>
            <p className="contact-signoff">Your journey. Our care.</p>
          </div>
          <form
            onSubmit={handleSubmit}
            onChange={() => setDraft(null)}
            className="enquiry-form"
          >
            <h3>Let’s plan something memorable.</h3>
            <p>No commitment. Just a conversation.</p>
            <div className="form-row">
              <label htmlFor="contact-name">
                Your name
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  pattern=".*\S.*"
                  maxLength={100}
                  placeholder="Full name"
                />
              </label>
              <label htmlFor="contact-phone">
                Phone <span>(optional)</span>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  autoComplete="tel"
                  maxLength={30}
                  placeholder="Your phone number"
                />
              </label>
            </div>
            <label htmlFor="contact-trip">
              I’m interested in
              <select
                id="contact-trip"
                name="trip"
                value={selectedTrip}
                onChange={(event) => onTripChange(event.target.value)}
              >
                <option>A custom journey</option>
                <optgroup label="Featured packages">
                  {packages.map((trip) => (
                    <option key={trip.id}>{trip.name}</option>
                  ))}
                </optgroup>
                <optgroup label="India Tours">
                  {destinations
                    .filter((d) => d.country === "India")
                    .map((d) => (
                      <option key={d.name}>{d.name}</option>
                    ))}
                </optgroup>
                <optgroup label="Nepal Tours">
                  {destinations
                    .filter((d) => d.country === "Nepal")
                    .map((d) => (
                      <option key={d.name}>{d.name}</option>
                    ))}
                </optgroup>
              </select>
            </label>
            <div className="form-row">
              <label htmlFor="contact-date">
                Preferred departure <span>(optional)</span>
                <input type="date" id="contact-date" name="date" />
              </label>
              <label htmlFor="contact-travelers">
                Number of travelers
                <input
                  type="number"
                  id="contact-travelers"
                  name="travelers"
                  min="1"
                  step="1"
                  defaultValue="2"
                  required
                />
              </label>
            </div>
            <label htmlFor="contact-message">
              Anything else? <span>(optional)</span>
              <textarea
                id="contact-message"
                name="message"
                rows={3}
                maxLength={1500}
                placeholder="Your ideas, budget, or anything we should know…"
              />
            </label>
            <button type="submit" className="button button-navy">
              <Icon name="chat" />
              Continue in WhatsApp
              <Icon name="arrow" />
            </button>
            <p className="form-note">
              Opens WhatsApp with your trip details. Review and send your
              message there to start the conversation.
            </p>
            {draft?.trip === selectedTrip && (
              <p role="status" className="form-status">
                Your draft is ready.{" "}
                <a href={draft.url} target="_blank" rel="noopener noreferrer">
                  Open WhatsApp to send it <Icon name="diagonal" />
                </a>
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
