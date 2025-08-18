import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import '../../index.css';

const SideBar: React.FC = () => {
  // Helper to combine classes for NavLink
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    "nav-link" + (isActive ? " active fw-bold text-success" : "");

  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#d7ead5",
        minHeight: "100vh",
        padding: "20px 10px",
      }}
    >
      <div className="mb-4 text-center">
        <img
          src={logo}
          alt="Adora Logo"
          style={{ height: 100, objectFit: "contain", cursor: "pointer" }}
          onClick={() => (window.location.href = "/admin/dashboard")}
        />
      </div>
      <h4 style={{ marginTop: 8, color: "#198754", fontWeight: "bold", textAlign: "center", marginBottom: "30px" }}> ADORA </h4>
      <nav className="nav flex-column gap-2 justify-content-center align-items-center">
        <NavLink to="dashboard" className={getNavLinkClass} style={{ color: 'green' }} end>
          Dashboard
        </NavLink>
        <NavLink to="orders" className={getNavLinkClass} style={{ color: 'green' }}>
          Orders
        </NavLink>
        <NavLink to="products" className={getNavLinkClass} style={{ color: 'green' }}>
          Products
        </NavLink>
        <NavLink to="customers" className={getNavLinkClass} style={{ color: 'green' }}>
          Customers
        </NavLink>
        <NavLink to="comments" className={getNavLinkClass} style={{ color: 'green' }}>
          Comments
        </NavLink>
         <NavLink to="stocks" className={getNavLinkClass} style={{ color: 'green' }}>
          Stocks
        </NavLink>
        <NavLink to="reset-passwords" className={getNavLinkClass} style={{ color: 'green' }}>
          Reset Password
        </NavLink>
        <a onClick={() => navigate("/")} className="nav-link text-danger">
          Logout
        </a>
      </nav>
    </div>
  );
};

export default SideBar;
