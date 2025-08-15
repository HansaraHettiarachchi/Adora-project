import React from "react";
import { Bs1Circle, Bs2Circle, Bs3Circle } from "react-icons/bs";
import { MdOutlineArrowRightAlt } from "react-icons/md";

interface CheckoutHeaderProps {
  isStep2Complete?: boolean;
}

export default function CheckoutHeader({
  isStep2Complete,
}: CheckoutHeaderProps) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center my-5">
      <p style={{ color: "#23B540" }}>
        <Bs1Circle size={20} color="#164C0D" className="me-2" /> Shipping Cart
      </p>

      <p>
        <MdOutlineArrowRightAlt
          style={{ color: isStep2Complete ? "#164C0D" : "#A6A3A3" }}
          size={25}
        />
      </p>

      <p style={{ color: isStep2Complete ? "#23B540" : "#A6A3A3" }}>
        <Bs2Circle
          size={20}
          color={isStep2Complete ? "#164C0D" : "#A6A3A3"}
          className="me-2"
        />
        Checkout Details
      </p>

      <p>
        <MdOutlineArrowRightAlt style={{ color: "#A6A3A3" }} size={25} />
      </p>

      <p style={{ color: "#A6A3A3" }}>
        <Bs3Circle size={20} color="#A6A3A3" className="me-2" /> Order Complete
      </p>
    </div>
  );
}
