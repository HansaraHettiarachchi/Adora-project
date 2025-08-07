import React from "react";
import "./Header.css";

function Header() {
  return (
    <header>
      {/* Top White Navbar */}
      <div className="topbar">
        <div className="topbar-container">
          <div className="logo">
            <img src="/images/LOGO (1).png" alt="Logo" />
          </div>

          <nav className="nav-links">
            <a href="/home">HOME</a>
            <a href="/shop" className="active">SHOP</a>
            <a href="/category">CATEGORY</a>
            <a href="/about">ABOUT</a>
            <a href="/contact">CONTACT</a>
          </nav>

          <div className="icons">
  <a href="/cart">
    <img src="/images/Checkout.png" alt="Cart" />
  </a>
  <a href="/profile">
    <img src="/images/User.png" alt="User" />
  </a>
</div>

        </div>
      </div>

      {/* Green Breadcrumb Toolbar */}
      <div className="green-bar">
        <div className="green-bar-left">
          <img src="/images/house-chimney 1.png" alt="Home" />
          <img src="/images/angle-double-small-right 1.png" alt="Arrow" />
          <span>Products</span>
        </div>
        <button className="filter-btn">
          Filters <span>▼</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
