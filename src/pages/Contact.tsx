import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Row, Col, Form} from 'react-bootstrap';

const Contact = () => {
    return (
        <>
            <Header />

            <Container className='d-flex justify-content-center'>
                <Container className='py-5'>
                    {/*Icons Section*/}
                    <Row className="text-center mb-5">
                        <Col md={4}>
                        <i className="bi bi-envelope-fill" style={{fontSize:'32px', color:'green'}}></i>
                        <h5>Email</h5>
                        <p>adoraflower@gmail.com</p>
                        </Col>

                        <Col md={4}>
                        <i className="bi bi-telephone-fill" style={{fontSize:'32px', color:'green'}}></i>
                        <h5>Phone</h5>
                        <p>+94 761 234 567</p>
                        <h5></h5>
                        </Col>

                        <Col md={4}>
                        <i className="bi bi-geo-alt-fill" style={{fontSize:'32px', color:'green'}}></i>
                        <h5>Address</h5>
                        <p> No. 45, Flower Garden Road,<br></br>Colombo 07,<br></br>Sri Lanka.</p>
                        </Col>
                    </Row>

                    {/*Map Section*/}

                    <div style={{position:"relative", marginBottom:"100px"}}>
                    <Row className="mb-5 justify-content-center">
                        <Col md={12}>
                        <div style={{width:'100%', height:'500px', overflow:'hidden'}}>
                            <iframe 
                            title="Google map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63316.90505205257!2d79.9808373!3d6.8819013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8bc570145eafbc15%3A0x15f655659825b160!2sFlower%20Garden%20Road%2C%20Colombo%2007%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1633031234567!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{border:0}}
                            ></iframe>
                        </div>
                        </Col>
                    </Row>

                    {/*Contact Form*/}
                    <Row className="justify-content-center">
                        <Col md={6} className="p-4 shadow" 
                        style={{
                            width: "678px",
                            height: "446",
                            top: "1456px",
                            left: "381px",
                            opacity: "1"
                        }}>
                        <h5 className="text-center mb-4" style={{color:"#39A108", fontSize:"32px", fontWeight:"700"}}>Contact Us</h5>
                        <Form>
                            <Row>
                                <Col md={6}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Control type="text" placeholder="Your Name (*)"/>
                                </Form.Group>
                                </Col>
                                <Col md={6}>
                               <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Control type="email" placeholder="Your Email (*)"/>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                <Form.Group controlId="formphone" className="mb-3">
                                    <Form.Control type="text" placeholder="Phone"></Form.Control>
                                </Form.Group>
                                </Col>
                                <Col md={6}>
                                <Form.Group controlId="formbusiness-Deparment" className="mb-3">
                                    <Form.Control type="text" placeholder="Business Department"></Form.Control>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="formmessage" className="mb-4">
                                <Form.Control as={"textarea"} rows={4} placeholder="Your Question"></Form.Control>
                            </Form.Group>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success" 
                                style={{
                                    borderRadius:"20px", 
                                    backgroundColor:"white",
                                    borderColor:"#39A108", 
                                    color:"#39A108",
                                    lineHeight:"100%",
                                    fontWeight:"800",
                                    letterSpacing:"0.05em",
                                    boxShadow:"0px 4px 6.1px 0px #5BC559"
                                }}>SUBMIT</button>
                            </div>
                        </Form>
                        </Col>
                    </Row>
                    </div>
                </Container>
            </Container>

            <Footer />
        </>
    )
}

export default Contact