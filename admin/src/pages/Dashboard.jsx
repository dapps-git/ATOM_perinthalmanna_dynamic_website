import React from 'react';
import {
  FileText,
  Newspaper,
  Eye,
  Plus,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Database,
  Cloud,
  Sparkles,
} from 'lucide-react';

export default function Dashboard({ blogs, news, onNavigate, onOpenCreateBlog, onOpenCreateNews }) {
  const publishedBlogs = blogs.filter((b) => b.isPublished).length;
  const publishedNews = news.filter((n) => n.isPublished).length;
  const totalViews = blogs.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-700 to-rose-800 text-white p-6 sm:p-8 shadow-xl shadow-red-900/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-200" />
            <span>Atom Institute Admin Portal • Perinthalmanna</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Academic & Content Hub
          </h2>
          <p className="mt-2 text-sm sm:text-base text-red-100/90 leading-relaxed">
            Manage your latest institution updates, exam coaching results, blog articles, and news releases. All images are automatically converted to optimized WebP format.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onOpenCreateBlog}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-red-700 hover:bg-red-50 font-semibold text-xs transition shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Blog Post</span>
            </button>
            <button
              onClick={onOpenCreateNews}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-800/80 hover:bg-red-900/90 border border-white/20 text-white font-semibold text-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Publish News / Notice</span>
            </button>
          </div>
        </div>

        {/* Decorative circle */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Blogs */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Blogs
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{blogs.length}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{publishedBlogs} published live</span>
          </div>
        </div>

        {/* Total News */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              News & Notices
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{news.length}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{publishedNews} announcements active</span>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Blog Views
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totalViews}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Real-time counter</span>
          </div>
        </div>

        {/* Image Optimizer */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Image Pipeline
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">WebP</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Auto Sharp compression active</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Blogs & Recent News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blogs */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Recent Blog Articles</h3>
              <p className="text-xs text-gray-500">Articles published on the Atom website</p>
            </div>
            <button
              onClick={() => onNavigate('blogs')}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {blogs.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">No blog articles created yet.</p>
            ) : (
              blogs.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition border border-gray-100"
                >
                  <img
                    src={item.coverImage?.url || '/logo.png'}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                    onError={(e) => {
                      e.target.src = '/logo.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                      <span className="text-red-600 font-medium">{item.category}</span>
                      <span>•</span>
                      <span>{item.author}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      item.isPublished
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {item.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent News */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Latest Announcements</h3>
              <p className="text-xs text-gray-500">Notices and exam alerts for students</p>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {news.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">No news or announcements yet.</p>
            ) : (
              news.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition border border-gray-100"
                >
                  <img
                    src={item.coverImage?.url || '/logo.png'}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                    onError={(e) => {
                      e.target.src = '/logo.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                      <span className="text-red-600 font-medium">{item.category}</span>
                      <span>•</span>
                      <span>
                        {item.publishDate
                          ? new Date(item.publishDate).toLocaleDateString()
                          : 'Recently'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-100 text-red-700 border border-red-200">
                    {item.badgeText || 'ALERT'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Connection & Setup Helper Info */}
      <div className="bg-white rounded-2xl border border-red-100 p-5 shadow-sm">
        <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-2">
          <Database className="w-4 h-4 text-red-600" />
          <span>MongoDB & Cloudinary Integration Readiness</span>
        </h4>
        <p className="text-xs text-gray-600 leading-relaxed">
          The backend is currently running with automatic fallback handling so you can test all admin features, image conversions, and content creations immediately. Once you provide your MongoDB connection string and Cloudinary API credentials in <code className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">backend/.env</code>, the backend will automatically persist data to your cloud MongoDB and stream WebP images directly to your Cloudinary media library.
        </p>
      </div>
    </div>
  );
}

