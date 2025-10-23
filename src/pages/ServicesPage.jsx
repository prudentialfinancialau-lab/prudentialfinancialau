import Header from '../components/Header';
import ServiceTypes from '../components/ServiceTypes';
import Lenders from '../components/Lenders';
import Footer from '../components/Footer';
import content from '../../content/services/index.json';

export default function ServicesPage() {

  return (
    <>
      <Header data={content.header} />
      <ServiceTypes data={content.serviceTypes} />
      <Lenders data={content.lenders} />
      <Footer data={content.footer} />
    </>
  );
}
