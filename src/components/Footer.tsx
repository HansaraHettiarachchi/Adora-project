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

const socialLinks = [
  { icon: <FaWhatsapp />, url: 'https://wa.me/94761234567', label: 'WhatsApp' },
  { icon: <FaTiktok />, url: 'https://www.tiktok.com/@adora', label: 'TikTok' },
  { icon: <FaInstagram />, url: 'https://instagram.com/adora', label: 'Instagram' },
  { icon: <FaFacebookF />, url: 'https://facebook.com/adora', label: 'Facebook' },
];

const navLinks = [
  { name: 'Home', url: '/' },
  { name: 'Shop', url: '/shop' },
  { name: 'Category', url: '/category' },
  { name: 'About', url: '/about' },
  { name: 'Contact', url: '/contact' },
];

const Footer: React.FC = () => (
  <footer className="bg-light pt-5 border-top">
    <div className="container-fluid px-0">
      <Row className="text-center text-md-start align-items-center g-0">
        <Col md={2} className="mb-4 mb-md-0 d-flex justify-content-center">
          <img src={logo} alt="Adora Logo" style={{ height: '70px', objectFit: 'contain' }} />
        </Col>
        <Col md={2} className="mb-4 mb-md-0">
          <h5 className="text-success fw-bold mb-3">Links</h5>
          <ul className="list-unstyled">
            {navLinks.map(link => (
              <li key={link.name}>
                <a href={link.url} className="text-dark text-decoration-none">{link.name}</a>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={3} className="mb-4 mb-md-0">
          <h5 className="text-success fw-bold mb-3">Contact Us</h5>
          <p className="mb-1">
            <FaMapMarkerAlt className="me-2" />
            No. 45, Flower Garden Road,<br />Colombo 07, Sri Lanka.
          </p>
          <br />
          <p className="mb-1">
            <FaEnvelope className="me-2" />
            <a href="mailto:adoraflower@gmail.com" className="text-dark text-decoration-none">
              adoraflower@gmail.com
            </a>
          </p>
          <p>
            <FaPhone className="me-2" />+94 76 123 4567
          </p>
        </Col>
        <Col md={2} className="mb-4 mb-md-0">
          <h5 className="text-success fw-bold mb-3">Social Media</h5>
          <div className="d-flex gap-3 justify-content-center justify-content-md-start">
            {socialLinks.map(({ icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-success fs-4"
              >
                {icon}
              </a>
            ))}
          </div>
        </Col>
        <Col md={3}>
          <h5 className="text-success fw-bold mb-3">Working Hours</h5>
          <p className="mb-1">Mon – Sat: 9:00 AM – 7:00 PM</p>
          <p>Sun: 10:00 AM – 2:00 PM</p>
        </Col>
      </Row>
      <hr className="m-0" />
      <p className="text-center mb-0 py-3 text-white bg-success w-100">
        &copy; 2025 Adora. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;