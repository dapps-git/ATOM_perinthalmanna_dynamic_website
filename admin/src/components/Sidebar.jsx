import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  UserCheck,
  Server,
  X,
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  blogCount = 0,
  newsCount = 0,
  enquiryCount = 0,
  isOpen = false,
  onClose,
}) {
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
      label: 'News & Circulars',
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
      label: 'System Status',
      icon: Server,
      badge: 'Online',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 inset-y-0 left-0 z-50 md:z-auto w-64 bg-white border-r border-gray-200/80 p-4 flex flex-col justify-between h-full md:h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-4">
          {/* Mobile Header with Close Button */}
          <div className="flex md:hidden items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Admin Navigation
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <p className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Menu
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (onClose) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-600 text-white shadow-sm font-semibold'
                        : 'text-gray-600 hover:text-red-600 hover:bg-red-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-600'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
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
        </div>

        {/* Clean Footer */}
        <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
          <span>Atom Institute</span>
          <span className="text-gray-300">•</span>
          <span>Perinthalmanna</span>
        </div>
      </aside>
    </>
  );
}
