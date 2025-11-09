import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ServiceTypes from '../components/ServiceTypes';
import Lenders from '../components/Lenders';
import Footer from '../components/Footer';

export default function ServicesPage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('/content/services/index.json?t=' + Date.now())
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
      <ServiceTypes data={content.serviceTypes} />
      <Lenders data={content.lenders} />
      <Footer data={content.footer} />
    </>
  );
}
