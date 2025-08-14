import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Button } from "react-bootstrap";

type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "SNAKE PLANT",
    type: "Cactus",
    price: 149,
    quantity: 2,
    image: "src/assets/images/wishlist_cart_pic (5).png",
  },
  {
    id: 2,
    name: "CANDELABRA ALOE",
    type: "Aloe Vera",
    price: 149,
    quantity: 1,
    image: "src/assets/images/wishlist_cart_pic (1).png",
  },
  {
    id: 3,
    name: "GOLDEN POTHOS",
    type: "Pothos",
    price: 69,
    quantity: 3,
    image: "src/assets/images/wishlist_cart_pic (3).png",
  },
  {
    id: 4,
    name: "HOMALOMENA",
    type: "Bonsai",
    price: 119,
    quantity: 5,
    image: "src/assets/images/wishlist_cart_pic (4).png",
  },
];

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

export default function Wishlist() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const totalPrice = products.reduce(
    (total, p) => total + p.price * p.quantity,
    0
  );
  const shippingCost = products.length > 0 ? 5 : 0;
  const estimatedTotal = totalPrice + shippingCost;

  return (
    <>
      <Header />

      <Container fluid="sm" className="py-4">
        <div className="row g-4">
          {/* Cart Section */}
          <h5
              className="mb-3 fw-bold  pb-2"
              style={{ borderBottom: "1px solid #164C0D" }}
            >
              WISHLIST
            </h5>
          <div className="col-lg-8">
            {products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p.id}
                  className="position-relative border rounded p-3 mb-3"
                  style={{ background: "#D9D9D9" }}
                >
                  {/* Radio button */}
                  <input
                    type="radio"
                    name="selectedProduct"
                    className="position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  />

                  <div className="d-flex align-items-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      width="100"
                      height="100"
                      className="me-3 rounded"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-bold">{p.name}</h6>
                      <small className="text-muted">{p.type}</small>

                      {/* Qty */}
                      <div className="d-flex align-items-center mt-2">
                        <div className="me-3 fw-bold">
                          ${p.price * p.quantity}
                        </div>
                        <Button
                          size="sm"
                          variant="outline-dark"
                          className="me-2 fw-bold py-0 px-1"
                          onClick={() =>
                            setProducts(
                              products.map((item) =>
                                item.id === p.id && item.quantity > 1
                                  ? { ...item, quantity: item.quantity - 1 }
                                  : item
                              )
                            )
                          }
                          style={{ background: "#000000ff", color: "white" }}
                        >
                          -
                        </Button>

                        <Button
                          size="sm"
                          variant="outline-dark"
                          className="me-2 fw-bold py-0 px-2"
                          style={{ background: "#164C0D", color: "white" }}
                        >
                          {p.quantity}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-dark"
                          className="me-2 fw-bold py-0 px-1"
                          onClick={() =>
                            setProducts(
                              products.map((item) =>
                                item.id === p.id
                                  ? { ...item, quantity: item.quantity + 1 }
                                  : item
                              )
                            )
                          }
                          style={{ background: "#000000ff", color: "white" }}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Remove and checkout buttons */}
                    <div className="text-end ms-3 d-flex flex-column">
                      <Button
                        size="sm"
                        className="p-0 mb-2"
                        onClick={() =>
                          setProducts(
                            products.filter((item) => item.id !== p.id)
                          )
                        }
                        style={{
                          background: "transparent",
                          color: "#164C0D",
                          border: "2px solid #164C0D",
                          boxShadow: "0 4px 8px rgba(66, 243, 50, 0.1)",
                        }}
                      >
                        Remove
                      </Button>
                      <Button
                        size="sm"
                        className="p-2 mb-2 fw-bold"
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
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          {/* Summary Section */}
          <div className="col-lg-4">
            <div
              className="p-3 mb-3"
              style={{ background: "#d0f0ceff", borderRadius: "10px" }}
            >
              <h5
                className="d-flex justify-content-center"
                style={{ borderBottom: "1px solid #164C0D", color: "#164C0D" }}
              >
                WISHLIST
              </h5>
              <div
                className="d-flex justify-content-between"
                style={{ color: "#164C0D" }}
              >
                <span>Items Total</span>
                <span>${totalPrice}</span>
              </div>
              <div
                className="d-flex justify-content-between  mb-4"
                style={{ color: "#164C0D" }}
              >
                <span>Items Discount</span>
                <span>$0</span>
              </div>
              <div
                className="d-flex justify-content-between fw-bold"
                style={{ color: "#164C0D" }}
              >
                <span>Sub Total</span>
                <span>${totalPrice}</span>
              </div>
              <div
                className="d-flex justify-content-between fw-bold  mb-4"
                style={{ color: "#164C0D" }}
              >
                <span>Shipping Cost</span>
                <span>${shippingCost}</span>
              </div>
              <div
                className="d-flex justify-content-between fw-bold"
                style={{ color: "#164C0D" }}
              >
                <span>Estimated Total</span>
                <span>${estimatedTotal}</span>
              </div>
              <Button
                className="w-100 mt-3 fw-bold mx-auto d-block"
                style={{
                  background: "#164C0D",
                  borderRadius: "10px",
                  color: "white",
                  border: "none",
                }}
              >
                CONTINUE SHOPPING
              </Button>
            </div>

            <div
              className="p-3 my-3"
              style={{ background: "#d0f0ceff", borderRadius: "10px" }}
            >
              <h6 className="mt-3 fw-bold" style={{ color: "#164C0D" }}>
                PAY WITH
              </h6>
              <p className="mb-0">💳 🏦</p>
              <h6 className="mt-3 fw-bold" style={{ color: "#164C0D" }}>
                BUYER PROTECTION
              </h6>
              <small style={{ color: "#164C0D" }}>
                Get a full refund if the item is not as described or not
                delivered.
              </small>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-5">
          <h6 className="text-center fw-bold fs-4">
            <span className="fw-bold" style={{ color: "#39A108" }}>
              YOU MAY
            </span>{" "}
            ALSO LIKE
          </h6>
          <div className="row g-4 mt-3">
            {recommendations.map((item) => (
              <div key={item.id} className="col-6 col-md-3">
                <div
                  className="p-3 border rounded p-2 text-center"
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
                  <small className="d-flex justify-content-flex-start text-muted">
                    {item.type}
                  </small>

                  <Button
                    size="sm"
                    className="mt-2  w-100 fw-bold mx-auto d-block"
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
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}
