'use client';

import React from 'react';
import { ArrowRight, Stethoscope, Atom, GraduationCap, Cog, Layers, FlaskConical } from 'lucide-react';

export default function Hero() {
  const exams = [
    { name: 'NEET', icon: Stethoscope },
    { name: 'JEE', icon: Atom },
    { name: 'CUET', icon: GraduationCap },
    { name: 'CUSAT', icon: Cog },
    { name: 'KEAM', icon: Layers },
    { name: 'IISER', icon: FlaskConical },
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-4 sm:pt-8 pb-12 sm:pb-16">
      
      {/* Hidden SVG Definition for exact Figma Curved Diagonal Mask (Laptop/Desktop View) */}
      <svg className="w-0 h-0 absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="hero-curve-mask" clipPathUnits="objectBoundingBox">
            <path d="M 0.28,0 
                     L 0.96,0 
                     C 0.99,0 1,0.02 1,0.05 
                     L 1,0.95 
                     C 1,0.98 0.99,1 0.96,1 
                     L 0.05,1 
                     C 0.01,1 0,0.97 0.01,0.93 
                     L 0.22,0.07 
                     C 0.24,0.02 0.26,0 0.28,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Subtle radial glow background accents */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ================= LEFT COLUMN (TEXT CONTENT) ================= */}
          {/* On mobile: order-2 (placed below the photo); on desktop: order-1 (left column) */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-5 sm:space-y-6 flex flex-col justify-center sm:justify-start pt-2 sm:pt-2 lg:pt-0 z-20 order-2 lg:order-1">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] leading-[1.22] tracking-tight text-[#1A1F2C] font-semibold">
              Build Your Future With{' '}
              <span className="text-red-600 font-bold block sm:inline">Atom Institute</span>
            </h1>

            {/* Subtext - Lightweight font */}
            <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed max-w-lg">
              Get the best chance to crack NEET, JEE, CUET, CUSAT, KEAM &amp; IISER with Integrated Science and our expert faculty, comprehensive study materials.
            </p>

            {/* CTA Buttons - Single row on mobile */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-3.5 pt-1 w-full sm:w-auto">
              {/* Enquire Now Button */}
              <a
                href="/contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-3 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-xs sm:text-sm transition-all shadow-sm hover:shadow group cursor-pointer text-center whitespace-nowrap"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Join Now Button */}
              <a
                href="/contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-3 rounded-lg bg-white hover:bg-red-50 active:bg-red-100 text-red-600 border border-red-600 font-medium text-xs sm:text-sm transition-all shadow-sm hover:shadow group cursor-pointer text-center whitespace-nowrap"
              >
                <span>Join Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Bottom Exam Icons Row: Glassy Type Container */}
            <div className="pt-6 sm:pt-8 overflow-x-auto pb-4 sm:pb-0">
              <div className="inline-flex items-center px-3.5 sm:px-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-md shadow-gray-200/60 ring-1 ring-gray-900/5">
                {exams.map((exam, index) => {
                  const Icon = exam.icon;
                  return (
                    <div key={exam.name} className="flex items-center">
                      <div className="flex flex-col items-center px-2.5 sm:px-3.5 text-center cursor-pointer group">
                        <div className="text-red-600 mb-1 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 sm:w-5 sm:h-5 stroke-[1.8]" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-gray-900 tracking-wider">
                          {exam.name}
                        </span>
                      </div>
                      {/* Vertical Divider */}
                      {index < exams.length - 1 && (
                        <div className="h-6 w-[1px] bg-gray-200/80 mx-0.5 sm:mx-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (HERO IMAGE) ================= */}
          {/* On mobile: order-1 (placed at top below navbar); on desktop: order-2 (right column) */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex justify-center lg:justify-end items-center mt-0 sm:mt-6 lg:mt-0 order-1 lg:order-2">
            <div className="hero-visual">
              
              {/* Atom decoration */}
              <div className="atom-decoration pointer-events-none">
                <img
                  src="/atom-star.png"
                  alt="Atom Star"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Photo Container using .classroom-frame */}
              <div className="classroom-frame shadow-xl">
                <picture>
                  <source srcSet="/hero-students.webp" type="image/webp" />
                  <img
                    src="/hero-students.jpg"
                    alt="Atom Institute students preparing for NEET and JEE entrance exams"
                  />
                </picture>
              </div>

              {/* Book decoration */}
              <div className="book-decoration pointer-events-none">
                <svg viewBox="0 0 64 64" className="w-full h-full stroke-gray-500 fill-none" strokeWidth="1.5">
                  <path d="M4 16 C 16 12, 28 14, 32 18 C 36 14, 48 12, 60 16 L 60 50 C 48 46, 36 48, 32 52 C 28 48, 16 46, 4 50 Z" />
                  <path d="M32 18 L 32 52" />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
