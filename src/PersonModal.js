import React, { useEffect } from 'react';
import './PersonModal.css';

const PersonModal = ({ person, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  if (!isOpen || !person) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, hasNext, hasPrev, onNext, onPrev, onClose]);

  return (
    <div className="person-modal-overlay" onClick={handleOverlayClick}>
      <div className="person-modal-content">
        <button className="modal-close-button" onClick={onClose}>
          ✖
        </button>
        
        {/* Navigation arrows */}
        {hasPrev && (
          <button className="modal-nav-button modal-nav-prev" onClick={onPrev}>
            ‹
          </button>
        )}
        {hasNext && (
          <button className="modal-nav-button modal-nav-next" onClick={onNext}>
            ›
          </button>
        )}
        
        <div className="person-modal-container">
          <div className="person-modal-image-container">
            <img src={person.image} alt={person.name} className="person-modal-image" />
          </div>
          <div className="person-modal-text-content">
            <h2>{person.name}</h2>
            <p className="person-modal-role">{person.role}</p>
            <p className="person-modal-description">{person.description}</p>
            
            {/* Navigation indicators */}
            <div className="modal-nav-indicators">
              <span className="nav-indicator-text">
                Use ← → keys or arrows to navigate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonModal; 