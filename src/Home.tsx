import { Container } from "react-bootstrap";
import Footer from "./comp/Footer";
import Header from "./comp/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

    return (
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

export default Home;