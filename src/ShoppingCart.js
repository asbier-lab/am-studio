import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useCart } from './CartContext';
import './ShoppingCart.css';

const ShoppingCart = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  // Expose methods to parent components via ref
  useImperativeHandle(ref, () => ({
    openCart,
    closeCart,
    toggleCart
  }));

  return (
    <>
      {/* Cart toggle button */}
      <button className="cart-toggle-button" onClick={toggleCart}>
        🛒
        <span className="cart-count">{getTotalItems()}</span>
      </button>

      {/* Cart sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'cart-sidebar-open' : ''}`}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="cart-close-button" onClick={toggleCart}>
            ✖
          </button>
        </div>
        
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h4>Your cart is empty</h4>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.name} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">{item.price}</p>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.name)}
                      className="remove-item-btn"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: {getTotalPrice() > 0 ? `€ ${getTotalPrice().toFixed(2)}` : 'TBD'}</strong>
                </div>
                <div className="cart-actions">
                  <button onClick={clearCart} className="clear-cart-btn">
                    Clear Cart
                  </button>
                  <button className="checkout-btn">
                    Checkout (Coming Soon)
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay when cart is open */}
      {isOpen && (
        <div className="cart-overlay" onClick={toggleCart}></div>
      )}
    </>
  );
});

export default ShoppingCart; 