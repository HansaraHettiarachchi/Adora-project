import React from 'react';
import './ProductCard.css';

function ProductCard({ name, price, imageAlt }) {
  return (
    <div className="product-card">
      <div className="product-image">{/* <img src="" alt={imageAlt} /> */}</div>
      <h3>{name}</h3>
      <p>${price}</p>
      <button className="add-btn">ADD TO CART 🛒</button>
    </div>
  );
}

export default ProductCard;
