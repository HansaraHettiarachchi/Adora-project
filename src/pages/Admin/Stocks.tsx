import React, { useState } from "react";
import { Table, Badge, Card } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  quantity: number;
  batch?: string;
  price?: number;
}

const mockProducts: Product[] = [
  { id: "P001", name: "Roses", quantity: 150, batch: "R1", price: 120 },
  { id: "P002", name: "Tulips", quantity: 80, batch: "T1", price: 100 },
  { id: "P003", name: "Lilies", quantity: 60, batch: "L1", price: 90 },
];

const Stocks: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const getQuantityBadge = (qty: number) => {
    if (qty > 100) return <Badge bg="success">{qty}</Badge>;
    if (qty > 50) return <Badge bg="warning">{qty}</Badge>;
    return <Badge bg="danger">{qty}</Badge>;
  };

  return (
    <div className="p-4">
      <Card className="shadow-sm" style={{ borderRadius: "12px" }}>
        <Card.Body>
          <h4 style={{ color: "#2E7D32", marginBottom: "20px" }}>Stock Overview</h4>
          <Table hover responsive style={{ borderRadius: "12px" }}>
            <thead style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
              <tr>
                <th>Product Name</th>
                <th className="text-center">Quantity</th>
                <th style={{ width: "50px" }}></th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <React.Fragment key={product.id}>
                  {/* Main Row */}
                  <tr
                    style={{
                      fontWeight: 600,
                      cursor: "pointer",
                      backgroundColor: "#F1F8F2",
                    }}
                    onClick={() => toggleRow(product.id)}
                  >
                    <td>{product.name}</td>
                    <td className="text-center">{getQuantityBadge(product.quantity)}</td>
                    <td className="text-center">
                      {expandedRows.includes(product.id) ? <FaChevronUp /> : <FaChevronDown />}
                    </td>
                  </tr>

                  {/* Sub-row: details displayed as rows */}
                  {expandedRows.includes(product.id) && (
                    <tr>
                      <td colSpan={3} style={{ padding: "12px" }}>
                        <div
                          style={{
                            backgroundColor: "#F0FFF4",
                            borderRadius: "8px",
                            padding: "12px 20px",
                          }}
                        >
                          <div style={{ marginBottom: "8px" }}>
                            <strong>Current Quantity:</strong> {getQuantityBadge(product.quantity)}
                          </div>
                          <div style={{ marginBottom: "8px" }}>
                            <strong>Batch:</strong> {product.batch || "-"}
                          </div>
                          <div style={{ marginBottom: "8px" }}>
                            <strong>Price:</strong> ${product.price || "-"}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Stocks;
