import React from 'react';
import home1 from '../../assets/images/home-img1.jpeg';
import home2 from '../../assets/images/home-img2.jpeg';
import home3 from '../../assets/images/home-img3.jpeg';
import home4 from '../../assets/images/home-img4.jpg';
import './TopSellingFlowers.css';

const flowerData = [
  { img: home1, alt: 'Home Flower', name: 'Featured Flower', price: '' },
  { img: home2, alt: 'Candelabra Aloe', name: 'Candelabra Aloe', price: '$29' },
  { img: home3, alt: 'Golden Pothos', name: 'Golden Pothos', price: '$39' },
  { img: home4, alt: 'Homalomena', name: 'Homalomena', price: '$19' },
];

const TopSellingFlowers: React.FC = () => {
  return (
    <div className="text-center my-5 px-2">
      <h2 className="text-center text-success fw-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
        TOP SELLING FLOWERS
      </h2>
      <div className="flowers-container py-5 px-4">
        <div className="row g-4">
          {flowerData.map((flower, idx) => (
            <div className="col-12 col-sm-6 col-md-3" key={idx}>
              <div className="card border-0 shadow h-100 flower-card p-3 rounded-4">
                <div className="flower-image-wrapper">
                  <img
                    src={flower.img}
                    alt={flower.alt}
                    className="card-img-top flower-image"
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between mt-3">
                  <h5 className="card-title fw-semibold">{flower.name}</h5>
                  <p className="card-text text-muted">{flower.price || 'Best Seller'}</p>
                  <button className="custom-cart-btn mt-auto">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="custom-outline-btn mt-5 px-4 py-2">View More</button>
      </div>
    </div>
  );
};

export default TopSellingFlowers;
