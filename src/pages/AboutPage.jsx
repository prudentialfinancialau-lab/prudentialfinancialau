import { client } from '../../tina/__generated__/client';
import { useTina } from 'tinacms/dist/react';
import Header from '../components/Header';
import About from '../components/About';
import Help from '../components/Help';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

function AboutPageContent({ pageData }) {
  const { data } = useTina({
    query: pageData.query,
    variables: pageData.variables,
    data: pageData.data,
  });

  const content = data.page;

  return (
    <>
      <Header data={content.header} />
      <About data={content.about} />
      <Help data={content.help} />
      <Footer data={content.footer} />
    </>
  );
}

export default function AboutPage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.queries.page({ relativePath: 'about.json' });
        setPageData(result);
        setLoading(false);
      } catch (err) {
        console.error('Error loading about page:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading page: {error.message}</div>;
  if (!pageData) return null;

  return <AboutPageContent pageData={pageData} />;
}
