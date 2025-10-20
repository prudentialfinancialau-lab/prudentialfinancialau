import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Help from './components/Help';
import MortgageCalculator from './components/MortgageCalculator';
import Lenders from './components/Lenders';
import Contact from './components/Contact';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Help />
      <MortgageCalculator />
      <Lenders />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
