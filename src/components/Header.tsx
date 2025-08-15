import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header: React.FC = () => {
  // Helper for active link styling
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "text-success fw-bold" : ""}`;

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

          {/* Icons */}
          <div className="d-flex align-items-center gap-3 fs-5">
            <NavLink to="/search" className={iconClass}>
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
