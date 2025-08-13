import React from 'react';
import flowerImage from '../../assets/images/flower.jpg'; // Adjust path accordingly
import './css/GiftOfferSection.css';

const GiftOfferSection: React.FC = () => {
  return (
    <div className="gift-offer-wrapper">
      <img src={flowerImage} alt="Flower Gift" className="gift-offer-image" />
      <div className="gift-text-box">
        <h2>Buy a Flower as a Gift & Send it for FREE to your Friend</h2>
        <p>
          Send a heartfelt to someone you care about. Choose a stunning flower from our collection,
          and we'll deliver it straight to your friend's door - at no extra cost! For an appreciation,
          blossom, celebration, or just because, let your love and gratitude blossom.
        </p>
      </div>
    </div>
  );
};

export default GiftOfferSection;
