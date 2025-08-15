import React, { useState, useEffect } from "react";
import { Card, Form, Button, Table, Spinner, Alert } from "react-bootstrap";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

interface Customer {
  id: string;
  name: string;
  email: string;
  contact: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Customer>>({});

  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoading(true);
        setError(null);

        const data: Customer[] = [
          {
            id: "CI001",
            name: "Atheef Salam",
            email: "atheefsalam@gmail.com",
            contact: "+94 729883619",
          },
          {
            id: "CI002",
            name: "Mohamed Mukarram",
            email: "mukarram123@gmail.com",
            contact: "+94 765974585",
          },
          {
            id: "CI003",
            name: "Hansara Hettiyarachchi",
            email: "hansara256@gmail.com",
            contact: "+94 766336412",
          },
          {
            id: "CI004",
            name: "Nipuni Navindya",
            email: "nipuni789@gmail.com",
            contact: "+94 759638465",
          },
          {
            id: "CI005",
            name: "Dulanka Nimsara",
            email: "dulanka456@gmail.com",
            contact: "+94 719634528",
          },
        ];

        setCustomers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditId(customer.id);
    setEditForm({ ...customer });
  };

  const handleSave = () => {
    if (editId && editForm.name && editForm.email && editForm.contact) {
      setCustomers((prev) =>
        prev.map((cust) =>
          cust.id === editId ? { ...cust, ...editForm } : cust
        )
      );
      setEditId(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditForm({});
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.contact.includes(search)
  );

  return (
    <div>
      <Card
        className="shadow-sm p-3"
        style={{ borderRadius: "10px ", border: "1px solid #5EAE69" }}
      >
        <Card.Body>
          {/* Heading + Search + Button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold m-0" style={{ color: "#5EAE69" }}>
              Customers
            </h4>
            <div className="d-flex align-items-center gap-2">
              <Form.Control
                type="text"
                placeholder="Search"
                style={{
                  width: "200px",
                  borderRadius: "10px",
                  border: "1px solid #2BED45",
                  boxShadow: "0 4px 8px rgba(66, 243, 50, 0.1)",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="outline-success"
                className="fw-semibold"
                style={{
                  width: "200px",
                  borderRadius: "10px",
                  color: "#51984A",
                  border: "1px solid #2BED45",
                  boxShadow: "0 4px 8px rgba(66, 243, 50, 0.1)",
                }}
              >
                All Customers
              </Button>
            </div>
          </div>

          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && (
            <div className="table-responsive">
              <Table
                style={{
                  border: "1px solid #2BED45",
                  borderRadius: "10px",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  width: "100%",
                  padding: "1rem",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        color: "#095C1F",
                        borderBottom: "1px solid #2BED45",
                      }}
                    >
                      Customer ID
                    </th>
                    <th
                      style={{
                        color: "#095C1F",
                        borderBottom: "1px solid #2BED45",
                      }}
                    >
                      Customer Name
                    </th>
                    <th
                      style={{
                        color: "#095C1F",
                        borderBottom: "1px solid #2BED45",
                      }}
                    >
                      Email
                    </th>
                    <th
                      style={{
                        color: "#095C1F",
                        borderBottom: "1px solid #2BED45",
                      }}
                    >
                      Contact No.
                    </th>
                    <th
                      style={{
                        color: "#095C1F",
                        borderBottom: "1px solid #2BED45",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        No customers found.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td
                          style={{
                            fontWeight: "bold",
                            borderBottom: "1px solid black",
                            padding: "8px",
                          }}
                        >
                          {customer.id}
                        </td>

                        {editId === customer.id ? (
                          <>
                            <td
                              style={{
                                borderBottom: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              <Form.Control
                                type="text"
                                value={editForm.name || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              <Form.Control
                                type="email"
                                value={editForm.email || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              <Form.Control
                                type="text"
                                value={editForm.contact || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    contact: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td
                              className="d-flex gap-2"
                              style={{
                                borderBottom: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={handleSave}
                              >
                                <FaSave />
                              </Button>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={handleCancel}
                              >
                                <FaTimes />
                              </Button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td
                              style={{
                                borderBottom: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {customer.name}
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {customer.email}
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {customer.contact}
                            </td>
                            <td
                              className="d-flex gap-2"
                              style={{
                                borderBottom: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => handleEdit(customer)}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(customer.id)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          <div
            className="p-2 d-flex flex-column flex-sm-row justify-content-center align-items-center mt-3 gap-2"
            style={{
              border: "1px solid #51984A",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <Button
              variant="outline-none"
              size="sm"
              className="fw-bold"
              style={{ color: "#51984A" }}
            >
              Previous
            </Button>
            <span className="fw-bold" style={{ color: "#51984A" }}>
              | 1 | 2 | 3 | 4 | 5 |...
            </span>
            <Button
              variant="outline-none"
              size="sm"
              className="fw-bold"
              style={{ color: "#51984A" }}
            >
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Customers;
