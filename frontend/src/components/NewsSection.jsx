'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NewsSection() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/news?limit=4')
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

        {/* 2-Column Horizontal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
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
                className="group flex flex-col sm:flex-row bg-[#FAFAFA] hover:bg-white border border-gray-100 hover:border-gray-200 rounded-none shadow-none hover:shadow-md transition-all overflow-hidden"
              >
                {/* Left: Thumbnail Image (No Border Radius) */}
                <div className="sm:w-5/12 h-52 sm:h-auto min-h-[170px] relative bg-gray-200 flex-shrink-0 overflow-hidden rounded-none">
                  <img
                    src={item.coverImage?.url || defaultThumb}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block rounded-none"
                    onError={(e) => {
                      e.target.src = defaultThumb;
                    }}
                  />
                </div>

                {/* Right: Date, Red Category, Headline */}
                <div className="sm:w-7/12 p-5 sm:p-6 flex flex-col justify-center space-y-2">
                  {/* Date */}
                  <span className="text-xs sm:text-[13px] font-medium text-gray-900 tracking-wide">
                    {displayDate}
                  </span>

                  {/* Red Category */}
                  <span className="text-xs sm:text-[13px] font-medium text-red-600">
                    {item.category || 'News & Events'}
                  </span>

                  {/* Headline */}
                  <h3 className="text-sm sm:text-base text-gray-800 font-normal leading-snug line-clamp-3 group-hover:text-red-600 transition-colors">
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
