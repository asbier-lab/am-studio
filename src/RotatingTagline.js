// RotatingTagline.jsx
import React, { useState, useEffect } from 'react';
import { taglinePhrases as phrases } from './taglinePhrases';
import './App.css';

const RotatingTagline = ({ interval = 4000 }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFade(false), interval - 500);
    const changeTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
      setFade(true);
    }, interval);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(changeTimeout);
    };
  }, [index, interval]);

  return (
    <p
      className="tagline"
      style={{
        opacity: fade ? 1 : 0
      }}
      aria-live="polite"
    >
      {phrases[index]}
    </p>
  );
};

export default RotatingTagline;