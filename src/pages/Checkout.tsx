import { Container } from 'react-bootstrap';
import CheckoutHeader from '../components/checkout/CheckoutHeader';
import Header from '../components/Header';
import CheckoutDetails from '../components/checkout/CheckoutDetails';

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
