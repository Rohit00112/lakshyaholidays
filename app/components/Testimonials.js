'use client';

import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Sarah Thompson',
    location: 'London, UK',
    text: 'Lakshya Holidays made our Everest Base Camp trek absolutely unforgettable. The guides were incredibly knowledgeable and caring. Best travel decision we ever made!',
    rating: 5,
    avatar: 'ST',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi, India',
    text: 'The cultural tour of Kathmandu Valley exceeded all expectations. Every temple, every street had a story — and our guide brought them all to life beautifully.',
    rating: 5,
    avatar: 'RK',
  },
  {
    name: 'Emma Wilson',
    location: 'Sydney, Australia',
    text: 'Pokhara was magical! The team arranged everything perfectly — from the lakeside hotel to the sunrise trek at Sarangkot. Truly a premium experience.',
    rating: 5,
    avatar: 'EW',
  },
  {
    name: 'Hiroshi Tanaka',
    location: 'Tokyo, Japan',
    text: 'The Chitwan safari was a highlight of our Nepal trip. Seeing rhinos in the wild while canoeing was breathtaking. Thank you Lakshya Holidays!',
    rating: 5,
    avatar: 'HT',
  },
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    text: 'As a solo female traveler, I felt completely safe and well-taken care of. The Annapurna Circuit trek was life-changing. Highly recommended!',
    rating: 5,
    avatar: 'PS',
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-slate-50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold-dark rounded-full text-sm font-semibold mb-4 tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            What Our <span className="text-gradient">Travelers Say</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg">
            Real stories from real travelers who explored Nepal with us.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`transition-all duration-700 ${
                  index === current
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 absolute inset-0 translate-x-8'
                }`}
              >
                {index === current && (
                  <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl relative">
                    {/* Quote mark */}
                    <div className="absolute top-6 right-8 text-8xl text-gold/10 font-serif leading-none">
                      &ldquo;
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-gold text-xl">★</span>
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-8 relative z-10">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-navy font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-navy">{testimonial.name}</p>
                        <p className="text-sm text-slate-400">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-gold w-8'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
