'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Award, GraduationCap } from 'lucide-react';

export default function ResultsPage() {
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

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {/* Header - Simple & Lightweight Font */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Hall of Fame</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">
            Our Results &amp; Achievers
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light">
            Celebrating our proud students who cracked entrance exams and secured admissions in premier medical and engineering colleges.
          </p>

          {/* Filter Pills if multiple courses exist */}
          {courseTabs.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6">
              {courseTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCourse(tab)}
                  className={`px-3.5 py-1.5 text-xs transition cursor-pointer border ${
                    activeCourse === tab
                      ? 'bg-red-600 border-red-600 text-white font-medium shadow-xs'
                      : 'bg-white border-gray-200 text-gray-600 hover:text-red-600 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 animate-pulse">
                {/* Square Box Skeleton */}
                <div className="aspect-square bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-3.5 bg-gray-200 w-3/4" />
                  <div className="h-3 bg-gray-200 w-1/2" />
                  <div className="h-2.5 bg-gray-200 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedResults.length > 0 ? (
          /* Results Grid: 6 per row on Laptop (lg:grid-cols-6) and 2 per row on Mobile (grid-cols-2) */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {displayedResults.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 hover:border-red-300 rounded-none shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                {/* 1. Square Photo Box (1:1 Ratio) */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden w-full shrink-0">
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
                      <GraduationCap className="w-8 h-8 text-gray-300 mb-1" />
                      <span className="text-[10px] text-gray-400">Atom Achiever</span>
                    </div>
                  )}

                  {/* Rank Badge on Top Left */}
                  {item.rank && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 shadow-sm">
                      {item.rank}
                    </div>
                  )}
                </div>

                {/* 2. Below Photo: Student Name, Course, College Name */}
                <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between bg-white text-left">
                  <div className="space-y-1">
                    {/* Student Name */}
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
        ) : (
          <div className="py-20 text-center border border-gray-100 bg-gray-50/50">
            <GraduationCap className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 font-light text-sm">
              No student results found for this category.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
