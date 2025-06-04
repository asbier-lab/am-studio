// src/data/teamMembersData.js

// Bilder importieren: Die Pfade müssen relativ zur teamMembersData.js-Datei sein.
// Da diese Datei im Unterordner 'data' liegt und die Bilder in 'assets',
// müssen wir mit '../' einen Ordner hochgehen.
import person1 from '../assets/person1.png';
import person2 from '../assets/person2.png';
import person3 from '../assets/person3.gif';

export const teamMembers = [
  {
    id: 1,
    name: "AM",
    role: "Creator and Nature Enthusiast",
    image: person2, // Stelle sicher, dass dies das korrekte Bild für AM ist
    description: "AM ist die Visionärin hinter diesem Projekt, die ihre künstlerische Ader mit einer tiefen Liebe zur Natur verbindet. Sie konzentriert sich auf die Schaffung einzigartiger, von der Natur inspirierter Designs und Erlebnisse."
  },
  {
    id: 2,
    name: "That could be you",
    role: "Photographer",
    image: person3,
    description: "Bist du ein erfahrener Fotograf mit einer Leidenschaft für das Festhalten der Schönheit der Natur? Werde Teil unseres Teams, um unsere Kreationen durch atemberaubende Bilder zu verewigen!"
  },
  {
    id: 3,
    name: "That could be you",
    role: "Petal Designer",
    image: person1,
    description: "Lass deiner Kreativität als Petal Designer freien Lauf! Forme und gestalte unsere einzigartigen Blütenblätter und verwandle sie in komplizierte Kunstwerke, die natürliche Eleganz widerspiegeln."
  },
  {
    id: 4,
    name: "That could be you",
    role: "Petal Engineer",
    image: person2,
    description: "Hast du ein Auge für Präzision und Struktur? Als Petal Engineer bist du verantwortlich für die strukturelle Integrität und die innovativen Mechanismen unserer Blütenblatt-Designs."
  },
  {
    id: 5,
    name: "That could be you",
    role: "Petal Artist",
    image: person1,
    description: "Erwecke Farben und Texturen als Petal Artist zum Leben. Dein Feingefühl verleiht Tiefe und Lebendigkeit, sodass jedes Blütenblatt zu einem kleinen Meisterwerk wird."
  },
  {
    id: 6,
    name: "That could be you",
    role: "Petal Scientist",
    image: person1,
    description: "Tauche ein in die Wissenschaft hinter unseren Blütenblättern! Als Petal Scientist erforschst und entwickelst du neue Materialien und Techniken, um Haltbarkeit und Schönheit zu verbessern."
  }
];

// Optional: Eine Helferfunktion, die die Suche nach einer Person erleichtert
// Du kannst diese in PersonDetail.js verwenden, statt selbst zu filtern.
export const getPersonById = (id) => {
    return teamMembers.find(member => member.id === parseInt(id));
};