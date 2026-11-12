import './globals.css';

export const metadata = {
  title: 'Atom Institute | Inspiration of Science | Perinthalmanna',
  description:
    'Entrance Coaching for NEET, JEE & Other Competitive Exams. Build strong concepts. Prepare with experts. Achieve your dream.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
        {/* Left vertical red accent bar like in the Figma mockup */}
        <div className="fixed top-0 left-0 bottom-0 w-2 sm:w-3 bg-red-600 z-50 pointer-events-none" />
        <div className="pl-2 sm:pl-3">
          {children}
        </div>
      </body>
    </html>
  );
}
