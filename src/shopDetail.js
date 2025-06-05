// src/shopDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

import products from './data/productData'; // Import the product data
import './App.css';
import './shopDetail.css';




const ShopDetail = () => {
  const { id } = useParams();
  const product = products.find((item) => item.name === id);

  console.log("Product ID:", id);
  console.log("Product Data:", product);

  if (!product) {
    return (
      <div className="shop-detail-container">
        <h1>Product not found.</h1>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }


  return (
    <div className="shop-detail-container">
      <Link to="/shop" className="back-button">✖</Link>
      <div className="shop-detail-image-container">
        <img src={product.image} alt={product.name} className="shop-detail-image" />
      </div>
      <div className="shop-detail-text-content">
        <h2>{product.name}</h2>
        <p className="shop-detail-description">{product.description}</p>
        <p className="shop-detail-price">{product.price}</p>
      </div>
    </div>
  );
};

export default ShopDetail;