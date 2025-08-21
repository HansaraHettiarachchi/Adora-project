import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Modal, Row, Button } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';
import axiosUtil, { baseURL } from '../../util/axiosUtil';
import Swal from 'sweetalert2';

interface Props {
    handleClose: () => void;
    show: boolean;
    productId: number;
    stockId?: number;
}

interface SizeType {
    id: number;
    size: string;
    short_key: string;
}

interface StockType {
    product_id: number;
    qty: number;
    cost: number;
    price: number;
    size_id: number;
    description?: string;
}

export default function AddStock(props: Props) {
    const { handleClose, show, stockId = 0, productId } = props;
    const [sizes, setSizes] = useState<SizeType[]>([]);
    const [form, setForm] = useState<{
        size_id: number | '';
        qty: number | '';
        cost: number | '';
        price: number | '';
        description: string;
        images: File[];
        imagePreviews: string[];
    }>({
        size_id: '',
        qty: '',
        cost: '',
        price: '',
        description: '',
        images: [],
        imagePreviews: [],
    });
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch sizes
    useEffect(() => {
        axiosUtil.get('product/get-all-size')
            .then(res => {
                if (res.status === 200 && Array.isArray(res.data?.data)) {
                    setSizes(res.data.data);
                }
            })
            .catch(() => setSizes([]));
    }, []);

    // Load stock data if editing
    useEffect(() => {
        if (stockId && stockId !== 0) {
            axiosUtil.get(`stock/batch/${stockId}`)
                .then(res => {
                    if (res.status === 200 && res.data?.data) {
                        const batch = res.data.data;
                        setForm(f => ({
                            ...f,
                            size_id: batch.size_id,
                            qty: batch.qty,
                            cost: batch.cost,
                            price: batch.price,
                            description: batch.desc || '',
                            images: [],
                            imagePreviews: batch.product_images ? batch.product_images.map((img: any) => img.name) : [],
                        }));
                    }
                })
                .catch(() => {
                    // Optionally handle error
                });
        }
    }, [stockId]);

    const handleImageClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArr = Array.from(files);
            setForm(f => ({
                ...f,
                images: fileArr,
                imagePreviews: fileArr.map(file => URL.createObjectURL(file)),
            }));
        }
    };

    const handleChange = (field: string, value: any) => {
        setForm(f => ({ ...f, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.size_id || !form.qty || !form.cost || !form.price) return;
        setLoading(true);
        const stockData: StockType = {
            product_id: productId,
            qty: Number(form.qty),
            cost: Number(form.cost),
            price: Number(form.price),
            size_id: Number(form.size_id),
            description: form.description,
        };
        if (stockId && stockId !== 0) {
            (stockData as any).id = stockId;
        }
        const formData = new FormData();
        form.images.forEach(img => formData.append('images', img));
        formData.append('data', JSON.stringify(stockData));
        try {
            const res = await axiosUtil.post('stock/set-stock', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Stock added successfully!',
                    timer: 1500,
                    showConfirmButton: false
                }).then(handleClose);
            }
        } catch (err) {
            // Optionally handle error
        } finally {
            setLoading(false);
        }
    };

    const getApiImageUrl = (src: string) => {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        return `${baseUrl}/${src}`;
    };

    return (
        <Modal show={show} onHide={handleClose} className='mt-5'>
            <Modal.Header closeButton>
                <Modal.Title>{stockId && stockId !== 0 ? 'Edit Stock' : 'Add Stock'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Form onSubmit={handleSubmit}>
                        <Row className='mb-3'>
                            <Col md={4} className='mb-3'>
                                <Form.Label>Select Size</Form.Label>
                                <Form.Select value={form.size_id} onChange={e => handleChange('size_id', Number(e.target.value))} required>
                                    <option value=''>Select size</option>
                                    {sizes.map(size => (
                                        <option key={size.id} value={size.id}>{size.size} ({size.short_key})</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={4} className='mb-3'>
                                <Form.Label>Qty</Form.Label>
                                <Form.Control type='number' value={form.qty} onChange={e => handleChange('qty', e.target.value ? Number(e.target.value) : '')} required min={1} />
                            </Col>
                            <Col md={4} className='mb-3'>
                                <Form.Label>Cost</Form.Label>
                                <Form.Control type='number' value={form.cost} onChange={e => handleChange('cost', e.target.value ? Number(e.target.value) : '')} required min={0} />
                            </Col>
                            <Col md={4} className='mb-3'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='number' value={form.price} onChange={e => handleChange('price', e.target.value ? Number(e.target.value) : '')} required min={0} />
                            </Col>
                            <Col md={12} className='mb-3'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" value={form.description} onChange={e => handleChange('description', e.target.value)} />
                            </Col>
                            <Col md={12} className='mb-3'>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dashed #ccc', borderRadius: '16px', minHeight: '150px', position: 'relative', background: '#fafafa' }}>
                                    <input
                                        type='file'
                                        multiple
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                    {form.imagePreviews.length === 0 ? (
                                        <Button variant='light' style={{ borderRadius: '50%', padding: '24px', boxShadow: '0 2px 8px #eee', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} onClick={handleImageClick}>
                                            <FaImage size={40} color='#888' />
                                        </Button>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                                            {form.imagePreviews.map((src, idx) => (
                                                <React.Fragment key={idx}>
                                                    {src.startsWith('batch/') ? (
                                                        <img src={baseURL + "uploads/" + src} alt={`preview-${idx}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                                                    ) : (
                                                        <img src={src} alt={`preview-${idx}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                            <Button variant='outline-secondary' style={{ borderRadius: '50%', padding: '12px', height: '48px', width: '48px', alignSelf: 'center' }} onClick={handleImageClick}>
                                                <FaImage size={24} color='#888' />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col md={12} className='text-end'>
                                <Button type='submit' disabled={loading} variant='primary'>
                                    {loading ? (stockId && stockId !== 0 ? 'Updating...' : 'Saving...') : (stockId && stockId !== 0 ? 'Update Stock' : 'Save Stock')}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
