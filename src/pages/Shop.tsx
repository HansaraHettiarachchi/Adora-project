import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { IoMdSearch, IoMdStarHalf } from 'react-icons/io';
import { IoMicOutline, IoStarSharp } from "react-icons/io5";
import Footer from '../components/Footer';
import Header from '../components/Header';
import BreadcrumbBar from '../components/BreadcrumbBar';
import { addToCart } from '../util/cartStorage';
import p_image from '../assets/images/Product/image.png'; // fallback image
import axiosInstance, { baseURL } from '../util/axiosUtil';
import type { BE_Product } from '../types/EntitiesTypes';
import Swal from 'sweetalert2';

const resolveImage = (url?: string | null) => {

  return `${baseURL}uploads/${url}`;
};

const Shop = () => {
  const [products, setProducts] = useState<BE_Product[]>([]);

  useEffect(() => {
    axiosInstance.get("/product/products?page=1&pageSize=5").then((res) => {

      if (res.data.status == 200) {
        setProducts(res.data.data);
      } else {
        console.error("An internal error occured.");

      }

      setProducts(res.data.data);
    })
      .catch((err) => {
        console.error("Error fetching products:", err.response || err.message);
      });
  }, []);


  const handleAddToCart = (product: BE_Product) => {
    const res = addToCart(product);

    if (res) {
      Swal.fire({
        icon: 'info',
        title: 'Product Already in ' + (product.qty === 0 ? "Wishlist" : "Cart"),
        text: 'This product is already in your ' + (product.qty === 0 ? "wishlist." : "cart."),
        confirmButtonColor: '#dfcd31ff',
      });
    }else{
      Swal.fire({
        icon: 'success',
        title: `Product added to ${product.qty === 0 ? "Wishlist" : "Cart"}`,
        text: `The product has been successfully added to your ${product.qty === 0 ? "wishlist." : "cart."}`,
        confirmButtonColor: '#23B540',
      });
    }
  };

  return (
    <>
      <Header />
      <BreadcrumbBar currentPage="Shop" />

      <Container fluid='sm'>
        {/* 🔍 Search Bar */}
        <Container>
          <InputGroup className="mt-5" style={{ boxShadow: 'none' }}>
            <InputGroup.Text
              id="basic-addon1"
              className='bg-transparent border-end border-end-0 rounded-start-5 p-3'
              style={{ boxShadow: 'none' }}
            >
              <IoMdSearch size={30} className='ms-2' />
            </InputGroup.Text>
            <Form.Control
              className='border-start border-start-0 border-end border-end-0 fs-5 custom-search-input'
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              style={{
                boxShadow: 'none',
                outline: 'none',
                borderColor: '#D9D9D9',
                backgroundColor: 'white',
                borderRadius: '0',
              }}
              onFocus={e => e.target.style.boxShadow = 'none'}
            />
            <InputGroup.Text
              id="basic-addon1"
              className='bg-transparent border-start border-start-0 rounded-end-5 p-3'
              style={{ boxShadow: 'none' }}
            >
              <IoMicOutline size={30} className='me-2' />
            </InputGroup.Text>
          </InputGroup>

          <Row className='g-3 mx-5 mt-1'>
            <Col md={4}><Button className='w-100 text-dark fw-medium border-0' style={{ backgroundColor: "#D9D9D9" }}>Recent</Button></Col>
            <Col md={4}><Button className='w-100 text-dark fw-medium border-0' style={{ backgroundColor: "#D9D9D9" }}>Popular Items</Button></Col>
            <Col md={4}><Button className='w-100 text-dark fw-medium border-0' style={{ backgroundColor: "#D9D9D9" }}>Special Offers For You</Button></Col>
          </Row>
        </Container>

        {/* 🛒 Product Grid */}
        <Row className='my-4 g-4'>
          {products.filter((item) => (item.price !== 0)).map((product) => (
            <Col key={product.id} md={3} className='p-2'>
              <Container className='rounded-4 px-4 py-4' style={{ backgroundColor: "#D9D9D9" }}>
                <Image
                  src={resolveImage(product.imageUrl)}
                  fluid
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = p_image; }}
                />

                <Container className='d-flex justify-content-between mt-3'>
                  <div>
                    <h6 className='m-0'>{product.name}</h6>
                    <small>{product.desc}</small>
                  </div>
                  {/* Replace with actual price if available */}
                  <h6 className='fw-bolder'>{product.price.toFixed(2)} LKR</h6>
                </Container>
                <Container fluid className='d-flex justify-content-center mt-3'>
                  <Button
                    className='text-uppercase px-5 fw-bold rounded-4 border-0'
                    style={{ backgroundColor: "#164C0D" }}
                    onClick={() => handleAddToCart(product)}
                  >
                    {product.qty === 0 ? (
                      <>
                        Wishlist <span className='ms-2'><FaHeart /></span>
                      </>
                    ) : (
                      <>
                        Add To Cart <FaCartPlus className='ms-2' />
                      </>
                    )}
                  </Button>
                </Container>
              </Container>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Shop;
