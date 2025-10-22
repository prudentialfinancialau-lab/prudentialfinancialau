import { client } from '../../tina/__generated__/client';
import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.queries.page({ relativePath: 'contact.json' });
        setPageData(result);
        setLoading(false);
      } catch (err) {
        console.error('Error loading contact page:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading page: {error.message}</div>;
  if (!pageData) return null;

  const content = pageData.data.page;

  return (
    <>
      <Header data={content.header} />
      <Contact data={content.contact} />
      <Footer data={content.footer} />
    </>
  );
}
