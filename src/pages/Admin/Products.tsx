import React, { useState, useEffect } from "react";
import { Card, Form, Button, Table, Spinner, Alert, Image, Badge } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import AddProduct from "../../components/admin/AddProduct";

interface Product {
  id: string;
  image: string;
  name: string;
  stock: number;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddProduct, setShowProduct] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const dummyData: Product[] = [
          { id: "P001", image: "https://i01.hsncdn.com/is/image/HomeShoppingNetwork/rocs1200/-~20794210w.jpg", name: "Snake Plant", stock: 25, price: 15 },
          { id: "P002", image: "https://down-my.img.susercontent.com/file/7fc926c1ec48367f29f76cf5d9cc2596", name: "Aloe Vera", stock: 0, price: 12 },
          { id: "P003", image: "https://www.lillypad.com.au/images/products/8e2sj1z4dv.jpg", name: "Peace Lily", stock: 12, price: 20 },
          { id: "P004", image: "https://th.bing.com/th/id/R.b0165157754fe3703cb633b33696cb3b?rik=3MRs1Vej7oWy4w&riu=http%3a%2f%2fwww.bonsaiempire.com%2fimages%2fcheap-juniper-bonsai.jpg&ehk=fUeZMnuinGV2U%2fU5lBV60FheK%2bP8moF3e7MbWCZ8wNc%3d&risl=&pid=ImgRaw&r=0", name: "Bonsai Tree", stock: 0, price: 50 },
        ];
        setProducts(dummyData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

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
                    <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Plant Name</th>
                    <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Stock</th>
                    <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Price</th>
                    <th style={{ color: "#095C1F", borderBottom: "1px solid #2BED45", padding: "8px", textAlign: "center" }}>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", padding: "8px" }}>No products found.</td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td style={{ fontWeight: "bold", borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>{product.id}</td>
                        <td style={{ borderBottom: "1px solid black", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Image src={product.image} rounded style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }} />
                          {product.name}
                        </td>
                        <td style={{ borderBottom: "1px solid black", padding: "10px", textAlign: "center" }}>
                          {product.stock > 0 ? <Badge bg="success">Available</Badge> : <Badge bg="danger">Not Available</Badge>}
                        </td>
                        <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>
                          ${product.price}
                        </td>
                        <td style={{ borderBottom: "1px solid black", padding: "8px", textAlign: "center" }}>
                          <FaEdit style={{ cursor: "pointer", color: "#28a745", fontSize: "18px" }} />
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
            >
              Previous
            </Button>
            <span className="fw-bold" style={{ color: "#51984A" }}>
              {Array.from({ length: 5 }, (_, i) => (
                <React.Fragment key={i}>
                  {i !== 0 && " | "}
                  <b>{i + 1}</b>
                </React.Fragment>
              ))}
            </span>
            <Button
              variant="outline-none"
              size="sm"
              className="fw-bold"
              style={{ color: "#51984A" }}
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
