import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header: React.FC = () => {
  // Helper for active link styling
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "text-success fw-bold" : ""}`;
  const [showSearch, setShowSearch] = useState(false);

  const iconClass = ({ isActive }: { isActive: boolean }) =>
    `p-0 nav-link ${isActive ? "text-success" : ""}`;

  return (
    <Navbar bg="light" expand="lg" className="py-3 border-bottom shadow-sm">
      <Container fluid="sm">
        {/* Logo */}
        <Navbar.Brand as={NavLink} to="/" className="p-0">
          <img
            src={logo}
            alt="Adora Logo"
            style={{ height: 69, objectFit: "contain" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="adora-navbar" />
        <Navbar.Collapse id="adora-navbar">
          {/* Main Navigation */}
          <Nav className="mx-auto fw-semibold text-uppercase">
            <NavLink to="/home" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/shop" className={linkClass}>
              Shop
            </NavLink>
            {/* <NavLink to="/category" className={linkClass}>
              Category
            </NavLink> */}
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </Nav>

          {/* Adding search bar */}

          {/* Search and Icons Container */}
          <div className="d-flex align-items-center gap-3 text-success fs-5 position-relative">
            {/* Search Input */}
            <div
              className="position-absolute rounded"
              style={{
                right: showSearch ? '120px' : '40px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: showSearch ? '200px' : '0px',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                zIndex: 1000,
                border: showSearch ? '2px solid #198754' : 'none'
              }}
            >

              <input
                type="text"
                placeholder="Search..."
                className="form-control rounded"
                style={{
                  minWidth: '250px',
                  opacity: showSearch ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
                autoFocus={showSearch}
              />
            </div>

            {/* Search Icon */}
            <Nav.Link
              className="p-0 text-success"
              onClick={() => setShowSearch(!showSearch)}
              style={{
                cursor: 'pointer',
                zIndex: 1001,
                position: 'relative'
              }}
            >
              <FaSearch />
            </NavLink>
            <NavLink to="/cart" className={iconClass}>
              <FaShoppingCart />
            </NavLink>
            {/* Wishlist Icon */}
            <NavLink to="/wishlist" className={iconClass}>
              <FaHeart />
            </NavLink>
            <NavLink to="/user" className={iconClass}>
              <FaUser />
            </NavLink>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;