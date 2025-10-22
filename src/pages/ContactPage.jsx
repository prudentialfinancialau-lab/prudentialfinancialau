import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function ContactPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/content/contact`);
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading contact page:', err);
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
      <Contact data={content.contact} />
      <Footer data={content.footer} />
    </>
  );
}
