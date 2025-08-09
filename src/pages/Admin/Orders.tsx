import React, { useState, useEffect } from "react";
import { Card, Table, Form, Spinner, Alert } from "react-bootstrap";

interface Order {
  id: number;
  customerName: string;
  address: string;
  contact: string;
  products: string;
  payment: string;
  total: string;
  date: string; // ISO string or date string for filtering
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Orders");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from backend API on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
    
        const response = await fetch("https://your-backend-api.com/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders by search and date filter
  const filteredOrders = orders.filter((order) => {
    // Search filter (customer name)
    const matchesSearch = order.customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    // Date filter
    if (filter === "All Orders") return matchesSearch;

    const orderDate = new Date(order.date);
    const now = new Date();

    switch (filter) {
      case "Today":
        return (
          matchesSearch &&
          orderDate.toDateString() === now.toDateString()
        );
      case "This Week":
        // Calculate week start (Sunday) and compare
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return (
          matchesSearch &&
          orderDate >= weekStart &&
          orderDate <= weekEnd
        );
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
    <Card className="mb-4 border-success">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Control
            type="text"
            placeholder="Search by customer name"
            style={{ width: "210px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Form.Select
            style={{ width: "150px" }}
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
          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Products</th>
                <th>Payment</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.address}</td>
                    <td>{order.contact}</td>
                    <td>{order.products}</td>
                    <td>{order.payment}</td>
                    <td>{order.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        <div className="text-center">1 | 2 | 3 | 4 | 5...</div>
      </Card.Body>
    </Card>
  );
};

export default Orders;
