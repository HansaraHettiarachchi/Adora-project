import { Container } from "react-bootstrap";
import CheckoutHeader from "../components/Checkout/CheckoutHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutDetails from "../components/Checkout/CheckoutDetails";
import React, { useState } from "react";

export default function Checkout() {
  const [isStep2Complete, setIsStep2Complete] = useState(false);

  return (
    <>
      <Header />

      <Container className="my-5">
        <CheckoutHeader isStep2Complete={isStep2Complete} />

        <CheckoutDetails onValidationChange={setIsStep2Complete} />
      </Container>

      <Footer />
    </>
  );
}
