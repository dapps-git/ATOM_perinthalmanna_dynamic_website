const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getPublishedBlogs(params = {}) {
  const query = new URLSearchParams({ ...params, publishedOnly: 'true' }).toString();
  const res = await fetch(`${API_BASE}/blogs?${query}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

export async function getBlogBySlug(slug) {
  const res = await fetch(`${API_BASE}/blogs/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
}

export async function getPublishedNews(params = {}) {
  const query = new URLSearchParams({ ...params, publishedOnly: 'true' }).toString();
  const res = await fetch(`${API_BASE}/news?${query}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export async function getNewsBySlug(slug) {
  const res = await fetch(`${API_BASE}/news/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

