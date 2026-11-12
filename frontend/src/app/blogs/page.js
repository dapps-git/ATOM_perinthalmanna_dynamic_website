'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { User, ArrowRight } from 'lucide-react';

const defaultBlogs = [
  {
    _id: 'default-blog-1',
    title: 'How to Build an Unshakeable Foundation for NEET Biology & Chemistry',
    excerpt: 'Expert advice on NCERT mastery, memory recall techniques, and effective question practice for 650+ scores in NEET.',
    author: 'Atom Faculty Team',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    },
  },
  {
    _id: 'default-blog-2',
    title: 'Top Strategies for IIT-JEE Advanced Problem Solving and Speed',
    excerpt: 'Comprehensive guidance on time management, conceptual clarity in Physics and Mathematics, and mock test analysis.',
    author: 'Atom IIT-JEE Mentors',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    },
  },
  {
    _id: 'default-blog-3',
    title: 'CUET & KEAM Admission Guide: Complete Syllabus & Preparation Roadmap',
    excerpt: 'Key topics, syllabus breakdown, and step-by-step revision strategy for higher secondary science students.',
    author: 'Atom Academic Council',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    },
  },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(defaultBlogs);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && data.blogs.length > 0) {
          setBlogs(data.blogs);
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
            Blogs
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light">
            Tips, subject-wise revision plans, and success strategies from our experienced mentors.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white rounded-none border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-red-200 transition-all flex flex-col group"
            >
              {/* Reduced Image Size, No Badges, No Border Radius */}
              <div className="relative h-40 sm:h-44 w-full bg-gray-100 overflow-hidden rounded-none">
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
                  <h2 className="font-medium text-gray-900 text-base sm:text-lg mb-2 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-light line-clamp-3 leading-relaxed">
                    {blog.excerpt || blog.content}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 font-light truncate max-w-[160px]">
                    <User className="w-3.5 h-3.5 text-red-500" />
                    <span>{blog.author || 'Atom Institute'}</span>
                  </span>
                  <Link
                    href={`/blogs/${blog.slug || blog._id}`}
                    className="font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
