import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CellSketch from './CellSketch';
import Mission from './mission';
import RotatingTagline from './RotatingTagline';
import Lineup from './line-up';
import FloatingDialogue from './floatingDialogue';
import PeoplePage from './PeoplePage';
import CustomCursor from './CustomCursor';

import './App.css';

function App() {
  const isProd = process.env.NODE_ENV === 'production';

  return (
    <Router basename={isProd ? "/am-studio" : "/"}>
      <CellSketch /> {/* Background Sketch */}
      <CustomCursor /> {/* Custom Cursor */}

      <div className="App">
        <header>
          <h1>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              AM-STUDIO FOR LIVING MATTER
            </Link>
          </h1>
          <RotatingTagline />
          <nav>
            <ul>
              <li>
                <a
                  href="https://annemariesauerbier.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PAST PROJECTS
                </a>
              </li>
              <li>
                <a href="mailto:annemariesauerbier+website@gmail.com">CONTACT</a>
              </li>
              <li>
                <Link to="/mission">MISSION</Link>
              </li>
              <li>
                <Link to="/line-up">LINE-UP</Link>
              </li>
               <li>
                <Link to="/PeoplePage">PEOPLE</Link>
              
              </li>
            </ul>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/line-up" element={<Lineup />}
             />
             <Route path="/PeoplePage" element={<PeoplePage />} />

          </Routes>
        </main>

        <FloatingDialogue />
      </div>
    </Router>
  );
}

export default App;
