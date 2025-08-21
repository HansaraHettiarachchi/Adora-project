import React, { useState, useEffect, useRef } from "react";
import { Card, Form, Button, Table, Spinner, Alert, Image, Badge, DropdownButton, Dropdown } from "react-bootstrap";
import { FaRecycle } from "react-icons/fa";
import sample_image from "../../assets/images/projectSampleImg/image.png";
import AddProduct from "../../components/admin/AddProduct";
import Swal from "sweetalert2";
import axiosInstance, { baseURL } from "../../util/axiosUtil";
import { IoTrashOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import Stock from "./Stock";


interface Product {
  id: number;
  name: string;
  desc: string;
  mother_plant_type_id: number;
  category_id: number;
  isActive: boolean;
  price: number;
  qty: number;
  imageUrl: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddProduct, setShowProduct] = useState<boolean>(false);
  const [showBatchs, setShowBatchs] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const selectedProductId = useRef<number>(0);


  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const params: any = {
          page,
          pageSize,
        };
        if (search) params.searchText = search;
        const response = await axiosInstance.get("product/products", { params });
        const result = response.data;
        if (result.status === 200) {
          setProducts(result.data);
          setTotal(result.pagination.total);
        } else {
          setError(result.message || "Failed to fetch products");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [page, pageSize, search]);

  const deleteProduct = async (pid: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d9534f',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`product/delete-product/${pid}`);
        if (res.data.status === 200) {
          Swal.fire('Deleted!', res.data.message, 'success');
          setProducts(products.filter(p => p.id !== pid));
        } else {
          Swal.fire('Cannot Delete', res.data.message || 'Product cannot be deleted due to related products.', 'error');
        }
      } catch (err: any) {
        const msg = err?.response?.data?.message || 'Product cannot be deleted due to related products.';
        Swal.fire('Cannot Delete', msg, 'error');
      }
    }
  }

  return (
    <div>
      <Stock show={showBatchs} productId={selectedProductId.current} handleClose={() => {
        selectedProductId.current = 0;
        setShowBatchs(false);
      }} />

      <AddProduct show={showAddProduct} handleClose={() => setShowProduct(!showAddProduct)} />
      <Card
        className="shadow-sm p-3"
        style={{ borderRadius: "10px", border: "1px solid #5EAE69" }}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold m-0" style={{ color: "#5EAE69" }}>
              Products
            </h4>
            <div className="d-flex align-items-center gap-2">
              <Form.Control
                type="text"
                placeholder="Search"
                style={{
                  width: "200px",
                  borderRadius: "10px",
                  border: "1px solid #2BED45",
                  boxShadow: "0 4px 8px rgba(66, 243, 50, 0.1)",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="outline-success"
                className="fw-semibold"
                style={{
                  width: "200px",
                  borderRadius: "10px",
                  color: "#51984A",
                  border: "1px solid #2BED45",
                  boxShadow: "0 4px 8px rgba(66, 243, 50, 0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#51984A";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#51984A";
                }}

                onClick={() => setShowProduct(!showAddProduct)}
              >
                Add New Product +
              </Button>
            </div>
          </div>

          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" />
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && (
            <div className="table-responsive">
              <Table
                responsive
                style={{
                  border: "1px solid #2BED45",
                  borderRadius: "10px",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  width: "100%",
                  padding: "1rem",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Product ID</th>
                    <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Name</th>
                    <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Description</th>
                    <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Total Qty</th>
                    <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Image</th>
                    <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "8px" }}>No products found.</td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td style={{ fontWeight: "bold", borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{product.id}</td>
                        <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{product.name}</td>
                        <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{product.desc}</td>
                        <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{product.qty}</td>
                        <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>
                          <Image src={product.imageUrl ? `${baseURL}uploads/${product.imageUrl}` : sample_image} rounded style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                        </td>
                        <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }} className="align-middle">
                          <DropdownButton id="dropdown-basic-button" title="Actions" variant="">
                            <Dropdown.Item className="text-center" onClick={() => {
                              selectedProductId.current = product.id;
                              setShowBatchs(true);
                            }}><FiEye style={{ cursor: "pointer", color: "#0d81e0ff", fontSize: "18px" }} /></Dropdown.Item>
                            <Dropdown.Item className="text-center"><IoTrashOutline title="Delete Product" style={{ cursor: "pointer", color: "#d9534f", fontSize: "18px" }} onClick={() => deleteProduct(product.id)} /></Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}

          <div className="p-2 d-flex flex-column flex-sm-row justify-content-center align-items-center mt-3 gap-2"
            style={{
              border: "1px solid #51984A",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <Button
              variant="outline-none"
              size="sm"
              className="fw-bold"
              style={{ color: "#51984A" }}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="fw-bold" style={{ color: "#51984A" }}>
              {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => (
                <React.Fragment key={i}>
                  {i !== 0 && " | "}
                  <b
                    style={{ cursor: "pointer", color: page === i + 1 ? "#095C1F" : undefined }}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </b>
                </React.Fragment>
              ))}
            </span>
            <Button
              variant="outline-none"
              size="sm"
              className="fw-bold"
              style={{ color: "#51984A" }}
              disabled={page === Math.ceil(total / pageSize) || total === 0}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Products;
