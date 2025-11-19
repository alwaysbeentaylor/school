import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Practical from './pages/Practical';
import Enrollment from './pages/Enrollment';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// ScrollToTop utility
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen font-sans text-gray-800 antialiased">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/school" element={<About />} />
              <Route path="/praktisch" element={<Practical />} />
              <Route path="/inschrijven" element={<Enrollment />} />
              <Route path="/nieuws" element={<News />} />
              <Route path="/fotos" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </DataProvider>
  );
};

export default App;