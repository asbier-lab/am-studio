import React, { useState, useRef } from 'react';
import products from './data/productData';
import ProductModal from './ProductModal';
import ShoppingCart from './ShoppingCart';
import './App.css';
import './shopDetail.css';

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const cartRef = useRef(null);

  const handleProductClick = (product) => {
    const index = products.findIndex(p => p.name === product.name);
    setCurrentProductIndex(index);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleNextProduct = () => {
    const nextIndex = (currentProductIndex + 1) % products.length;
    setCurrentProductIndex(nextIndex);
    setSelectedProduct(products[nextIndex]);
  };

  const handlePrevProduct = () => {
    const prevIndex = currentProductIndex === 0 ? products.length - 1 : currentProductIndex - 1;
    setCurrentProductIndex(prevIndex);
    setSelectedProduct(products[prevIndex]);
  };

  const hasNext = products.length > 1;
  const hasPrev = products.length > 1;

  const handleCartOpen = () => {
    if (cartRef.current) {
      cartRef.current.openCart();
    }
  };

  return (
    <>
      <div className="shop-container">
        <h2>IN CREATION</h2>
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div 
                className="product-image" 
                onClick={() => handleProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="price">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNext={handleNextProduct}
        onPrev={handlePrevProduct}
        hasNext={hasNext}
        hasPrev={hasPrev}
        onCartOpen={handleCartOpen}
      />

      <ShoppingCart ref={cartRef} />
    </>
  );
};

export default Shop;