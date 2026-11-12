'use client';

import React from 'react';

export default function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-slate-50/60 border-b border-gray-100">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading - Centered with Lightweight Font */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">
            Why Choose Us
          </h2>
        </div>

        {/* Split Grid: Mobile = Photo First then Paragraph; Desktop = Paragraph Left + Photo Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Classroom Photo Column */}
          {/* On mobile: order-1 (photo first); on desktop: order-2 (right column) */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
            <div className="w-full overflow-hidden rounded-none border border-gray-200 shadow-sm bg-white">
              <picture>
                <source srcSet="/classroom.webp" type="image/webp" />
                <img
                  src="/classroom.jpg"
                  alt="Atom Institute Classroom Coaching"
                  className="w-full h-auto max-h-[380px] object-cover object-center block rounded-none"
                />
              </picture>
            </div>
          </div>

          {/* Paragraph Content Column */}
          {/* On mobile: order-2 (paragraph below photo); on desktop: order-1 (left column) */}
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
