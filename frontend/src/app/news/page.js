'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Calendar, ArrowRight } from 'lucide-react';

const defaultNews = [
  {
    _id: 'default-news-1',
    title: 'Cochin University of Science and Technology entrance exam coaching.',
    summary: 'Weekend and regular batches for higher secondary students targeting premier science and engineering university admissions.',
    category: 'News & Events',
    publishDate: '2025-05-12',
    coverImage: { url: '/news-sample-1.webp' },
  },
  {
    _id: 'default-news-2',
    title: 'Admissions Open for NEET 2026 Integrated Two-Year Foundation Batch.',
    summary: 'Comprehensive coaching and fast-track guidance for NEET aspirants with dedicated problem-solving workshops and mock tests.',
    category: 'Admissions',
    publishDate: '2025-05-10',
    coverImage: { url: '/news-sample-2.webp' },
  },
  {
    _id: 'default-news-3',
    title: 'Scholarship Aptitude Test Registrations Commenced for State Repeaters.',
    summary: 'Merit-based scholarships available for students aiming for top medical and engineering ranks with high percentile scores.',
    category: 'Scholarships',
    publishDate: '2025-05-08',
    coverImage: { url: '/classroom.webp' },
  },
  {
    _id: 'default-news-4',
    title: 'CUET & KEAM Crash Course Orientation Session at Perinthalmanna Campus.',
    summary: 'Interactive guidance session led by expert faculty covering scoring patterns, time management, and mock test analysis.',
    category: 'Announcements',
    publishDate: '2025-05-05',
    coverImage: { url: '/atom-campus.webp' },
  },
];

export default function NewsPage() {
  const [news, setNews] = useState(defaultNews);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.news && data.news.length > 0) {
          setNews(data.news);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {/* Header - Simple & Lightweight Font */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">
            News &amp; Events
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light">
            Stay up to date with exam results, scholarship registrations, repeaters batches, and orientation programs.
          </p>
        </div>

        {/* News Items List */}
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-none border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center justify-between"
            >
              <div className="flex items-start gap-4 flex-1">
                {/* Compact Thumbnail (No Border Radius) */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                  <img
                    src={item.coverImage?.url || '/logo.png'}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-none"
                    onError={(e) => {
                      e.target.src = '/logo.png';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs text-red-600 font-medium">
                      {item.category || 'News & Events'}
                    </span>
                    <span className="text-xs text-gray-400 font-light flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span>
                        {item.publishDate
                          ? new Date(item.publishDate).toLocaleDateString()
                          : 'Recent'}
                      </span>
                    </span>
                  </div>

                  <h2 className="text-sm sm:text-base font-medium text-gray-900 leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-light mt-1 line-clamp-2 leading-relaxed">
                    {item.summary || item.content}
                  </p>
                </div>
              </div>

              <Link
                href={`/news/${item.slug || item._id}`}
                className="px-3.5 py-1.5 rounded-none border border-red-600 text-red-600 hover:bg-red-50 text-xs font-normal flex items-center gap-1.5 transition self-end sm:self-center"
              >
                <span>Read Notice</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
