// Fallback in-memory data store when MongoDB is not connected yet

let blogs = [
  {
    _id: 'blog-sample-1',
    title: 'How to Build an Unshakeable Foundation for NEET Biology & Chemistry',
    slug: 'how-to-build-unshakeable-foundation-neet',
    excerpt: 'Expert advice on NCERT mastery, memory recall techniques, and effective question practice for 650+ scores in NEET 2026.',
    content: 'Atom Institute in Perinthalmanna has established itself as a premier destination for competitive exam coaching including NEET, JEE, and foundation courses. Our experienced faculty and rigorous test series help students discover their true potential and achieve top national ranks.',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
      public_id: 'sample_blog_1',
      format: 'webp'
    },
    author: 'Atom Institute Faculty',
    category: 'Academics',
    tags: ['NEET', 'JEE', 'Coaching', 'Perinthalmanna'],
    isPublished: true,
    views: 120,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let newsList = [
  {
    _id: 'news-sample-1',
    title: 'Cochin University of Science and Technology entrance exam coaching.',
    slug: 'cusat-entrance-exam-coaching-batch',
    summary: 'Comprehensive coaching and fast-track guidance for CUSAT CAT aspirants with dedicated problem-solving workshops.',
    content: 'Atom Education announces specialized orientation and test series for the upcoming Cochin University of Science and Technology (CUSAT) entrance examination.',
    coverImage: {
      url: 'http://localhost:5000/uploads/news-sample-1.webp',
      public_id: 'news-sample-1',
      format: 'webp'
    },
    category: 'News & Events',
    badgeText: 'NEWS & EVENTS',
    publishDate: '2025-05-12T00:00:00.000Z',
    isPublished: true,
    priority: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'news-sample-2',
    title: 'Cochin University of Science and Technology entrance exam coaching.',
    slug: 'cusat-entrance-weekend-sessions',
    summary: 'Weekend and regular batches for higher secondary students targeting premier science and engineering university admissions.',
    content: 'Enrollments are now open for the advanced guidance sessions covering Physics, Chemistry, and Mathematics.',
    coverImage: {
      url: 'http://localhost:5000/uploads/news-sample-2.webp',
      public_id: 'news-sample-2',
      format: 'webp'
    },
    category: 'News & Events',
    badgeText: 'NEWS & EVENTS',
    publishDate: '2025-05-12T00:00:00.000Z',
    isPublished: true,
    priority: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

module.exports = {
  blogs,
  newsList
};
