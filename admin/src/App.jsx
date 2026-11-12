import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BlogManager from './pages/BlogManager';
import NewsManager from './pages/NewsManager';
import EnquiriesManager from './pages/EnquiriesManager';
import SystemStatus from './pages/SystemStatus';
import {
  getAuthToken,
  getStoredAdmin,
  removeAuthToken,
  removeStoredAdmin,
  fetchBlogs,
  fetchNews,
  fetchEnquiries,
} from './services/api';

export default function App() {
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check existing login
  useEffect(() => {
    const token = getAuthToken();
    const stored = getStoredAdmin();
    if (token && stored) {
      setAdmin(stored);
    }
    setLoading(false);
  }, []);

  // Fetch blogs, news & enquiries
  const loadData = async () => {
    try {
      const [blogsRes, newsRes, enquiriesRes] = await Promise.all([
        fetchBlogs().catch(() => ({ blogs: [] })),
        fetchNews().catch(() => ({ news: [] })),
        fetchEnquiries().catch(() => ({ enquiries: [] })),
      ]);
      if (blogsRes?.blogs) setBlogs(blogsRes.blogs);
      if (newsRes?.news) setNews(newsRes.news);
      if (enquiriesRes?.enquiries) setEnquiries(enquiriesRes.enquiries);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  useEffect(() => {
    if (admin) {
      loadData();
    }
  }, [admin]);

  const handleLoginSuccess = (adminData) => {
    setAdmin(adminData);
    loadData();
  };

  const handleLogout = () => {
    removeAuthToken();
    removeStoredAdmin();
    setAdmin(null);
    setActiveTab('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in -> Show Login Page
  if (!admin) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Navbar */}
      <Navbar
        admin={admin}
        onLogout={handleLogout}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }}
          blogCount={blogs.length}
          newsCount={news.length}
          enquiryCount={enquiries.length}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full min-w-0">
          {activeTab === 'dashboard' && (
            <Dashboard
              blogs={blogs}
              news={news}
              enquiryCount={enquiries.length}
              onNavigate={(tab) => {
                setActiveTab(tab);
                setIsSidebarOpen(false);
              }}
              onOpenCreateBlog={() => {
                setActiveTab('blogs');
                setIsSidebarOpen(false);
              }}
              onOpenCreateNews={() => {
                setActiveTab('news');
                setIsSidebarOpen(false);
              }}
            />
          )}

          {activeTab === 'blogs' && (
            <BlogManager blogs={blogs} onRefresh={loadData} />
          )}

          {activeTab === 'news' && (
            <NewsManager news={news} onRefresh={loadData} />
          )}

          {activeTab === 'enquiries' && (
            <EnquiriesManager enquiries={enquiries} onRefresh={loadData} />
          )}

          {activeTab === 'status' && <SystemStatus />}
        </main>
      </div>
    </div>
  );
}

