import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import Image from "react-bootstrap/Image";
import u_image from "../../assets/images/User-Images/user-avatar.png";
import v_image from "../../assets/images/User-Images/visacard.png";
import m_image from "../../assets/images/User-Images/mastercard.png";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import OrdersList from "./OrdersList";
import PaymentsList from "./PaymentsList";
import PaymentForm from "./PaymentForm";

// Popup Component
interface PopupProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}

const UserProfile: React.FC = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const paymentRef = useRef<HTMLDivElement>(null);

  const handleAddPaymentClick = () => setShowPaymentForm(true);

  const navigate = useNavigate();

  const closeAllPopups = () => {
    setShowOrders(false);
    setShowPayments(false);
    setShowPaymentForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save payment
    console.log({ cardNumber, expiry, cvv });
    setShowPaymentForm(false);
  };

  // Close payment form if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paymentRef.current &&
        !paymentRef.current.contains(event.target as Node)
      ) {
        setShowPaymentForm(false);
      }
    };
    if (showPaymentForm)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPaymentForm]);

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "10px",
        background: "#eaeaea",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
        maxWidth: "1316px",
        margin: "20px auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h2
          style={{ color: "#39A108", fontFamily: "Poppins", fontWeight: 800 }}
        >
          MY <span style={{ color: "#000" }}>PROFILE</span>
        </h2>
      </div>

      {/* Profile Info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <Image
            src={u_image}
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              padding: "3px",
            }}
          />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "180px",
            }}
          >
            <h4 style={{ color: "#39A108", fontWeight: 700 }}>
              MOHAMED <span style={{ color: "#000" }}>MUKARRAM</span>
            </h4>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Button variant="success" style={{ borderRadius: "10px" }}>
                EDIT PROFILE
              </Button>

              <Button
                style={{
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  color: "#000",
                  border: "1px solid #000",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
                onMouseEnter={(e) => {
                  const button = e.target as HTMLButtonElement;
                  button.style.backgroundColor = "#39A108";
                  button.style.color = "#fff";
                  button.style.border = "1px solid #215609ff";
                }}
                onMouseLeave={(e) => {
                  const button = e.target as HTMLButtonElement;
                  button.style.backgroundColor = "transparent";
                  button.style.color = "#000";
                  button.style.border = "1px solid #000";
                }}

                onClick={() => navigate("/login")}
              >
                <FiLogOut /> LOGOUT
              </Button>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "150px" }}>
              <p style={{ marginBottom: "4px", color: "#39A108" }}>
                <strong>
                  USER <span style={{ color: "#000" }}>ID</span>
                </strong>
              </p>
              <p style={{ color: "#6c757d" }}>mohamed123</p>
            </div>
            <div>
              <p style={{ marginBottom: "4px", color: "#39A108" }}>
                <strong>
                  EMAIL <span style={{ color: "#000" }}>ID</span>
                </strong>
              </p>
              <p style={{ color: "#6c757d" }}>mohamed123@gmail.com</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "20px",
              marginBottom: "16px",
            }}
          >
            <Button variant="success" onClick={() => setShowOrders(true)}>
              MY ORDERS
            </Button>
            <Button variant="success">MY COUPONS</Button>
            <Button variant="success" onClick={() => setShowPayments(true)}>
              MY PAYMENTS
            </Button>
          </div>
        </div>
      </div>

      {/* BIO */}
      <div style={{ marginBottom: "40px", paddingLeft: "20px" }}>
        <h5 style={{ fontWeight: "bold", color: "#39A108" }}>BIO</h5>
        <p style={{ color: "#6c757d", marginBottom: "0px", fontSize: "15px" }}>
          Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie...
        </p>
      </div>

      {/* Shipping & Phone */}
      <div
        style={{ display: "flex", marginBottom: "40px", paddingLeft: "20px" }}
      >
        <div style={{ width: "50%" }}>
          <h5 style={{ fontWeight: "bold", color: "#39A108" }}>
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
        <div style={{ width: "50%" }}>
          <h5 style={{ fontWeight: "bold", color: "#39A108" }}>PHONE</h5>
          <p>+94 76 123 4567</p>
          <p>+94 78 123 4567</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div style={{ paddingLeft: "20px" }}>
        <h5 style={{ fontWeight: "bold", color: "#39A108" }}>PAYMENT METHOD</h5>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {/* Visa Card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderRadius: "8px",
              background: "#f8f9fa",
              width: "300px",
              height: "50px",
            }}
          >
            <img
              src={v_image}
              alt="Visa"
              style={{ width: "50px", height: "30px", marginRight: "10px" }}
            />
            <div>
              <strong>VISA</strong> ....8596
              <br />
              <small style={{ color: "#6c757d" }}>Expire 06/26</small>
            </div>
            <Button
              type="button"
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "red",
              }}
            >
              ✕
            </Button>
          </div>

          {/* MasterCard */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderRadius: "8px",
              background: "#f8f9fa",
              width: "300px",
              height: "50px",
            }}
          >
            <img
              src={m_image}
              alt="MasterCard"
              style={{ width: "50px", height: "30px", marginRight: "10px" }}
            />
            <div>
              <strong>MASTERCARD</strong> ....1234
              <br />
              <small style={{ color: "#6c757d" }}>Expire 12/25</small>
            </div>
            <Button
              type="button"
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "red",
              }}
            >
              ✕
            </Button>
          </div>

          {/* Add Payment Button */}
          <div
            onClick={handleAddPaymentClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "220px",
              cursor: "pointer",
              background: "#DADADA",
              padding: "10px 15px",
              gap: "8px",
              color: "#164C0D",
              fontWeight: 700,
              fontSize: "13px",
              borderRadius: "8px",
            }}
          >
            + ADD PAYMENT METHOD
          </div>
        </div>
      </div>

      {/* Orders Popup */}
      {showOrders && (
        <Popup onClose={closeAllPopups}>
          <div style={{ display: "flex", borderBottom: "1px solid #ddd" }}>
            <button
              style={{
                flex: 1,
                padding: "8px 0",
                background: "#39A108",
                color: "white",
                fontWeight: "600",
                border: "none",
              }}
            >
              My Orders
            </button>
          </div>
          <OrdersList />
        </Popup>
      )}

      {/* Payments Popup */}
      {showPayments && (
        <Popup onClose={closeAllPopups}>
          <div style={{ display: "flex", borderBottom: "1px solid #ddd" }}>
            <button
              style={{
                flex: 1,
                padding: "8px 0",
                background: "#39A108",
                color: "white",
                fontWeight: "600",
                border: "none",
              }}
            >
              My Payments
            </button>
          </div>
          <PaymentsList />
        </Popup>
      )}

      {/* Payment Form Popup */}
      {showPaymentForm && (
        <PaymentForm
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          expiry={expiry}
          setExpiry={setExpiry}
          cvv={cvv}
          setCvv={setCvv}
          onSubmit={handleSubmit}
          ref={paymentRef}
        />
      )}
    </div>
  );
};

export default UserProfile;
