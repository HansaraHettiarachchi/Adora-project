import { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { BsCashStack, BsFillCartPlusFill, BsFillCreditCard2FrontFill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import BreadcrumbBar from '../components/BreadcrumbBar';
import Footer from "../components/Footer";
import Header from "../components/Header";
import YouMayAlsoLike from "../components/Wishlist/YouMayAlsoLike";
import type { Product } from "../types/EntitiesTypes";
import p_image from '../assets/images/Product/image.png'

const initialProducts: Product[] = [
  {
    id: 1,
    name: "SNAKE PLANT",
    type: "Cactus",
    price: 149,
    quantity: 2,
    image: p_image,
  },
  {
    id: 2,
    name: "CANDELABRA ALOE",
    type: "Aloe Vera",
    price: 149,
    quantity: 1,
    image: p_image,
  },
  {
    id: 3,
    name: "GOLDEN POTHOS",
    type: "Pothos",
    price: 69,
    quantity: 3,
    image: p_image,
  },
  {
    id: 4,
    name: "HOMALOMENA",
    type: "Bonsai",
    price: 119,
    quantity: 5,
    image: p_image,
  },
];

export default function Wishlist() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <>
      <Header />

      <BreadcrumbBar currentPage="Wishlist"/>

      <Container fluid="sm" className="py-4">

        <h4
          className="m-0 pb-2 w-50"
          style={{
            color: "#164C0D",
            borderBottom: "3px solid #164C0D"
          }}
        >
          Wishlist
        </h4>

        <Row>
          <Col xs={12} lg={8}>
            {products.map((product) => (
              <Container
                key={product.id}
                className="my-3 rounded-3 p-3"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <Row className="ms-2">
                  <Col xs={12} md={4} className="mb-3 mb-md-0 d-flex justify-content-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      style={{ maxWidth: "200px", borderRadius: "20px" }}
                      fluid
                    />
                  </Col>
                  <Col xs={12} md={8}>
                    <Row>
                      <Col xs={12} className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="fw-bold fs-5 mt-2 mb-0">{product.name}</h6>
                          <h6 className="small fw-normal">{product.type}</h6>
                        </div>
                      </Col>
                    </Row>

                    <Container className="d-flex justify-content-end mb-1 mt-4">
                      <Button
                        size="sm"
                        className="fw-bold py-0 "
                        variant="outline-success"
                        style={{ borderColor: '#164C0D', color: "#164C0D" }}
                      >
                        Remove
                      </Button>
                    </Container>


                    <Row className="justify-content-between align-items-center">
                      <Col xs={12} md={6}>
                        <Row className="align-items-center justify-content-between">
                          <Col xs="auto">
                            <h6 className="fw-bold mb-3 mb-md-0">${product.price}</h6>
                          </Col>
                          <Col xs="auto">
                            <Row className="align-items-center me-1">
                              <Button
                                className="rounded-2 ms-1 me-1 d-flex justify-content-center align-items-center"
                                size="sm"
                                variant="dark"
                                style={{ height: "24px", width: "24px", padding: 0 }}
                              >
                                <FaMinus className="text-white m-auto" size={12} />
                              </Button>
                              <Button
                                className="rounded-2 border-0 me-1 d-flex justify-content-center align-items-center"
                                size="sm"
                                style={{
                                  height: "24px",
                                  width: "24px",
                                  padding: 0,
                                  fontSize: "12px",
                                  backgroundColor: "#164C0D",
                                }}
                              >
                                {product.quantity}
                              </Button>
                              <Button
                                className="rounded-2 me-1 d-flex justify-content-center align-items-center"
                                size="sm"
                                variant="dark"
                                style={{ height: "24px", width: "24px", padding: 0 }}
                              >
                                <FaPlus className="text-white m-auto" size={12} />
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={12} md={6} className="mt-3 mt-md-0">
                        <Button
                          className="float-md-end mx-auto mx-md-0 border-0 d-flex justify-content-center align-items-center fw-bold px-4"
                          style={{ backgroundColor: "#164C0D" }}
                          size="sm"
                        >
                          Add To Cart
                          <BsFillCartPlusFill className="ms-2 border-0" size={20} />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            ))}
          </Col>
          <Col xs={12} lg={4}>
            <Container className="rounded-3 p-4 mb-4 mt-3" style={{ backgroundColor: "#B7D7B0" }}>
              <h5 className="fw-bold text-center mb-2" style={{ borderBottom: "2px solid #164C0D", paddingBottom: "8px" }}>
                SUMMARY
              </h5>
              <div className="d-flex justify-content-center mb-3">
                <Image
                  src="src/assets/images/wishlist_cart_pic (3).png"
                  alt="Summary Plant"
                  style={{ width: "100px", height: "100px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                />
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <span>Items Total</span>
                  <span>$ {products.reduce((sum, p) => sum + p.price * p.quantity, 0)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Items Discount</span>
                  <span>$ 0</span>
                </div>
                <div className="d-flex justify-content-between fw-bold mt-2">
                  <span>Sub Total</span>
                  <span>$ 0</span>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                  <span>Shipping Cost</span>
                  <span>$ 5</span>
                </div>
                <div className="d-flex justify-content-between fw-bold mt-3">
                  <span>Estimated Total</span>
                  <span>$ {products.reduce((sum, p) => sum + p.price * p.quantity, 0) + 5}</span>
                </div>
              </div>
              {/* <div className="text-center mt-3">
                    <Button
                      className="fw-bold px-4 d-flex align-items-center justify-content-center"
                      style={{ backgroundColor: "#164C0D", border: "none" }}
                    >
                      CHECK OUT <BsFillCartPlusFill className="ms-2" size={20} />
                    </Button>
                  </div> */}
            </Container>
            <Container className="rounded-3 p-4" style={{ backgroundColor: "#B7D7B0" }}>
              <h6 className="fw-bold mb-3">PAY WITH</h6>
              <div className="mb-3 d-flex gap-3">
                <span style={{ fontSize: "1.5rem" }}>
                  <BsFillCreditCard2FrontFill />
                </span>
                <span style={{ fontSize: "1.5rem" }}>
                  <BsCashStack />
                </span>
              </div>
              <h6 className="fw-bold mb-1">BUYER PROTECTION</h6>
              <p className="mb-0" style={{ fontSize: "0.95rem" }}>
                Get a full refund if the item is not as described or not delivered.
              </p>
            </Container>
          </Col>
        </Row>

        {/* Recommendations */}
        <YouMayAlsoLike />

      </Container >

      <Footer />
    </>
  );
}
