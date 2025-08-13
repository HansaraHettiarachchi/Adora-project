import { Container } from 'react-bootstrap';
import CheckoutHeader from '../components/Checkout/CheckoutHeader';
import Header from '../components/Header';
import Footer from "../components/Footer";
import CheckoutDetails from '../components/Checkout/CheckoutDetails';

export default function Checkout() {

  return (
    <>
      <Header />

      <Container className='my-5'>
        <CheckoutHeader />
        <CheckoutDetails />
      
      </Container>

      <Footer />
    </>
  )
}
