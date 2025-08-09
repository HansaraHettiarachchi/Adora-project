import React from 'react';

const TopSellingFlowers: React.FC = () => {
  return (
    <div className="text-center mb-5">
      <h2>Top Selling Flowers</h2>
      <div className="row">
        <div className="col-md-3">
          <img src="/path/to/snake-plant.jpg" alt="Snake Plant" className="img-fluid mb-2" />
          <p>Snake Plant - $49</p>
          <button className="btn btn-success btn-sm">Add to Cart</button>
        </div>
        <div className="col-md-3">
          <img src="/path/to/candelabra-aloe.jpg" alt="Candelabra Aloe" className="img-fluid mb-2" />
          <p>Candelabra Aloe - $29</p>
          <button className="btn btn-success btn-sm">Add to Cart</button>
        </div>
        <div className="col-md-3">
          <img src="/path/to/golden-pothos.jpg" alt="Golden Pothos" className="img-fluid mb-2" />
          <p>Golden Pothos - $39</p>
          <button className="btn btn-success btn-sm">Add to Cart</button>
        </div>
        <div className="col-md-3">
          <img src="/path/to/homalomena.jpg" alt="Homalomena" className="img-fluid mb-2" />
          <p>Homalomena - $19</p>
          <button className="btn btn-success btn-sm">Add to Cart</button>
        </div>
      </div>
      <button className="btn btn-outline-success mt-3">View More</button>
    </div>
  );
};

export default TopSellingFlowers;