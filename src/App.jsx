// Prudential Financial - Australian Mortgage Broker Landing Page
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import client from '../tina/__generated__/client';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LendersPage from './pages/LendersPage';
import ContactPage from './pages/ContactPage';

function App() {
  const location = useLocation();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPageContent() {
      setLoading(true);
      try {
        // Determine which JSON file to load based on route
        let relativePath = 'home.json';
        if (location.pathname === '/about') {
          relativePath = 'about.json';
        } else if (location.pathname === '/lenders') {
          relativePath = 'lenders.json';
        } else if (location.pathname === '/contact') {
          relativePath = 'contact.json';
        }

        const result = await client.queries.page({ relativePath });
        setPageData(result);
      } catch (error) {
        console.error('Error loading page content:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPageContent();
  }, [location.pathname]);

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

  const headerData = pageData?.data?.page?.header;
  const footerData = pageData?.data?.page?.footer;

  return (
    <div className="min-h-screen">
      <Header data={headerData} />
      <Routes>
        <Route path="/" element={<HomePage {...pageData} />} />
        <Route path="/about" element={<AboutPage {...pageData} />} />
        <Route path="/lenders" element={<LendersPage {...pageData} />} />
        <Route path="/contact" element={<ContactPage {...pageData} />} />
      </Routes>
      <Footer data={footerData} />
    </div>
  );
}

export default App;
