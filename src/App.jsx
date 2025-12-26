import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import Home from './pages/Home';
import './index.css';

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMobileNav, setActiveMobileNav] = useState('Home');

  useEffect(() => {
    // Automatically open the menu smoothly on page load
    setIsNavCollapsed(false);

    // Handle scroll for header blur effect
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <Navbar isScrolled={isScrolled} isNavCollapsed={isNavCollapsed} setIsNavCollapsed={setIsNavCollapsed} />

      <Home />

      <Footer />
      <MobileNav activeMobileNav={activeMobileNav} setActiveMobileNav={setActiveMobileNav} />
    </div>
  );
}

export default App;
