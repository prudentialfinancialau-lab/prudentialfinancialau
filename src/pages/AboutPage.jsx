import Header from '../components/Header';
import AboutContent from '../components/AboutContent';
import Team from '../components/Team';
import Footer from '../components/Footer';
import content from '../../content/about/index.json';

export default function AboutPage() {

  return (
    <>
      <Header data={content.header} />
      <AboutContent data={content.content} />
      <Team data={content.team} />
      <Footer data={content.footer} />
    </>
  );
}
