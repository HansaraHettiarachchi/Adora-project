import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminBody from "./components/admin/AdminBody";
import Dashboard from "./pages/Admin/Dashboard";
import Orders from "./pages/Admin/Orders";
import Products from "./pages/Admin/Products";
import Customers from "./pages/Admin/Customers";
import Comments from "./pages/Admin/Comments";
import ResetPasswords from "./pages/Admin/ResetPasswords";
import Wishlist from "./pages/Wishlist";
import Shop from "./pages/Shop";
import Payment from "./pages/Payment";
import OrderComplete from "./pages/OrderComplete";
import ProductAdjustmentPage from "./pages/ProductAdjustmentPage";
import Auth from "./auth/Auth";

const App: React.FC = () => {
  return (
    <Router basename="/F5-ecommece-pure-p-1">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Auth><Shop /></Auth>} />
        <Route path="/user" element={<Auth><User /></Auth>} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout-details" element={<Checkout />} />
        <Route path="/checkout" element={<Auth><Checkout /></Auth>} />
        <Route path="/Payment" element={<Auth><Payment /></Auth>} />
        <Route path="/OrderComplete" element={<Auth><OrderComplete /></Auth>} />
        <Route path="/ProductAdjustmentPage" element={<ProductAdjustmentPage />} />

        <Route path="/admin" element={<Auth><AdminBody /></Auth>}>
          <Route path="" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="comments" element={<Comments />} />
          <Route path="reset-passwords" element={<ResetPasswords />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
