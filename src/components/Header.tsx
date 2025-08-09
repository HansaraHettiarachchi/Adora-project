import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../assets/images/logo.png';

const Header: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Navbar bg="light" expand="lg" className="py-3 border-bottom shadow-sm">
      <Container fluid="sm">
        <Navbar.Brand href="/">
          <img src={logo} alt="Adora Logo" style={{ height: 48, objectFit: 'contain' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="adora-navbar" />
        <Navbar.Collapse id="adora-navbar">
          <Nav className="mx-auto fw-semibold text-uppercase">
            <Nav.Link onClick={() => navigate("/home")} className="text-success">Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/shop")}>Shop</Nav.Link>
            <Nav.Link onClick={() => navigate("/home")}>Category</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")}>Contact</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-3 text-success fs-5">
            <Nav.Link href="/search" className="p-0 text-success"><FaSearch /></Nav.Link>
            <Nav.Link href="/cart" className="p-0 text-success"><FaShoppingCart /></Nav.Link>
            <Nav.Link
              href="/user"
              className="p-0 text-success"
              onClick={(e) => {
                e.preventDefault();
                navigate('/user');
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