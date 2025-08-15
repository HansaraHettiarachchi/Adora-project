import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Spinner, Badge } from "react-bootstrap";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

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
    setTimeout(() => {
      setStats({
        totalRevenue: 12500,
        totalOrders: 320,
        newCustomers: 72,
        lowStockPlants: 5,
      });
      setLoading(false);
    }, 800);
  }, []);


  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [2000, 3000, 2500, 4000, 5000, 4500],
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // pie chart
  const categoryData = {
  labels: ["Roses", "Tulips", "Orchids", "Bouquets", "Succulents"],
  datasets: [
    {
      data: [1200, 900, 750, 500, 350], 
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#90EE90", "#BA55D3"],
      hoverBackgroundColor: ["#FF4F70", "#2C91D1", "#E6B800", "#77DD77", "#9932CC"],
    },
  ],
};


  const recentOrders = [
    { id: 101, customer: "John Doe", product: "Rose Bouquet", date: "2025-08-10", status: "Delivered" },
    { id: 102, customer: "Jane Smith", product: "Aloe Vera", date: "2025-08-09", status: "Pending" },
    { id: 103, customer: "Mark Lee", product: "Cactus", date: "2025-08-08", status: "Shipped" },
    { id: 104, customer: "Alice Johnson", product: "Orchid Plant", date: "2025-08-07", status: "Delivered" },
  ];

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="text-white shadow-sm" style={{ background: "linear-gradient(135deg, #81c784, #66bb6a)" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>${stats?.totalRevenue.toLocaleString()}</h3>
                  <p>Total Revenue</p>
                </div>
                <i className="fas fa-dollar-sign fa-3x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white shadow-sm" style={{ background: "linear-gradient(135deg, #FFB6C1, #FF69B4)" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>{stats?.totalOrders}</h3>
                  <p>Total Orders</p>
                </div>
                <i className="fas fa-shopping-cart fa-3x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white shadow-sm" style={{ background: "linear-gradient(135deg, #FFD700, #FFC107)" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>{stats?.newCustomers}</h3>
                  <p>New Customers</p>
                </div>
                <i className="fas fa-users fa-3x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white shadow-sm" style={{ background: "linear-gradient(135deg, #90EE90, #32CD32)" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>{stats?.lowStockPlants}</h3>
                  <p>Low Stock Plants</p>
                </div>
                <i className="fas fa-seedling fa-3x"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      
      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>Sales Overview</Card.Title>
              <Line data={salesData} />
            </Card.Body>
          </Card>
        </Col>
       <Col md={4}>
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Card.Title className="text-center">Sales by Product Category</Card.Title>
            <Doughnut data={categoryData} />
          </Card.Body>
        </Card>
      </Col>
    </Row>

      
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Recent Orders</Card.Title>
          <Table bordered hover responsive className="mt-3">
            <thead className="table-success">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.date}</td>
                  <td>
                    <Badge
                      bg={
                        order.status === "Delivered"
                          ? "success"
                          : order.status === "Pending"
                          ? "warning"
                          : "primary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
