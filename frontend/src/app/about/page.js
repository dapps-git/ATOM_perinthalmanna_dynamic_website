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

      <main className="flex-1">
        <AboutSection />
        <WhyChooseUsSection />
      </main>

      <Footer />
    </div>
  );
}
