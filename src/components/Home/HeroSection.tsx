import React from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../../assets/images/banner1.webp';
import logo from '../../assets/images/logo-white.png';

const HeroSection: React.FC = () => {

  const navigate = useNavigate();

  return (
    <section
      className="hero-section position-relative"
      style={{
        height: '90vh',
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'IvyPresto Display', serif",
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}
      ></div>

      {/* Content */}
      <div
        className="d-flex flex-column align-items-center justify-content-center h-100 text-center text-shadow position-relative"
        style={{ zIndex: 2 }}
      >
        <h1 className="display-3 fw-bold mb-3 text-white">Fresh flowers for any budget.</h1>
        <button className="btn btn-lg btn-outline-light px-4 py-2" onClick={() => navigate("/shop")}>Shop Flowers</button>
      </div>

      {/* Footer */}
      <footer
        className="w-100 position-absolute bottom-0 d-flex align-items-center justify-content-center px- py-4"
        style={{
          backgroundColor: 'rgba(57, 61, 36, 0.95)',
          color: '#fff',
          fontSize: '0.95rem',
          zIndex: 2,
          minHeight: '70px',
        }}
      >
        <img
          src={logo}
          alt="Hales Logo"
          style={{ maxWidth: '90px', marginRight: '20px', marginLeft: '30px', verticalAlign: 'middle' }}
        />
        <span style={{ fontSize: '1.15rem' }}>
          At Adora, every bloom tells a story , handpicked from trusted growers, arranged with love, and styled in timeless pottery and glassware.
        </span>
      </footer>

      {/* Styles */}
      <style>{`
      .text-shadow {
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      }
      @import url('https://fonts.googleapis.com/css2?family=Ivy+Presto+Display&display=swap');
    `}</style>
    </section>
  )
};

export default HeroSection;
