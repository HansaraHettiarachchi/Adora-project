import React, { useState } from "react";
import { Container, Card, Table, Form, Button, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import ProductAdjustmentHeader from "../components/Adjustment/ProductAdjustmentHeader";
import AddAdjustment from "../components/Adjustment/AddAdjustment";
import "/src/pages/css/ProductAdjustmentPage.css";

const productData = [
  {
    id: 136,
    name: "CANDELABRA ALOE",
    image: "src/assets/images/Product/image.png",
    status: { color: "orange", text: "Losing health, needs care" },
    date: "24/03/2025",
    quantity: 20,
  },
  {
    id: 122,
    name: "HOMALOMENA",
    image: "src/assets/images/Product/image.png",
    status: { color: "green", text: "Fully alive and in perfect condition" },
    date: "24/03/2025",
    quantity: 22,
  },
];

const AddAdjustmentPage = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredProducts = productData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ProductAdjustmentHeader />
      <Container fluid className="p-4">
        {!showForm ? (
          <Card
            className="p-4 position-relative shadow-sm"
            style={{
              background: "#D6EBD1",
              borderRadius: "20px",
              border: "none",
              margin: "0 auto",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap ">
              <Form.Control
                type="text"
                className="custom-placeholder"
                placeholder="Search By Product Name"
                style={{
                  width: "220px",
                  borderRadius: "20px",
                  border: "none",
                  padding: "6px",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                style={{
                  backgroundColor: "#39A108",
                  border: "none",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}
                onClick={() => setShowForm(true)}
              >
                Add Adjustment
              </Button>
            </div>

            <div className="table-responsive">
              <Table
                responsive
                className="align-middle"
                style={{
                  border: "none",
                  borderRadius: "15px",
                  overflow: "hidden",
                  borderSpacing: "0 10px",
                  borderCollapse: "separate",
                }}
              >
                {" "}
                <thead style={{ backgroundColor: "#e2f2e2" }}>
                  {" "}
                  <tr>
                    {" "}
                    <th
                      style={{
                        border: "none",
                        borderTopLeftRadius: "10px",
                        padding: "8px 10px",
                      }}
                    >
                      {" "}
                      #{" "}
                    </th>{" "}
                    <th style={{ border: "none", color: "#164C0D" }}>
                      Image
                    </th>{" "}
                    <th style={{ border: "none", color: "#164C0D" }}>Name</th>{" "}
                    <th style={{ border: "none", color: "#164C0D" }}>Status</th>{" "}
                    <th style={{ border: "none", color: "#164C0D" }}>Date</th>{" "}
                    <th style={{ border: "none", color: "#164C0D" }}>
                      {" "}
                      Quantity{" "}
                    </th>{" "}
                    <th
                      style={{
                        border: "none",
                        borderTopRightRadius: "10px",
                        padding: "8px 10px",
                      }}
                    >
                      {" "}
                      Action{" "}
                    </th>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody>
                  {" "}
                  {filteredProducts.map((item, idx) => {
                    const isLast = idx === filteredProducts.length - 1;
                    return (
                      <tr
                        key={item.id}
                        style={{
                          backgroundColor: idx % 2 === 0 ? "#fff" : "#f8fdf8",
                        }}
                      >
                        {" "}
                        <td
                          style={{
                            border: "none",
                            padding: "8px 10px",
                            borderBottomLeftRadius: isLast ? "10px" : "0",
                          }}
                        >
                          {" "}
                          {item.id}{" "}
                        </td>{" "}
                        <td style={{ border: "none" }}>
                          {" "}
                          <Image
                            src={item.image}
                            roundedCircle
                            width={40}
                            height={40}
                          />{" "}
                        </td>{" "}
                        <td style={{ border: "none" }}>{item.name}</td>{" "}
                        <td style={{ border: "none" }}>
                          {" "}
                          <span
                            style={{
                              width: "12px",
                              height: "12px",
                              backgroundColor: item.status.color,
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "5px",
                            }}
                          ></span>{" "}
                          {item.status.text}{" "}
                        </td>{" "}
                        <td style={{ border: "none" }}>{item.date}</td>{" "}
                        <td style={{ border: "none" }}>{item.quantity}</td>{" "}
                        <td
                          style={{
                            border: "none",
                            borderBottomRightRadius: isLast ? "10px" : "0",
                          }}
                        >
                          {" "}
                          <Button variant="outline-success" size="sm">
                            {" "}
                            <FaEdit />{" "}
                          </Button>{" "}
                        </td>{" "}
                      </tr>
                    );
                  })}{" "}
                </tbody>{" "}
              </Table>
            </div>
          </Card>
        ) : (
          <AddAdjustment
            products={filteredProducts}
            onBack={() => setShowForm(false)}
          />
        )}
      </Container>
    </>
  );
};

export default AddAdjustmentPage;
