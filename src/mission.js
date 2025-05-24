import React from 'react';
import './App.css';
import missionImage from './assets/mission.jpg';

const Mission = () => {
  return (
    <div className="mission-container">
    <h2>
  DESIGN IN SYNERGY WITH NATURE.
  CHAOS AS NATURES LOGIC. 
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
