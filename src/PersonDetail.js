// src/People.js
import React from 'react';
import { Link } from 'react-router-dom';
import person1 from './assets/person1.png';
import './App.css';

const people = [
  {
    id: 1,
    name: 'AM',
    role: 'Creator and Nature Enthusiast',
    image: person1,
  },
  // Add more people as needed
];

const People = () => {
  return (
    <div className="people-slider">
      {people.map((person) => (
        <div key={person.id} className="person-card">
          <Link to={`/people/${person.id}`}>
            <img src={person.image} alt={person.name} className="person-image" />
            <h3>{person.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default People;