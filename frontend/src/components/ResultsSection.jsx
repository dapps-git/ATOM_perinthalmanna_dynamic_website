'use client';

import React, { useEffect, useState, useMemo } from 'react';

export default function ResultsSection() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState('All');

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

  // Extract unique course categories for filter tabs
  const courseTabs = useMemo(() => {
    if (!results || results.length === 0) return [];
    const set = new Set();
    results.forEach((r) => {
      if (r.course) set.add(r.course.trim());
    });
    const unique = Array.from(set);
    return unique.length > 1 ? ['All', ...unique] : [];
  }, [results]);

  // Filtered results based on selected tab
  const displayedResults = useMemo(() => {
    if (activeCourse === 'All') return results;
    return results.filter(
      (r) => r.course && r.course.trim().toLowerCase() === activeCourse.toLowerCase()
    );
  }, [results, activeCourse]);

  // If loading, show subtle skeletons
  if (loading) {
    return (
      <section id="results" className="py-10 sm:py-14 lg:py-16 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="h-4 w-28 bg-gray-200 mx-auto mb-2 animate-pulse" />
            <div className="h-8 w-64 bg-gray-200 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 animate-pulse">
                <div className="aspect-[3/4] bg-gray-200" />
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

  return (
    <section id="results" className="py-10 sm:py-14 lg:py-16 bg-slate-50/70 border-b border-gray-100">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Lightweight Centered Typography */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-red-600 uppercase mb-1.5 block">
            Hall of Fame
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
            Our Results &amp; Achievers
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light max-w-xl mx-auto">
            Celebrating our proud students who cracked entrance exams and secured admissions in premier medical and engineering colleges.
          </p>

          {/* Filter Pills if multiple courses exist */}
          {courseTabs.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-5">
              {courseTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCourse(tab)}
                  className={`px-3 py-1 text-xs transition cursor-pointer ${
                    activeCourse === tab
                      ? 'bg-red-600 text-white font-medium shadow-xs'
                      : 'bg-white text-gray-600 hover:text-red-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 6 Per Row in Laptop (lg:grid-cols-6) and 2 Per Row in Mobile (grid-cols-2) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {displayedResults.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200/80 hover:border-red-300 rounded-none shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              {/* 1. Photo First on Top */}
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden w-full shrink-0">
                {item.photo?.url ? (
                  <img
                    src={item.photo.url}
                    alt={item.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 block"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/logo.png';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-2 text-center">
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">
                      {item.name ? item.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                  </div>
                )}

                {/* Optional Rank Badge on Top Left */}
                {item.rank && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 shadow-sm">
                    {item.rank}
                  </div>
                )}
              </div>

              {/* 2. Below Photo: Student Name, Course, College Name */}
              <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between bg-white">
                <div className="space-y-1">
                  {/* Name */}
                  <h3
                    className="text-xs sm:text-[13px] font-bold text-gray-900 tracking-tight leading-snug line-clamp-1"
                    title={item.name}
                  >
                    {item.name}
                  </h3>

                  {/* Course */}
                  <p
                    className="text-[11px] sm:text-xs font-semibold text-red-600 truncate uppercase tracking-wide"
                    title={item.course}
                  >
                    {item.course}
                  </p>

                  {/* College Name */}
                  <p
                    className="text-[10px] sm:text-[11px] text-gray-600 font-light line-clamp-2 leading-tight"
                    title={item.college}
                  >
                    {item.college}
                  </p>
                </div>

                {item.year && (
                  <div className="mt-2 pt-1.5 border-t border-gray-100 text-[9px] sm:text-[10px] text-gray-400 font-light flex items-center justify-between">
                    <span>Batch {item.year}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

