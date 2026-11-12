'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CoursesSection() {
  const courses = [
    {
      name: 'NEET',
      desc: 'Comprehensive medical entrance preparation with expert faculty and rigorous practice.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'JEE',
      desc: 'Master physics, chemistry & mathematics for IIT-JEE Main & Advanced.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'CUET',
      desc: 'Central University Entrance Test preparation for diverse undergraduate programs.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'CUSAT',
      desc: 'Cochin University of Science and Technology entrance exam coaching.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'KEAM',
      desc: 'Kerala Engineering Architecture Medical entrance test preparation.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'IISER',
      desc: 'Indian Institutes of Science Education and Research aptitude test coaching.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="courses" className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Centered with Lightweight Font */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">
            Our Courses
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
            Choose from our comprehensive range of entrance exam preparation courses designed to help you achieve your academic goals.
          </p>
        </div>

        {/* 6 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course) => (
            <div
              key={course.name}
              className="bg-white border border-gray-100 rounded-none overflow-hidden shadow-sm hover:shadow-md hover:border-red-200 transition-all flex flex-col group"
            >
              {/* Course Photo (No Border Radius) */}
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden rounded-none">
                <img
                  src={course.image}
                  alt={`${course.name} Coaching at Atom Institute`}
                  className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Course Content */}
              <div className="p-6 flex-1 flex flex-col justify-between text-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed mb-6">
                    {course.desc}
                  </p>
                </div>

                {/* Learn More Button */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-xs sm:text-sm transition-all shadow-sm group-hover:shadow"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

