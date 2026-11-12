'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

export default function LocationCtaSection() {
  const mapUrl =
    'https://maps.google.com/?cid=369425932390620783&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF';

  return (
    <section className="py-16 sm:py-24 bg-[#FBFBFC] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: CTA TEXT & CONTACT ================= */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Headline - Reduced font size */}
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-gray-900 tracking-tight leading-snug">
              Ready to Start Your Journey to{' '}
              <span className="text-red-600 block sm:inline">Success?</span>
            </h2>

            {/* Paragraph */}
            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed max-w-lg">
              Join ATOM Education today and take the first step towards achieving your dreams. Our expert faculty and proven methodology will guide you every step of the way.
            </p>

            {/* Action Row: Enroll Button + Call Us Block */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Enroll Now Button */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-red-600/20 cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Call Us Widget */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/20 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 font-light block leading-none mb-1">
                    Call us now
                  </span>
                  <a
                    href="tel:+919946111194"
                    className="text-sm sm:text-base font-bold text-gray-900 hover:text-red-600 transition-colors"
                  >
                    +91 9946 111 194
                  </a>
                </div>
              </div>
            </div>

            {/* Location Address */}
            <div className="pt-3 border-t border-gray-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                <strong className="font-semibold text-gray-800 block text-xs sm:text-[13px]">
                  Atom Institute Of Science (Perinthalmanna)
                </strong>
                Pattambi Rd, near South Indian Bank - Perinthalmanna Branch, Shanti Nagar, Perinthalmanna, Keralam 679322
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE MAP ================= */}
          <div className="lg:col-span-6">
            <div className="w-full rounded-none overflow-hidden shadow-sm border border-gray-200 bg-white min-h-[340px] sm:min-h-[400px] relative">
              <iframe
                title="Atom Institute Of Science Location Map"
                src="https://maps.google.com/maps?q=Atom+Institute+Of+Science,+Pattambi+Rd,+near+South+Indian+Bank+-+Perinthalmanna+Branch,+Shanti+Nagar,+Perinthalmanna,+Keralam+679322&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px', width: '100%', display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Open in Maps link */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/95 backdrop-blur-sm text-xs font-medium text-gray-800 border border-gray-200 shadow hover:text-red-600 transition"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

