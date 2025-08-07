import React from 'react';

const PopularCategories: React.FC = () => {
  return (
    <div className="text-center mb-5">
      <h2>Most Popular Categories</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <img src="/path/to/valentine.jpg" alt="Valentine" className="img-fluid mb-2" />
          <p>Valentine</p>
          <button className="btn btn-success btn-sm">Checkout</button>
        </div>
        <div className="col-md-6 mb-4">
          <img src="/path/to/wedding.jpg" alt="Wedding" className="img-fluid mb-2" />
          <p>Wedding</p>
          <button className="btn btn-success btn-sm">Checkout</button>
        </div>
        <div className="col-md-6 mb-4">
          <img src="/path/to/house-plants.jpg" alt="House Plants" className="img-fluid mb-2" />
          <p>House Plants</p>
          <button className="btn btn-success btn-sm">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;