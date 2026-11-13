const API_BASE =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? '/api'
    : 'https://tweaki.pw/atom_institution/api');

export const getAuthToken = () => localStorage.getItem('atom_admin_token');
export const setAuthToken = (token) => localStorage.setItem('atom_admin_token', token);
export const removeAuthToken = () => localStorage.removeItem('atom_admin_token');

export const getStoredAdmin = () => {
  try {
    const raw = localStorage.getItem('atom_admin_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
export const setStoredAdmin = (admin) =>
  localStorage.setItem('atom_admin_user', JSON.stringify(admin));
export const removeStoredAdmin = () => localStorage.removeItem('atom_admin_user');

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If body is NOT FormData, set JSON content-type
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

// Authentication
export const loginAdmin = (email, password) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getMe = () => request('/auth/me');

// Health Check
export const checkHealth = () => request('/health');

// Blogs
export const fetchBlogs = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/blogs${query ? `?${query}` : ''}`);
};

export const fetchBlogById = (id) => request(`/blogs/${id}`);

export const createBlog = (formData) =>
  request('/blogs', {
    method: 'POST',
    body: formData,
  });

export const updateBlog = (id, formData) =>
  request(`/blogs/${id}`, {
    method: 'PUT',
    body: formData,
  });

export const deleteBlog = (id) =>
  request(`/blogs/${id}`, {
    method: 'DELETE',
  });

// News
export const fetchNews = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/news${query ? `?${query}` : ''}`);
};

export const fetchNewsById = (id) => request(`/news/${id}`);

export const createNews = (formData) =>
  request('/news', {
    method: 'POST',
    body: formData,
  });

export const updateNews = (id, formData) =>
  request(`/news/${id}`, {
    method: 'PUT',
    body: formData,
  });

export const deleteNews = (id) =>
  request(`/news/${id}`, {
    method: 'DELETE',
  });

// Enquiries
export const fetchEnquiries = () => request('/enquiries');

export const updateEnquiryStatus = (id, status) =>
  request(`/enquiries/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

export const deleteEnquiry = (id) =>
  request(`/enquiries/${id}`, {
    method: 'DELETE',
  });

