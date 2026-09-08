import Image from "next/image";
import Icon from "./Icon";
import { packages } from "../travel.mjs";

export default function Hero() {
  const featured = packages[1];
  return (
    <section id="home" className="hero">
      <Image
        src="/hero-bg.jpg"
        alt="Golden light over the Himalayas and colourful prayer flags"
        fill
        sizes="100vw"
        quality={90}
        preload
        className="hero-image"
      />
      <div className="hero-shade" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow light">
            <span /> ROOTED IN NEPAL. MADE FOR EXPLORERS.
          </p>
          <h1>
            Some journeys
            <br />
            <em>stay with you.</em>
          </h1>
          <p className="hero-description">
            From the peaks of Nepal to the sacred paths of India.
            <br className="desktop-break" /> Discover places that move you, with
            people who care.
          </p>
          <div className="hero-actions">
            <a href="#packages" className="button button-gold">
              Find your journey <Icon name="arrow" />
            </a>
            <a href="#about" className="hero-story">
              <span className="circle-icon">
                <Icon name="compass" />
              </span>{" "}
              Meet your travel partner
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <span className="hero-location">
            <Icon name="pin" />
            <span>
              THE HIMALAYAS, NEPAL
              <br />
              <small>A little closer to extraordinary.</small>
            </span>
          </span>
          <a href="#packages" className="hero-feature">
            <div className="hero-feature-photo">
              <Image src="/char-dham.jpg" alt="" fill sizes="80px" />
            </div>
            <span>
              <small>FIND YOUR SACRED ESCAPE</small>
              <strong>Char Dham & Ayodhya</strong>
              <span>
                {featured.days} days · NPR{" "}
                {featured.price.toLocaleString("en-IN")} <Icon name="arrow" />
              </span>
            </span>
          </a>
        </div>
      </div>
      <div className="container journey-bar">
        <div className="journey-intro">
          <span>Your next chapter</span>
          <strong>What calls to you?</strong>
        </div>
        <a href="#packages">
          <Icon name="sun" />
          <span>
            <strong>Sacred journeys</strong>
            <small>Pilgrimages with purpose</small>
          </span>
          <Icon name="diagonal" />
        </a>
        <a href="#destinations">
          <Icon name="mountain" />
          <span>
            <strong>A little adventure</strong>
            <small>Mountains, culture & more</small>
          </span>
          <Icon name="diagonal" />
        </a>
        <a href="#contact">
          <Icon name="compass" />
          <span>
            <strong>Something just for you</strong>
            <small>Let’s make it personal</small>
          </span>
          <Icon name="diagonal" />
        </a>
      </div>
    </section>
  );
}
