import Header from '../components/Header';
import Lenders from '../components/Lenders';
import MortgageCalculator from '../components/MortgageCalculator';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function LendersPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/content/lenders`);
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading lenders page:', err);
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
      <Lenders data={content.lenders} />
      <MortgageCalculator data={content.calculator} />
      <Footer data={content.footer} />
    </>
  );
}
