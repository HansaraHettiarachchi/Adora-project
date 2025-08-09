import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { PiNumberCircleOneLight } from "react-icons/pi";
import { PiNumberCircleTwoLight } from "react-icons/pi";
import { PiNumberCircleThreeLight } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "Homalomena",
      price: 200,
      qty: 1,
      img: "src/assets/images/cart_item (1).png",
    },
    {
      id: 2,
      name: "Alovera",
      price: 250,
      qty: 1,
      img: "src/assets/images/cart_item (2).png",
    },
    {
      id: 3,
      name: "Rose",
      price: 350,
      qty: 1,
      img: "src/assets/images/cart_item (3).png",
    },
  ];

  return (
    <>
      <Header />

      {/* Cart Section */}
      <section style={{ padding: "2rem" }}>
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <h5
                style={{
                  fontWeight: "400",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                  marginBottom: "2rem",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    color: "#23B540",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <span>
                    <PiNumberCircleOneLight />
                  </span>{" "}
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
                </span>{" "}
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <PiNumberCircleTwoLight /> Checkout Details
                </span>{" "}
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IoIosArrowRoundForward />
                </span>{" "}
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <PiNumberCircleThreeLight /> Order Complete
                </span>{" "}
              </h5>
            </Col>
          </Row>

          <Row>
            {/* Table */}
            <Col lg={8} xs={12} className="mb-4" style={{}}>
              <Table
                bordered
                hover
                responsive
                style={{ width: "100%", margin: "0 auto" }}
              >
                <thead
                  style={{
                    textAlign: "center",
                    height: "5rem",
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
                          src={item.img}
                          alt={item.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            marginRight: "10px",
                            borderRadius: "5px",
                          }}
                        />
                      </td>
                      <td>${item.name}</td>
                      <td>${item.price}</td>
                      <td>
                        <Form.Select
                          style={{
                            border: "none",
                            boxShadow: "none",
                            textAlign: "center",
                            backgroundColor: "transparent",
                          }}
                          defaultValue={item.qty}
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>${item.price * item.qty}</td>
                      <td>
                        <Button variant="outline-none" size="sm">
                          <FaTrash style={{ color: "#164C0D" }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CartPage;
