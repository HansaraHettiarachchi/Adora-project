import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { PiNumberCircleOneLight } from "react-icons/pi";
import { PiNumberCircleTwoLight } from "react-icons/pi";
import { PiNumberCircleThreeLight } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";

const CartPage = () => {
  return (
    <>
      <Header />

      {/* Cart Section */}
      <section style={{ backgroundColor: "#faf9f9ff", padding: "2rem 0" }}>
        <Container>
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
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CartPage;
