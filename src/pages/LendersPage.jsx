import Header from '../components/Header';
import Lenders from '../components/Lenders';
import MortgageCalculator from '../components/MortgageCalculator';
import Footer from '../components/Footer';
import lendersContent from '../../content/pages/lenders.json';

export default function LendersPage() {
  const content = lendersContent;

  if (!content) return null;

  return (
    <>
      <Header data={content.header} />
      <Lenders data={content.lenders} />
      <MortgageCalculator data={content.calculator} />
      <Footer data={content.footer} />
    </>
  );
}
