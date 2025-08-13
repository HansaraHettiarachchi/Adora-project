import React, { useState, useEffect } from "react";
import { Card, Form, Button, Table, Spinner, Alert } from "react-bootstrap";

interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://your-backend-api.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Card className="border-success">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Control
              type="text"
              placeholder="Search"
              style={{ width: "200px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="success">Add New Plant +</Button>
          </div>

          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && (
            <Table bordered hover size="sm">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Plant Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.stock}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>
                        <Button variant="outline-success" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Products;
