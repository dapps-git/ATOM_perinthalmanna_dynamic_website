import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  CheckCircle,
  XCircle,
  Upload,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import Modal from '../components/Modal';
import { createBlog, updateBlog, deleteBlog } from '../services/api';

const CATEGORIES = [
  'All',
  'Academics',
  'NEET Coaching',
  'JEE Coaching',
  'Foundation',
  'Campus Life',
  'Student Stories',
  'General',
];

export default function BlogManager({ blogs, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Atom Institute Faculty');
  const [category, setCategory] = useState('Academics');
  const [tags, setTags] = useState('NEET, Coaching');
  const [isPublished, setIsPublished] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setAuthor('Atom Institute Faculty');
    setCategory('Academics');
    setTags('NEET, JEE, Perinthalmanna');
    setIsPublished(true);
    setImageFile(null);
    setImagePreview('');
    setEditingBlog(null);
    setError('');
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title || '');
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    setAuthor(blog.author || 'Atom Institute Faculty');
    setCategory(blog.category || 'Academics');
    setTags(Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '');
    setIsPublished(blog.isPublished ?? true);
    setImageFile(null);
    setImagePreview(blog.coverImage?.url || '');
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
      formData.append('excerpt', excerpt);
      formData.append('content', content);
      formData.append('author', author);
      formData.append('category', category);
      formData.append('tags', tags);
      formData.append('isPublished', isPublished);

      if (imageFile) {
        formData.append('coverImage', imageFile);
      }

      if (editingBlog) {
        await updateBlog(editingBlog._id, formData);
        setSuccessMsg('Blog post updated successfully!');
      } else {
        await createBlog(formData);
        setSuccessMsg('New blog created successfully!');
      }

      setIsModalOpen(false);
      resetForm();
      onRefresh();

      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, blogTitle) => {
    if (window.confirm(`Are you sure you want to delete "${blogTitle}"?`)) {
      try {
        await deleteBlog(id);
        setSuccessMsg('Blog deleted successfully');
        onRefresh();
        setTimeout(() => setSuccessMsg(''), 4000);
      } catch (err) {
        alert(err.message || 'Failed to delete blog');
      }
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      b.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-xs text-gray-500 mt-1">
            Publish articles, coaching tips, and academic insights for students and parents.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-xs transition shadow-md shadow-red-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Blog</span>
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
            placeholder="Search by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-gray-50/50 hover:bg-white focus:bg-white transition"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
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

      {/* Blogs Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-800 text-base">No Blog Posts Found</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or create your first blog post using the button above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col hover:border-red-200 hover:shadow-md transition-all group"
            >
              {/* Cover Image */}
              <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                <img
                  src={blog.coverImage?.url || '/logo.png'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/logo.png';
                  }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-sm text-red-700 shadow-sm">
                    {blog.category || 'General'}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${
                      blog.isPublished
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {blog.isPublished ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-base line-clamp-2 hover:text-red-600 transition">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {blog.excerpt || blog.content}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1 truncate max-w-[130px]">
                      <User className="w-3 h-3 text-red-500" />
                      <span>{blog.author}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-gray-400" />
                      <span>{blog.views || 0}</span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenEdit(blog)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id, blog.title)}
                      className="p-1.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                      title="Delete Blog"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBlog ? 'Edit Blog Article' : 'Create New Blog Article'}
        subtitle="Fill in the article details and upload an optional cover image."
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
              Blog Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Proven Strategies to Score 650+ in NEET 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                placeholder="Author / Faculty name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Cover Image
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-red-400 transition bg-gray-50/50">
              <input
                type="file"
                id="blogImageInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="blogImageInput"
                className="cursor-pointer flex flex-col items-center gap-1.5"
              >
                <Upload className="w-5 h-5 text-red-600" />
                <span className="text-xs font-semibold text-gray-700">
                  {imageFile ? imageFile.name : 'Click to select cover image'}
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
              Short Excerpt
            </label>
            <textarea
              rows={2}
              placeholder="Brief summary displayed on cards..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Full Content *
            </label>
            <textarea
              rows={5}
              required
              placeholder="Write the full blog article content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. NEET, JEE, Revision, Exam"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="blogPublishCheck"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              />
              <label htmlFor="blogPublishCheck" className="text-xs font-semibold text-gray-700 cursor-pointer">
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
              <span>{editingBlog ? 'Save Changes' : 'Publish Article'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

