import React, { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { BsCircle } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

// Popup Component
type PopupProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ title, children, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: "0px",
      left: "0px",
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        minWidth: "500px",
        position: "relative",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        ✕
      </button>
      <h4 style={{ textAlign: "center", marginBottom: "16px" }}>{title}</h4>
      {children}
    </div>
  </div>
);

const UserProfile = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const paymentRef = useRef<HTMLDivElement>(null);

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

  const closeAllPopups = () => {
    setShowOrders(false);
    setShowCoupons(false);
    setShowPayments(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Payment saved!");
    closeForm();
  };

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
          style={{
            color: "#39A108",
            fontFamily: "Poppins",
            fontWeight: 800,
          }}
        >
          MY <span style={{ color: "#000" }}>PROFILE</span>
        </h2>
      </div>

      {/* Profile Info */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px",  flexWrap: "wrap"}}
      >
        <div style={{ marginRight: "20px" }}>
          <img
            src="../../src/assets/images/User-Images/user-avatar.png"
            alt="User Avatar"
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
            <Button variant="success" style={{ borderRadius: "10px" }}>
              EDIT PROFILE
            </Button>
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
            <Button variant="success" onClick={() => setShowCoupons(true)}>
              MY COUPONS
            </Button>
            <Button variant="success" onClick={() => setShowPayments(true)}>
              MY PAYMENTS
            </Button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "40px", paddingLeft: "20px" }}>
        <h5 style={{ fontWeight: "bold", color: "#39A108" }}>BIO</h5>
        <p style={{ color: "#6c757d", marginBottom: "0px", fontSize: "15px" }}>
          Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie...
        </p>
      </div>

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
      <div>
        <h5
          style={{ fontWeight: "bold", paddingLeft: "20px", color: "#39A108" }}
        >
          PAYMENT METHOD
        </h5>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            paddingLeft: "20px",
          }}
        >
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
              src="../../src/assets/images/User-Images/visacard.png"
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
              <BsTrash size={20} />
            </Button>
          </div>

          {/* Master Card */}
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
              src="../../src/assets/images/User-Images/mastercard.png"
              alt="Master"
              style={{ width: "50px", height: "30px", marginRight: "10px" }}
            />
            <div>
              <strong>MAST</strong> ....8596
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
              <BsTrash size={20} />
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

      {showOrders && (
        <Popup title="My Orders" onClose={closeAllPopups}>
          <div
            style={{
              backgroundColor: "white",
              width: "700px",
              height: "500px",
              padding: "30px",
              overflow: "hidden",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                height: "100%",
                width: "700px",
                overflowY: "auto",
                paddingRight: "10px",
                boxSizing: "border-box",
                alignItems: "center",
              }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    background: "#D9D9D9",
                    padding: "15px 20px 15px 15px",
                    borderRadius: "12px",
                    height: "150px",
                    width: "550px",
                    boxSizing: "border-box",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "15px",
                      cursor: "pointer",
                    }}
                  >
                    <BsCircle size={18} color="black" />
                  </div>

                  <img
                    src="../../src/assets/images/User-Images/snakeplant.png"
                    alt="Snake Plant"
                    style={{
                      width: "150px",
                      height: "120px",
                      marginRight: "30px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 3px 0",
                        fontWeight: "700",
                        fontSize: "18px",
                        color: "#222",
                      }}
                    >
                      SNAKE PLANT
                    </h4>
                    <small
                      style={{
                        fontSize: "13px",
                        color: "#555",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Cactus
                    </small>

                    <p
                      style={{
                        margin: 0,
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "#111",
                        marginTop: "20px",
                      }}
                    >
                      $149
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "center",
                      marginLeft: "15px",
                      minWidth: "100px",
                    }}
                  >
                    <Button
                      variant="outline-danger"
                      size="sm"
                      style={{
                        width: "100px",
                        height: "30px",
                        fontSize: "13px",
                        fontWeight: "600",
                        backgroundColor: "white",
                        borderColor: "red",
                        color: "red",
                        marginTop: "50px",
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant={i === 2 ? "success" : "warning"}
                      size="sm"
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "100px",
                        height: "30px",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {i === 2 ? (
                        <>
                          Done
                          <IoCheckmarkDoneCircleOutline
                            style={{ marginLeft: "20px", fontSize: "16px" }}
                          />
                        </>
                      ) : (
                        <>
                          Processing
                          <AiOutlineLoading3Quarters
                            style={{
                              marginLeft: "5px",
                              animation: "spin 1s linear infinite",
                            }}
                          />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popup>
      )}

      {showCoupons && (
        <Popup title="My Coupons" onClose={closeAllPopups}>
          <p>No coupons available right now.</p>
        </Popup>
      )}

      {showPayments && (
        <Popup title="My Payments" onClose={closeAllPopups}>
          <p>Payment history will appear here.</p>
        </Popup>
      )}

      {/* Payment Form Popup */}
      {showPaymentForm && (
        <div
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
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
            className="bg-white border rounded shadow-sm"
            style={{ padding: "20px", width: "320px" }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="cardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
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
              <Button variant="success" type="submit" style={{ width: "100%" }}>
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
