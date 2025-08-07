import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const products = [
  { name: 'Snake Plant', price: 149, imageAlt: 'Snake Plant' },
  { name: 'Candelabra Aloe', price: 39, imageAlt: 'Aloe Vera' },
  { name: 'Golden Pothos', price: 69, imageAlt: 'Pothos' },
  { name: 'Homalomena', price: 119, imageAlt: 'Homalomena' },
];

function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((prod, index) => (
        <ProductCard key={index} {...prod} />
      ))}
    </div>
  );
}

export default ProductGrid;
