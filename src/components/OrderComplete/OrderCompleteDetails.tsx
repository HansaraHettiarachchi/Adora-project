import React from "react";
import { Card, Row, Col, Table, Button, Image } from "react-bootstrap";

export default function OrderCompleteDetails() {
  return (
    <Card className="p-5 border border-secondary my-4">
      <h5 className="fw-bold my-3">Order #26953</h5>
      <h6 className="fw-bold">Thank You for Your Purchase!</h6>
      <p>Thanks for shopping with us.</p>
      <p>
        We’ve received your order and we’re already getting started on it.
        You’ll get an email soon with all the details.
      </p>
      <Row className="my-3">
        <Col md={6}>
          <strong>Order Number:</strong> 26953
        </Col>
        <Col md={6}>
          <strong>Order Date:</strong> 15 Aug 2025
        </Col>
      </Row>
      <div className="my-3">
        <strong>Shipping Address:</strong>
        <p className="mb-3">
          48, SRI WAJIRADANA MAWATHA, <br />
          MABARATAGA ROAD, <br />
          MARAWILA
        </p>
      </div>
      {/* Items Table */}
      <Table responsive bordered className="align-middle border">
        <thead>
          <tr>
            <th>Items</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="d-flex align-items-center">
              <Image
                src="/src/assets/images/Order_Complete_pic.png"
                alt="Golden Pothos"
                className="me-2"
                rounded
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <div>
                <div className="fw-bold">Golden Pothos</div>
                <small className="text-muted">Pothos</small>
                <p className="text-muted">$258</p>
              </div>
            </td>
            <td>2</td>
            <td>$258</td>
          </tr>
        </tbody>
      </Table>
      {/* Summary */}
      <Row className="justify-content-end">
        <Col xs={8} md={3}>
          <Table borderless size="sm" className="text-end">
            <tbody>
              <tr>
                <td>Items Total</td>
                <td>$516</td>
              </tr>
              <tr>
                <td>Dicount</td>
                <td>$0</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>$25</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>$5</td>
              </tr>
              <tr className="fw-bold border-top">
                <td>Total</td>
                <td>$573</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <div className="text-start">
        <Button
          variant="outline-none"
          style={{
            backgroundColor: "#164C0D",
            color: "white",
            fontWeight: "500",
            fontSize: "1rem",
          }}
        >
          Share
        </Button>
      </div>
    </Card>
  );
}
