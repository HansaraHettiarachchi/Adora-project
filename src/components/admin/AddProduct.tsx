import { Button, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { RiImageAddFill } from "react-icons/ri";

interface Props {
    show: boolean,
    handleClose: () => void,
}

export default function AddProduct({ show, handleClose }: Props) {
    return (
        <Modal show={show} centered onHide={handleClose}>
            {/* <Modal.Header closeButton className='border border-0 d-flex justify-content-center'>
                <Modal.Title  >Modal heading</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <Container className="p-1">
                    <Container>
                        <button className='btn-close float-end' onClick={handleClose}></button>
                        <h5 className='text-center fw-bold'><span style={{ color: "rgba(117, 243, 78, 1)" }}>ADD </span>PRODUCT</h5>
                    </Container>

                    <Container
                        className='mt-4 d-flex justify-content-center align-items-center rounded-4'
                        style={{ cursor: "pointer", backgroundColor: "#eeeeeeff", width: "200px", height: "200px" }}
                        onClick={() => document.getElementById('product-image-input')?.click()}
                    >
                        <RiImageAddFill size={50} />
                        <Form.Control
                            type="file"
                            id="product-image-input"
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </Container>
                    <h6 className='text-center mt-1'>Add Picture</h6>

                    <Container fluid className='mt-3'>
                        <Row className="mb-2">
                            <Col>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="salvenia" style={{ backgroundColor: "#eeeeeeff" }} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Price</Form.Label>
                                    <InputGroup className="mb-3" >
                                        <Form.Control
                                            placeholder="129"
                                            aria-label="Recipient's username"
                                            className='border-end-0'
                                            aria-describedby="basic-addon2"
                                            style={{ backgroundColor: "#eeeeeeff" }}
                                        />
                                        <InputGroup.Text id="basic-addon2" className='fw-bolder border-start-0' style={{ backgroundColor: "#eeeeeeff" }}>$</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Form.Label>Binomial Type</Form.Label>
                                <Form.Select aria-label="Default select example" style={{ backgroundColor: "#eeeeeeff" }}>
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" placeholder="285" style={{ backgroundColor: "#eeeeeeff" }} />
                            </Col>

                        </Row>

                        <Container fluid className='p-0 mt-4'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Leave description here"
                                style={{ height: '100px', backgroundColor: "#eeeeeeff" }}
                            />
                        </Container>

                        <Container className='d-flex justify-content-center mt-3'>
                            <Button className='fs-5 fw-bold py-2 px-5' style={{ backgroundColor: "#23B540" }}>Add Product</Button>
                        </Container>

                    </Container>
                </Container>

            </Modal.Body>


        </Modal>
    )
}
