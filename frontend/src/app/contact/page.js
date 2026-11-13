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

      <main className="flex-1">
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
