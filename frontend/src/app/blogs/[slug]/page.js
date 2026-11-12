'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) {
      fetch(`http://localhost:5000/api/blogs/${params.slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.blog) setBlog(data.blog);
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

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-2">Blog Post Not Found</h1>
          <p className="text-sm text-gray-500 mb-6 font-light">The requested article could not be located.</p>
          <Link href="/blogs" className="px-5 py-2.5 rounded-none bg-red-600 text-white text-xs font-normal">
            ← Back to All Blogs
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
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-normal text-gray-500 hover:text-red-600 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        {/* Lightweight Title */}
        <h1 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-tight leading-snug mb-4">
          {blog.title}
        </h1>

        {/* Author / Date Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-y border-gray-100 py-3 mb-6">
          <span className="flex items-center gap-1.5 font-normal text-gray-700">
            <User className="w-3.5 h-3.5 text-red-500" />
            <span>{blog.author || 'Atom Institute Faculty'}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 font-light">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>
              {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Recent'}
            </span>
          </span>
        </div>

        {/* Cover Image - Compact & Reduced Size (No Border Radius) */}
        {blog.coverImage?.url && (
          <div className="rounded-none overflow-hidden mb-8 border border-gray-100 shadow-sm max-h-[300px]">
            <img
              src={blog.coverImage.url}
              alt={blog.title}
              className="w-full h-full max-h-[300px] object-cover rounded-none"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-red max-w-none text-gray-700 font-light text-sm sm:text-base leading-relaxed space-y-4">
          {blog.content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-red-600" />
            <span className="text-xs font-normal text-gray-700 mr-2">Tags:</span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-none bg-gray-100 text-gray-600 text-xs font-light"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
