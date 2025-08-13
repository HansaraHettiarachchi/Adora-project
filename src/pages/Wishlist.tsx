import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

type Product = {
    id: number;
    name: string;
    type: string;
    price: number;
    quantity: number;
    image: string;
}

const initalProducts = [
    {
        id: 1,
        name: "SNAKE PLANT",
        type: "Cactus",
        price: 149,
        quantity: 2,
        image: "https://via.placeholder.com/80x80?text=Snake+Plant"
    },
    {
        id: 2,
        name: "CANDELABRA ALOE",
        type: "Aloe Vera",
        price: 149,
        quantity: 1,
        image: "https://via.placeholder.com/80x80?text=Aloe"
    },
    {
        id: 3,
        name: "GOLDEN POTHOS",
        type: "Pothos",
        price: 69,
        quantity: 3,
        image: "https://via.placeholder.com/80x80?text=Pothos"
    },
    {
        id: 4,
        name: "HOMALOMENA",
        type: "Bonsai",
        price: 119,
        quantity: 5,
        image: "https://via.placeholder.com/80x80?text=Homalomena"
    }
];

export default function Wishlist() {

    const [products, setProducts] = useState<Product[]>(initalProducts);


    return (
        <>
            <Header />

            <Container fluid='sm'>
                <Container fluid>
                    {/* Type your code here */}

                    <div className="row justify-content-center py-3">

                        <div className="col" >

                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div className="bg-primary rounded-3 mb-3" style={{ height: "100px" }} key={idx}>
                                    <div className="bg-success" style={{ width: "400px" }}>
                                        dsfdsds
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="" style={{ width: "400px" }}>
                            <div className="bg-success mb-3" style={{ height: "400px" }}>
                                dsfdsds
                            </div>
                            <div className="bg-success" style={{ height: "400px" }}>
                                dsfdsds
                            </div>
                        </div>
                    </div>


                </Container>
            </Container>

            <Footer />
        </>
    )
}

