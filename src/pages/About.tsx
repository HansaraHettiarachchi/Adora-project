import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Carousel, Image } from 'react-bootstrap';
import { BsCheck2 } from "react-icons/bs";

const About = () => {
    const featuresLeft = [
        "Natural Materials",
        "5 Days Refund",
        "Good Woods"
    ];

    const featuresRight = [
        "Free Shipping",
        "Best Fabrics",
        "Friendly Support"
    ];

    return (
        <>
            <Header />

            {/* Top Carousel */}
            <Carousel fade interval={30000}>
                <Carousel.Item>
                    <img
                        className="d-block w-100 about-carousel-img"
                        style={{ height: '500px', objectFit: 'cover' }}
                        src="src/assets/images/about_slide (1).png"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 about-carousel-img"
                        style={{ height: '500px', objectFit: 'cover' }}
                        src="src/assets/images/about_slide (2).jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 about-carousel-img"
                        style={{ height: '500px', objectFit: 'cover' }}
                        src="src/assets/images/about_slide (3).jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 about-carousel-img"
                        style={{ height: '500px', objectFit: 'cover' }}
                        src="src/assets/images/about_slide (4).jpg"
                        alt="Fourth slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 about-carousel-img"
                        style={{ height: '500px', objectFit: 'cover' }}
                        src="src/assets/images/about_slide (5).jpg"
                        alt="Fifth slide"
                    />
                </Carousel.Item>
            </Carousel>

            {/* About Us Section */}
            <Container className="py-5">
                <Row className="justify-content-center text-center">
                    <Col lg={8} style={{ lineHeight: "1.8" }}>
                        <h2 style={{ color: "#23B540", fontWeight: "bold" }}>ABOUT US</h2>
                        <p style={{ color: "#888787ff", marginTop: "20px" }}>WHO WE ARE?</p>
                        <p style={{ color: "#A6A3A3", marginTop: "20px" }}>
                            Welcome to our floral design and boutique – where nature’s finest creations meet your moments of celebration. 
                            We are passionate about creating stunning floral arrangements that bring joy and beauty to any occasion. 
                            From lush bouquets to charming potted plants and elegant décor pieces, our designs capture the art of floral beauty.
                            Freshness isn’t just our promise – it’s our guarantee. Whether it’s a gift for a loved one or décor for your home, 
                            we’re here to help you choose something meaningful for every moment.
                        </p>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default About;
