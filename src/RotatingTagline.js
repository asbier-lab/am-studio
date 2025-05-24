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
      style={{
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        fontStyle: 'italic',
        fontWeight: '800',
        fontSize: '1.8rem',
        color: '#1212',
        marginTop: '0rem',
        minHeight: '0rem',
        userSelect: 'none',
        textAlign: 'left',
      }}
      aria-live="polite"
    >
      {phrases[index]}
    </p>
  );
};

export default RotatingTagline;