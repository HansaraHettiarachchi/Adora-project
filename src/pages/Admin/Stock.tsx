import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Dropdown, DropdownButton, Modal, Table } from 'react-bootstrap'
import axiosInstance, { baseURL } from '../../util/axiosUtil';
import type { BatchImage, CartFullProductDetails } from '../../types/EntitiesTypes';
import { IoIosImages } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import AddStock from './AddStock';
import { FiEye } from 'react-icons/fi';

interface Props {
    handleClose: () => void;
    show: boolean;
    productId: number;
}

export default function Stock({ handleClose, show, productId }: Props) {
    const [prodcutData, setProductData] = useState<CartFullProductDetails>();
    const [showImagesModal, setShowImagesModal] = useState<boolean>(false);
    const [showAddStock, setShowAddStock] = useState<boolean>(false);
    const [selectedBatchImages, setSelectedBatchImages] = useState<string[]>([]);
    const selectedBatch = useRef<number>(0);


    useEffect(() => {
        axiosInstance.get("product/product-details/" + productId).then((res) => {
            if (res.status == 200) {
                setProductData(res.data);
            }
        }).catch((e) => console.error(e));
    }, [productId]);

    const handleShowImages = (images: string[]) => {
        setSelectedBatchImages(images);
        setShowImagesModal(true);
    };

    return (
        <>
            <AddStock show={showAddStock} productId={productId} handleClose={() => { setShowAddStock(false) }} stockId={selectedBatch.current} />
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton className='border-0 h6 mb-0'>
                    <Modal.Title>{prodcutData?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='mt-0'>
                    {/* <h5>{prodcutData?.name}</h5> */}
                    <Container className='d-flex justify-content-end mb-3'><Button onClick={() => {
                        selectedBatch.current = 0;
                        setShowAddStock(true);
                    }} size='sm' style={{ backgroundColor: "#105f1bff" }}><FaPlus /> Add Stock</Button></Container>

                    <Table responsive bordered className='border' style={{ border: "1px solid #2BED45", }} >
                        <thead>
                            <tr>
                                <th></th>
                                <th>Code</th>
                                <th>Cost (LKR)</th>
                                <th>Price (LKR)</th>
                                <th className='text-center'>Qty</th>
                                <th className='text-center'>Size</th>
                                <th>Total Cost (LKR)</th>
                                <th>Total Price (LKR)</th>
                                <th className='text-center'>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prodcutData?.batches.map((item, i) => (
                                <tr key={item.code}>
                                    <td className='text-center align-middle px-3'>{i + 1}</td>
                                    <td>{item.code}</td>
                                    <td className='text-end'>{item.cost.toFixed(2)}</td>
                                    <td className='text-end'>{item.price.toFixed(2)}</td>
                                    <td className='text-center'>{item.qty}</td>
                                    <td className='text-center'>{item.size.name}</td>
                                    <td className='text-end'>{(item.qty * item.cost).toFixed(2)}</td>
                                    <td className='text-end'>{(item.qty * item.price).toFixed(2)}</td>
                                    <td className='text-center align-middle' style={{ cursor: "pointer" }}>
                                        <DropdownButton id="dropdown-basic-button" title="Actions" variant="">
                                            <Dropdown.Item className="text-center" onClick={() => {
                                                selectedBatch.current = item.id;
                                                setShowAddStock(true);
                                            }}><FiEye style={{ cursor: "pointer", color: "#0d81e0ff", fontSize: "18px" }} /></Dropdown.Item>
                                            <Dropdown.Item className="text-center" onClick={() => handleShowImages(
                                                Array.isArray(item.images)
                                                    ? item.images.map((img: BatchImage) => img.name)
                                                    : []
                                            )}><IoIosImages size={20} /></Dropdown.Item>
                                        </DropdownButton>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer className='border-0'>

                </Modal.Footer>
            </Modal>

            {/* Images Modal */}
            <Modal show={showImagesModal} onHide={() => setShowImagesModal(false)} centered  >
                <Modal.Body>
                    {selectedBatchImages.length === 0 ? (
                        <div className='text-center text-muted'>No images available for this batch.</div>
                    ) : (
                        <div className='d-flex flex-wrap justify-content-center gap-3'>
                            {selectedBatchImages.map((img, idx) => (
                                <div key={idx} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8, background: '#fafafa' }}>
                                    <img src={baseURL + "uploads/" + img} style={{ maxWidth: 200, objectFit: 'cover', borderRadius: 6 }} />
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}
