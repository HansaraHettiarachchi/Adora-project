import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      {/* Footer Main Content */}
      <footer className="footer">
        <div className="footer-container">
          {/* Logo Section */}
          <div className="footer-section footer-logo">
            <img src="/images/LOGO (1).png" alt="Flower Shop Logo" />
          </div>

          {/* Links Section */}
          <div className="footer-section">
            <h3>LINKS</h3>
            <ul>
              <li>HOME</li>
              <li>SHOP</li>
              <li>CATEGORY</li>
              <li>ABOUT</li>
              <li>CONTACT</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3>CONTACT US</h3>
            <div className="contact-item">
              <img src="/images/Location on.png" alt="Location" />
              <span>No. 45, Flower Garden Road, Colombo 07, Sri Lanka.</span>
            </div>
            <div className="contact-item">
              <img src="/images/Email.png" alt="Email" />
              <span>odaraflower@gmail.com</span>
            </div>
            <div className="contact-item">
              <img src="/images/Local phone.png" alt="Phone" />
              <span>+94 76 123 4567</span>
            </div>
          </div>

          {/* Social Media + Hours */}
          <div className="footer-section">
            <h3>SOCIAL MEDIA</h3>
            <div className="social-icons">
              <img src="/images/WhatsApp.png" alt="WhatsApp" />
              <img src="/images/TikTok.png" alt="TikTok" />
              <img src="/images/Instagram.png" alt="Instagram" />
              <img src="/images/Facebook.png" alt="Facebook" />
            </div>

            <h3 style={{ marginTop: "20px" }}>WORKING HOURS</h3>
            <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
            <p>Sun: 10:00 AM – 2:00 PM</p>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Full Width */}
      <div className="footer-bottom-text">
        Copyright © 2025. All rights reserved
      </div>
    </>
  );
}

export default Footer;
