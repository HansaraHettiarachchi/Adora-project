import React, { forwardRef } from "react";
import { Button, Form } from "react-bootstrap";

type PaymentFormProps = {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  expiry: string;
  setExpiry: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const PaymentForm = forwardRef<HTMLDivElement, PaymentFormProps>(
  (
    { cardNumber, setCardNumber, expiry, setExpiry, cvv, setCvv, onSubmit },
    ref
  ) => {
    return (
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
          ref={ref}
          className="bg-white border rounded shadow-sm"
          style={{ padding: "20px", width: "320px" }}
        >
          <Form onSubmit={onSubmit}>
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
    );
  }
);

export default PaymentForm;
