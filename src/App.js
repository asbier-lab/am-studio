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


import flower_c from './assets/flower_c.gif';
import paddle from './assets/paddle.png';
import muschele from './assets/muschele.png';
import sunflower from './assets/sunflower.png';
import abuchstabe from './assets/abuchstabe.png';
import jbuchstabe from './assets/jbuchstabe.png';

import './App.css';

function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine cell image source and theme class based on current path
  let cellImageSrc = sunflower; // default
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
  }

  // Function to toggle the mobile menu open/closed
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Define nav links content once to reuse for both desktop and mobile
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
    </ul>
  );

  return (
    <>
      {/* Background Cell Sketch and Custom Cursor */}
      <CellSketch cellImageSrc={cellImageSrc} />
      <CustomCursor />

      {/* Main App Container with dynamic theme class */}
      <div className={`App ${themeClass}`}>
        <header>
          {/* Main Title/Logo with Link to Home */}
          <h1>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>
              AM-STUDIO FOR LIVING MATTER
            </Link>
          </h1>
          {/* Rotating Tagline */}
          <RotatingTagline />

          {/* Mobile Toggle Button (the dot) */}
          {/* This button is positioned absolutely in the header and shown only on mobile */}
          <button
            className="mobile-menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="dot"></span> {/* The visual dot element */}
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span> {/* Screen reader text */}
          </button>

          {/* Desktop Navigation */}
          {/* Changed className from 'main-nav' to 'desktop-nav' to match CSS */}
          <nav className="desktop-nav">
            {navLinksContent}
          </nav>
        </header>

        {/* Mobile Navigation Overlay */}
        {/* This overlay appears when the mobile menu toggle is clicked */}
        {menuOpen && (
          <div className="mobile-nav-overlay open"> {/* 'open' class for CSS transitions */}
            <button className="mobile-menu-close-button" onClick={toggleMenu} aria-label="Close menu">
              &times; {/* HTML entity for a multiplication sign (looks like an X) */}
            </button>
            <nav className="mobile-nav-links">
              {navLinksContent}
            </nav>
          </div>
        )}

        {/* Main Content Area where routes are rendered */}
        <main className="content">
          <Routes>
            <Route path="/" element={<div></div>} /> {/* Default empty route for home */}
            <Route path="/mission" element={<Mission />} />
            <Route path="/line-up" element={<Lineup />} />
            <Route path="/PeoplePage" element={<People />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </main>

        {/* Floating Dialogue Component */}
        <FloatingDialogue />
      </div>
    </>
  );
}

// Wrapper component to provide Router context to App
function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
