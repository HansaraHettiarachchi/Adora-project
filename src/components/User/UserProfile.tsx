import React, { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

const UserProfile: React.FC = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const paymentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showPaymentForm &&
        paymentRef.current &&
        !paymentRef.current.contains(event.target as Node)
      ) {
        closeForm();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPaymentForm]);

  const handleAddPaymentClick = () => {
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setShowPaymentForm(true);
  };

  const closeForm = () => {
    setShowPaymentForm(false);
    setCardNumber("");
    setExpiry("");
    setCvv("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Payment saved!");
    closeForm();
  };

  return (
    <div
      className="p-4 rounded"
      style={{
        background: "#eaeaeaff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        maxWidth: "1316px",
        margin: "20px auto",
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-4">
        <h2
          className="fw-bold"
          style={{ color: "#39A108", fontFamily: "Poppins", fontWeight: "800" }}
        >
          MY <span style={{ color: "#000" }}>PROFILE</span>
        </h2>
      </div>

      {/* Profile Image & Info */}
      <div className="d-flex align-items-center mb-4">
        <div style={{ marginRight: "20px" }}>
          <img
            src="../../src/assets/images/User-Images/user-avatar.png"
            alt="User Avatar"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              padding: "3px",
            }}
          />
        </div>
        <div>
          <div className="d-flex align-items-center justify-content-between" style={{ gap: "180px" }}>
            <h4 style={{ color: "#39A108", fontWeight: 700 }}>
              MOHAMED <span style={{ color: "#000" }}>MUKARRAM</span>
            </h4>
            <div className="ms-auto">
              <Button variant="success" style={{ borderRadius: "10px" }}>
                EDIT PROFILE
              </Button>
            </div>
          </div>
          <div className="d-flex">
            <div style={{ marginRight: "150px" }}>
              <p className="mb-1" style={{ color: "#39A108" }}>
                <strong>
                  USER <span style={{ color: "#000" }}>ID</span>
                </strong>
              </p>
              <p className="text-muted">mohamed123</p>
            </div>
            <div>
              <p className="mb-1" style={{ color: "#39A108" }}>
                <strong>
                  EMAIL <span style={{ color: "#000" }}>ID</span>
                </strong>
              </p>
              <p className="text-muted">mohamed123@gmail.com</p>
            </div>
          </div>

          <div className="mb-4 d-flex" style={{ gap: "15px", marginTop: "20px" }}>
            <Button variant="success">MY ORDERS</Button>
            <Button variant="success">MY COUPONS</Button>
            <Button variant="success">MY PAYMENTS</Button>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-5 ps-4">
        <h5 className="fw-bold" style={{ color: "#39A108" }}>
          BIO
        </h5>
        <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
          Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
          dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
          sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
          sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos.
        </p>
      </div>

      {/* Address & Phone */}
      <div className="row mb-5 ps-4">
        <div className="col-md-6">
          <h5 className="fw-bold" style={{ color: "#39A108" }}>
            SHIPPING ADDRESS
          </h5>
          <p>
            48, SRI WAIJIRAGANA MAWATHA,
            <br />
            DEMATAGOYA ROAD,
            <br />
            MARADANA.
          </p>
        </div>
        <div className="col-md-6">
          <h5 className="fw-bold" style={{ color: "#39A108" }}>
            PHONE
          </h5>
          <p>+94 76 123 4567</p>
          <p>+94 78 123 4567</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h5 className="fw-bold ps-4" style={{ color: "#39A108" }}>
          PAYMENT METHOD
        </h5>
        <div className="d-flex flex-wrap gap-3 mb-3 ps-4">
          {/* Visa Card */}
          <div
            className="d-flex align-items-center p-3 rounded"
            style={{ background: "#f8f9fa", width: "300px", height: "50px", position: "relative" }}
          >
            <img
              src="../../src/assets/images/User-Images/visacard.png"
              alt="Visa"
              style={{ width: 50, height: 30, marginRight: "10px" }}
            />
            <div>
              <strong>VISA</strong> ....8596
              <br />
              <small className="text-muted">Expire 06/26</small>
            </div>
            <button
              type="button"
              className="btn ms-auto p-0"
              aria-label="Delete Visa payment method"
              style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}
            >
              <BsTrash size={20} />
            </button>
          </div>

          {/* Master Card */}
          <div
            className="d-flex align-items-center p-3 rounded"
            style={{ background: "#f8f9fa", width: "300px", height: "50px", position: "relative" }}
          >
            <img
              src="../../src/assets/images/User-Images/mastercard.png"
              alt="Master"
              style={{ width: 50, height: 30, marginRight: "10px" }}
            />
            <div>
              <strong>MAST</strong> ....8596
              <br />
              <small className="text-muted">Expire 06/26</small>
            </div>
            <button
              type="button"
              className="btn ms-auto p-0"
              aria-label="Delete Master payment method"
              style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}
            >
              <BsTrash size={20} />
            </button>
          </div>

          {/* Add Payment Button */}
          <div
            className="d-flex align-items-center justify-content-center rounded"
            style={{
              minWidth: "220px",
              cursor: "pointer",
              background: "#DADADA",
              padding: "10px 15px",
              gap: "8px",
              color: "#164C0D",
              fontWeight: "700",
              fontSize: "0.85rem",
              userSelect: "none",
            }}
            onClick={handleAddPaymentClick}
          >
            + ADD PAYMENT METHOD
          </div>
        </div>
      </div>

      {showPaymentForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            ref={paymentRef}
            className="bg-white border rounded shadow-sm p-4"
            style={{ width: "320px" }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="cardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="expiry">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit" className="w-100">
                Save Payment
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;