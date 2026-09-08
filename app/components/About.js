import Image from "next/image";
import Icon from "./Icon";

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <div className="about-photos reveal">
          <div className="about-main-photo">
            <Image
              src="/kathmandu.jpg"
              alt="Temples and traditional architecture in Kathmandu"
              fill
              sizes="(max-width: 767px) 85vw, 36vw"
            />
          </div>
          <div className="about-small-photo">
            <Image
              src="/pokhara.jpg"
              alt="Phewa Lake and the mountains of Pokhara"
              fill
              sizes="(max-width: 767px) 45vw, 20vw"
            />
          </div>
          <div className="about-stamp">
            <Icon name="mountain" />
            <span>
              LOCAL ROOTS.
              <br />
              OPEN HORIZONS.
            </span>
            <small>BIRTAMODE, NEPAL</small>
          </div>
        </div>
        <div className="about-copy reveal">
          <p className="eyebrow">A LOCAL HEART. A WORLD OF POSSIBILITIES.</p>
          <h2>
            Good journeys begin
            <br />
            with good people.
          </h2>
          <p>
            Namaste. We’re Lakshya Holidays, your travel agency in Birtamode,
            Jhapa. We believe a memorable trip starts with someone who listens.
          </p>
          <p>
            A family pilgrimage, a Himalayan adventure, or a well-earned escape
            — we help bring it together with thoughtful planning and a personal
            touch.
          </p>
          <div className="about-values">
            <div>
              <span className="value-icon">
                <Icon name="pin" />
              </span>
              <div>
                <h3>Local knowledge, personal care</h3>
                <p>A real team in Birtamode to talk through your plans.</p>
              </div>
            </div>
            <div>
              <span className="value-icon">
                <Icon name="compass" />
              </span>
              <div>
                <h3>Your journey, at your pace</h3>
                <p>Plans shaped around your interests, time, and budget.</p>
              </div>
            </div>
            <div>
              <span className="value-icon">
                <Icon name="document" />
              </span>
              <div>
                <h3>Clarity before you travel</h3>
                <p>Discuss the itinerary, inclusions, and quote with us.</p>
              </div>
            </div>
          </div>
          <a href="#contact" className="text-link">
            Get to know your travel partner <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
