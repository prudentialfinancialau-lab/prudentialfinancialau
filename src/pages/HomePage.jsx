import { useTina } from "tinacms/dist/react";
import Hero from '../components/Hero';
import About from '../components/About';
import Help from '../components/Help';
import MortgageCalculator from '../components/MortgageCalculator';
import Lenders from '../components/Lenders';
import Contact from '../components/Contact';
import Newsletter from '../components/Newsletter';

export default function HomePage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page;

  return (
    <>
      <Hero data={content.hero} />
      <About data={content.about} />
      <Help data={content.help} />
      <MortgageCalculator data={content.calculator} />
      <Lenders data={content.lenders} />
      <Contact data={content.contact} />
      <Newsletter data={content.newsletter} />
    </>
  );
}
