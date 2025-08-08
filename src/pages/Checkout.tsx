import { Container } from 'react-bootstrap';
import CheckoutHeader from '../components/Checkout/CheckoutHeader';
import Header from '../components/Header';
import CheckoutDetails from '../components/Checkout/CheckoutDetails';

export default function Checkout() {

  return (
    <>
      <Header />

      <Container className='mt-3'>
        <CheckoutHeader />
        <CheckoutDetails />

      </Container>
    </>
  )
}
