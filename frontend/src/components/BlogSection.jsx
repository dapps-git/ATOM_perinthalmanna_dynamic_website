'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs?limit=3')
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && data.blogs.length > 0) {
          setBlogs(data.blogs);
        } else {
          setBlogs([
            {
              _id: 'default-blog-1',
              title: 'How to Build an Unshakeable Foundation for NEET Biology & Chemistry',
              excerpt: 'Expert advice on NCERT mastery, memory recall techniques, and effective question practice for 650+ scores.',
              author: 'Atom Faculty Team',
              coverImage: {
                url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
              },
            },
          ]);
        }
      })
      .catch(() => {
        setBlogs([
          {
            _id: 'default-blog-1',
            title: 'How to Build an Unshakeable Foundation for NEET Biology & Chemistry',
            excerpt: 'Expert advice on NCERT mastery, memory recall techniques, and effective question practice for 650+ scores.',
            author: 'Atom Faculty Team',
            coverImage: {
              url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
            },
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="blogs" className="py-16 sm:py-20 bg-slate-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Centered with Lightweight Font */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">
            Blogs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-none border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-red-200 transition-all flex flex-col group"
            >
              {/* Blog Image Container - No Badges, No Border Radius */}
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden rounded-none">
                <img
                  src={blog.coverImage?.url || '/logo.png'}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/logo.png';
                  }}
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 text-base sm:text-lg mb-2 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-light line-clamp-3 leading-relaxed">
                    {blog.excerpt || blog.content}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 font-light truncate max-w-[150px]">
                    <User className="w-3.5 h-3.5 text-red-500" />
                    <span>{blog.author || 'Atom Faculty'}</span>
                  </span>
                  <Link
                    href={`/blogs/${blog.slug || blog._id}`}
                    className="font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read All Articles Link */}
        <div className="text-center mt-10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
          >
            <span>Read All Articles →</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
