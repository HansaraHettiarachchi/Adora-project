import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'
import { FaCartPlus } from 'react-icons/fa'
import { IoMdSearch, IoMdStarHalf } from 'react-icons/io'
import { IoMicOutline, IoStarSharp } from "react-icons/io5"
import p_image from '../assets/images/Product/image.png'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BreadcrumbBar from '../components/BreadcrumbBar'

const Shop = () => {
    return (
        <>
            <Header />
            <BreadcrumbBar currentPage="Shop"/>

            <Container fluid='sm' >

                <Container>
                    <InputGroup className="mt-5 ">
                        <InputGroup.Text id="basic-addon1" className='bg-transparent border-end border-end-0 rounded-start-5 p-3'> <IoMdSearch size={30} className='ms-2' /> </InputGroup.Text>
                        <Form.Control
                            className='border-start border-start-0 border-end border-end-0 fs-5'
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                        />
                        <InputGroup.Text id="basic-addon1" className='bg-transparent border-start border-start-0 rounded-end-5 p-3'> <IoMicOutline size={30} className='me-2' /> </InputGroup.Text>
                    </InputGroup>

                    <Row className='g-3 mx-5 mt-1'>
                        <Col md={4}><Button className='w-100 text-dark fw-medium border-0' style={{ backgroundColor: "#D9D9D9" }}>Recent</Button></Col>
                        <Col md={4}><Button className='w-100 text-dark fw-medium border-0' style={{ backgroundColor: "#D9D9D9" }}>Popular Items</Button></Col>
                        <Col md={4}><Button className='w-100 text-dark fw-medium border-0' style={{ backgroundColor: "#D9D9D9" }}>Special Offers For You</Button></Col>
                    </Row>
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
                                    <Button className='text-uppercase px-5 fw-bold rounded-4 border-0' style={{ backgroundColor: "#164C0D" }}>Add To Cart <FaCartPlus className='ms-2' /> </Button>
                                </Container>
                            </Container>
                        </Col>

                    ))}
                </Row>


                <Container fluid className='p-0'>
                    <Row className='my-4'>
                        <Col>
                            <Row>
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
                                                <Button className='text-uppercase px-5 fw-bold rounded-4 border-0' style={{ backgroundColor: "#164C0D" }}>Add To Cart <FaCartPlus className='ms-2' /> </Button>
                                            </Container>
                                        </Container>
                                    </Col>
                                ))}
                            </Row>

                        </Col>

                        <Col className='mt-2 mx-auto' style={{ maxWidth: "300px" }}>
                            <Container className='rounded-4 p-3' style={{ backgroundColor: "#D9D9D9" }}>
                                <Container fluid className='d-flex justify-content-center mb-3'>
                                    <Button className='border-0' style={{ backgroundColor: '#23B540' }}>Ohter Products</Button>
                                </Container>

                                {Array.from({ length: 7 }).map((_, idx) => (
                                    <Container fluid className='px-2 rounded-4 bg-white mb-3'>
                                        <Row className='align-content-center align-middle'>
                                            <Image src={p_image} className='rounded-circle m-2' style={{ width: "110px" }} />
                                            <Col className='pt-3'>
                                                <h6 className='m-0'>Snake Plant</h6>
                                                <h6 className='m-0'>
                                                    {Array.from({ length: 3 }).map((_, idx) => (
                                                        <IoStarSharp />
                                                    ))}
                                                    {Array.from({ length: 3 }).map((_, idx) => (
                                                        <IoMdStarHalf />
                                                    ))}
                                                </h6>
                                                <h6 className='mt-3'><span className='px-3 py-1 rounded-3' style={{ backgroundColor: "#D9D9D9" }}>$14</span></h6>
                                            </Col>
                                        </Row>
                                    </Container>
                                ))}
                            </Container>
                        </Col>
                    </Row>
                </Container>
                {/* <Row className='mb-3'>

                    <Container>

                    </Container>
                </Row> */}

            </Container>

            <Footer />
        </>
    )
}

export default Shop;