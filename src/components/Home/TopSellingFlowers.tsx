import React from 'react';
import home1 from '../../assets/images/home-img1.jpeg';
import home2 from '../../assets/images/home-img2.jpeg';
import home3 from '../../assets/images/home-img3.jpeg';
import home4 from '../../assets/images/home-img4.jpg';

const flowerData = [
  { img: home1, alt: 'Home Flower', name: 'Featured Flower', price: '' },
  { img: home2, alt: 'Candelabra Aloe', name: 'Candelabra Aloe', price: '$29' },
  { img: home3, alt: 'Golden Pothos', name: 'Golden Pothos', price: '$39' },
  { img: home4, alt: 'Homalomena', name: 'Homalomena', price: '$19' },
];

const imageStyle: React.CSSProperties = {
  width: '180px',
  height: '180px',
  objectFit: 'cover',
  display: 'block',
  margin: '0 auto 10px auto',
};

const TopSellingFlowers: React.FC = () => {
  return (
    <div className="text-center mb-5 mt-5">
      <h2>Top Selling Flowers</h2>
      <div className="flowers-container py-3 px-2" style={{ background: '#f8f9fa', borderRadius: '12px' }}>
        <div className="row">
          {flowerData.map((flower, idx) => (
            <div className="col-md-3 d-flex flex-column align-items-center" key={idx}>
              <img
                src={flower.img}
                alt={flower.alt}
                style={imageStyle}
                className="mb-2"
              />
              <p>
                {flower.name}
                {flower.price && ` - ${flower.price}`}
              </p>
              <div className="w-100 d-flex justify-content-center">
                <button className="btn btn-success btn-sm">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-outline-success mt-3">View More</button>
    </div>
  );
};

export default TopSellingFlowers;