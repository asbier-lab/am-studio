// src/data/teamMembersData.js

import teamGif from '../assets/person3.gif';

export const teamMembers = [
  {
    id: 1,
    name: "AM",
    role: "Creator and Nature Enthusiast",
    image: teamGif,
    description: "AM is the visionary behind this project, combining her artistic sensibility with a deep love of nature. She focuses on creating unique, nature-inspired designs and experiences."
  },
  {
    id: 2,
    name: "That could be you",
    role: "Photographer",
    image: teamGif,
    description: "Are you an experienced photographer with a passion for capturing the beauty of nature? Join our team to immortalise our creations through stunning imagery."
  },
  {
    id: 3,
    name: "That could be you",
    role: "Petal Designer",
    image: teamGif,
    description: "Give your creativity free rein as a Petal Designer. Shape and craft our unique petals and turn them into intricate works of art that reflect natural elegance."
  },
  {
    id: 4,
    name: "That could be you",
    role: "Petal Engineer",
    image: teamGif,
    description: "Do you have an eye for precision and structure? As a Petal Engineer you are responsible for the structural integrity and innovative mechanisms of our petal designs."
  },
  {
    id: 5,
    name: "That could be you",
    role: "Petal Artist",
    image: teamGif,
    description: "Bring colours and textures to life as a Petal Artist. Your sensitivity lends depth and vitality so that each petal becomes a small masterpiece."
  },
  {
    id: 6,
    name: "That could be you",
    role: "Petal Scientist",
    image: teamGif,
    description: "Dive into the science behind our petals. As a Petal Scientist you research and develop new materials and techniques to improve durability and beauty."
  }
];

// Helper to find a team member by id.
export const getPersonById = (id) => {
    return teamMembers.find(member => member.id === parseInt(id));
};