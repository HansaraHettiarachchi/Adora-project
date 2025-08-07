import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="searchbar">
      <input type="text" placeholder="Search..." />
      <button>Recent</button>
      <button>Popular Items</button>
      <button>Special Offers</button>
      <button className="filters">Filters ⬇</button>
    </div>
  );
}

export default SearchBar;
