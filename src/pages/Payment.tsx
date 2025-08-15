import { Container } from "react-bootstrap";
import PaymentDetailsHeader from "../components/Payment/PaymentDetailsHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PaymentDetails from "../components/Payment/PaymentDetails";

export default function Payment() {
  return (
    <>
      <Header />

      <Container className="my-5">
        <PaymentDetailsHeader />
        <PaymentDetails />
      </Container>

      <Footer />
    </>
  );
}
