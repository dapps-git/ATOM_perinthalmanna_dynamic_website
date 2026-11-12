import React from 'react';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Contact Us & Registration | Atom Institute Perinthalmanna',
  description: 'Register for NEET, JEE, CUET, KEAM coaching batches or contact our admissions office in Perinthalmanna.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />

      {/* Page Header - Clean & Lightweight */}
      <section className="bg-white border-b border-gray-100 py-8 sm:py-10 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">
            Contact Us
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light max-w-lg mx-auto">
            Fill out the registration form or visit our campuses in Perinthalmanna and Valanchery.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
