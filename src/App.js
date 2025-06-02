// src/App.js
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import CellSketch from './CellSketch';
import Mission from './mission';
import RotatingTagline from './RotatingTagline';
import Lineup from './line-up';
import FloatingDialogue from './floatingDialogue';
import People from './People';
import CustomCursor from './CustomCursor';
import Shop from './shop';
// Import new legal pages
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import Impressum from './Impressum';

import flower_c from './assets/flower_c.gif';
import paddle from './assets/paddle.png';
import muschele from './assets/muschele.png';
import sunflower from './assets/sunflower.png';
import abuchstabe from './assets/abuchstabe.png'
import paragraph from './assets/pragraph.png';
// import jbuchstabe from './assets/jbuchstabe.png'; // jbuchstabe was imported but not used

import './App.css';

function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  let cellImageSrc = sunflower;
  let themeClass = '';
  if (location.pathname.includes('PeoplePage')) {
    cellImageSrc = paddle;
    themeClass = 'theme-velvet';
  } else if (location.pathname.includes('mission')) {
    cellImageSrc = muschele;
    themeClass = 'theme-moss';
  } else if (location.pathname.includes('line-up')) {
    cellImageSrc = flower_c;
    themeClass = 'theme-glass';
  } else if (location.pathname.includes('shop')) {
    cellImageSrc = abuchstabe;
    themeClass = 'theme-flower';
  } else if (location.pathname.includes('/privacy-policy') || location.pathname.includes('/terms-and-conditions') || location.pathname.includes('/impressum')) {
    cellImageSrc = paragraph;
    themeClass = 'theme-neutral';
  }


  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinksContent = (
    <ul>
      <li>
        <a href="https://annemariesauerbier.com" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
          PAST PROJECTS
        </a>
      </li>
      <li>
        <a href="mailto:annemariesauerbier+website@gmail.com" onClick={() => setMenuOpen(false)}>CONTACT</a>
      </li>
      <li>
        <Link to="/mission" onClick={() => setMenuOpen(false)}>MISSION</Link>
      </li>
      <li>
        <Link to="/line-up" onClick={() => setMenuOpen(false)}>LINE-UP</Link>
      </li>
      <li>
        <Link to="/PeoplePage" onClick={() => setMenuOpen(false)}>PEOPLE</Link>
      </li>
      <li>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>SHOP</Link>
      </li>
      {/* You might add links to legal pages here or in a footer later */}
    </ul>
  );

  return (
    <>
      <CellSketch cellImageSrc={cellImageSrc} />
      <CustomCursor />
      <div className={`App ${themeClass}`}>
        <header>
          <h1>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>
              AM-STUDIO FOR LIVING MATTER
            </Link>
          </h1>
          <RotatingTagline />
          <button
            className="mobile-menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="dot"></span>
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
          <nav className="desktop-nav">
            {navLinksContent}
          </nav>
        </header>

        {menuOpen && (
          <div className="mobile-nav-overlay open">
            <button className="mobile-menu-close-button" onClick={toggleMenu} aria-label="Close menu">
              &times;
            </button>
            <nav className="mobile-nav-links">
              <ul>
                {navLinksContent}
                <li><Link to="/privacy-policy" onClick={() => setMenuOpen(false)}>PRIVACY</Link></li>
                <li><Link to="/terms-and-conditions" onClick={() => setMenuOpen(false)}>TERMS & CONDITIONS</Link></li>
                <li><Link to="/impressum" onClick={() => setMenuOpen(false)}>IMPRESSUM</Link></li>
              </ul>
            </nav>
          </div>
        )}

        <main className="content">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/line-up" element={<Lineup />} />
            <Route path="/PeoplePage" element={<People />} />
            <Route path="/shop" element={<Shop />} />
            {/* Add routes for legal pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/impressum" element={<Impressum />} />
          </Routes>
        </main>
        <FloatingDialogue />
      </div>
    </>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;