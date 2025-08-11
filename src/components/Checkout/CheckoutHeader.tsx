import React from "react";
import { Bs1Circle, Bs2Circle, Bs3Circle } from "react-icons/bs";
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function CheckoutHeader() {
  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center my-5">
        <p style={{ color: "#23B540" }}>
          <Bs1Circle size={20} color="#164C0D" className="me-2" /> Shipping Cart
        </p>
        <p>
          <MdOutlineArrowRightAlt style={{ color: "" }} />
        </p>
        <p style={{ color: "#23B540" }}>
          <Bs2Circle size={20} color="#164C0D" className="me-2" /> Checkout
          Details
        </p>
        <p>
          <MdOutlineArrowRightAlt style={{ color: "#A6A3A3" }} />
        </p>
        <p style={{ color: "#A6A3A3" }}>
          <Bs3Circle size={20} color="#A6A3A3" className="me-2" /> Order
          Complete
        </p>
      </div>
    </>
  );
}
