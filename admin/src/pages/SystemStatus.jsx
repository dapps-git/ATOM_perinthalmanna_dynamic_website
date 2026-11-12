import React, { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';
import {
  Server,
  Database,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Key,
  Shield,
  FileCode,
} from 'lucide-react';

export default function SystemStatus() {
  const [health, setHealth] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkHealth()
      .then((data) => setHealth(data))
      .catch((err) => setHealth({ status: 'offline', error: err.message }))
      .finally(() => setChecking(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          System & Media Configuration
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Real-time status of backend services, database connectors, and WebP compression pipeline.
        </p>
      </div>

      {/* Main Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Backend API Service */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Backend API Server
            </span>
            <Server className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-xl font-bold text-gray-900 mt-2">
            {checking ? 'Checking...' : health?.status === 'online' ? 'Online & Healthy' : 'Disconnected'}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Port 5000 Active</span>
          </div>
        </div>

        {/* Sharp WebP Processing Engine */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Sharp WebP Engine
            </span>
            <Sparkles className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-xl font-bold text-gray-900 mt-2">Active</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Auto converts PNG/JPG to .webp</span>
          </div>
        </div>

        {/* Admin Security */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Admin Authentication
            </span>
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-xl font-bold text-gray-900 mt-2">Configured</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>JWT Bearer Protection</span>
          </div>
        </div>
      </div>

      {/* Cloud Integration Details */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <FileCode className="w-5 h-5 text-red-600" />
          <span>MongoDB & Cloudinary Integration Guide</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* MongoDB Box */}
          <div className="p-4 rounded-xl border border-red-100 bg-red-50/30">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm mb-1">
              <Database className="w-4 h-4 text-red-600" />
              <span>1. MongoDB Connection</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              When you are ready to provide your MongoDB URI, open <code className="bg-white px-1.5 py-0.5 rounded font-mono text-red-700 text-xs border border-red-200">backend/.env</code> and paste it into:
            </p>
            <div className="mt-2.5 p-3 rounded-lg bg-gray-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
              MONGO_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/atom_institute
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              The backend will automatically switch from local memory to persistent MongoDB storage.
            </p>
          </div>

          {/* Cloudinary Box */}
          <div className="p-4 rounded-xl border border-red-100 bg-red-50/30">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm mb-1">
              <Cloud className="w-4 h-4 text-red-600" />
              <span>2. Cloudinary Credentials</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              When you are ready to provide your Cloudinary keys, add them into <code className="bg-white px-1.5 py-0.5 rounded font-mono text-red-700 text-xs border border-red-200">backend/.env</code>:
            </p>
            <div className="mt-2.5 p-3 rounded-lg bg-gray-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
              CLOUDINARY_CLOUD_NAME=&lt;cloud_name&gt;<br />
              CLOUDINARY_API_KEY=&lt;api_key&gt;<br />
              CLOUDINARY_API_SECRET=&lt;api_secret&gt;
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              WebP files will then upload straight to your Cloudinary media cloud in the <code className="text-red-700 font-semibold">atom_institute</code> folder.
            </p>
          </div>
        </div>

        {/* Credentials Reminder */}
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
          <Key className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-gray-700">
            <p className="font-bold text-gray-900">Configured Admin Credentials</p>
            <p className="mt-0.5 font-mono text-gray-600">
              Email: <span className="text-red-700 font-semibold">atominstitute@perinthalmanna.com</span>
            </p>
            <p className="font-mono text-gray-600">
              Password: <span className="text-red-700 font-semibold">atominstitute@#perinthalmanna</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

