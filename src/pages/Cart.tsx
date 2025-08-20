import React, { useEffect, useState, type ChangeEvent } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiNumberCircleOneLight, PiNumberCircleThreeLight, PiNumberCircleTwoLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

import p_image from "../assets/images/Product/image.png"; // fallback image
import axiosInstance, { baseURL } from "../util/axiosUtil";
import { getCart, removeFromCart, setBatchId, updateQuantity } from "../util/cartStorage";
import type { Cart_Product, CartFullProductDetails, CommonIdName, SizeData } from "../types/EntitiesTypes";
import Swal from "sweetalert2";

type CartItem = {
  id: number;
  name: string;
  desc?: string | null;
  category_id?: number;
  mother_plant_type_id?: number;
  isActive?: boolean;
  imageUrl?: string | null;
  quantity: number;
  price?: number; // optional until you wire pricing
};

type SelectedBatch = {
  p_id: number;
  batch_id: number;
}
type CartQty = { pId: number; qty: number }

const CartPage = () => {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 576 : false;
  const navigate = useNavigate();

  const [fullProduct, setFullProduct] = useState<CartFullProductDetails[]>([]);
  const [availableSizes, setAvailableSizes] = useState<SizeData[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<SelectedBatch[]>([]);
  const [cartProducts, setCartProducts] = useState<Cart_Product[]>([]);
  const [cartQty, setCartQty] = useState<CartQty[]>([]);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadData = async () => {
    let cartProductData: CartFullProductDetails[] = [];
    const cartProdcutDetails = getCart("cart");
    setCartProducts(cartProdcutDetails);

    const cartQtyData: CartQty[] = [];
    for (const item of cartProdcutDetails) {
      cartQtyData.push({
        pId: item.p_id,
        qty: item.qty || 1
      });

      try {
        const res = await axiosInstance.get("product/product-details/" + item.p_id);
        if (res.status === 200) {
          cartProductData.push(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    }

    setCartQty(cartQtyData);
    const availableSizes = [];
    const selectedBatchs = [];
    for (const item of cartProductData) {
      for (const batch of item.batches) {
        availableSizes.push({
          id: batch.size.id,
          name: batch.size.name,
          batch_id: batch.id
        });
      }
      selectedBatchs.push({
        p_id: item.id,
        batch_id: cartProdcutDetails.find(cartData => cartData.p_id == item.id)?.batch_id || item.batches[0].id,
      });

    }

    setSelectedBatch(selectedBatchs);
    setAvailableSizes(availableSizes);
    setFullProduct(cartProductData);

  }

  const resolveImage = (url?: string | null) => {
    return `${baseURL}uploads/${url}`;
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCartQtyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const productId = Number(e.target.getAttribute('data-product-id'));
    const qty = Math.max(1, Number(e.target.value) || 1);

    updateQuantity(productId, qty, "cart");

    setCartQty(prev =>
      prev.map(item =>
        item.pId === productId ? { ...item, qty } : item
      )
    );
  };

  // const handleQtyChange = (id: number, value: string) => {
  //   const qty = Math.max(1, Number(value) || 1);
  //   updateQuantity(id, qty);
  //   setCartItems(getCart("cart"));
  // };

  const handleRemove = (id: number) => {
    const removed = removeFromCart(id, "cart");
    if (removed) {
      Swal.fire({
        title: "Removed!",
        text: "Item removed from cart.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#23B540",
      }).then(() => {
        loadData();
      });
    } else {
      Swal.fire({
        title: "Not found",
        text: "Item not found in cart.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#23B540",
      });
    }
  };

  // const handleEmpty = () => {
  //   clearCart();
  //   setCartItems([]);
  // };

  // Totals
  const itemSubtotal = (item: CartItem) =>
    (item.price ?? 0) * (item.quantity ?? 1);
  const subtotal = cartItems.reduce((acc, item) => acc + itemSubtotal(item), 0);
  const shippingFee = cartItems.length > 0 ? 200 : 0;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }
    if (paymentMethod === "cod" || paymentMethod === "online") {
      navigate("/checkout");
    } else {
      alert("Please select a payment method before proceeding.");
    }
  };

  // useEffect(() => {
  //   console.log("selectedBatch updated:", selectedBatch);
  // }, [selectedBatch]);

  const handleSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(localStorage.getItem("cart"));

    const selectedSizeId = parseInt(event.target.value, 10);
    const productId = Number(event.target.getAttribute('data-product-id'));

    const selectSize = availableSizes.find(item => item.id === selectedSizeId && item.batch_id);

    if (selectSize) {
      setSelectedBatch(prev => {
        const updated = prev.map(batch =>
          batch.p_id === productId
            ? { ...batch, batch_id: selectSize.batch_id }
            : batch
        );
        setBatchId(productId, selectSize.batch_id, "cart");
        return updated;
      });
    }
  };

  return (
    <>
      <Header />

      <section style={{ padding: isMobile ? "1rem" : "2rem" }}>
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <h5
                style={{
                  fontWeight: "400",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: isMobile ? "1rem" : "2rem",
                  marginBottom: isMobile ? "1rem" : "2rem",
                  gap: isMobile ? "0.5rem" : "1rem",
                  fontSize: isMobile ? "1rem" : "1.25rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: "#23B540",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "0.5rem" : "1rem",
                  }}
                >
                  <PiNumberCircleOneLight style={{ color: "#164C0D" }} />
                  Shopping Cart
                </span>
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IoIosArrowRoundForward />
                </span>
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "0.5rem" : "1rem",
                  }}
                >
                  <PiNumberCircleTwoLight /> Checkout Details
                </span>
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IoIosArrowRoundForward />
                </span>
                <span
                  style={{
                    color: "#A6A3A3",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "0.5rem" : "1rem",
                  }}
                >
                  <PiNumberCircleThreeLight /> Order Complete
                </span>
              </h5>
            </Col>
          </Row>

          <Row>
            {/* Table */}
            <Col lg={8} xs={12} className="mb-4" style={{ overflowX: "auto" }}>
              <Table
                bordered
                hover
                responsive
                style={{
                  width: "100%",
                  margin: "0 auto",
                  minWidth: isMobile ? "600px" : "100%",
                  fontSize: isMobile ? "0.85rem" : "1rem",
                }}
              >
                <thead
                  style={{
                    textAlign: "center",
                    height: isMobile ? "3rem" : "5rem",
                    verticalAlign: "middle",
                    border: "1px solid #B8B4B4",
                  }}
                >
                  <tr>
                    <th></th>
                    <th>Images</th>
                    <th>Product</th>
                    <th>Plant Size</th>
                    <th>Price (LKR)</th>
                    <th>Qty</th>
                    <th>Subtotal (LKR)</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    border: "1px solid #B8B4B4",
                  }}
                >
                  {fullProduct.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <Form.Check type="checkbox" />
                      </td>
                      <td>
                        <img
                          // src={resolveImage(item.batches[0].images[0].name)}
                          src={(() => {
                            const selectedIndex = selectedBatch.findIndex(batch => batch.p_id === item.id);
                            const batch = item.batches[selectedIndex >= 0 ? selectedIndex : 0];
                            const imageName = batch?.images?.[0]?.name;

                            return imageName ? resolveImage(imageName) : p_image;
                          })()}
                          alt={item.name}
                          style={{
                            width: isMobile ? "40px" : "60px",
                            height: isMobile ? "40px" : "60px",
                            objectFit: "cover",
                            marginRight: isMobile ? "5px" : "10px",
                            borderRadius: "5px",
                          }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <Form.Select
                          data-product-id={item.id}
                          value={
                            (() => {
                              const selected = selectedBatch.find(batch => batch.p_id === item.id);
                              const batch = item.batches.find(currentBatch => currentBatch.id === selected?.batch_id);
                              return batch?.size.id ?? item.batches[0].size.id;
                            })()
                          }
                          onChange={handleSizeSelect}
                        >
                          {item.batches.map((batch) => (
                            <option key={`${item.id}-${batch.id}-${batch.size.id}`} value={batch.size.id}>
                              {batch.size.name}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {
                          (() => {
                            const selected = selectedBatch.find(batch => batch.p_id === item.id);
                            const batch = item.batches.find(currentBatch => currentBatch.id === selected?.batch_id);
                            return batch?.price != null ? `${batch.price.toFixed(2)}` : "—";
                          })()
                        }
                      </td>

                      <td>
                        <Form.Control type="number" className="text-center align-middle" value={cartQty.find(cartData => cartData.pId == item.id)?.qty} onChange={handleCartQtyChange} data-product-id={item.id} />
                        {/* <Form.Control type="number" className="text-center align-middle" value={cartProducts.find(cartProduct => cartProduct.p_id == item.id)?.qty || 1} onChange={(e) => {
                          updateQuantity(item.id, Number(e.target.value), "cart");
                        }} /> */}
                      </td>
                      <td>
                        {
                          (() => {
                            const selected = selectedBatch.find(batch => batch.p_id === item.id);

                            const batch = item.batches.find(currentBatch => currentBatch.id === selected?.batch_id);
                            return batch?.price != null
                              ? `${(batch.price * (cartQty.find(cartData => cartData.pId == item.id)?.qty || 1)).toFixed(2)}`
                              : "—";
                          })()
                        }
                      </td>
                      <td>
                        <Button
                          variant="outline-none"
                          size={isMobile ? "sm" : "lg"}
                          onClick={() => handleRemove(item.id)}
                        >
                          <FaTrash
                            style={{
                              color: "#164C0D",
                              fontSize: isMobile ? "14px" : "18px",
                            }}
                          />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>

            {/* Cart Summary */}
            <Col lg={4} xs={12}>
              <div
                style={{
                  backgroundColor: "#EFECEC",
                  padding: isMobile ? "1rem" : "2rem",
                  borderRadius: "10px",
                  display: "grid",
                  justifyContent: "center",
                }}
              >
                <h4
                  className="mb-3"
                  style={{
                    textAlign: "center",
                    color: "#23B540",
                    fontSize: isMobile ? "1.25rem" : "1.5rem",
                  }}
                >
                  Cart Total
                </h4>

                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  Subtotal: <span>${subtotal.toFixed(2)}</span>
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  Shipping Fee: <span>${shippingFee.toFixed(2)}</span>
                </p>
                <h6
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: isMobile ? "1rem" : "1.25rem",
                  }}
                >
                  Total: <strong>${total.toFixed(2)}</strong>
                </h6>

                {/* Payment method selection */}
                <Form
                  className="mt-3"
                  style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}
                >
                  <Form.Check
                    type="radio"
                    label="Cash On Delivery"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="Online Payment"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mb-3"
                  />
                </Form>

                {/* Checkout button */}
                <Button
                  variant="success"
                  className="w-100 mb-2"
                  style={{
                    backgroundColor: "transparent",
                    color: "#164C0D",
                    border: "2px solid #164C0D",
                    fontWeight: "500",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                  onClick={handleCheckout}
                >
                  Check Out
                </Button>

                <Button
                  variant="outline-success"
                  className="w-100 mb-2"
                  style={{
                    color: "white",
                    backgroundColor: "#164C0D",
                    border: "2px solid #164C0D",
                    fontWeight: "500",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </Button>

                <Button
                  variant="outline-none"
                  className="w-100"
                  style={{
                    color: "#23B540",
                    fontWeight: "500",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                // onClick={handleEmpty}
                >
                  Empty Cart
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CartPage;

