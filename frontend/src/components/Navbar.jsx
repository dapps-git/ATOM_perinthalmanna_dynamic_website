'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'News', href: '/news' },
    { name: 'Results', href: '/#why-choose-us' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo with tagline */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <img
              src="/logo.png"
              alt="Atom Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
            <span className="hidden sm:inline-block text-xs sm:text-sm font-light tracking-wide text-gray-700 border-l border-gray-200 pl-3 sm:pl-4">
              Inspiration of Science
            </span>
          </Link>

          {/* Desktop Navigation Links - Lightweight Montserrat Font */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs lg:text-[13px] tracking-wide transition-colors py-1 ${
                    isActive
                      ? 'font-medium text-red-600'
                      : 'font-light text-gray-700 hover:text-red-600'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Enquire Now Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-xs lg:text-sm transition shadow-sm cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200 px-5 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="py-1">
            <span className="text-xs font-light text-gray-500">Inspiration of Science • Perinthalmanna</span>
          </div>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-sm tracking-wide transition-colors ${
                    isActive
                      ? 'font-semibold text-red-600'
                      : 'font-light text-gray-700 hover:text-red-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600 text-white font-medium text-sm shadow-sm"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-full border border-gray-200 text-gray-600 font-light text-xs hover:border-red-600 hover:text-red-600"
            >
              <span>Admin Portal →</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

