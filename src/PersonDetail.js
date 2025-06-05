// src/PersonDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './PersonDetail.css';
import { teamMembers } from './data/teamMembersData'; 
import './App.css';
import './PersonDetail.css';


const PersonDetail = () => {
  const { id } = useParams(); // Holt die ID aus der URL
  // Finde die Person anhand der ID. parseInt ist wichtig, da id aus useParams ein String ist.
  const person = teamMembers.find((member) => member.id === parseInt(id));

  if (!person) {
    return (
      <div className="person-detail-container">
        <h1>Person nicht gefunden.</h1>
        <Link to="/people">Zurück zur Teamübersicht</Link>
      </div>
    );
  }

  return (

      <div className="person-detail-container">
        {/* Der Schließen-Button - er wird absolut positioniert */}
        <Link to="/PeoplePage" className="back-button">✖</Link> 
  
        {/* Das Bild - Erstes Flex-Item */}
        <img src={person.image} alt={person.name} className="person-detail-image" />
  
        {/* Der Textinhalt-Wrapper - Zweites Flex-Item */}
        <div className="person-detail-text-content"> {/* <-- NEU: Wrapper für den gesamten Textblock */}
          <h2>{person.name}</h2>
          <p className="person-detail-role">{person.role}</p>
          <p className="person-detail-description">{person.description}</p>
          {/* Füge hier weitere Details hinzu */}
        </div>
        </div>
  );
};

export default PersonDetail;