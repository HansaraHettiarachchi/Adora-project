import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Contact from './pages/Contact';
import Home from './pages/Home';
import User from './pages/User';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminBody from './components/admin/AdminBody';
import Dashboard from './pages/Admin/Dashboard';
import Orders from './pages/Admin/Orders';
import Products from './pages/Admin/Products';
import Customers from './pages/Admin/Customers';
import Comments from './pages/Admin/Comments';
import ResetPasswords from './pages/Admin/ResetPasswords';
import Wishlist from './pages/Wishlist';
import Shop from './pages/Shop';
import OrderComplete from './pages/OrderComplete';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/user" element={<User />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout-details" element={<Checkout />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/OrderComplete" element={<OrderComplete />} />

        {/* Admin section nested routing */}
        {/* Admin section nested routing */}
        <Route path="/admin" element={<AdminBody />}>
          {/* <Route index element={<Navigate to="dashboard" replace />} />  */}
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
