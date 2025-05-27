import React, { useRef, useState, useEffect } from 'react';
import person1 from './assets/person1.png';
import person2 from './assets/person2.png';

const teamMembers = [
  {
    name: "Test Person",
    role: "Test Role",
    image: person1
  },
  {
    name: "TEST",
    role: "Creator and Nature Enthusiast",
    image: person2
  },
  {
    name: "Blossom One",
    role: "Petal Designer",
    image: person1
  },
  {
    name: "Blossom Two",
    role: "Petal Engineer",
    image: person2
  },
  {
    name: "Blossom Three",
    role: "Petal Artist",
    image: person1
  },
  {
    name: "Blossom Four",
    role: "Petal Scientist",
    image: person2
  }
];

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
    if (isMobile) return; // Only for desktop/tablet
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
    <div className="people-fullpage-container" style={{ position: 'relative' }}>
      {isMobile ? (
        // Mobile Layout: Horizontal scrollable list
        <div className="mobile-flower-layout">
          {teamMembers.map((member, idx) => (
            <div
              className="person-flower-img-wrapper mobile"
              key={idx}
              style={{
                // Dimensions and flex-shrink are handled by CSS
                userSelect: 'none',
                WebkitUserSelect: 'none',
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
          {teamMembers.map((member, idx) => {
            const angle = (2 * Math.PI / teamMembers.length) * idx - Math.PI / 2 + rotation;
            const x = Math.cos(angle) * currentCircularRadius.current;
            const y = Math.sin(angle) * currentCircularRadius.current;

            const unit = 'vh';

            return (
              <div
                className="person-flower-img-wrapper"
                key={idx}
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
                <span className="person-flower-name">{member.name}</span>
                <img src={member.image} alt={member.name} className="person-flower-img" draggable={false} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default People;
