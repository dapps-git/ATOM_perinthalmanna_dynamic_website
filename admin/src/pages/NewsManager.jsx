import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Calendar,
  Upload,
  AlertCircle,
  CheckCircle,
  Bell,
  Sparkles,
} from 'lucide-react';
import Modal from '../components/Modal';
import { createNews, updateNews, deleteNews } from '../services/api';

const NEWS_CATEGORIES = [
  'All',
  'Admissions',
  'Exam Results',
  'Announcements',
  'Events',
  'Scholarships',
  'Faculty Updates',
];

export default function NewsManager({ news, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Admissions');
  const [badgeText, setBadgeText] = useState('NEW');
  const [priority, setPriority] = useState(0);
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [isPublished, setIsPublished] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const resetForm = () => {
    setTitle('');
    setSummary('');
    setContent('');
    setCategory('Admissions');
    setBadgeText('NEW');
    setPriority(0);
    setPublishDate(new Date().toISOString().split('T')[0]);
    setIsPublished(true);
    setImageFile(null);
    setImagePreview('');
    setEditingItem(null);
    setError('');
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setTitle(item.title || '');
    setSummary(item.summary || '');
    setContent(item.content || '');
    setCategory(item.category || 'Admissions');
    setBadgeText(item.badgeText || 'NEW');
    setPriority(item.priority || 0);
    setPublishDate(
      item.publishDate ? new Date(item.publishDate).toISOString().split('T')[0] : ''
    );
    setIsPublished(item.isPublished ?? true);
    setImageFile(null);
    setImagePreview(item.coverImage?.url || '');
    setError('');
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('content', content);
      formData.append('category', category);
      formData.append('badgeText', badgeText);
      formData.append('priority', priority);
      formData.append('publishDate', publishDate);
      formData.append('isPublished', isPublished);

      if (imageFile) {
        formData.append('coverImage', imageFile);
      }

      if (editingItem) {
        await updateNews(editingItem._id, formData);
        setSuccessMsg('News notice updated successfully!');
      } else {
        await createNews(formData);
        setSuccessMsg('News item published successfully!');
      }

      setIsModalOpen(false);
      resetForm();
      onRefresh();

      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to save news notice');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, itemTitle) => {
    if (window.confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
      try {
        await deleteNews(id);
        setSuccessMsg('News notice deleted successfully');
        onRefresh();
        setTimeout(() => setSuccessMsg(''), 4000);
      } catch (err) {
        alert(err.message || 'Failed to delete news notice');
      }
    }
  };

  const filteredNews = news.filter((n) => {
    const matchesSearch =
      n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      n.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">News & Announcements</h2>
          <p className="text-xs text-gray-500 mt-1">
            Publish entrance results, admissions circulars, and institutional alerts.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-xs transition shadow-md shadow-red-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Notice / News</span>
        </button>
      </div>

      {/* Success notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search news or circulars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-gray-50/50 hover:bg-white focus:bg-white transition"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News List */}
      {filteredNews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-800 text-base">No Announcements Found</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Click the button above to publish an admission notice, result update, or event announcement.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNews.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-sm hover:border-red-200 hover:shadow-md transition flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div className="flex items-start gap-4 flex-1">
                {/* Image or Icon */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200/60">
                  <img
                    src={item.coverImage?.url || '/logo.png'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/logo.png';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700 border border-red-200">
                      {item.badgeText || 'NOTICE'}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {item.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {item.publishDate
                          ? new Date(item.publishDate).toLocaleDateString()
                          : 'Recently'}
                      </span>
                    </span>
                    {item.priority > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        High Priority
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.summary || item.content}
                  </p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                    item.isPublished
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {item.isPublished ? 'Published' : 'Hidden'}
                </span>

                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl text-gray-600 hover:text-red-700 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition cursor-pointer"
                  title="Edit Announcement"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.title)}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition cursor-pointer"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit News / Notice' : 'Publish New Notice or News'}
        subtitle="Fill in the announcement details and upload an optional banner image."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Notice / News Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. NEET 2026 Repeaters Batch Orientation Scheduled for Sunday"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
              >
                {NEWS_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Badge Text
              </label>
              <input
                type="text"
                placeholder="e.g. ADMISSIONS, NEW, RESULTS"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Publish Date
              </label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Banner / Cover Image
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-red-400 transition bg-gray-50/50">
              <input
                type="file"
                id="newsImageInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="newsImageInput"
                className="cursor-pointer flex flex-col items-center gap-1.5"
              >
                <Upload className="w-5 h-5 text-red-600" />
                <span className="text-xs font-semibold text-gray-700">
                  {imageFile ? imageFile.name : 'Click to select notice image'}
                </span>
                <span className="text-[11px] text-gray-400">
                  PNG, JPG, JPEG • High quality image recommended
                </span>
              </label>

              {imagePreview && (
                <div className="mt-3 relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-28 rounded-lg object-cover border border-gray-200 mx-auto"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Brief Summary *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Short headline summary for alerts ticker and cards..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Full Circular / Content *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Write the full announcement details..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Priority Ranking
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
              >
                <option value={0}>Normal Priority</option>
                <option value={1}>High Priority (Top Announcement)</option>
                <option value={2}>Urgent / Breaking Alert</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="newsPublishCheck"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              />
              <label htmlFor="newsPublishCheck" className="text-xs font-semibold text-gray-700 cursor-pointer">
                Publish immediately on website
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition shadow-md shadow-red-600/20 disabled:opacity-70 cursor-pointer flex items-center gap-2"
            >
              {loading && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              <span>{editingItem ? 'Save Changes' : 'Publish Notice'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

