import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  UserCheck,
  Server,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, blogCount = 0, newsCount = 0, enquiryCount = 0 }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'blogs',
      label: 'Blog Management',
      icon: FileText,
      badge: blogCount > 0 ? blogCount : null,
    },
    {
      id: 'news',
      label: 'News & Announcements',
      icon: Newspaper,
      badge: newsCount > 0 ? newsCount : null,
    },
    {
      id: 'enquiries',
      label: 'Admission Enquiries',
      icon: UserCheck,
      badge: enquiryCount > 0 ? enquiryCount : null,
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      id: 'status',
      label: 'System & Media Config',
      icon: Server,
      badge: 'Active',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200/80 md:min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            Main Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/20 font-semibold'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-600'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Feature highlight card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50 to-white border border-red-100/80">
          <div className="flex items-center gap-2 text-red-700 font-bold text-xs mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sharp WebP Pipeline</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            All uploaded JPEG/PNG images are automatically converted to optimized <strong>.webp</strong> before cloud or local storage.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-gray-100 text-xs text-gray-400">
        <p className="font-semibold text-gray-600">Atom Institute</p>
        <p>Perinthalmanna, Kerala</p>
      </div>
    </aside>
  );
}

