import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import WhyChooseUsSection from '../../components/WhyChooseUsSection';
import LocationCtaSection from '../../components/LocationCtaSection';
import Footer from '../../components/Footer';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | ATOM – Inspiration of Science',
  description: 'Learn about ATOM – Inspiration of Science, our teaching philosophy, conceptual learning approach, and focused entrance coaching for NEET, JEE, CUET, CUSAT, KEAM and IISER.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* Page Top Header Banner */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-gray-100 py-10 sm:py-14 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <span className="text-red-600 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 block">
              Inspiration of Science
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
              About <span className="text-red-600 font-semibold">ATOM</span>
            </h1>
          </div>
        </div>

        {/* Dedicated About Us Main Content */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Photo Column */}
              <div className="lg:col-span-5 flex justify-center items-center order-1">
                <div className="w-full overflow-hidden rounded-none shadow-sm border border-gray-200 bg-white">
                  <img
                    src="/about-inner-library.jpg"
                    alt="Students studying at ATOM Institute Library"
                    className="w-full h-auto max-h-[440px] sm:max-h-[500px] object-cover object-center block rounded-none"
                  />
                </div>
              </div>

              {/* Text Paragraphs Column */}
              <div className="lg:col-span-7 space-y-5 text-gray-600 font-light text-sm sm:text-[15px] leading-relaxed order-2">
                <p>
                  <strong className="font-semibold text-gray-900">ATOM – Inspiration of Science</strong> is a dedicated educational institute focused on guiding students towards academic excellence and success in competitive entrance examinations. We provide focused coaching and academic support for students preparing for <span className="text-red-600 font-medium">NEET, JEE, CUET, CUSAT, KEAM and IISER</span> examinations. At ATOM, we believe that every student has the potential to achieve great things with the right guidance, strong fundamentals and consistent learning.
                </p>

                <p>
                  Our teaching approach focuses on building a clear understanding of concepts rather than simply memorising information. Through structured learning programmes, experienced faculty guidance, comprehensive study materials, regular practice sessions and mock examinations, we help students develop the knowledge, confidence and problem-solving skills needed for competitive exams.
                </p>

                <p>
                  We create a supportive and student-friendly learning environment where students are encouraged to ask questions, explore new ideas and improve their academic abilities. Our dedicated approach to teaching, individual attention and continuous academic guidance help students stay focused throughout their preparation journey.
                </p>

                <p>
                  At ATOM, our mission goes beyond examination preparation. We aim to inspire scientific thinking, encourage curiosity and help students build a strong foundation for their future careers. With a commitment to quality education and continuous improvement, ATOM – Inspiration of Science strives to turn students' ambitions into meaningful academic achievements.
                </p>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    <span>Enquire for Admissions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 font-medium text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Why Choose Us Section with 5-Photo Slideshow */}
        <WhyChooseUsSection />

        {/* Location / Contact CTA Section */}
        <LocationCtaSection />
      </main>

      <Footer />
    </div>
  );
}
