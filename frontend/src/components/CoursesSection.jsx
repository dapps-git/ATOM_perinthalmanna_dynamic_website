'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const courses = [
  {
    id: 'neet',
    name: 'NEET (UG)',
    category: 'Medical Stream',
    badge: 'Flagship Program',
    target: 'Plus One, Plus Two & Repeaters',
    desc: 'Intensive medical entrance coaching focused on 100% NCERT mastery, high-yield concept drills, and negative-mark reduction strategies.',
    highlights: [
      'NCERT Line-by-Line Biology & Chemistry Mastery',
      '720-Mark Weekly Full Syllabus Mock Tests & OMR Drills',
      'Daily 1-on-1 Doubt Clarification with Senior Faculty',
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'jee',
    name: 'IIT-JEE (Main & Adv)',
    category: 'Engineering Stream',
    badge: 'Premier Tech',
    target: 'Class 11, 12 & Long Term',
    desc: 'Deep analytical problem-solving in Physics, Chemistry, and Advanced Mathematics curated for top percentiles in JEE Main & Advanced.',
    highlights: [
      'Multi-concept & High-difficulty Problem Workshops',
      'Previous 20 Years JEE Archive Comprehensive Analysis',
      'Computer-Based Test (CBT) Real-Exam Simulation',
    ],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'cuet',
    name: 'CUET (UG)',
    category: 'Central Universities',
    badge: 'National Entrance',
    target: 'Class 12 & Degree Aspirants',
    desc: 'Tailored preparation for admissions into premier central universities like DU, BHU, JNU, and Hyderabad University across science domains.',
    highlights: [
      'Domain Subjects Focus + General Aptitude Guidance',
      'Speed & Accuracy Time Management Modules',
      'Extensive Topic-Wise Online Mock Test Series',
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'cusat',
    name: 'CUSAT CAT',
    category: 'University Entrance',
    badge: 'State Premier',
    target: 'Plus Two Science Students',
    desc: 'Strategic coaching designed around the Cochin University Common Admission Test pattern with speed mathematics and physics mastery.',
    highlights: [
      'CUSAT CAT Pattern Focused Question Banks',
      'Formula Memorization & Fast Calculation Shortcuts',
      'Rank Predictor Test Series with In-Depth Analytics',
    ],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'keam',
    name: 'KEAM',
    category: 'Kerala Engineering',
    badge: 'High Success Rate',
    target: 'State Higher Secondary',
    desc: 'Master the high-speed Kerala Engineering syllabus with structured modules, past paper dissection, and rank-boosting test series.',
    highlights: [
      'High-Weightage Chapters Revision Sprints',
      'Speed Mathematics & Applied Physics Drills',
      'State Rank Enhancement & Negative Mark Elimination',
    ],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'iiser',
    name: 'IISER / NISER (IAT & NEST)',
    category: 'Science & Research',
    badge: 'Pure Science',
    target: 'Passionate Science Seekers',
    desc: 'Specialized mentoring for India’s top pure science institutes (IISER, NISER, CEBS) building deep research-oriented conceptual aptitude.',
    highlights: [
      'Four-Subject Balanced Training (PCMB Integration)',
      'Scientific Reasoning & Conceptual Application Workshops',
      'Mentorship from Senior Subject Matter Specialists',
    ],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
  },
];

export default function CoursesSection() {
  return (
    <section id="courses" className="py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Main Heading Only */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
            Our Courses
          </h2>
        </div>

        {/* Modern Distinctive Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl border border-gray-200/80 hover:border-red-300 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col overflow-hidden relative"
            >
              {/* Top Image Banner with Badges */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={course.image}
                  alt={`${course.name} Coaching at Atom Institute`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                
                {/* Top Badge: Category */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 backdrop-blur-md text-gray-900 shadow-sm">
                    {course.category}
                  </span>
                </div>

                {/* Top Right Badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-medium bg-red-600 text-white shadow-sm">
                    {course.badge}
                  </span>
                </div>

                {/* Course Name Over Image Bottom */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-sm">
                      {course.name}
                    </h3>
                    <p className="text-[11px] text-gray-200 font-light">
                      {course.target}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Description */}
                <p className="text-xs sm:text-[13px] text-gray-600 font-light leading-relaxed">
                  {course.desc}
                </p>

                {/* Key Highlights Checklist */}
                <div className="space-y-2 pt-1 border-t border-gray-100">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Key Highlights
                  </p>
                  <ul className="space-y-1.5">
                    {course.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-700 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Admissions Open</span>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-700 hover:text-white text-xs font-medium transition-all group-hover:bg-red-600 group-hover:text-white"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
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
