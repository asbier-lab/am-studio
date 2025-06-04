import React from 'react';
import burn from './assets/burn.png';
import lotus from './assets/lotus.png';
import yasmin from './assets/yasmin.png';

const Shop = () => {
  const products = [
    {
      name: "ALGEA2000",
      description: "ALGE Jacket - Algae-based Biodegradable Design",
      price: "€ UNDEFINED",
      image: burn
    },
    {
      name: "SHOE3000 IDEA",
      description: "Walk Over Water – Fully Compostable Mycelium Design",
      price: "€ UNDEFINED",
      image: lotus
    },
    {
      name: "Flower",
      description: "Flower",
      price: "€ UNDEFINED",
      image: yasmin
    }
  ];

  return (
    <div className="shop-container">
      <h2>IN CREATION</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image">
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
  );
};

export default Shop;