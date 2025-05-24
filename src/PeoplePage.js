import React from 'react';
import './App.css';
import bigImage from './assets/bigImage.png';
import smallImage from './assets/smallImage.png';

const PeoplePage = () => {
  return (
    <div className="people-container">
      <div className="left-image">
        <img src={bigImage} alt="Main visual" />
      </div>
      <div className="right-content">
        <div className="small-image-wrapper">
          <img src={smallImage} alt="Inset visual" />
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;