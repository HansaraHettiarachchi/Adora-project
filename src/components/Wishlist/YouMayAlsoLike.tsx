import { Button, Col, Row } from 'react-bootstrap';
import type { Product } from '../../types/EntitiesTypes';

const recommendations: Product[] = [
    {
        id: 9,
        name: "SNAKE PLANT",
        type: "Cactus",
        price: 149,
        quantity: 1,
        image: "src/assets/images/wishlist_cart_pic (1).png",
    },
    {
        id: 10,
        name: "CANDELABRA ALOE",
        type: "Aloe Vera",
        price: 149,
        quantity: 1,
        image: "src/assets/images/wishlist_cart_pic (5).png",
    },
    {
        id: 11,
        name: "GOLDEN POTHOS",
        type: "Pothos",
        price: 69,
        quantity: 1,
        image: "src/assets/images/wishlist_cart_pic (1).png",
    },
    {
        id: 12,
        name: "HOMALOMENA",
        type: "Bonsai",
        price: 119,
        quantity: 1,
        image: "src/assets/images/wishlist_cart_pic (4).png",
    },
];

export default function YouMayAlsoLike() {
    return (
        <div className="mt-5">
            <h6 className="text-center fw-bold fs-4">
                <span className="fw-bold" style={{ color: "#39A108" }}>
                    YOU MAY
                </span>{" "}
                ALSO LIKE
            </h6>

            <Row className="g-4 mt-3">
                {recommendations.map((item) => (
                    <Col key={item.id} xs={12} sm={6} lg={3}>
                        <div
                            className="p-3 border rounded text-center"
                            style={{ background: "#D9D9D9" }}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                width="150"
                                height="150"
                                className="rounded img-fluid mb-2"
                            />
                            <div className="d-flex justify-content-between fw-bold">
                                <span>{item.name}</span>
                                <span>${item.price}</span>
                            </div>
                            <small className="d-flex justify-content-start text-muted">
                                {item.type}
                            </small>

                            <Button
                                size="sm"
                                className="mt-2 w-100 fw-bold"
                                style={{
                                    background: "#164C0D",
                                    borderRadius: "10px",
                                    color: "white",
                                    border: "none",
                                }}
                            >
                                ADD TO CART
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
