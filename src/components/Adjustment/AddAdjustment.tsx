import React from "react";
import { Card, Form, Table, Button, Image } from "react-bootstrap";
import { FaTimes, FaTrash } from "react-icons/fa";
import "/src/pages/css/ProductAdjustmentPage.css";

interface Product {
  id: number;
  name: string;
  image: string;
  quantity: number;
}

interface AddAdjustmentProps {
  products: Product[];
  onBack: () => void;
}

const AddAdjustment: React.FC<AddAdjustmentProps> = ({ products, onBack }) => {
  return (
    <Card
      className="p-4 position-relative shadow-sm"
      style={{
        background: "#D6EBD1",
        borderRadius: "20px",
        border: "none",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <FaTimes
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          cursor: "pointer",
          fontSize: "1.2rem",
        }}
        onClick={onBack}
      />

      <h4 className="fw-bold text-center mb-4" style={{ color: "#39A108" }}>
        ADD ADJUSTMENT
      </h4>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <Form.Select
          className="custom-placeholder"
          style={{
            width: "200px",
            borderRadius: "20px",
            border: "none",
            padding: "6px",
          }}
        >
          <option>Category</option>
        </Form.Select>

        <Form.Control
          type="text"
          className="custom-placeholder"
          placeholder="Search By Product Name"
          style={{
            width: "540px",
            borderRadius: "20px",
            border: "none",
            padding: "6px",
          }}
        />
      </div>

      <h6 className="fw-bold" style={{ color: "#164C0D" }}>
        Products
      </h6>

      <Table
        responsive
        className="align-middle"
        style={{
          border: "none",
          borderSpacing: "0 10px",
          borderCollapse: "separate",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#e2f2e2" }}>
          <tr>
            <th
              style={{
                border: "none",
                color: "#164C0D",
                borderTopLeftRadius: "10px",
                padding: "8px 10px",
              }}
            >
              Name
            </th>
            <th style={{ border: "none", color: "#164C0D" }}>Quantity</th>
            <th style={{ border: "none", color: "#164C0D" }}>Price</th>
            <th style={{ border: "none", color: "#164C0D" }}>Type</th>
            <th style={{ border: "none", color: "#164C0D" }}>Total</th>
            <th
              style={{
                border: "none",
                color: "#164C0D",
                borderTopRightRadius: "10px", // top-right rounded
                padding: "8px 10px",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, idx) => {
            const isLast = idx === products.length - 1;
            return (
              <tr
                key={item.id}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#fff" : "#f8fdf8",
                }}
              >
                <td
                  style={{
                    border: "none",
                    padding: "8px 10px",
                    borderBottomLeftRadius: isLast ? "10px" : "0",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={item.image}
                      roundedCircle
                      width={35}
                      height={35}
                      className="me-2"
                    />
                    {item.name}
                  </div>
                </td>
                <td style={{ border: "none", padding: "8px 10px" }}>
                  <Form.Control
                    type="number"
                    defaultValue={item.quantity}
                    style={{
                      width: "80px",
                      borderRadius: "10px",
                      padding: "8px 10px",
                    }}
                  />
                </td>
                <td style={{ border: "none", padding: "8px 10px" }}>
                  <Form.Control
                    type="number"
                    defaultValue={0}
                    style={{
                      width: "80px",
                      borderRadius: "10px",
                      padding: "8px 10px",
                    }}
                  />
                </td>
                <td style={{ border: "none", padding: "8px 10px" }}>
                  <Form.Select
                    defaultValue="Type A"
                    style={{
                      width: "120px",
                      borderRadius: "10px",
                      padding: "8px 10px",
                    }}
                  >
                    <option>Type</option>
                    <option>Type</option>
                    <option>Type</option>
                  </Form.Select>
                </td>
                <td style={{ border: "none", padding: "8px 10px" }}>
                  <Form.Control
                    type="number"
                    defaultValue={0}
                    disabled
                    style={{
                      width: "80px",
                      borderRadius: "10px",
                      padding: "8px 10px",
                    }}
                  />
                </td>
                <td
                  style={{
                    border: "none",
                    padding: "8px 10px",
                    borderBottomRightRadius: isLast ? "10px" : "0",
                  }}
                >
                  <Button variant="link" className="p-0 text-success">
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Description"
        className="mb-3"
        style={{
          background: "#b8ebb8",
          borderRadius: "20px",
          border: "none",
          padding: "10px",
        }}
      />

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <Form.Control
          type="text"
          placeholder="Cost"
          className="mb-3"
          style={{ width: "240px", borderRadius: "20px", padding: "6px" }}
        />
        <Button
          className="mb-3"
          style={{
            fontWeight: "bold",
            background: "#164C0D",
            width: "140px",
            borderRadius: "20px",
            border: "none",
            padding: "6px",
          }}
        >
          Save
        </Button>
      </div>
    </Card>
  );
};

export default AddAdjustment;
