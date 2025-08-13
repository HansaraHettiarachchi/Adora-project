import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";

const statKeys = [
  "Total Revenue",
  "Total Orders",
  "New Customers",
  "Low Stock Plants",
];

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  newCustomers: number;
  lowStockPlants: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching stats from backend
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Replace with your API call
        // const response = await fetch('your-api-url');
        // const data = await response.json();

        // Simulated data,
        const data: Stats = {
          totalRevenue: 12345,
          totalOrders: 567,
          newCustomers: 89,
          lowStockPlants: 4,
        };

        setStats(data);
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center text-danger">Failed to load stats.</div>;
  }

  return (
    <Row className="mb-4">
      <Col md={3}>
        <Card className="text-center border-success">
          <Card.Body>
            <Card.Title className="fw-bold">Total Revenue</Card.Title>
            <h3>${stats.totalRevenue.toLocaleString()}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center border-success">
          <Card.Body>
            <Card.Title className="fw-bold">Total Orders</Card.Title>
            <h3>{stats.totalOrders}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center border-success">
          <Card.Body>
            <Card.Title className="fw-bold">New Customers</Card.Title>
            <h3>{stats.newCustomers}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center border-success">
          <Card.Body>
            <Card.Title className="fw-bold">Low Stock Plants</Card.Title>
            <h3>{stats.lowStockPlants}</h3>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
