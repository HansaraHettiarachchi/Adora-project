import React, { useState } from "react";
import { Button } from "react-bootstrap";
import s_image from "../../assets/images/User-Images/snakeplant.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const OrdersList: React.FC = () => {
  const orders = [
    {
      id: 1,
      name: "SNAKE PLANT",
      category: "Cactus",
      price: 149,
      status: "Done",
      date: "15 Aug 2025",
      orderNo: "#26953",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
    {
      id: 2,
      name: "PEACE LILY",
      category: "Flower",
      price: 129,
      status: "Processing",
      date: "14 Aug 2025",
      orderNo: "#26954",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
    {
      id: 3,
      name: "ALOE VERA",
      category: "Succulent",
      price: 79,
      status: "Done",
      date: "13 Aug 2025",
      orderNo: "#26955",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
    {
      id: 4,
      name: "MONSTERA",
      category: "Tropical",
      price: 199,
      status: "Processing",
      date: "12 Aug 2025",
      orderNo: "#26956",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
    {
      id: 5,
      name: "FIDDLE LEAF",
      category: "Tropical",
      price: 179,
      status: "Done",
      date: "11 Aug 2025",
      orderNo: "#26957",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
    {
      id: 6,
      name: "GOLDEN POTHOS",
      category: "Vine",
      price: 129,
      status: "Processing",
      date: "10 Aug 2025",
      orderNo: "#26958",
      paymentAddress: "48, SRI WAIJIRAGANA MAWATHA, DEMATAGOYA ROAD, MARADANA.",
      image: s_image,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentOrders = orders.slice(
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
      {currentOrders.map((order) => (
        <div
          key={order.id}
          style={{
            display: "flex",
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
            src={order.image}
            alt={order.name}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <div style={{ flex: 1 }}>
            <h5 style={{ margin: 0, fontWeight: 700 }}>{order.name}</h5>
            <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#555" }}>
              {order.category}
            </p>
            <p style={{ fontWeight: 700, margin: "0 0 8px 0" }}>
              ${order.price}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "6px",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outline-danger"
                size="sm"
                style={{
                  fontWeight: 600,
                  height: "30px",
                  fontSize: "13px",
                  width: "100px",
                }}
              >
                Cancel
              </Button>
              <Button
                variant={order.status === "Done" ? "success" : "warning"}
                size="sm"
                style={{
                  fontWeight: "600",
                  height: "30px",
                  fontSize: "13px",
                  color: "#fff",
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {order.status === "Done" ? (
                  <>
                    Done{" "}
                    <IoCheckmarkDoneCircleOutline
                      style={{ marginLeft: "5px" }}
                    />
                  </>
                ) : (
                  <>
                    Processing{" "}
                    <AiOutlineLoading3Quarters
                      style={{
                        marginLeft: "5px",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  </>
                )}
              </Button>
            </div>
            <div style={{ marginTop: "4px" }}>
              <p style={{ margin: 0, fontSize: "13px" }}>
                <strong>Order Date:</strong> {order.date} |{" "}
                <strong>Order No.:</strong> {order.orderNo}
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#555" }}>
                <strong>Payment Address:</strong> {order.paymentAddress}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
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

export default OrdersList;
