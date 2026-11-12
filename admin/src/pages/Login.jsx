import React, { useState } from 'react';
import { loginAdmin, setAuthToken, setStoredAdmin } from '../services/api';
import { Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        setAuthToken(res.token);
        setStoredAdmin(res.admin);
        onLoginSuccess(res.admin);
      } else {
        setError(res.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      setError(err.message || 'Connection error. Make sure backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/30 to-red-100/40 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-200/50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-red-900/5 border border-red-100 overflow-hidden">
          {/* Top red accent bar */}
          <div className="h-2 bg-gradient-to-r from-red-600 via-red-500 to-red-700" />

          <div className="p-8 sm:p-10">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
                <img
                  src="/logo.png"
                  alt="Atom Institute Logo"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Admin Portal
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Perinthalmanna • Academic & Content Management
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Authentication Notice</p>
                  <p className="mt-0.5 text-xs text-red-600 leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@atominstitute.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••••••"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm rounded-xl shadow-lg shadow-red-600/25 transition duration-150 ease-in-out flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Admin Panel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              © 2026 Atom Institute • Secure Access Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
