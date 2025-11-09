import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Help from '../components/Help';
import MortgageCalculator from '../components/MortgageCalculator';
import Benefits from '../components/Benefits';
import Lenders from '../components/Lenders';
import Contact from '../components/Contact';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function HomePage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    // Fetch content dynamically so it updates when edited
    fetch('/content/home/index.json?t=' + Date.now())
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
      <Hero data={content.hero} />
      <About data={content.about} />
      <Help data={content.help} />
      <MortgageCalculator data={content.calculator} />
      <Benefits data={content.benefits} />
      <Lenders data={content.lenders} />
      <Contact data={content.contact} />
      <Newsletter data={content.newsletter} />
      <Footer data={content.footer} />
    </>
  );
}
