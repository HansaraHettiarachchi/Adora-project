import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaWhatsapp,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';
import logo from '../assets/images/logo.png';


const Footer: React.FC = () => {
    return (
        <footer className="bg-light pt-5 border-top w-100">
            <div className="container-fluid">
                <Row className="text-center text-md-start">
                    <Col md={3}>
                        <img src={logo} alt="Adora Logo" style={{ height: '70px' }} />
                    </Col>
                    <Col md={2}>
                        <h5 className="text-success fw-bold mb-3">LINKS</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-dark text-decoration-none">Home</a></li>
                            <li><a href="/shop" className="text-dark text-decoration-none">Shop</a></li>
                            <li><a href="/category" className="text-dark text-decoration-none">Category</a></li>
                            <li><a href="/about" className="text-dark text-decoration-none">About</a></li>
                            <li><a href="/contact" className="text-dark text-decoration-none">Contact</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5 className="text-success fw-bold mb-3">CONTACT US</h5>
                        <p className="mb-1"><FaMapMarkerAlt className="me-2" />No. 45, Flower Garden Road,<br />Colombo 07, Sri Lanka.</p>
                        <p className="mb-1"><FaEnvelope className="me-2" /><a href="mailto:adoraflower@gmail.com" className="text-dark text-decoration-none">adoraflower@gmail.com</a></p>
                        <p><FaPhone className="me-2" />+94 76 123 4567</p>
                    </Col>
                    <Col md={2}>
                        <h5 className="text-success fw-bold mb-3">SOCIAL MEDIA</h5>
                        <div className="d-flex gap-2">
                            <FaWhatsapp className="fs-4 text-success" />
                            <FaTiktok className="fs-4 text-success" />
                            <FaInstagram className="fs-4 text-success" />
                            <FaFacebookF className="fs-4 text-success" />
                        </div>
                    </Col>
                    <Col md={2}>
                        <h5 className="text-success fw-bold mb-3">WORKING HOURS</h5>
                        <p className="mb-1">Mon – Sat: 9:00 AM – 7:00 PM</p>
                        <p>Sun: 10:00 AM – 2:00 PM</p>
                    </Col>
                </Row>
                <hr />
                <p className="text-center mb-0 py-3 text-white bg-success w-100">
                    Copyright © 2025. All rights reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
