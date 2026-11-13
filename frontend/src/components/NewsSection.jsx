'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const defaultNews = [
  {
    _id: 'default-news-1',
    title: 'Cochin University of Science and Technology entrance exam coaching.',
    summary: 'Weekend and regular batches for higher secondary students targeting premier science and engineering admissions.',
    category: 'News & Events',
    publishDate: '2025-05-12',
    coverImage: { url: '/news-sample-1.webp' },
  },
  {
    _id: 'default-news-2',
    title: 'Admissions Open for NEET 2026 Integrated Two-Year Foundation Batch.',
    summary: 'Comprehensive coaching and fast-track guidance for NEET aspirants with dedicated problem-solving workshops.',
    category: 'Admissions',
    publishDate: '2025-05-10',
    coverImage: { url: '/news-sample-2.webp' },
  },
  {
    _id: 'default-news-3',
    title: 'Scholarship Aptitude Test Registrations Commenced for State Repeaters.',
    summary: 'Merit-based scholarships available for students aiming for top medical and engineering ranks.',
    category: 'Scholarships',
    publishDate: '2025-05-08',
    coverImage: { url: '/classroom.webp' },
  },
  {
    _id: 'default-news-4',
    title: 'CUET & KEAM Crash Course Orientation Session at Perinthalmanna Campus.',
    summary: 'Interactive guidance session led by expert faculty covering scoring patterns and time management.',
    category: 'Announcements',
    publishDate: '2025-05-05',
    coverImage: { url: '/atom-campus.webp' },
  },
];

export default function NewsSection() {
  const [newsList, setNewsList] = useState(defaultNews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/atom_institution/api';
    fetch(`${apiUrl}/news?limit=4`)
      .then((res) => res.json())
      .then((data) => {
        if (data.news && data.news.length > 0) {
          setNewsList(data.news);
        }
      })
      .catch((err) => console.error('Error fetching news:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="news" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Centered with Lightweight Font */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">
            Events &amp; Latest News
          </h2>
        </div>

        {/* 2-Column Horizontal Sleek Rectangle Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {newsList.map((item, idx) => {
            const displayDate = item.publishDate
              ? new Date(item.publishDate)
                  .toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                  .replace(/\//g, '-')
              : '12-05-2025';

            const defaultThumb = idx % 2 === 0 ? '/news-sample-1.webp' : '/news-sample-2.webp';

            return (
              <Link
                key={item._id}
                href={`/news/${item.slug || item._id}`}
                className="group flex flex-row items-center bg-[#FAFAFA] hover:bg-white border border-gray-100 hover:border-gray-200 rounded-none shadow-none hover:shadow-md transition-all overflow-hidden h-28 sm:h-32"
              >
                {/* Left: Reduced Size Rectangle Thumbnail */}
                <div className="w-28 sm:w-36 md:w-40 h-full relative bg-gray-200 shrink-0 overflow-hidden rounded-none">
                  <img
                    src={item.coverImage?.url || defaultThumb}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block rounded-none"
                    onError={(e) => {
                      e.target.src = defaultThumb;
                    }}
                  />
                </div>

                {/* Right: Reduced Content in Rectangle Layout */}
                <div className="flex-1 p-3 sm:p-4 flex flex-col justify-center min-w-0 space-y-1">
                  {/* Meta: Category & Date */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-red-600 truncate">
                      {item.category || 'News & Events'}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-light whitespace-nowrap">
                      {displayDate}
                    </span>
                  </div>

                  {/* Headline: Compact font size, 2-line clamp */}
                  <h3 className="text-xs sm:text-sm font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Notices Link */}
        <div className="text-center mt-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
          >
            <span>View All Notices &amp; News →</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
