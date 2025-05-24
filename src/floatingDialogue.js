import React, { useState, useEffect } from 'react';

const questions = [
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
"WHO BENEFITS WHEN THIS QUESTION GOES UNANSWERED?",];

const FloatingDialogue = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < questions[questionIndex].length) {
      // Zeichen-Tipp-Effekt
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + questions[questionIndex][charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Nach vollständigem Satz jetzt länger warten (z.B. 10 s)
      const timeout = setTimeout(() => {
        setQuestionIndex(prev => (prev + 1) % questions.length);
        setDisplayedText('');
        setCharIndex(0);
      }, 10000); // 10000 ms = 10 Sekunden
      return () => clearTimeout(timeout);
    }
  }, [charIndex, questionIndex]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: 'rgba(224, 224, 222, 0.9)',
        padding: '1rem',
        borderRadius: '1rem',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
        fontSize: '1rem',
        maxWidth: '250px',
        zIndex: 1000,
        fontFamily: "'DotGothic16', monospace",
        fontWeight: 400,
        lineHeight: 1.4,
        color: '#222',
        minHeight: '2rem',
      }}
      role="status"
      aria-live="polite"
      aria-atomic="false"
      aria-label="Floating questions dialogue"
    >
      {displayedText}
      <span style={{ opacity: charIndex < questions[questionIndex].length ? 1 : 0 }}>
        |
      </span>
    </div>
  );
};

export default FloatingDialogue;
