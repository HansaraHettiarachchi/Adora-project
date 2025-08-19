import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  PiNumberCircleOneLight,
  PiNumberCircleThreeLight,
  PiNumberCircleTwoLight,
} from "react-icons/pi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

import {
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../util/cartStorage";
import p_image from "../assets/images/Product/image.png"; // fallback image

const resolveImage = (url?: string | null) => {
  if (!url) return p_image; // local fallback
  if (/^https?:\/\//i.test(url)) return url; // full external URL
  if (url.startsWith("/")) return url; // absolute path
  if (url.startsWith("products/")) return `/${url}`; // from public/
  return `/uploads/${url}`; // backend-served uploads
};

type CartItem = {
  id: number;
  name: string;
  desc?: string | null;
  category_id?: number;
  mother_plant_type_id?: number;
  isActive?: boolean;
  imageUrl?: string | null;
  quantity: number;
  price?: number; // optional until you wire pricing
};

const CartPage = () => {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 576 : false;
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage once
  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleQtyChange = (id: number, value: string) => {
    const qty = Math.max(1, Number(value) || 1);
    updateQuantity(id, qty);
    setCartItems(getCart());
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setCartItems(getCart());
  };

  const handleEmpty = () => {
    clearCart();
    setCartItems([]);
  };

  // Totals
  const itemSubtotal = (item: CartItem) =>
    (item.price ?? 0) * (item.quantity ?? 1);
  const subtotal = cartItems.reduce((acc, item) => acc + itemSubtotal(item), 0);
  const shippingFee = cartItems.length > 0 ? 200 : 0;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }
    if (paymentMethod === "cod" || paymentMethod === "online") {
      navigate("/checkout");
    } else {
      alert("Please select a payment method before proceeding.");
    }
  };

  return (
    <>
      <Header />

      <section style={{ padding: isMobile ? "1rem" : "2rem" }}>
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <h5
                style={{
                  fontWeight: "400",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: isMobile ? "1rem" : "2rem",
                  marginBottom: isMobile ? "1rem" : "2rem",
                  gap: isMobile ? "0.5rem" : "1rem",
                  fontSize: isMobile ? "1rem" : "1.25rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: "#23B540",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "0.5rem" : "1rem",
                  }}
                >
                  <PiNumberCircleOneLight style={{ color: "#164C0D" }} />
                  Shopping Cart
                </span>
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IoIosArrowRoundForward />
                </span>
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "0.5rem" : "1rem",
                  }}
                >
                  <PiNumberCircleTwoLight /> Checkout Details
                </span>
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IoIosArrowRoundForward />
                </span>
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "0.5rem" : "1rem",
                  }}
                >
                  <PiNumberCircleThreeLight /> Order Complete
                </span>
              </h5>
            </Col>
          </Row>

          <Row>
            {/* Table */}
            <Col lg={8} xs={12} className="mb-4" style={{ overflowX: "auto" }}>
              <Table
                bordered
                hover
                responsive
                style={{
                  width: "100%",
                  margin: "0 auto",
                  minWidth: isMobile ? "600px" : "100%",
                  fontSize: isMobile ? "0.85rem" : "1rem",
                }}
              >
                <thead
                  style={{
                    textAlign: "center",
                    height: isMobile ? "3rem" : "5rem",
                    verticalAlign: "middle",
                    border: "1px solid #B8B4B4",
                  }}
                >
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty.</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    border: "1px solid #B8B4B4",
                  }}
                >
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <Form.Check type="checkbox" />
                      </td>
                      <td>
                        <img
                          src={resolveImage(item.imageUrl)}
                          alt={item.name}
                          style={{
                            width: isMobile ? "40px" : "60px",
                            height: isMobile ? "40px" : "60px",
                            objectFit: "cover",
                            marginRight: isMobile ? "5px" : "10px",
                            borderRadius: "5px",
                          }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price != null ? `$${item.price}` : "—"}</td>
                      <td>
                        <Form.Select
                          style={{
                            border: "none",
                            boxShadow: "none",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            fontSize: isMobile ? "0.85rem" : "1rem",
                            padding: isMobile ? "2px 6px" : "6px 12px",
                          }}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQtyChange(item.id, e.target.value)
                          }
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {item.price != null
                          ? `$${(item.quantity * item.price).toFixed(2)}`
                          : "—"}
                      </td>
                      <td>
                        <Button
                          variant="outline-none"
                          size={isMobile ? "sm" : "lg"}
                          onClick={() => handleRemove(item.id)}
                        >
                          <FaTrash
                            style={{
                              color: "#164C0D",
                              fontSize: isMobile ? "14px" : "18px",
                            }}
                          />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>

            {/* Cart Summary */}
            <Col lg={4} xs={12}>
              <div
                style={{
                  backgroundColor: "#EFECEC",
                  padding: isMobile ? "1rem" : "2rem",
                  borderRadius: "10px",
                  display: "grid",
                  justifyContent: "center",
                }}
              >
                <h4
                  className="mb-3"
                  style={{
                    textAlign: "center",
                    color: "#23B540",
                    fontSize: isMobile ? "1.25rem" : "1.5rem",
                  }}
                >
                  Cart Total
                </h4>

                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  Subtotal: <span>${subtotal.toFixed(2)}</span>
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  Shipping Fee: <span>${shippingFee.toFixed(2)}</span>
                </p>
                <h6
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: isMobile ? "1rem" : "1.25rem",
                  }}
                >
                  Total: <strong>${total.toFixed(2)}</strong>
                </h6>

                {/* Payment method selection */}
                <Form
                  className="mt-3"
                  style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}
                >
                  <Form.Check
                    type="radio"
                    label="Cash On Delivery"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="Online Payment"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mb-3"
                  />
                </Form>

                {/* Checkout button */}
                <Button
                  variant="success"
                  className="w-100 mb-2"
                  style={{
                    backgroundColor: "transparent",
                    color: "#164C0D",
                    border: "2px solid #164C0D",
                    fontWeight: "500",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                  onClick={handleCheckout}
                >
                  Check Out
                </Button>

                <Button
                  variant="outline-success"
                  className="w-100 mb-2"
                  style={{
                    color: "white",
                    backgroundColor: "#164C0D",
                    border: "2px solid #164C0D",
                    fontWeight: "500",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </Button>

                <Button
                  variant="outline-none"
                  className="w-100"
                  style={{
                    color: "#23B540",
                    fontWeight: "500",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                  onClick={handleEmpty}
                >
                  Empty Cart
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CartPage;
