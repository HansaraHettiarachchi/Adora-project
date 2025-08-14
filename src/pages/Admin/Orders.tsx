import React, { useState, useEffect } from "react";
import { Card, Table, Form, Spinner, Alert, Badge } from "react-bootstrap";

interface Order {
  id: number;
  customerName: string;
  address: string;
  contact: string;
  products: string;
  payment: string;
  total: string;
  date: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Orders");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        // ---- Dummy Data for UI preview ----
        const data: Order[] = [
          {
            id: 101,
            customerName: "John Doe",
            address: "123 Main St, City",
            contact: "+1 234567890",
            products: "Snake Plant, Aloe Vera",
            payment: "Paid",
            total: "$45",
            date: "2025-08-14",
          },
          {
            id: 102,
            customerName: "Jane Smith",
            address: "456 Elm St, City",
            contact: "+1 987654321",
            products: "Peace Lily",
            payment: "Pending",
            total: "$20",
            date: "2025-08-14",
          },
          {
            id: 103,
            customerName: "Alice Johnson",
            address: "789 Oak St, City",
            contact: "+1 123456789",
            products: "Bonsai Tree, Aloe Vera",
            payment: "Paid",
            total: "$60",
            date: "2025-08-13",
          },
        ];

        setOrders(data);

        // ---- Uncomment below for backend API ----
        // const response = await fetch("https://your-backend-api.com/orders");
        // if (!response.ok) throw new Error("Failed to fetch orders");
        // const data: Order[] = await response.json();
        // setOrders(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "All Orders") return matchesSearch;

    const orderDate = new Date(order.date);
    const now = new Date();

    switch (filter) {
      case "Today":
        return matchesSearch && orderDate.toDateString() === now.toDateString();
      case "This Week":
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return matchesSearch && orderDate >= weekStart && orderDate <= weekEnd;
      case "This Month":
        return (
          matchesSearch &&
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      default:
        return matchesSearch;
    }
  });

  return (
    <Card className="shadow-sm p-3" style={{ borderRadius: "10px", border: "1px solid #5EAE69" }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Control
            type="text"
            placeholder="Search by customer name"
            style={{
              width: "210px",
              borderRadius: "10px",
              border: "1px solid #2BED45",
              boxShadow: "0 4px 8px rgba(66, 243, 50, 0.1)",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Form.Select
            style={{
              width: "150px",
              borderRadius: "10px",
              border: "1px solid #2BED45",
              boxShadow: "0 4px 8px rgba(66, 243, 50, 0.1)",
            }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All Orders</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </Form.Select>
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
                  <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Order ID</th>
                  <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Customer Name</th>
                  <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Address</th>
                  <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Contact</th>
                  <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Products</th>
                  <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Payment</th>
                  <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "8px" }}>
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{order.id}</td>
                      <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{order.customerName}</td>
                      <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{order.address}</td>
                      <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{order.contact}</td>
                      <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{order.products}</td>
                      <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center"}}>
                        {order.payment.toLowerCase() === "paid" ? (
                          <Badge bg="success">Paid</Badge>
                        ) : (
                          <Badge bg="danger">{order.payment}</Badge>
                        )}
                      </td>
                      <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{order.total}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        )}

        <div className="p-2 d-flex flex-column flex-sm-row justify-content-center align-items-center mt-3 gap-2"
          style={{
            border: "1px solid #51984A",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <button style={{ background: "none", border: "none", color: "#51984A", fontWeight: "bold" }}>Previous</button>
          <span style={{ color: "#51984A", fontWeight: "bold" }}>| 1 | 2 | 3 | 4 | 5 |...</span>
          <button style={{ background: "none", border: "none", color: "#51984A", fontWeight: "bold" }}>Next</button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Orders;
