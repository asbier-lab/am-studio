import React from 'react';
import burn from './assets/burn.png';
import lotus from './assets/lotus.png';
import yasmin from './assets/yasmin.png';

const Shop = () => {
  const products = [
    {
      name: "Burn",
      description: "Thoughtfully crafted design",
      price: "€120",
      image: burn
    },
    {
      name: "Lotus",
      description: "Beautiful lotus design",
      price: "€85",
      image: lotus
    },
    {
      name: "Yasmin",
      description: "Elegant yasmin design",
      price: "€95",
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