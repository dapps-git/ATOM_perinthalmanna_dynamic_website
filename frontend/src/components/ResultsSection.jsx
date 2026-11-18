'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function ResultsSection() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/atom_institution/api';
    fetch(`${apiUrl}/results?publishedOnly=true&limit=100`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching results:', err);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // If loading, show skeleton
  if (loading) {
    return (
      <section id="results" className="py-10 sm:py-14 bg-slate-50/70 border-b border-gray-100 overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="h-4 w-28 bg-gray-200 mx-auto mb-2 animate-pulse" />
            <div className="h-8 w-64 bg-gray-200 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-3.5 bg-gray-200 w-3/4" />
                  <div className="h-3 bg-gray-200 w-1/2" />
                  <div className="h-2.5 bg-gray-200 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no results published yet, hide section cleanly
  if (results.length === 0) {
    return null;
  }

  // Duplicate items so the train marquee has enough cards to loop seamlessly
  let trainItems = [...results];
  while (trainItems.length < 12) {
    trainItems = [...trainItems, ...results];
  }
  // Double for infinite marquee translation
  const fullTrain = [...trainItems, ...trainItems];

  return (
    <section id="results" className="py-10 sm:py-14 bg-slate-50/70 border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Centered with Lightweight Font */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-red-600 uppercase mb-1 block">
            Hall of Fame
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
            Our Results &amp; Achievers
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-500 font-light max-w-xl mx-auto">
            Celebrating our proud students who cracked entrance exams and secured admissions in premier medical and engineering colleges.
          </p>
        </div>
      </div>

      {/* Train Marquee Track: 6 per row on Laptop, 2 per row on Mobile, moderate smooth speed */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left & Right Soft Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-50/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-50/90 to-transparent z-10" />

        {/* Marquee Inner Scroller */}
        <div className="animate-results-train gap-3 sm:gap-4 flex items-stretch">
          {fullTrain.map((item, index) => (
            <div
              key={`${item._id}-${index}`}
              className="w-[calc((100vw-36px)/2)] max-w-[185px] sm:w-[195px] md:w-[205px] lg:w-[210px] shrink-0 bg-white border border-gray-200/90 hover:border-red-400 rounded-none shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group select-none text-left"
            >
              {/* 1. Square Photo Box (1:1 Ratio) */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden w-full shrink-0">
                {item.photo?.url ? (
                  <img
                    src={item.photo.url}
                    alt={item.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 block pointer-events-none"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/logo.png';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-2 text-center">
                    <GraduationCap className="w-8 h-8 text-gray-300 mb-1" />
                    <span className="text-[10px] text-gray-400">Achiever</span>
                  </div>
                )}

                {/* Optional Rank Badge on Top Left */}
                {item.rank && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 shadow-sm">
                    {item.rank}
                  </div>
                )}
              </div>

              {/* 2. Below Photo: Student Name, Course, College Name */}
              <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between bg-white">
                <div className="space-y-1">
                  {/* Name */}
                  <h3
                    className="text-xs sm:text-[13px] font-bold text-gray-900 tracking-tight leading-snug truncate"
                    title={item.name}
                  >
                    {item.name}
                  </h3>

                  {/* Course */}
                  <p
                    className="text-[10px] sm:text-[11px] font-semibold text-red-600 truncate uppercase tracking-wider"
                    title={item.course}
                  >
                    {item.course}
                  </p>

                  {/* College Name */}
                  <p
                    className="text-[10px] sm:text-[11px] text-gray-500 font-light truncate leading-tight"
                    title={item.college}
                  >
                    {item.college}
                  </p>
                </div>

                {item.year && (
                  <div className="mt-2 pt-1 border-t border-gray-100 text-[9px] text-gray-400 font-light">
                    <span>Batch {item.year}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Below -> Link Sign to Full Results Page */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/results"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow group rounded-none"
        >
          <span>View All Results &amp; Achievers</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
