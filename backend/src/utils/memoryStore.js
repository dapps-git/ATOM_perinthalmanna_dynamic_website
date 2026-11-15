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

let newsList = [];

module.exports = {
  blogs,
  newsList
};
