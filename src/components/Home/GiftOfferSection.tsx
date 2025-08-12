import React from 'react';
import flowerImage from '../../assets/images/flower.jpg'; // Adjust the path to your image

const GiftOfferSection: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', borderRadius: '8px', overflow: 'hidden' }}>
      <img 
        src={flowerImage} 
        alt="Flower Gift" 
        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
      />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '10%',
        transform: 'translateY(-50%)',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent dark background for text readability
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '45%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ marginBottom: '0.5rem' }}>
          Buy a Flower as a Gift & Send it for FREE to your Friend
        </h2>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: 'white',
          fontWeight: '400',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}>
          Send a heartfelt to someone you care about. Choose a stunning flower from our collection,
          and we'll deliver it straight to your friend's door - at no extra cost! For an appreciation,
          blossom, celebration, or just because, let your love and gratitude blossom.
        </p>
      </div>
    </div>
  );
};

export default GiftOfferSection;
