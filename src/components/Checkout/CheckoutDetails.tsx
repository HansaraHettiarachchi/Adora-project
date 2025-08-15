import React, { useState } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import "/src/pages/css/CheckoutDetails.css";

interface CheckoutDetailsProps {
  onValidationChange: (valid: boolean) => void;
}

export default function CheckoutDetails({
  onValidationChange,
}: CheckoutDetailsProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    city: "",
    zip: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    // Simple validation
    const allFilled = Object.entries(updatedForm).every(
      ([key, val]) => key === "street2" || val.trim() !== ""
    );
    const validEmail = /\S+@\S+\.\S+/.test(updatedForm.email);
    onValidationChange(allFilled && validEmail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submit logic
  };

  return (
    <Card className="p-5 border-0 my-4" style={{ backgroundColor: "#EFECEC" }}>
      <Form className="checkout-form" onSubmit={handleSubmit}>
        {/* First Name / Last Name */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="James"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Von"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Street Address */}
        <Form.Group className="mb-3" controlId="streetAddress">
          <Form.Label>Street address</Form.Label>
          <Form.Control
            type="text"
            placeholder="1234 Elm Street"
            className="mb-2"
            name="street1"
            value={formData.street1}
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Apt 56B"
            name="street2"
            value={formData.street2}
            onChange={handleChange}
          />
        </Form.Group>

        {/* City */}
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>Town / City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Brooklyn"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Zip Code */}
        <Form.Group className="mb-3" controlId="zip">
          <Form.Label>Postcode / Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="236748"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Phone Number */}
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="076 235 6789"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Email Address */}
        <Form.Group className="mb-4" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="abc@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
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
  );
}
