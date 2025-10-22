import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import contactContent from '../../../content/pages/contact.json';

export default function ContactPage() {
  const content = contactContent;

  if (!content) return null;

  return (
    <>
      <Header data={content.header} />
      <Contact data={content.contact} />
      <Footer data={content.footer} />
    </>
  );
}
