import React, { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Image from "react-bootstrap/Image";
import u_image from "../../assets/images/User-Images/user-avatar.png";
import s_image from "../../assets/images/User-Images/snakeplant.png";
import v_image from "../../assets/images/User-Images/visacard.png";
import m_image from "../../assets/images/User-Images/mastercard.png";

// Popup Component
type PopupProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ children, onClose }) => (
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
      zIndex: 2000,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "0",
        borderRadius: "10px",
        minWidth: "800px",
        maxWidth: "95%",
        position: "relative",
        overflow: "hidden",
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
          zIndex: 10,
        }}
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

// Orders List Component
const OrdersList = () => {
  const orders = [
    {
      id: 1,
      name: "SNAKE PLANT",
      category: "Cactus",
      price: 149,
      status: "Done",
      date: "15 Aug 2025",
      orderNo: "#26953",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
    {
      id: 2,
      name: "PEACE LILY",
      category: "Flower",
      price: 129,
      status: "Processing",
      date: "14 Aug 2025",
      orderNo: "#26954",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
    {
      id: 3,
      name: "ALOE VERA",
      category: "Succulent",
      price: 79,
      status: "Done",
      date: "13 Aug 2025",
      orderNo: "#26955",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
    {
      id: 4,
      name: "MONSTERA",
      category: "Tropical",
      price: 199,
      status: "Processing",
      date: "12 Aug 2025",
      orderNo: "#26956",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
    {
      id: 5,
      name: "FIDDLE LEAF",
      category: "Tropical",
      price: 179,
      status: "Done",
      date: "11 Aug 2025",
      orderNo: "#26957",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
    {
      id: 6,
      name: "GOLDEN POTHOS",
      category: "Vine",
      price: 129,
      status: "Processing",
      date: "10 Aug 2025",
      orderNo: "#26958",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
    >
      {currentOrders.map((order) => (
        <div
          key={order.id}
          style={{
            display: "flex",
            alignItems: "flex-start",
            background: "#E8F5E9",
            borderRadius: "10px",
            padding: "10px",
            gap: "15px",
            border: "1px solid #d0e6d0",
            flexWrap: "wrap",
          }}
        >
          <img
            src={order.image}
            alt={order.name}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <div style={{ flex: 1 }}>
            <h5 style={{ margin: 0, fontWeight: 700 }}>{order.name}</h5>
            <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#555" }}>
              {order.category}
            </p>
            <p style={{ fontWeight: 700, margin: "0 0 8px 0" }}>
              ${order.price}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "6px",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outline-danger"
                size="sm"
                style={{
                  fontWeight: 600,
                  height: "30px",
                  fontSize: "13px",
                  width: "100px",
                }}
              >
                Cancel
              </Button>
              <Button
                variant={order.status === "Done" ? "success" : "warning"}
                size="sm"
                style={{
                  fontWeight: "600",
                  height: "30px",
                  fontSize: "13px",
                  color: "#fff",
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {order.status === "Done" ? (
                  <>
                    Done{" "}
                    <IoCheckmarkDoneCircleOutline
                      style={{ marginLeft: "5px" }}
                    />
                  </>
                ) : (
                  <>
                    Processing{" "}
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
            <div style={{ marginTop: "4px" }}>
              <p style={{ margin: 0, fontSize: "13px" }}>
                <strong>Order Date:</strong> {order.date} |{" "}
                <strong>Order No.:</strong> {order.orderNo}
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#555" }}>
                <strong>Payment Address:</strong> {order.paymentAddress}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={handlePrev}
        >
          Prev
        </Button>
        <span style={{ alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// Payments List Component
const PaymentsList = () => {
  const payments = [
    {
      id: 1,
      name: "Golden Pothos",
      method: "Visa",
      date: "14-Aug-2025",
      time: "18:30",
      amount: 129,
      image: s_image,
    },
    {
      id: 2,
      name: "Snake Plant",
      method: "MasterCard",
      date: "13-Aug-2025",
      time: "15:00",
      amount: 149,
      image: s_image,
    },
    {
      id: 3,
      name: "Peace Lily",
      method: "Visa",
      date: "12-Aug-2025",
      time: "12:30",
      amount: 99,
      image: s_image,
    },
    {
      id: 4,
      name: "Aloe Vera",
      method: "MasterCard",
      date: "11-Aug-2025",
      time: "10:00",
      amount: 79,
      image: s_image,
    },
    {
      id: 5,
      name: "Fiddle Leaf",
      method: "Visa",
      date: "10-Aug-2025",
      time: "09:30",
      amount: 199,
      image: s_image,
    },
    {
      id: 6,
      name: "Monstera",
      method: "MasterCard",
      date: "09-Aug-2025",
      time: "14:00",
      amount: 149,
      image: s_image,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
    >
      {currentPayments.map((payment) => (
        <div
          key={payment.id}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            background: "#E8F5E9",
            borderRadius: "10px",
            padding: "10px",
            gap: "15px",
            border: "1px solid #d0e6d0",
            flexWrap: "wrap",
          }}
        >
          <img
            src={payment.image}
            alt={payment.name}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: "150px" }}>
            <h5 style={{ margin: "0", fontWeight: "700", fontSize: "16px" }}>
              {payment.name}
            </h5>
            <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#555" }}>
              Payment Via: {payment.method}
            </p>
            <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#555" }}>
              Date: {payment.date}
            </p>
            <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#555" }}>
              Time: {payment.time}
            </p>
            <p
              style={{
                fontWeight: "700",
                margin: "0 0 8px 0",
                fontSize: "16px",
              }}
            >
              ${payment.amount}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outline-success"
              size="sm"
              style={{
                fontWeight: "600",
                height: "30px",
                fontSize: "13px",
                flex: "1 0 48%",
              }}
            >
              VIEW
            </Button>
            <Button
              variant="success"
              size="sm"
              style={{
                fontWeight: "600",
                height: "30px",
                fontSize: "13px",
                color: "#fff",
                flex: "1 0 48%",
              }}
            >
              DOWNLOAD
            </Button>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={handlePrev}
        >
          Prev
        </Button>
        <span style={{ alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

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
            <Button variant="success" onClick={() => setShowCoupons(true)}>
              MY COUPONS
            </Button>
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
              <BsTrash size={20} />
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
