import Header from '../components/Header';
import About from '../components/About';
import Help from '../components/Help';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function AboutPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/content/about`);
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading about page:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">Error loading page: {error.message}</div>;
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
