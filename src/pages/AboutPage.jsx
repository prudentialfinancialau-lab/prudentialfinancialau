import { useEffect, useState } from 'react';
import client from '../../tina/__generated__/client';
import Header from '../components/Header';
import About from '../components/About';
import Help from '../components/Help';
import Footer from '../components/Footer';

export default function AboutPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const result = await client.queries.about({ relativePath: 'about.json' });
        setContent(result.data.about);
      } catch (error) {
        console.error('Error loading about page content:', error);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <>
      <Header data={content.header} />
      <About data={content.about} />
      <Help data={content.help} />
      <Footer data={content.footer} />
    </>
  );
}
