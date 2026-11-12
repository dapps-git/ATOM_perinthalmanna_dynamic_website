import React from 'react';
import { LogOut, Shield, ExternalLink, Sparkles } from 'lucide-react';

export default function Navbar({ admin, onLogout }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200/80 shadow-sm backdrop-blur-md bg-white/95">
      {/* Brand color strip */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-700 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Atom Institute"
                className="h-8 w-auto object-contain"
              />
              <div className="hidden sm:block border-l border-gray-200 pl-3">
                <span className="text-xs font-bold tracking-wider uppercase text-red-600">
                  Admin Panel
                </span>
                <span className="block text-[11px] text-gray-400">
                  Perinthalmanna Campus
                </span>
              </div>
            </div>
          </div>

          {/* Right: User and Actions */}
          <div className="flex items-center gap-3">
            {/* Status indicator badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>WebP Auto-Convert Active</span>
            </div>

            {/* Admin identity */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/60">
              <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                A
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-gray-800 leading-tight">
                  {admin?.email || 'atominstitute@perinthalmanna.com'}
                </p>
                <p className="text-[10px] text-red-600 font-medium">Super Administrator</p>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all cursor-pointer flex items-center gap-1 text-xs font-medium"
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

