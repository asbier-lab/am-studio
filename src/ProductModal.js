import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose, onNext, onPrev, hasNext, hasPrev, onCartOpen }) => {
  if (!isOpen || !product) return null;

  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    
    // Show feedback animation and then open cart
    setTimeout(() => {
      setIsAdding(false);
      // Open the cart to show the added item
      if (onCartOpen) {
        onCartOpen();
      }
    }, 800);
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
    <div className="product-modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal-content">
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
        
        <div className="product-modal-container">
          <div className="product-modal-image-container">
            <img src={product.image} alt={product.name} className="product-modal-image" />
          </div>
          <div className="product-modal-text-content">
            <h2>{product.name}</h2>
            <p className="product-modal-description">{product.description}</p>
            <p className="product-modal-price">{product.price}</p>
            
            {/* Add to Cart Button */}
            <div className="add-to-cart-section">
              <button 
                className={`add-to-cart-button ${isAdding ? 'adding' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? (
                  <>
                    <span className="cart-icon">✓</span>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <span className="cart-icon">🛒</span>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
            
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

export default ProductModal; 