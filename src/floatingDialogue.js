import React, { useState, useEffect } from 'react';
import './FloatingDialogue.css';

const questions = [
    "JEDEM ANFANG WOHNT EIN ZAUBER INNE.",
  "WHO DO YOU HELP?",
  "WHO DO YOU HURT?",
  "ARE YOU BUILDING OR BORROWING?",
  "DO YOU LOVE ANIMALS AND YOU ARE JUST EATING THEM?",
  "CAN YOU SUSTAIN LIFE?",
  "DO YOU KNOW CHANGE?",
  "HOW DOES IT FEEL?",
  "IF CHANGE WAS A COLOR, WHAT WOULD IT BE?",
  "HOW WOULD A FOREST APPROACH THIS PROBLEM?",
  "DO YOU ALSO WORK FOR MONEY?",
  "WHAT WOULD HAPPEN IF WE DESIGNED FOR ABSENCE RATHER THAN PRESENCE?",
  "WHO BENEFITS WHEN THIS QUESTION GOES UNANSWERED?",
];

const FloatingDialogue = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Start scanning animation when text is complete
    if (charIndex === questions[questionIndex].length) {
      setIsScanning(true);
    }

    if (charIndex < questions[questionIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + questions[questionIndex][charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsScanning(false);
        setQuestionIndex(prev => (prev + 1) % questions.length);
        setDisplayedText('');
        setCharIndex(0);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, questionIndex]);

  return (
    <div className="floating-dialogue-container">
      <div className="scan-line"></div>
      <div className="dialogue-header">
        <span className="status-text">STATUS: ACTIVE</span>
        <span className="coordinates">© All Rights Reserved Y: 2025</span>
      </div>
      <div className="dialogue-content">
        <div className="text-display">
          {displayedText}
          <span className={`cursor ${charIndex < questions[questionIndex].length ? 'blink' : ''}`}>_</span>
        </div>
        {isScanning && <div className="scanning-indicator">SCANNING...</div>}
      </div>
      <div className="dialogue-footer">
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ 
              width: `${(charIndex / questions[questionIndex].length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDialogue;
