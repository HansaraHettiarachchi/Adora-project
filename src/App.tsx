import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './comp/Header';
import { Container } from 'react-bootstrap';
import Footer from './comp/Footer';

// const protectedRoutes = [
//   // { path: "/user-profile", element: <AdminPannel /> },
//   // { path: "/user-payments", element: <AdminPannel /> },
//   // { path: "/all-users", element: <AdminPannel /> },
//   // { path: "/all-memberships", element: <AdminPannel /> },
//   // { path: "/payment-success", element: <PaymentSuccess /> },
// ];

const opneRoutes = [
  { path: "/", element: <Home /> },
  { path: "*", element: <Home /> },

];


function App() {

  return (
    // <Routes>
    //   {opneRoutes.map((route) => (
    //     <Route path={route.path} element={route.element}></Route>
    //   ))
    //   }
    //   {/* {protectedRoutes.map((route) => (
    //     <Route path={route.path} element={<Auth>{route.element}</Auth>}></Route>
    //   ))} */}
    // </Routes>

    <>
      <Header />

      <Container className="my-5">
        <h1 className="text-success">Welcome to Adora Flower Shop</h1>
        <p>Explore our collection of beautiful flowers for any occasion.</p>
      </Container>

      <Footer />
    </>
  );
}

export default App
