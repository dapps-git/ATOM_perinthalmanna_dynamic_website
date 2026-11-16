import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle,
  Award,
  GraduationCap,
  Building2,
  BookOpen,
  Sparkles,
  Eye,
  EyeOff,
} from 'lucide-react';
import Modal from '../components/Modal';
import { createResult, updateResult, deleteResult } from '../services/api';

const COMMON_COURSES = [
  'All',
  'MBBS',
  'B.Tech',
  'BDS',
  'B.Arch',
  'IISER BS-MS',
  'B.Sc Nursing',
  'BAMS / BHMS',
  'Other',
];

export default function ResultsManager({ results = [], onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [college, setCollege] = useState('');
  const [rank, setRank] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [order, setOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  const resetForm = () => {
    setName('');
    setCourse('');
    setCollege('');
    setRank('');
    setYear(new Date().getFullYear().toString());
    setOrder(0);
    setIsPublished(true);
    setPhotoFile(null);
    setPhotoPreview('');
    setEditingItem(null);
    setError('');
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setName(item.name || '');
    setCourse(item.course || '');
    setCollege(item.college || '');
    setRank(item.rank || '');
    setYear(item.year || new Date().getFullYear().toString());
    setOrder(item.order || 0);
    setIsPublished(item.isPublished ?? true);
    setPhotoFile(null);
    setPhotoPreview(item.photo?.url || '');
    setError('');
    setIsModalOpen(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !course.trim() || !college.trim()) {
      setError('Student Name, Course, and College Name are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('course', course.trim());
      formData.append('college', college.trim());
      formData.append('rank', rank.trim());
      formData.append('year', year.trim());
      formData.append('order', order);
      formData.append('isPublished', isPublished);

      if (photoFile) {
        formData.append('photo', photoFile);
      }

      if (editingItem) {
        await updateResult(editingItem._id, formData);
        setSuccessMsg('Student result updated successfully!');
      } else {
        await createResult(formData);
        setSuccessMsg('Student result added successfully!');
      }

      setIsModalOpen(false);
      resetForm();
      if (onRefresh) onRefresh();

      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to save student result');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, studentName) => {
    if (window.confirm(`Are you sure you want to delete result for "${studentName}"?`)) {
      try {
        await deleteResult(id);
        setSuccessMsg('Student result deleted successfully');
        if (onRefresh) onRefresh();
        setTimeout(() => setSuccessMsg(''), 4000);
      } catch (err) {
        alert(err.message || 'Failed to delete student result');
      }
    }
  };

  const handleTogglePublish = async (item) => {
    try {
      const formData = new FormData();
      formData.append('isPublished', !item.isPublished);
      await updateResult(item._id, formData);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.message || 'Failed to update visibility');
    }
  };

  // Filter results
  const filteredResults = results.filter((item) => {
    const matchesSearch =
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.course && item.course.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.college && item.college.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.rank && item.rank.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCourse =
      selectedCourse === 'All' ||
      (selectedCourse === 'Other'
        ? !COMMON_COURSES.slice(1, -1).includes(item.course)
        : item.course?.toLowerCase() === selectedCourse.toLowerCase());

    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-100 text-red-600 rounded-lg">
              <Award className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Student Results & Achievers
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Showcase top ranking students, qualifying courses, and allotted colleges on the website.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer hover:shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Result</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-xs sm:text-sm flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, course, college or rank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-gray-400 font-medium shrink-0">Course:</span>
          {COMMON_COURSES.map((crs) => (
            <button
              key={crs}
              onClick={() => setSelectedCourse(crs)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
                selectedCourse === crs
                  ? 'bg-red-600 text-white font-semibold shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {crs}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid / List */}
      {filteredResults.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center shadow-sm">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">No student results found</h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-4">
            {searchTerm || selectedCourse !== 'All'
              ? 'Try adjusting your search query or course filters.'
              : 'Add qualifying students to showcase their admissions and exam achievements on the homepage.'}
          </p>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student Result</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredResults.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Photo & Status Badge */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden border-b border-gray-100">
                  {item.photo?.url ? (
                    <img
                      src={item.photo.url}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <GraduationCap className="w-10 h-10 mb-1 text-gray-300" />
                      <span className="text-[11px]">No Photo</span>
                    </div>
                  )}

                  {/* Rank / Year Badge on Top Left */}
                  {item.rank && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      {item.rank}
                    </span>
                  )}

                  {/* Visibility Pill Top Right */}
                  <span
                    className={`absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs ${
                      item.isPublished
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-700/80 text-white backdrop-blur-xs'
                    }`}
                  >
                    {item.isPublished ? 'Live' : 'Draft'}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-3.5 space-y-1.5">
                  <h3 className="text-sm font-bold text-gray-900 truncate" title={item.name}>
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-red-600 font-semibold truncate">
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.course}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-[11px] text-gray-600 leading-snug line-clamp-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                    <span>{item.college}</span>
                  </div>

                  {item.year && (
                    <div className="text-[10px] text-gray-400 font-medium pt-1">
                      Batch: {item.year}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-3.5 py-2.5 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(item)}
                  className={`inline-flex items-center gap-1 text-[11px] font-medium cursor-pointer transition ${
                    item.isPublished ? 'text-gray-500 hover:text-gray-700' : 'text-emerald-600 hover:text-emerald-700'
                  }`}
                  title={item.isPublished ? 'Hide from website' : 'Show on website'}
                >
                  {item.isPublished ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Publish</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-white rounded transition"
                    title="Edit Result"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id, item.name)}
                    className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-white rounded transition"
                    title="Delete Result"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          if (!loading) setIsModalOpen(false);
        }}
        title={editingItem ? 'Edit Student Result' : 'Add New Student Result'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Student Photo */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Student Photo <span className="text-gray-400 font-normal">(Square or portrait recommended)</span>
            </label>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoFile(null);
                      setPhotoPreview('');
                    }}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-24 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-400 shrink-0">
                  <Upload className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">Upload</span>
                </div>
              )}

              <label className="flex-1 border border-gray-200 hover:border-red-400 rounded-lg p-3 text-center cursor-pointer transition bg-white hover:bg-red-50/30">
                <span className="text-xs text-red-600 font-semibold block">Choose Student Photo</span>
                <span className="text-[11px] text-gray-400 block mt-0.5">JPG, PNG, or WebP</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Student Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Student Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mohammed Nihal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
          </div>

          {/* Course & College Name Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Course <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. MBBS, B.Tech, BDS"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {['MBBS', 'B.Tech', 'BDS', 'IISER'].map((quick) => (
                  <button
                    type="button"
                    key={quick}
                    onClick={() => setCourse(quick)}
                    className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    +{quick}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                College Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Govt Medical College, Kozhikode"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
          </div>

          {/* Rank & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Rank / Score <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. AIR 450 or KEAM 12"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Year / Batch <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 2026"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
          </div>

          {/* Display Order & Visibility */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              />
              <label htmlFor="isPublished" className="text-xs font-medium text-gray-700 cursor-pointer">
                Publish on website immediately
              </label>
            </div>

            <div className="flex items-center gap-1.5">
              <label className="text-xs text-gray-500 font-medium">Order:</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
                className="w-16 px-2 py-1 border border-gray-200 rounded text-xs text-center focus:outline-none focus:border-red-500"
                title="Higher number appears first"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              disabled={loading}
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              <span>{editingItem ? 'Save Changes' : 'Add Student Result'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
