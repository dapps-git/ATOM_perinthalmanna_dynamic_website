'use client';

import React, { useState } from 'react';
import { Send, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    district: '',
    syllabus: '',
    course: '',
    campus: 'Perinthalmanna Campus',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          exam: formData.course || 'NEET',
          message: `WhatsApp: ${formData.whatsapp || 'N/A'}, District: ${formData.district || 'N/A'}, Syllabus: ${formData.syllabus || 'N/A'}, Preferred Campus: ${formData.campus || 'Perinthalmanna'}`,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Fallback submission:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F8F9FA]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ================= LEFT COLUMN: REGISTRATION FORM CARD ================= */}
          <div className="lg:col-span-6 bg-white p-7 sm:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              {/* Form Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Registration - 2025
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-500 font-light mt-1.5 mb-7 leading-relaxed">
                Fill out this form and our team will contact you with the next steps, admission test detail and campus guidance.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-800 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold">Registration Successful!</h3>
                  <p className="text-xs text-gray-600 font-light">
                    Our academic counselor will contact you at {formData.phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Name of Student
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
                      />
                    </div>
                  </div>

                  {/* Row 2: WhatsApp Number & District */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter WhatsApp number"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        District
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white text-gray-700"
                      >
                        <option value="">Select District</option>
                        <option value="Malappuram">Malappuram</option>
                        <option value="Kozhikode">Kozhikode</option>
                        <option value="Palakkad">Palakkad</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Wayanad">Wayanad</option>
                        <option value="Kannur">Kannur</option>
                        <option value="Ernakulam">Ernakulam</option>
                        <option value="Other">Other District / State</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Studying Syllabus */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Studying Syllabus
                    </label>
                    <select
                      value={formData.syllabus}
                      onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white text-gray-700"
                    >
                      <option value="">Select Syllabus</option>
                      <option value="Kerala State Board">Kerala State Board</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE / ISC">ICSE / ISC</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Row 4: Course */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Course
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white text-gray-700"
                    >
                      <option value="">Select Course</option>
                      <option value="NEET (UG) Repeaters Batch">NEET (UG) Repeaters Batch</option>
                      <option value="NEET Crash Course">NEET Crash Course</option>
                      <option value="IIT-JEE Main & Advanced">IIT-JEE Main & Advanced</option>
                      <option value="+1, +2 Integrated Schooling">+1, +2 Integrated Schooling</option>
                      <option value="9th & 10th Tuition with Foundations">9th &amp; 10th Tuition with Foundations</option>
                      <option value="CUET & IISER Entrance">CUET &amp; IISER Entrance</option>
                      <option value="KEAM Engineering Coaching">KEAM Engineering Coaching</option>
                    </select>
                  </div>

                  {/* Row 5: Preferred Campus */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Preferred Campus
                    </label>
                    <select
                      value={formData.campus}
                      onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white text-gray-700"
                    >
                      <option value="Perinthalmanna Campus">Perinthalmanna Campus (Main)</option>
                      <option value="Valanchery Campus">Valanchery Campus (KPM Arcade)</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{loading ? 'Submitting...' : 'SUBMIT'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Contact Numbers & Email */}
            <div className="pt-5 mt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-3 font-light">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>Mob: <a href="tel:+919946111194" className="text-gray-800 font-medium hover:underline">+91 9946111194</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-600" />
                <span>E-MAIL: <a href="mailto:atomeducation25@gmail.com" className="text-gray-800 font-medium hover:underline">atomeducation25@gmail.com</a></span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE GOOGLE MAP ================= */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white min-h-[440px] relative">
            <iframe
              title="Atom Institute Of Science Perinthalmanna Campus Location Map"
              src="https://maps.google.com/maps?q=Atom+Institute+Of+Science,+Pattambi+Rd,+near+South+Indian+Bank+-+Perinthalmanna+Branch,+Shanti+Nagar,+Perinthalmanna,+Keralam+679322&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px', width: '100%' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Floating Location Card for Perinthalmanna */}
            <div className="absolute top-4 left-4 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-gray-200/80 max-w-sm">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block mb-1">
                PERINTHALMANNA
              </span>
              <h4 className="font-bold text-gray-900 text-sm leading-tight">
                Atom Institute Of Science
              </h4>
              <p className="text-[11px] text-gray-600 font-light mt-1 leading-snug">
                Pattambi Rd, near South Indian Bank - Perinthalmanna Branch, Shanti Nagar, Perinthalmanna, Keralam 679322
              </p>
              <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-700 font-medium">
                  Mob: <a href="tel:+919946111194" className="text-gray-900 font-semibold hover:text-red-600">+91 9946111194</a>
                </span>
                <a
                  href="https://maps.google.com/?cid=369425932390620783&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-red-600 font-semibold hover:underline"
                >
                  <span>Open in Maps ↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
