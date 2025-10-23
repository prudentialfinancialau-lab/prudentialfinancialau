import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import content from '../../content/contact/index.json';

export default function ContactPage() {

  return (
    <>
      <Header data={content.header} />
      <Contact data={content.contact} />
      <Footer data={content.footer} />
    </>
  );
}
