'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-red-50/80 border-t border-red-100 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Atom Institute"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Inspiration of Science. Premier entrance coaching academy for NEET, JEE, CUET &amp; KEAM in Perinthalmanna, Kerala.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-light text-gray-600">
              <li><Link href="/" className="hover:text-red-600 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-red-600 transition">About Academy</Link></li>
              <li><Link href="/courses" className="hover:text-red-600 transition">Our Courses</Link></li>
              <li><Link href="/blogs" className="hover:text-red-600 transition">Academic Blogs</Link></li>
              <li><Link href="/news" className="hover:text-red-600 transition">News &amp; Notices</Link></li>
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Programs Offered
            </h4>
            <ul className="space-y-2 text-xs font-light text-gray-600">
              <li>NEET (UG) Repeaters Batch</li>
              <li>NEET Two-Year Foundation</li>
              <li>IIT-JEE Main &amp; Advanced</li>
              <li>KEAM State Engineering Batch</li>
              <li>CUET &amp; IISER Aptitude Coaching</li>
            </ul>
          </div>

          {/* Col 4: Campus & Portal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Perinthalmanna Campus
            </h4>
            <p className="text-xs font-light text-gray-600 leading-relaxed mb-2">
              <strong className="font-medium text-gray-800">Atom Institute Of Science</strong>
              <br />
              Pattambi Rd, near South Indian Bank - Perinthalmanna Branch, Shanti Nagar, Perinthalmanna, Keralam 679322
              <br />
              <span className="font-medium text-gray-800">Mob:</span>{' '}
              <a href="tel:+919946111194" className="hover:text-red-600 font-semibold text-gray-900">
                +91 9946111194
              </a>
            </p>
            <a
              href="https://maps.google.com/?cid=369425932390620783&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline mb-2 block"
            >
              <span>Open in Google Maps ↗</span>
            </a>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-light text-gray-500 hover:text-red-600 hover:underline block"
            >
              <span>Faculty &amp; Admin Portal →</span>
            </a>
          </div>

        </div>

        <div className="pt-6 border-t border-red-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-light gap-3">
          <p>© {new Date().getFullYear()} Atom Institute Perinthalmanna. All rights reserved.</p>
          <p>Inspiration of Science • Academic Excellence</p>
        </div>
      </div>
    </footer>
  );
}
