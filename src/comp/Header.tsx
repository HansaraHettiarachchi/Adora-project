import React from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg" className="py-3 border-bottom">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Adora Logo" style={{ height: '60px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="adora-navbar" />
        <Navbar.Collapse id="adora-navbar">
          <Nav className="mx-auto fw-bold text-uppercase">
            <Nav.Link href="/" className="text-success">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="/category">Category</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <div className="d-flex gap-3 text-success fs-5">
            <FaSearch />
            <FaShoppingCart />
            <FaUser />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;