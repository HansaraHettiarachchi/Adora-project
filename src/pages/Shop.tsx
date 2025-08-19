import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { IoMdSearch, IoMdStarHalf } from 'react-icons/io';
import { IoMicOutline, IoStarSharp } from "react-icons/io5";
import Footer from '../components/Footer';
import Header from '../components/Header';
import BreadcrumbBar from '../components/BreadcrumbBar';
import { addToCart } from '../util/cartStorage';
import p_image from '../assets/images/Product/image.png'; // fallback image

const resolveImage = (url?: string | null) => {
  if (!url) return p_image;                       // fallback to local asset
  if (/^https?:\/\//i.test(url)) return url;      // full external URL
  if (url.startsWith('/')) return url;            // already absolute
  if (url.startsWith('products/')) return `/${url}`; // served from /public/products/*
  return `/uploads/${url}`;                       // backend-served uploads
};


// TypeScript interface for product
interface Product {
  id: number;
  name: string;
  desc: string;
  mother_plant_type_id: number;
  category_id: number;
  isActive: boolean;
  imageUrl?: string | null;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZm5hbWUiOiJTYW5kYWxpIiwibG5hbWUiOiJLb2RpdGh1d2Fra3UiLCJhZGRyZXNzIjoiNDU2IEZsb3dlciBSb2FkLCBDb2xvbWJvIiwibmljIjoiMjAwMDk5OTk5OTk5IiwiZW1haWwiOiJzYW5kYWxpQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkb0pXaHNLZjdnLmQxTnBnaFg4djBtLmFCZWxmd3lxWlY1Z3pZek1hWnpOSzQ0NkFJbFR3eUsiLCJtb2JpbGUiOiIwNzc3NjU0MzIxIiwicF9pbWciOm51bGwsInVzZXJfcm9sZV9pZCI6MSwiZ2VuZGVyX2lkIjoxLCJjaXR5X2lkIjoxLCJzdGF0dXNfaWQiOjEsImlhdCI6MTc1NTU4OTA2MCwiZXhwIjoxNzU4MTgxMDYwfQ.3PNE9cFf1lE15kvzL1bVKjsaApOPbRc_suaHq5RWXgI";

  axios
    .get("http://localhost:3000/api/v1/product/products?page=0&pageSize=5", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
     })
    .then((res) => {
      console.log("API response:", res.data); // 👈 check structure
      setProducts(res.data.data ?? []); // fallback depending on backend
    })
    .catch((err) => {
      console.error("Error fetching products:", err.response || err.message);
    });
}, []);


  const handleAddToCart = (product: Product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
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
          {products.map((product) => (
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
                  <h6 className='fw-bolder'>$335</h6>
                </Container>
                <Container fluid className='d-flex justify-content-center mt-3'>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className='text-uppercase px-5 fw-bold rounded-4 border-0' 
                    style={{ backgroundColor: "#164C0D" }}
                  >
                    Add To Cart <FaCartPlus className='ms-2' /> 
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
