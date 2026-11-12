'use client';

import React from 'react';
import {
  ArrowRight,
  Stethoscope,
  Atom,
  GraduationCap,
  Cog,
  Layers,
  FlaskConical,
  Users,
  Target,
} from 'lucide-react';

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
    <section className="relative overflow-hidden bg-white">
      
      {/* ========================================================================= */}
      {/* MOBILE / BELOW TABLET HERO VIEW (Matches User Mockup)                      */}
      {/* ========================================================================= */}
      <div className="lg:hidden w-full relative pb-8">
        
        {/* Top Curved Navy Blue Header - Compact Reduced Height */}
        <div className="relative bg-gradient-to-br from-[#082956] via-[#0B3979] to-[#0A3369] text-white pt-5 pb-7 px-5 sm:px-6 overflow-hidden rounded-b-[28px] shadow-md z-10">
          
          {/* Top-Right Red Curved Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 bg-red-600 rounded-bl-[70px] pointer-events-none opacity-95" />

          {/* Content */}
          <div className="relative z-10 space-y-2.5 max-w-md">
            {/* Headline */}
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-[1.2] text-white">
              Build Your Future With{' '}
              <span className="text-white block font-extrabold">Atom Institute</span>
            </h1>

            {/* Subtext */}
            <p className="text-[11px] sm:text-xs text-blue-100/90 font-light leading-snug">
              NEET, JEE, CUET, CUSAT, KEAM &amp; IISER Coaching with Integrated Science.
            </p>

            {/* Red Pill Button */}
            <div className="pt-1">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-xs transition-all shadow-md shadow-red-600/30 cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Atom Building Image - Overlaps seamlessly behind the curved header with zero white gap */}
        <div className="relative -mt-7 w-full h-[360px] sm:h-[420px] overflow-hidden bg-transparent">
          <img
            src="/atom-building.jpg"
            alt="Atom Institute of Science Building Perinthalmanna"
            className="w-full h-full object-cover object-top block"
          />
        </div>

        {/* Full-Width Glassy Course Names Bar - Placed Below Image (No Floating Overlap, No Border Radius) */}
        <div className="w-full bg-white/85 backdrop-blur-md border-y border-gray-200/70 shadow-sm py-2.5 sm:py-3 px-1.5 sm:px-4 rounded-none relative z-10">
          <div className="flex items-center justify-between w-full">
            {exams.map((exam, index) => {
              const Icon = exam.icon;
              return (
                <div key={exam.name} className="flex items-center flex-1 justify-center">
                  <div className="flex items-center gap-1 sm:gap-1.5 px-0.5 sm:px-1">
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-600 stroke-[2] shrink-0" />
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-800 tracking-wider">
                      {exam.name}
                    </span>
                  </div>
                  {index < exams.length - 1 && (
                    <div className="h-3.5 w-[1px] bg-gray-200/80 ml-auto" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* DESKTOP / LAPTOP HERO VIEW                                                */}
      {/* ========================================================================= */}
      <div className="hidden lg:block pt-8 pb-16">
        
        {/* Subtle radial glow background accents */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="col-span-5 space-y-6 flex flex-col justify-center z-20">
              
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] leading-[1.22] tracking-tight text-[#1A1F2C] font-semibold">
                Build Your Future With{' '}
                <span className="text-red-600 font-bold block sm:inline">Atom Institute</span>
              </h1>

              {/* Subtext - Lightweight font */}
              <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed max-w-lg">
                Get the best chance to crack NEET, JEE, CUET, CUSAT, KEAM &amp; IISER with Integrated Science and our expert faculty, comprehensive study materials.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3.5 pt-1">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-sm transition-all shadow-sm hover:shadow group cursor-pointer"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-white hover:bg-red-50 active:bg-red-100 text-red-600 border border-red-600 font-medium text-sm transition-all shadow-sm hover:shadow group cursor-pointer"
                >
                  <span>Join Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* Exam Icons Row */}
              <div className="pt-6 overflow-x-auto">
                <div className="inline-flex items-center px-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-md shadow-gray-200/60 ring-1 ring-gray-900/5">
                  {exams.map((exam, index) => {
                    const Icon = exam.icon;
                    return (
                      <div key={exam.name} className="flex items-center">
                        <div className="flex flex-col items-center px-3.5 text-center cursor-pointer group">
                          <div className="text-red-600 mb-1 group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5 stroke-[1.8]" />
                          </div>
                          <span className="text-[11px] font-bold text-gray-900 tracking-wider">
                            {exam.name}
                          </span>
                        </div>
                        {index < exams.length - 1 && (
                          <div className="h-6 w-[1px] bg-gray-200/80 mx-1" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Classroom Photo Container */}
            <div className="col-span-7 relative flex justify-end items-center">
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

      </div>

    </section>
  );
}
