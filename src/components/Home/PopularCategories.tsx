import React from "react";
import valentineImg from "../../assets/images/valentine.jpg";
import weddingImg from "../../assets/images/wedding.png";
import housePlantsImg from "../../assets/images/house-plants.jpg";
import "./PopularCategories.css";

const PopularCategories: React.FC = () => {
  return (
    <div className="container-lg my-5 popular-categories-container">
      <h2 className="text-center text-success fw-bold mb-4">MOST POPULAR CATEGORIES</h2>

      {/* Valentine */}
      <div className="row align-items-center bg-light rounded-4 overflow-hidden mb-4">
        <div className="col-md-6 p-0">
          <img src={valentineImg} alt="Valentine" className="popular-image" />
        </div>
        <div className="col-md-5 p-4 popular-text-section">
          <h3 className="text-success">Valentine</h3>
          <p className="mt-4 mb-5">
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
            interdum tellus elit sed risus.
          </p>
          <button className="btn btn-outline-success rounded-pill px-4">Checkout</button>
        </div>
      </div>

      {/* Wedding */}
      <div className="row align-items-center bg-light rounded-4 overflow-hidden mb-4 flex-md-row-reverse">
        <div className="col-md-6 p-0">
          <img src={weddingImg} alt="Wedding" className="popular-image" />
        </div>
        <div className="col-md-5 p-4 popular-text-section reverse">
          <h3 className="text-success">Wedding</h3>
          <p className="mt-4 mb-5">
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis n lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
          </p>
          <button className="btn btn-outline-success rounded-pill px-4">Checkout</button>
        </div>
      </div>

      {/* House Plants */}
      <div className="row align-items-center bg-light rounded-4 overflow-hidden">
        <div className="col-md-6 p-0">
          <img src={housePlantsImg} alt="House Plants" className="popular-image" />
        </div>
        <div className="col-md-5 p-4 popular-text-section">
          <h3 className="text-success">House Plants</h3>
          <p className="mt-4 mb-5"> 
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
            mattis tellus. fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
            risus.
          </p>
          <button className="btn btn-outline-success rounded-pill px-4">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
