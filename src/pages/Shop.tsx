import React from 'react'
import Header from '../components/Header'
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import { FaCartPlus, FaDochub } from 'react-icons/fa'
import p_image from '../assets/images/Product/image.png';
import { IoMdSearch } from 'react-icons/io'
import { IoMicOutline } from "react-icons/io5";

const Shop = () => {
    return (
        <>
            <Header />

            <Container fluid='sm' >

                <Container>
                    <InputGroup className="mt-5 ">
                        <InputGroup.Text id="basic-addon1" className='bg-transparent border-end border-end-0 rounded-start-4 p-3'> <IoMdSearch size={30} /> </InputGroup.Text>
                        <Form.Control
                            className='border-start border-start-0 border-end border-end-0 fs-5'
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                        />
                        <InputGroup.Text id="basic-addon1" className='bg-transparent border-start border-start-0 rounded-end-4 p-3'> <IoMicOutline size={30} /> </InputGroup.Text>
                    </InputGroup>
                </Container>

                <Row className='my-4 g-4'>
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Col key={idx} md={3} className='p-2'>
                            <Container className='rounded-4 px-4 py-4' style={{ backgroundColor: "#D9D9D9" }}>
                                <Image src={p_image} fluid />
                                <Container className='d-flex justify-content-between mt-3'>
                                    <div>
                                        <h6 className='m-0'>SNAKE PLANT</h6>
                                        <small>dsfds</small>
                                    </div>
                                    <h6 className='fw-bolder'>$335</h6>
                                </Container>
                                <Container fluid className='d-flex justify-content-center mt-3'>
                                    <Button className='text-uppercase px-5 fw-bold rounded-4' style={{ backgroundColor: "#164C0D" }}>Add To Cart <FaCartPlus className='ms-2' /> </Button>
                                </Container>
                            </Container>
                        </Col>

                    ))}
                </Row>


                <Row className='mb-3'>
                    <Container fluid>
                        <Row className='my-4 g-4'>
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <Col key={idx} md={4} className='p-2'>
                                    <Container className='rounded-4 px-4 py-4' style={{ backgroundColor: "#D9D9D9" }}>
                                        <Image src={p_image} fluid />
                                        <Container className='d-flex justify-content-between mt-3'>
                                            <div>
                                                <h6 className='m-0'>SNAKE PLANT</h6>
                                                <small>dsfds</small>
                                            </div>
                                            <h6 className='fw-bolder'>$335</h6>
                                        </Container>
                                        <Container fluid className='d-flex justify-content-center mt-3'>
                                            <Button className='text-uppercase px-5 fw-bold rounded-4' style={{ backgroundColor: "#164C0D" }}>Add To Cart <FaCartPlus className='ms-2' /> </Button>
                                        </Container>
                                    </Container>
                                </Col>
                            ))}

                            <Col className='bg-black'>
                                <Container fluid className='d-flex justify-content-center my-3'>
                                    <Button className='' style={{ backgroundColor: '#23B540' }}>Ohter Products</Button>
                                </Container>

                                <Container fluid className='px-2 rounded-4 bg-white'>
                                    <Row>
                                        <Image src={p_image} className='rounded-circle' style={{ width: "100px", height: "100px" }} />
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>

                    <Container>

                    </Container>
                </Row>

            </Container>

            <Footer />
        </>
    )
}

export default Shop;