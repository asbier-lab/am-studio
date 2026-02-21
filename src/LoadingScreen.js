import React, { useState, useEffect } from 'react';
import logo from './assets/logo_Am_1.svg';
import { taglinePhrases } from './taglinePhrases';
import './App.css';

const PHRASE_INTERVAL = 2200;

/**
 * Full-screen loading state (melboucierayane-style).
 * Blank page: logo, "AM STUDIO", and one rotating sentence underneath. Then Mission/main app.
 */
const LoadingScreen = ({ onComplete, duration = 2200 }) => {
  const [visible, setVisible] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseFade, setPhraseFade] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onComplete?.(), 400);
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onComplete]);

  useEffect(() => {
    const fadeOut = setTimeout(() => setPhraseFade(false), PHRASE_INTERVAL - 400);
    const change = setTimeout(() => {
      setPhraseIndex((prev) => (prev + 1) % taglinePhrases.length);
      setPhraseFade(true);
    }, PHRASE_INTERVAL);
    return () => {
      clearTimeout(fadeOut);
      clearTimeout(change);
    };
  }, [phraseIndex]);

  const handleClick = () => {
    setVisible(false);
    setTimeout(() => onComplete?.(), 400);
  };

  return (
    <div
      className={`loading-screen ${visible ? 'loading-screen-visible' : 'loading-screen-hidden'}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabIndex={0}
      aria-label="Skip loading"
    >
      <div className="loading-screen-content">
        <div className="loading-screen-logo">
          <img src={logo} alt="" />
        </div>
        <p className="loading-screen-title">AM STUDIO</p>
        <p
          className="loading-screen-sentence"
          style={{ opacity: phraseFade ? 1 : 0 }}
          aria-live="polite"
        >
          {taglinePhrases[phraseIndex]}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
