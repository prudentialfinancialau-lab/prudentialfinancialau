import { useTina } from "tinacms/dist/react";
import client from "../tina/__generated__/client";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Help from './components/Help';
import Lenders from './components/Lenders';
import Contact from './components/Contact';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import EditButton from './components/EditButton';

export default function TinaApp(props) {
  // Use the Tina hook to get editable data
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page;

  return (
    <div className="min-h-screen">
      <Header data={content.header} />
      <Hero data={content.hero} />
      <About data={content.about} />
      <Help data={content.help} />
      <Lenders data={content.lenders} />
      <Contact data={content.contact} />
      <Newsletter data={content.newsletter} />
      <Footer data={content.footer} />
      <EditButton />
    </div>
  );
}
