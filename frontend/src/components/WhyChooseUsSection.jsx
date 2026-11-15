'use client';

import React, { useState, useEffect } from 'react';

const slides = [
  { src: '/classroom.jpg', alt: 'Atom Institute Classroom Coaching' },
  { src: '/about-slide-1.jpg', alt: 'Atom Institute Reference Library & Material Racks' },
  { src: '/about-slide-2.jpg', alt: 'Students Studying at Atom Library' },
  { src: '/about-slide-3.jpg', alt: 'Classroom Lecture Session with Expert Faculty' },
  { src: '/about-slide-4.jpg', alt: 'Students Attending Interactive Lecture' },
];

export default function WhyChooseUsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2500); // 2.5s slow smooth slideshow
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="why-choose-us" className="py-10 sm:py-14 lg:py-16 bg-slate-50/60 border-b border-gray-100">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading - Centered with Lightweight Font */}
        <div className="text-center mb-5 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
            Why Choose Us
          </h2>
        </div>

        {/* Split Grid: Mobile = Photo First then Paragraph; Desktop = Paragraph Left + Photo Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Photo Slideshow Column (Active in both Laptop & Mobile View) */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
            <div className="w-full relative h-[280px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-none border border-gray-200 shadow-sm bg-gray-900">
              {slides.map((slide, idx) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                    idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}

              {/* Dots indicator */}
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-auto">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Paragraph Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 text-gray-600 font-light text-sm sm:text-base leading-relaxed order-2 lg:order-1">
            <p>
              At <strong className="font-medium text-gray-900">ATOM Education</strong>, we believe in providing more than just coaching. Our holistic approach combines expert teaching, comprehensive learning resources, and personalized attention to ensure every student receives the guidance they need to succeed. We focus on building strong conceptual foundations while nurturing critical thinking, problem-solving skills, and exam confidence.
            </p>
            <p>
              Our experienced faculty adopt structured teaching methodologies, regular assessments, and focused revision strategies to track progress and address individual learning needs. With well-designed study materials, frequent mock tests, and dedicated doubt-clearing sessions, ATOM Education creates a supportive and motivating environment where students are inspired to perform at their best and achieve their academic goals.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
