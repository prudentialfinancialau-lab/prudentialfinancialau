import { useState, useEffect } from 'react';
import Header from '../components/Header';
import AboutContent from '../components/AboutContent';
import Team from '../components/Team';
import Footer from '../components/Footer';

export default function AboutPage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('/content/about/index.json?t=' + Date.now())
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Error loading content:', err));
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header data={content.header} />
      <AboutContent data={content.content} />
      <Team data={content.team} />
      <Footer data={content.footer} />
    </>
  );
}
