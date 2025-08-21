// import React, { useState, useEffect } from "react";
// import { Table, Badge, Card, Modal, Button, Form } from "react-bootstrap";
// import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa";

// interface Product {
//   id: string;
//   name: string;
//   quantity: number;
//   batch?: string;
//   price?: number;
// }

// const Stocks: React.FC = () => {
//   const [expandedRows, setExpandedRows] = useState<string[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [show, setShow] = useState(false);
//   const [form, setForm] = useState({
//     product_id: "",
//     size_id: "",
//     qty: 0,
//     price: 0,
//     cost: 0,
//     code: "",
//   });

//   // fetch from backend instead of mock data
//   useEffect(() => {
//     fetch("http://localhost:3000/api/stocks")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch(() => {
//         // fallback mock data if backend not connected
//         setProducts([
//           { id: "P001", name: "Roses", quantity: 150, batch: "R1", price: 120 },
//           { id: "P002", name: "Tulips", quantity: 80, batch: "T1", price: 100 },
//           { id: "P003", name: "Lilies", quantity: 60, batch: "L1", price: 90 },
//         ]);
//       });
//   }, []);

//   const toggleRow = (id: string) => {
//     setExpandedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const getQuantityBadge = (qty: number) => {
//     if (qty > 100) return <Badge bg="success">{qty}</Badge>;
//     if (qty > 50) return <Badge bg="warning">{qty}</Badge>;
//     return <Badge bg="danger">{qty}</Badge>;
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     await fetch("http://localhost:3000/api/add-stock", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     setShow(false);

//     // refresh products after adding
//     fetch("http://localhost:3000/api/stocks")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   };

//   return (
//     <div className="p-4">
//       <Card className="shadow-sm" style={{ borderRadius: "12px" }}>
//         <Card.Body>
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h4 style={{ color: "#2E7D32" }}>Stock Overview</h4>
//             <Button variant="success" onClick={() => setShow(true)}>
//               <FaPlus className="me-2" />
//               Add Stock
//             </Button>
//           </div>

//           <Table hover responsive style={{ borderRadius: "12px" }}>
//             <thead style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
//               <tr>
//                 <th>Product Name</th>
//                 <th className="text-center">Quantity</th>
//                 <th style={{ width: "50px" }}></th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <React.Fragment key={product.id}>
                  
//                   <tr
//                     style={{
//                       fontWeight: 600,
//                       cursor: "pointer",
//                       backgroundColor: "#F1F8F2",
//                     }}
//                     onClick={() => toggleRow(product.id)}
//                   >
//                     <td>{product.name}</td>
//                     <td className="text-center">
//                       {getQuantityBadge(product.quantity)}
//                     </td>
//                     <td className="text-center">
//                       {expandedRows.includes(product.id) ? (
//                         <FaChevronUp />
//                       ) : (
//                         <FaChevronDown />
//                       )}
//                     </td>
//                   </tr>

                  
//                   {expandedRows.includes(product.id) && (
//                     <tr>
//                       <td colSpan={3} style={{ padding: "12px" }}>
//                         <div
//                           style={{
//                             backgroundColor: "#F0FFF4",
//                             borderRadius: "8px",
//                             padding: "12px 20px",
//                           }}
//                         >
//                           <div style={{ marginBottom: "8px" }}>
//                             <strong>Current Quantity:</strong>{" "}
//                             {getQuantityBadge(product.quantity)}
//                           </div>
//                           <div style={{ marginBottom: "8px" }}>
//                             <strong>Batch:</strong> {product.batch || "-"}
//                           </div>
//                           <div style={{ marginBottom: "8px" }}>
//                             <strong>Price:</strong> ${product.price || "-"}
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>

//       {/* Add Stock Modal */}
//       <Modal show={show} onHide={() => setShow(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Stock</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Product ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="product_id"
//                 value={form.product_id}
//                 onChange={handleChange}
//                 placeholder="Enter Product ID"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Size ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="size_id"
//                 value={form.size_id}
//                 onChange={handleChange}
//                 placeholder="Enter Size ID"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Batch Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="code"
//                 value={form.code}
//                 onChange={handleChange}
//                 placeholder="Batch Code"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="qty"
//                 value={form.qty}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="price"
//                 value={form.price}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Cost</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="cost"
//                 value={form.cost}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShow(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleSubmit}>
//             Save Stock
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Stocks;
