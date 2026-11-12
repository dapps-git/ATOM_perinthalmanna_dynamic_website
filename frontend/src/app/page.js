import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import CoursesSection from '../components/CoursesSection';
import BlogSection from '../components/BlogSection';
import NewsSection from '../components/NewsSection';
import LocationCtaSection from '../components/LocationCtaSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <WhyChooseUsSection />
        <CoursesSection />
        <BlogSection />
        <NewsSection />
        <LocationCtaSection />
      </main>
      <Footer />
    </div>
  );
}
