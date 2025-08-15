import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const ProductAdjustmentHeader: React.FC = () => {
  return (
    <div className="py-3 px-3 mb-3" style={{ background: "#30911fff" }}>
      <div className="d-flex align-items-center">
        <IoHomeOutline className="text-black me-1 fw-bold" size={15} />

        <MdOutlineKeyboardDoubleArrowRight
          className="text-black me-1 fw-bold"
          size={15}
        />

        <span
          className="text-black me-1 fw-semibold"
          style={{ fontSize: "12px" }}
        >
          Product Adjustment Page
        </span>
      </div>
    </div>
  );
};

export default ProductAdjustmentHeader;
