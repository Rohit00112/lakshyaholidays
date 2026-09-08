'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 500, suffix: '+', label: 'Happy Travelers', icon: '😊' },
  { value: 50, suffix: '+', label: 'Tour Packages', icon: '📦' },
  { value: 25, suffix: '+', label: 'Destinations', icon: '📍' },
  { value: 100, suffix: '%', label: 'Satisfaction', icon: '⭐' },
];

function AnimatedCounter({ target, suffix, duration = 2000, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);

  return (
    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-navy-dark via-navy to-navy-dark relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                start={isVisible}
              />
              <p className="mt-2 text-white/50 text-sm font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
