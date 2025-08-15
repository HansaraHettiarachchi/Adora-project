import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg" className="py-3 border-bottom shadow-sm">
      <Container fluid="sm">
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Adora Logo"
            style={{ height: 48, objectFit: "contain" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="adora-navbar" />
        <Navbar.Collapse id="adora-navbar">
          <Nav className="mx-auto fw-semibold text-uppercase">
            <Nav.Link
              onClick={() => navigate("/home")}
              className="text-success"
            >
              Home
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/shop")}>Shop</Nav.Link>
            <Nav.Link onClick={() => navigate("/home")}>Category</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")}>Contact</Nav.Link>
          </Nav>
          
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
            </Nav.Link>

             <Nav.Link href="/cart" className="p-0 text-success">
              <FaShoppingCart />
            </Nav.Link>

             <Nav.Link
              href="/user"
              className="p-0 text-success"
              onClick={(e) => {
                e.preventDefault();
                navigate("/user");
              }}
            >
              <FaUser />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;