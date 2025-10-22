import Header from '../components/Header';
import About from '../components/About';
import Help from '../components/Help';
import Footer from '../components/Footer';
import aboutContent from '../../content/pages/about.json';

export default function AboutPage() {
  const content = aboutContent;

  if (!content) return null;

  return (
    <>
      <Header data={content.header} />
      <About data={content.about} />
      <Help data={content.help} />
      <Footer data={content.footer} />
    </>
  );
}
