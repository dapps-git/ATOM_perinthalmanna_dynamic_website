'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Centered with Lightweight Font */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">
            Who We Are
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: CAMPUS IMAGE (NO BORDER RADIUS) ================= */}
          <div className="lg:col-span-6 flex justify-center items-center order-2 lg:order-1">
            <div className="w-full overflow-hidden rounded-none shadow-sm border border-gray-200 bg-white">
              <picture>
                <source srcSet="/atom-campus.webp" type="image/webp" />
                <img
                  src="/atom-campus.jpg"
                  alt="Atom Institute Campus Perinthalmanna"
                  className="w-full h-auto max-h-[400px] object-cover object-center block rounded-none"
                />
              </picture>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: TEXT CONTENT ================= */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            {/* Paragraph 1 */}
            <p className="text-sm sm:text-[15px] text-gray-600 font-light leading-relaxed">
              <strong className="font-semibold text-gray-800">ATOM – Inspiration of Science</strong> is a leading entrance coaching institute committed to shaping the academic success of aspiring students preparing for competitive examinations such as <span className="text-red-600 font-medium">NEET, JEE, CUET, CUSAT, KEAM, and IISER</span>. We believe that strong fundamentals and clear concepts are the foundation of excellence, and our programs are carefully designed to help students master core subjects with confidence and clarity.
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm sm:text-[15px] text-gray-600 font-light leading-relaxed">
              With experienced faculty, focused preparation strategies, comprehensive study materials, regular mock tests, and dedicated doubt-clearing sessions, ATOM provides a supportive and motivating learning environment. Our goal is to inspire students to reach their full potential, build self-confidence, and achieve outstanding results in their academic journey.
            </p>

            {/* Action Buttons - Single Row on Mobile */}
            <div className="pt-2 flex flex-row items-center gap-2 sm:gap-3.5 w-full">
              <a
                href="/contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-[11px] sm:text-sm transition-all shadow-sm cursor-pointer text-center whitespace-nowrap"
              >
                <span>Enquire for Admissions</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              </a>

              <a
                href="/contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 font-medium text-[11px] sm:text-sm transition-all cursor-pointer text-center whitespace-nowrap"
              >
                <span>Visit Campus</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
