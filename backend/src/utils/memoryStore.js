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
    _id: 'news-sample-3',
    title: 'Scholarship Aptitude Test Registrations Commenced for State Repeaters.',
    slug: 'scholarship-aptitude-test-repeaters',
    summary: 'Merit-based scholarships available for students aiming for top medical and engineering ranks with high percentile scores.',
    content: 'Atom Education opens registrations for merit-based scholarship aptitude tests for medical and engineering aspirants.',
    coverImage: {
      url: 'http://localhost:5000/uploads/classroom.webp',
      public_id: 'news-sample-3',
      format: 'webp'
    },
    category: 'Scholarships',
    badgeText: 'SCHOLARSHIPS',
    publishDate: '2025-05-08T00:00:00.000Z',
    isPublished: true,
    priority: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'news-sample-4',
    title: 'CUET & KEAM Crash Course Orientation Session at Perinthalmanna Campus.',
    slug: 'cuet-keam-crash-course-orientation',
    summary: 'Interactive guidance session led by expert faculty covering scoring patterns, time management, and mock test analysis.',
    content: 'Orientation sessions for CUET and KEAM intensive crash courses covering comprehensive syllabus revision and speed drills.',
    coverImage: {
      url: 'http://localhost:5000/uploads/atom-campus.webp',
      public_id: 'news-sample-4',
      format: 'webp'
    },
    category: 'Announcements',
    badgeText: 'ANNOUNCEMENTS',
    publishDate: '2025-05-05T00:00:00.000Z',
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
