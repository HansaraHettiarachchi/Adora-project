import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col,Carousel } from 'react-bootstrap';

const About = () => {
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
            <Footer />
        </>
    );
};

export default About;
