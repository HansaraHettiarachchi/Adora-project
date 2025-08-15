import { useState } from "react";
import { Container } from "react-bootstrap";
import CheckoutDetails from "../components/checkout/CheckoutDetails";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
