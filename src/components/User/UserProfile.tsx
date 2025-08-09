import React from 'react';
import { Button } from 'react-bootstrap';

const UserProfile: React.FC = () => {
  return (
    <div className="p-4 bg-light rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">MY PROFILE</h2>
        <Button variant="success">EDIT PROFILE</Button>
      </div>
      <div className="d-flex align-items-center mb-4">
        <div className="me-4">
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="rounded-circle"
            style={{ width: 100, height: 100 }}
          />
        </div>
        <div>
          <h3>MOHAMED MUKARRAM</h3>
          <p><strong>USER ID</strong> mohamed123</p>
          <p><strong>EMAIL ID</strong> mohamed123@gmail.com</p>
        </div>
      </div>
      <div className="mb-4">
        <Button variant="success" className="me-2">MY ORDERS</Button>
        <Button variant="success" className="me-2">MY COUPONS</Button>
        <Button variant="success">MY PAYMENTS</Button>
      </div>
      <div className="mb-4">
        <h4 className="text-success">BIO</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
          dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum lacus. Sed tellus elit sed risus.
          Maecenas eget condimentum velit sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos.
        </p>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h4 className="text-success">SHIPPING ADDRESS</h4>
          <p>48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.</p>
        </div>
        <div className="col-md-6">
          <h4 className="text-success">PHONE #</h4>
          <p>+94 76 123 4567</p>
          <p>+94 78 123 4567</p>
        </div>
      </div>
      <div>
        <h4 className="text-success">PAYMENT METHOD</h4>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="me-3">
            <img src="https://via.placeholder.com/50" alt="Visa" style={{ width: 50, height: 30 }} />
            <span>VISA ....... 8596 <small>Expire 06/26</small></span>
          </div>
          <div className="me-3">
            <img src="https://via.placeholder.com/50" alt="Mastercard" style={{ width: 50, height: 30 }} />
            <span>MAST ....... 8596 <small>Expire 06/26</small></span>
          </div>
          <Button variant="outline-success">ADD PAYMENT METHOD</Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;