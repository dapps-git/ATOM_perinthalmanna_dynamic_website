import React, { useState } from 'react';
import { Phone, Calendar, Trash2, CheckCircle2, Clock, MessageSquare, GraduationCap } from 'lucide-react';
import { updateEnquiryStatus, deleteEnquiry } from '../services/api';

export default function EnquiriesManager({ enquiries, onRefresh }) {
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoadingId(id);
      await updateEnquiryStatus(id, newStatus);
      onRefresh();
    } catch (err) {
      alert(err.message || 'Failed to update enquiry');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id, studentName) => {
    if (window.confirm(`Delete enquiry from ${studentName}?`)) {
      try {
        await deleteEnquiry(id);
        onRefresh();
      } catch (err) {
        alert(err.message || 'Failed to delete enquiry');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Student Admission Enquiries</h2>
        <p className="text-xs text-gray-500 mt-1">
          Prospective student leads from the website hero &amp; contact form.
        </p>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <h3 className="font-bold text-gray-800 text-sm">No Student Enquiries Yet</h3>
          <p className="text-xs text-gray-500 mt-0.5">When students submit the form on the website, their details appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-red-200 transition"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-gray-900 text-base">{item.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700">
                    {item.exam || 'NEET'}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Admitted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Contacted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <a
                    href={`tel:${item.phone}`}
                    className="flex items-center gap-1.5 text-red-600 font-semibold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{item.phone}</span>
                  </a>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Recent'}
                    </span>
                  </span>
                </div>

                {item.message && (
                  <p className="text-xs text-gray-600 font-light bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    "{item.message}"
                  </p>
                )}
              </div>

              {/* Status Selector & Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  disabled={loadingId === item._id}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-gray-200 focus:outline-none focus:border-red-500 bg-white"
                >
                  <option value="New">Mark New</option>
                  <option value="Contacted">Mark Contacted</option>
                  <option value="Admitted">Mark Admitted</option>
                  <option value="Closed">Mark Closed</option>
                </select>

                <button
                  onClick={() => handleDelete(item._id, item.name)}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                  title="Delete Enquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

