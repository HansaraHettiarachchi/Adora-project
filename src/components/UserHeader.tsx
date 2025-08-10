import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaHome, FaUser } from 'react-icons/fa';
import logo from '../assets/images/logo.png';

const UserHeader: React.FC = () => (
  <Navbar bg="light" expand="lg" className="py-3 border-bottom shadow-sm">
    <Container fluid='sm' className="d-flex justify-content-between align-items-center">
      {/* Left: Home Link */}
      <Nav className="me-auto">
        <Nav.Link href="/" className="text-success d-flex align-items-center">
          <FaHome className="me-2" />
          Home
        </Nav.Link>
      </Nav>

      {/* Center: Logo */}
      <Navbar.Brand href="/" className="mx-auto">
        <img
          src={logo}
          alt="Adora Logo"
          style={{ height: 48, objectFit: 'contain' }}
        />
      </Navbar.Brand>

      {/* Right: User Link */}
      <Nav className="ms-auto">
        <Nav.Link href="/" className="text-success d-flex align-items-center">
          <FaUser className="me-2" />
          Mohamed
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default UserHeader;
