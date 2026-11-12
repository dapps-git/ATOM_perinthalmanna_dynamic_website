import React from 'react';
import Navbar from '../../components/Navbar';
import AboutSection from '../../components/AboutSection';
import WhyChooseUsSection from '../../components/WhyChooseUsSection';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'About Us | Atom Institute - Inspiration of Science',
  description: 'Learn more about Atom Education, our teaching philosophy, expert faculty, and student success track record in Perinthalmanna.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />
      
      {/* Page Header - Clean & Lightweight */}
      <section className="bg-white border-b border-gray-100 py-8 sm:py-10 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">
            About Us
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light max-w-lg mx-auto">
            Empowering students with concept mastery, disciplined coaching, and national competitive excellence in Perinthalmanna.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <AboutSection />
        <WhyChooseUsSection />
      </main>

      <Footer />
    </div>
  );
}
