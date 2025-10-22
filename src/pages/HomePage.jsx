import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Help from '../components/Help';
import MortgageCalculator from '../components/MortgageCalculator';
import Lenders from '../components/Lenders';
import Contact from '../components/Contact';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import homeContent from '../../../content/pages/home.json';

export default function HomePage() {
  const content = homeContent;

  if (!content) return null;

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
