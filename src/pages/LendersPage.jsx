import { useEffect, useState } from 'react';
import client from '../../tina/__generated__/client';
import Header from '../components/Header';
import Lenders from '../components/Lenders';
import MortgageCalculator from '../components/MortgageCalculator';
import Footer from '../components/Footer';

export default function LendersPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const result = await client.queries.page({ relativePath: 'lenders.json' });
        setContent(result.data.page);
      } catch (error) {
        console.error('Error loading lenders page content:', error);
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
      <Lenders data={content.lenders} />
      <MortgageCalculator data={content.calculator} />
      <Footer data={content.footer} />
    </>
  );
}
