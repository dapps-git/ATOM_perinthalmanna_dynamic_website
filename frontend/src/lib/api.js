const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/atom_institution/api';

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

// Enquiry / Contact Form submission (public — no auth needed)
export async function submitEnquiry(data) {
  const res = await fetch(`${API_BASE}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to submit enquiry');
  return json;
}

