import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Header: React.FC = () => {
  return (
    <Navbar bg="light" className="shadow-sm border-bottom" sticky="top"  style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
      <Container fluid className="d-flex justify-content-between align-items-center">
        <h5 className="m-0 fw-bold text-success">Admin Panel</h5>
        <div>
          <span className="fw-semibold me-3">Welcome, Admin!</span>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
