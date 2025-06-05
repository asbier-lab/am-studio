import React, { useRef, useState, useEffect } from 'react';
import { teamMembers } from './data/teamMembersData';
import PersonModal from './PersonModal';
import './App.css'; // Annahme, dass deine Stile hier sind


// Responsive radius for the circular carousel layout
const getCircularRadius = () => {
  if (window.innerWidth <= 768) {
    return 0; // Not used for mobile linear layout
  }
  return 36; // Original value for desktop (in vh units)
};

const People = () => {
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const lastAngle = useRef(0);
  const currentCircularRadius = useRef(getCircularRadius());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);

  const handlePersonClick = (person) => {
    const index = teamMembers.findIndex(member => member.id === person.id);
    setCurrentPersonIndex(index);
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
  };

  const handleNextPerson = () => {
    const nextIndex = (currentPersonIndex + 1) % teamMembers.length;
    setCurrentPersonIndex(nextIndex);
    setSelectedPerson(teamMembers[nextIndex]);
  };

  const handlePrevPerson = () => {
    const prevIndex = currentPersonIndex === 0 ? teamMembers.length - 1 : currentPersonIndex - 1;
    setCurrentPersonIndex(prevIndex);
    setSelectedPerson(teamMembers[prevIndex]);
  };

  const hasNext = teamMembers.length > 1;
  const hasPrev = teamMembers.length > 1;

  // Update radius and mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      currentCircularRadius.current = getCircularRadius();
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const getCenterCoordinates = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    };
  };

  // Mouse event handlers for circular layout (Desktop/Tablet)
  const handleMouseDown = (e) => {
    if (isMobile) return;
    // Wichtig: Verhindere, dass das Ziehen startet, wenn auf einen clickable person geklickt wird
    // Prüfe, ob das Klick-Ziel ein clickable person element ist oder in einem enthalten ist
    if (e.target.closest('.person-flower-link, .mobile-link-wrapper')) {
        return; // Klick wurde auf einen Person gemacht, nicht ziehen
    }
    dragging.current = true;
    const { centerX, centerY } = getCenterCoordinates(e.currentTarget);
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    lastAngle.current = angle - rotation;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging.current || isMobile) return; // Only for desktop/tablet
    const { centerX, centerY } = getCenterCoordinates(document.querySelector('.flower-layout'));
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    setRotation(angle - lastAngle.current);
  };

  const handleMouseUp = () => {
    dragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  // No custom touch event handlers for mobile's linear layout.
  // Native scrolling will be handled by CSS `overflow-x: scroll`.

  return (
    <>
      <div className="people-fullpage-container" style={{ position: 'relative' }}>
        {isMobile ? (
          // Mobile Layout: Horizontal scrollable list
          <div className="mobile-flower-layout">
            {teamMembers.map((member) => ( // Jetzt wird das importierte teamMembers verwendet
              <div
                key={member.id}
                className="person-flower-img-wrapper mobile mobile-link-wrapper"
                onClick={() => handlePersonClick(member)}
                style={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  cursor: 'pointer'
                }}
              >
                <span className="person-flower-name">{member.name}</span>
                <img src={member.image} alt={member.name} className="person-flower-img" draggable={false} />
              </div>
            ))}
          </div>
        ) : (
          // Desktop/Tablet Layout: Circular carousel
          <div
          className="flower-layout"
          style={{ cursor: 'grab', zIndex: 1 }}
          onMouseDown={handleMouseDown}
        >
          {teamMembers.map((member) => { // Jetzt wird das importierte teamMembers verwendet
            // Verwende member.id - 1 für den Index, da IDs bei 1 beginnen und Array-Indizes bei 0
            const angle = (2 * Math.PI / teamMembers.length) * (member.id - 1) - Math.PI / 2 + rotation;
            const x = Math.cos(angle) * currentCircularRadius.current;
            const y = Math.sin(angle) * currentCircularRadius.current;

            const unit = 'vh';

            return (
              <div
              className="person-flower-img-wrapper"
              key={member.id} // <--- Wichtig: id als key verwenden
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}${unit} - 60px)`,
                top: `calc(50% + ${y}${unit} - 90px)`,
                width: '120px',
                height: '180px',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                transform: 'translateZ(0)',
              }}
            >
              <div 
                onClick={() => handlePersonClick(member)} 
                className="person-flower-link"
                style={{ cursor: 'pointer' }}
              >
                <span className="person-flower-name">{member.name}</span>
                <img src={member.image} alt={member.name} className="person-flower-img" draggable={false} />
              </div>
            </div>
          );
            })}
          </div>
        )}
      </div>

      <PersonModal 
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNext={handleNextPerson}
        onPrev={handlePrevPerson}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </>
  );
};

export default People;
