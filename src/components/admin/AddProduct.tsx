import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axiosInstance from '../../util/axiosUtil';
import Swal from 'sweetalert2';

interface Props {
    show: boolean,
    handleClose: () => void,
}

export default function AddProduct({ show, handleClose }: Props) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [motherPlantTypes, setMotherPlantTypes] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [motherPlantTypeId, setMotherPlantTypeId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!show) return;
        setError('');
        setSuccess('');
        setLoading(true);
        Promise.all([
            axiosInstance.get('product/get-all-mother-plant-type'),
            axiosInstance.get('product/get-all-category')
        ])
            .then(([motherRes, catRes]) => {
                setMotherPlantTypes(motherRes.data?.data || []);
                setCategories(catRes.data?.data || []);
            })
            .catch(() => {
                setError('Failed to load select options');
            })
            .finally(() => setLoading(false));
    }, [show]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation: all fields required
        if (!name.trim() || !desc.trim() || !motherPlantTypeId || !categoryId) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name,
                desc,
                mother_plant_type_id: Number(motherPlantTypeId),
                category_id: Number(categoryId),
                isActive
            };
            const res = await axiosInstance.post('product/create-product', payload);
            if (res.data?.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product created successfully',
                    timer: 2000,
                    showConfirmButton: false,
                    didClose: handleClose
                });
                setSuccess('Product created successfully');
                setName('');
                setDesc('');
                setMotherPlantTypeId('');
                setCategoryId('');
            } else {
                setError(res.data?.message || 'Failed to create product');
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} centered onHide={handleClose}>
            <Modal.Body>
                <Container className="p-1">
                    <Container>
                        <button className='btn-close float-end' onClick={handleClose}></button>
                        <h5 className='text-center fw-bold'><span style={{ color: "rgba(117, 243, 78, 1)" }}>ADD </span>PRODUCT</h5>
                    </Container>
                    <Container fluid className='mt-3'>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-2">
                                <Col>
                                    <Form.Group controlId="formProductName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Plant Name"
                                            style={{ backgroundColor: "#eeeeeeff" }}
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <Form.Group controlId="formMotherPlantType">
                                        <Form.Label>Bio Medicle Type</Form.Label>
                                        <Form.Select
                                            aria-label="Select Bio Medicle Type"
                                            style={{ backgroundColor: "#eeeeeeff" }}
                                            value={motherPlantTypeId}
                                            onChange={e => setMotherPlantTypeId(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Bio Medicle Type</option>
                                            {motherPlantTypes.map((type: any) => (
                                                <option key={type.id} value={type.id}>{type.name || type.binomial_type || type.type}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formCategory">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select
                                            aria-label="Select Category"
                                            style={{ backgroundColor: "#eeeeeeff" }}
                                            value={categoryId}
                                            onChange={e => setCategoryId(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat: any) => (
                                                <option key={cat.id} value={cat.id}>{cat.name || cat.category}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Container fluid className='p-0 mt-4'>
                                <Form.Group controlId="formDesc">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter product description"
                                        style={{ height: '100px', backgroundColor: "#eeeeeeff" }}
                                        value={desc}
                                        onChange={e => setDesc(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Container>
                            {error && <div className="text-danger mt-2">{error}</div>}
                            {success && <div className="text-success mt-2">{success}</div>}
                            <Container className='d-flex justify-content-center mt-3'>
                                <Button
                                    className='fs-5 fw-bold py-2 px-5'
                                    style={{ backgroundColor: "#23B540" }}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Adding...' : 'Add Product'}
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
