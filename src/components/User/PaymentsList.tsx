import React, { useState } from "react";
import { Button } from "react-bootstrap";
import s_image from "../../assets/images/User-Images/snakeplant.png";
const PaymentsList: React.FC = () => {
  const payments = [
    {
      id: 1,
      name: "Golden Pothos",
      method: "Visa",
      date: "14-Aug-2025",
      time: "18:30",
      amount: 129,
      image: s_image,
    },
    {
      id: 2,
      name: "Snake Plant",
      method: "MasterCard",
      date: "13-Aug-2025",
      time: "15:00",
      amount: 149,
      image: s_image,
    },
    {
      id: 3,
      name: "Peace Lily",
      method: "Visa",
      date: "12-Aug-2025",
      time: "12:30",
      amount: 99,
      image: s_image,
    },
    {
      id: 4,
      name: "Aloe Vera",
      method: "MasterCard",
      date: "11-Aug-2025",
      time: "10:00",
      amount: 79,
      image: s_image,
    },
    {
      id: 5,
      name: "Fiddle Leaf",
      method: "Visa",
      date: "10-Aug-2025",
      time: "09:30",
      amount: 199,
      image: s_image,
    },
    {
      id: 6,
      name: "Monstera",
      method: "MasterCard",
      date: "09-Aug-2025",
      time: "14:00",
      amount: 149,
      image: s_image,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const currentPayments = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
    >
      {currentPayments.map((payment) => (
        <div
          key={payment.id}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            background: "#E8F5E9",
            borderRadius: "10px",
            padding: "10px",
            gap: "15px",
            border: "1px solid #d0e6d0",
            flexWrap: "wrap",
          }}
        >
          <img
            src={payment.image}
            alt={payment.name}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: "150px" }}>
            <h5 style={{ margin: "0", fontWeight: "700", fontSize: "16px" }}>
              {payment.name}
            </h5>
            <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#555" }}>
              Payment Via: {payment.method}
            </p>
            <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#555" }}>
              Date: {payment.date}
            </p>
            <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#555" }}>
              Time: {payment.time}
            </p>
            <p
              style={{
                fontWeight: "700",
                margin: "0 0 8px 0",
                fontSize: "16px",
              }}
            >
              ${payment.amount}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outline-success"
              size="sm"
              style={{
                fontWeight: "600",
                height: "30px",
                fontSize: "13px",
                flex: "1 0 48%",
              }}
            >
              VIEW
            </Button>
            <Button
              variant="success"
              size="sm"
              style={{
                fontWeight: "600",
                height: "30px",
                fontSize: "13px",
                color: "#fff",
                flex: "1 0 48%",
              }}
            >
              DOWNLOAD
            </Button>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </Button>
        <span style={{ alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentsList;
