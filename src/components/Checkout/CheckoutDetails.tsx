// components/checkout/CheckoutDetails.tsx
import React from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import "/src/pages/css/CheckoutDetails.css";




export default function CheckoutDetails() {
  return (
    <>
    <Card className="p-5 border-0 my-4" style={{ backgroundColor: "#EFECEC"}}>
      <Form className="checkout-form">
        {/* First Name / Last Name */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="James" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Von" />
            </Form.Group>
          </Col>
        </Row>

        {/* Street Address */}
        <Form.Group className="mb-3" controlId="streetAddress">
          <Form.Label>Street address</Form.Label>
          <Form.Control type="text" placeholder="1234 Elm Street" className="mb-2" />
          <Form.Control type="text" placeholder="Apt 56B" />
        </Form.Group>

        {/* City */}
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>Town / City</Form.Label>
          <Form.Control type="text" placeholder="Brooklyn" />
        </Form.Group>

        {/* Zip Code*/}
        <Form.Group className="mb-3" controlId="zip">
          <Form.Label>Postcode / Zip</Form.Label>
          <Form.Control type="text" placeholder="236748" />
        </Form.Group>

        {/* Phone Number*/}
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="076 235 6789" />
        </Form.Group>

        {/* Email Address */}
        <Form.Group className="mb-4" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="abc@gmail.com" />
        </Form.Group>

        {/* Order Button */}
        <Button
          type="submit"
          style={{
            backgroundColor: "#164C0D",
            border: "none",
            borderRadius: "10px",
            padding: "10px 0",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          ORDER
        </Button>
      </Form>
    </Card>
    </>
    
    
  );
}
