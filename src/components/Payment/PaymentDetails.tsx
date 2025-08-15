import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const PaymentDetails: React.FC = () => {
  return (
    <Container style={{ maxWidth: "700px" }}>
      <div
        style={{ background: "#EFECEC", padding: "30px", borderRadius: "8px" }}
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Card number</Form.Label>
            <Form.Control
              className="custom-placeholder"
              type="text"
              placeholder="Card Number"
            />
          </Form.Group>

          <Row>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Expiration Month</Form.Label>
                <Form.Select>
                  <option>Month</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Expiration Year</Form.Label>
                <Form.Select>
                  <option>Year</option>
                  <option>2025</option>
                  <option>2026</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  className="custom-placeholder"
                  type="text"
                  placeholder="3-4 digit code"
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            variant="success"
            type="submit"
            className="w-100"
            style={{
              backgroundColor: "#164C0D",
              border: "none",
              fontWeight: "bold",
            }}
          >
            PAY
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default PaymentDetails;
