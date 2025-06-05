import React from 'react';
import { Link } from 'react-router-dom';
import products from './data/productData';
import './App.css';
import './shopDetail.css';

const Shop = () => {
  return (
    <div className="shop-container">
      <h2>IN CREATION</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <Link to={`/shop/${product.name}`} className="product-image">
              <img src={product.image} alt={product.name} />
            </Link>
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