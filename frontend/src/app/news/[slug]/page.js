'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function NewsDetailPage() {
  const params = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/atom_institution/api';
      fetch(`${apiUrl}/news/${params.slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.news) setNewsItem(data.news);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-2">Notice Not Found</h1>
          <p className="text-sm text-gray-500 mb-6 font-light">The requested announcement could not be located.</p>
          <Link href="/news" className="px-5 py-2.5 rounded-none bg-red-600 text-white text-xs font-normal">
            ← Back to All Notices
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Back Link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-normal text-gray-500 hover:text-red-600 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Announcements</span>
        </Link>

        {/* Category */}
        <div className="mb-2">
          <span className="text-xs font-medium text-red-600 tracking-wide uppercase">
            {newsItem.category || 'News & Events'}
          </span>
        </div>

        {/* Lightweight Title */}
        <h1 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-tight leading-snug mb-3">
          {newsItem.title}
        </h1>

        {/* Publish Date */}
        <div className="flex items-center gap-2 text-xs text-gray-400 border-y border-gray-100 py-2.5 mb-6">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-light">
            Published on{' '}
            {newsItem.publishDate
              ? new Date(newsItem.publishDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Recent'}
          </span>
        </div>

        {/* Cover Image - Compact & Reduced Size (No Border Radius) */}
        {newsItem.coverImage?.url && (
          <div className="rounded-none overflow-hidden mb-6 border border-gray-100 shadow-sm max-h-[300px]">
            <img
              src={newsItem.coverImage.url}
              alt={newsItem.title}
              className="w-full h-full max-h-[300px] object-cover rounded-none"
            />
          </div>
        )}

        {/* Summary callout */}
        {newsItem.summary && (
          <div className="p-4 rounded-none bg-slate-50 border-l-2 border-red-600 text-gray-800 font-normal text-sm leading-relaxed mb-6">
            {newsItem.summary}
          </div>
        )}

        {/* Full Content */}
        <div className="text-gray-700 font-light text-sm sm:text-base leading-relaxed space-y-4">
          {newsItem.content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
