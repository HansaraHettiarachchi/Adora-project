import React from "react";
import valentineImg from "../../assets/images/valentine.jpg";
import weddingImg from "../../assets/images/wedding.png";
import housePlantsImg from "../../assets/images/house-plants.jpg";
import "./PopularCategories.css";

const PopularCategories: React.FC = () => {
  return (
<div className="container-lg my-5 popular-categories-container">
  <h2 className="text-center text-success fw-bold mb-4">MOST POPULAR</h2>


      {/* Valentine */}
      <div className="row align-items-center bg-light rounded-4 overflow-hidden mb-4">
        <div className="col-md-6 p-0">
          <img src={valentineImg} alt="Valentine" className="img-fluid w-100 h-100 object-fit-cover" />
        </div>
        <div className="col-md-6 p-4">
          <h3 className="fw-bold text-success">Valentine</h3>
          <p>
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
            interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
            Class aptent taciti
          </p>
          <button className="btn btn-outline-success rounded-pill px-4">Checkout</button>
        </div>
      </div>

      {/* Wedding */}
      <div className="row align-items-center bg-light rounded-4 overflow-hidden mb-4 flex-md-row-reverse">
        <div className="col-md-6 p-0">
          <img src={weddingImg} alt="Wedding" className="img-fluid w-100 h-100 object-fit-cover" />
        </div>
        <div className="col-md-6 p-4">
          <h3 className="fw-bold text-success">Wedding</h3>
          <p>
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis n lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
            Class aptent taciti
          </p>
          <button className="btn btn-outline-success rounded-pill px-4">Checkout</button>
        </div>
      </div>

      {/* House Plants */}
      <div className="row align-items-center bg-light rounded-4 overflow-hidden">
        <div className="col-md-6 p-0">
          <img src={housePlantsImg} alt="House Plants" className="img-fluid w-100 h-100 object-fit-cover" />
        </div>
        <div className="col-md-6 p-4">
          <h3 className="fw-bold text-success">House Plants</h3>
          <p>
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
            mattis tellus. fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
            risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti
          </p>
          <button className="btn btn-outline-success rounded-pill px-4">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
