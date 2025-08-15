import React from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderCompleteHeader from "../components/OrderComplete/OrderCompleteHeader";
import OrderCompleteDetails from "../components/OrderComplete/OrderCompleteDetails";
import BreadcrumbBar from '../components/BreadcrumbBar'


export default function OrderComplete() {
  return (
    <>
      <Header />

      <BreadcrumbBar currentPage="Checkout"/>
      <Container className="py-4">
        <OrderCompleteHeader />
        <OrderCompleteDetails />
      </Container>
      <Footer />
    </>
  );
}
