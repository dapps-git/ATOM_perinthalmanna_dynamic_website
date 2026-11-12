'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const mapUrl =
    'https://maps.google.com/?cid=369425932390620783&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF';

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Centered with Lightweight Font */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">
            Contact Us
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light">
            Get in touch with our admissions office or visit our campus in Perinthalmanna.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* ================= LEFT COLUMN: CONTACT DETAILS (FORM REMOVED) ================= */}
          <div className="lg:col-span-6 bg-slate-50/70 p-7 sm:p-10 rounded-none border border-gray-200/80 flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-red-600 uppercase">
                  Admissions &amp; Campus Office
                </span>
                <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mt-1">
                  Atom Institute Of Science
                </h3>
              </div>

              {/* Detail Items */}
              <div className="space-y-5 pt-2">
                
                {/* 1. Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-red-100/70 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">Campus Location</h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed mt-0.5">
                      Pattambi Rd, near South Indian Bank - Perinthalmanna Branch, Shanti Nagar, Perinthalmanna, Keralam 679322
                    </p>
                  </div>
                </div>

                {/* 2. Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-red-100/70 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">Phone &amp; Mobile Helpline</h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-light mt-0.5">
                      <a
                        href="tel:+919946111194"
                        className="font-medium text-gray-900 hover:text-red-600 transition-colors"
                      >
                        +91 9946 111 194
                      </a>
                    </p>
                  </div>
                </div>

                {/* 3. Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-red-100/70 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">Official Email</h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-light mt-0.5">
                      <a
                        href="mailto:atomeducation25@gmail.com"
                        className="hover:text-red-600 transition-colors"
                      >
                        atomeducation25@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* 4. Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-red-100/70 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">Office Working Hours</h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-light mt-0.5">
                      Monday to Saturday: 8:30 AM – 6:30 PM
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="pt-4 border-t border-gray-200/80 flex flex-wrap items-center gap-3">
              <a
                href="tel:+919946111194"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-xs sm:text-sm transition-all shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Admissions</span>
              </a>

              <a
                href="https://wa.me/919946111194"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-xs sm:text-sm transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE GOOGLE MAP ================= */}
          <div className="lg:col-span-6 rounded-none overflow-hidden shadow-sm border border-gray-200 bg-white min-h-[380px] sm:min-h-[460px] relative">
            <iframe
              title="Atom Institute Of Science Perinthalmanna Campus Location Map"
              src="https://maps.google.com/maps?q=Atom+Institute+Of+Science,+Pattambi+Rd,+near+South+Indian+Bank+-+Perinthalmanna+Branch,+Shanti+Nagar,+Perinthalmanna,+Keralam+679322&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', width: '100%', display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Floating Location Card for Perinthalmanna */}
            <div className="absolute top-4 left-4 p-4 rounded-none bg-white/95 backdrop-blur-md shadow-lg border border-gray-200/80 max-w-xs sm:max-w-sm">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block mb-1">
                PERINTHALMANNA
              </span>
              <h4 className="font-bold text-gray-900 text-sm leading-tight">
                Atom Institute Of Science
              </h4>
              <p className="text-[11px] text-gray-600 font-light mt-1 leading-snug">
                Pattambi Rd, near South Indian Bank, Perinthalmanna, Keralam 679322
              </p>
              <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-700 font-medium">
                  Mob: <a href="tel:+919946111194" className="text-gray-900 font-semibold hover:text-red-600">+91 9946111194</a>
                </span>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-red-600 font-semibold hover:underline"
                >
                  <span>Open in Maps ↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
