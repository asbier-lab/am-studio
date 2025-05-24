// RotatingTagline.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const phrases = [
  "RECURSIVE DESIGN","PROCESS ZONE",
  "TINKERBELL WAS AN ENGINEER.",
  "WHERE DOES MAGIC PLUG IN?",
  "PIXIE DUST ≈ QUANTUM NOISE?",
  "FORM FOLLOWS PHOTOSYNTHESIS.",
  "TRUTH EMERGES THROUGH CONVERSATION, NOT THROUGH MONOLOGUE.",
  "IMAGINATION IS THE ONLY WEAPON IN THE WAR AGAINST REALITY.",
  "CHAOS IS JUST PATTERN UNREAD.",
  "IS IT ALIVE OR JUST NEW?"
];

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