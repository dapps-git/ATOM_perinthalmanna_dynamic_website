import React from 'react';
import { LogOut, Menu, X } from 'lucide-react';

export default function Navbar({ admin, onLogout, onToggleSidebar, isSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200/80 shadow-sm backdrop-blur-md bg-white/95">
      {/* Brand color strip */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-700 w-full" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Left: Hamburger (mobile) + Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Hamburger Button */}
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg text-gray-600 hover:text-red-600 hover:bg-gray-100 md:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <img
                src="/logo.png"
                alt="Atom Institute"
                className="h-7 sm:h-8 w-auto object-contain"
              />
              <div className="border-l border-gray-200 pl-2.5 sm:pl-3">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-red-600 block leading-tight">
                  Admin Panel
                </span>
                <span className="hidden sm:block text-[10px] text-gray-400 leading-none">
                  Perinthalmanna Campus
                </span>
              </div>
            </div>
          </div>

          {/* Right: User identity and Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin identity */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200/60">
              <div className="w-6 h-6 rounded-md bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                A
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-medium text-gray-800 leading-tight truncate max-w-[150px] lg:max-w-xs">
                  {admin?.email || 'admin@atominstitute.com'}
                </p>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
