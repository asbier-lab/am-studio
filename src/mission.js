import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import missionImage from './assets/mission.jpg';

const MISSION_TEXT = 'DESIGN IN SYNERGY WITH NATURE.\nCHAOS AS NATURES LOGIC.';
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ. ';
const SCRAMBLE_DURATION_MS = 2800;
const UPDATE_INTERVAL_MS = 32;

const randomChar = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

// Ease-out cubic: fast start, smooth slow at the end
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const Mission = () => {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const len = MISSION_TEXT.length;
    setText(Array.from({ length: len }, randomChar).join(''));
    setDone(false);

    const startTime = Date.now();
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(1, elapsed / SCRAMBLE_DURATION_MS);
      const progress = easeOutCubic(linearProgress);
      const numRevealed = Math.floor(progress * (len + 1));

      setText(() => {
        let next = '';
        for (let i = 0; i < len; i++) {
          next += i < numRevealed ? MISSION_TEXT[i] : randomChar();
        }
        return next;
      });
      if (linearProgress >= 1) {
        setDone(true);
      }
    }, UPDATE_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mission-container">
      <h2 className="mission-scramble" aria-live="polite">
        {done ? MISSION_TEXT : text}
      </h2>
      <img
        src={missionImage}
        alt="Mission Illustration"
        className="mission-image"
      />
    </div>
  );
};

export default Mission;
