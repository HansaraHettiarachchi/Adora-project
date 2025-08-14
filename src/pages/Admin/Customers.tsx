import React, { useState, useEffect } from "react";
import "../css/Customers.css";

interface Customer {
  id: number;
  name: string;
  email: string;
  contact: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://your-backend-api.com/customers");
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data: Customer[] = await response.json();
        setCustomers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.includes(search)
  );

  return (
    <div className="customers-card">
      <div className="customers-header">
        <h3>Customers</h3>
        <div className="customers-controls">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>All Customers</button>
        </div>
      </div>

      {loading && <p className="customers-loading">Loading...</p>}
      {error && <p className="customers-error">{error}</p>}

      <table className="customers-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length === 0 ? (
            <tr>
              <td colSpan={5} className="customers-empty">
                No customers found.
              </td>
            </tr>
          ) : (
            filteredCustomers.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.id}</td>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.contact}</td>
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="customers-pagination">
        <button>Previous</button>
        <span>1 | 2 | 3 | 4 | 5</span>
        <button>Next</button>
      </div>
    </div>
  );
};

export default Customers;
