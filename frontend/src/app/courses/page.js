import React from 'react';
import Navbar from '../../components/Navbar';
import CoursesSection from '../../components/CoursesSection';
import LocationCtaSection from '../../components/LocationCtaSection';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Courses & Programs | Atom Institute - Inspiration of Science',
  description: 'Comprehensive coaching for NEET, IIT-JEE, CUET, CUSAT, KEAM, and IISER entrance examinations at Atom Institute of Science Perinthalmanna.',
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <CoursesSection />
        <LocationCtaSection />
      </main>

      <Footer />
    </div>
  );
}

