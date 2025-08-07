import React from 'react';
import './Sidebar.css';

const otherProducts = [
  { name: 'Candelabra Aloe', price: 28, stars: 4 },
  { name: 'Homalomena', price: 25, stars: 5 },
  { name: 'Snake Plant', price: 48, stars: 3 },
  { name: 'Golden Pothos', price: 17, stars: 4 },
  { name: 'Cactus', price: 15, stars: 5 },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Other Products</h3>
      {otherProducts.map((item, index) => (
        <div key={index} className="sidebar-item">
          <div className="img-placeholder" />
          <div>
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>{"★".repeat(item.stars)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
