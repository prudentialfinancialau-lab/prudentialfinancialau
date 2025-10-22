import { client } from '../../tina/__generated__/client';
import { useTina } from 'tinacms/dist/react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Help from '../components/Help';
import MortgageCalculator from '../components/MortgageCalculator';
import Lenders from '../components/Lenders';
import Contact from '../components/Contact';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

function HomePageContent({ pageData }) {
  // Pass data through useTina hook for visual editing
  const { data } = useTina({
    query: pageData.query,
    variables: pageData.variables,
    data: pageData.data,
  });

  const content = data.page;

  return (
    <>
      <Header data={content.header} />
      <Hero data={content.hero} />
      <About data={content.about} />
      <Help data={content.help} />
      <MortgageCalculator data={content.calculator} />
      <Lenders data={content.lenders} />
      <Contact data={content.contact} />
      <Newsletter data={content.newsletter} />
      <Footer data={content.footer} />
    </>
  );
}

export default function HomePage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.queries.page({ relativePath: 'home.json' });
        setPageData(result);
        setLoading(false);
      } catch (err) {
        console.error('Error loading home page:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading page: {error.message}</div>;
  if (!pageData) return null;

  return <HomePageContent pageData={pageData} />;
}
