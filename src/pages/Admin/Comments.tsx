import React, { useState, useEffect } from "react";
import { Card, Table, Spinner, Alert } from "react-bootstrap";

interface Feedback {
  customerId: string; 
  feedback: string;
}

const Comments: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Commented out backend call for now
    /*
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://your-backend-api.com/feedback");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const data: Feedback[] = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
    */

    // Dummy data instead of API
    setLoading(true);
    setTimeout(() => {
      setFeedbacks([
        { customerId: "C101", feedback: "Great service, very satisfied!" },
        { customerId: "C102", feedback: "Delivery was late but product was good." },
        { customerId: "C103", feedback: "Highly recommend this store!" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Card className="mb-4 border-success">
      <Card.Body>
        <h5 className="mb-3" style={{ color: "#095C1F" }}>Customer Feedback</h5>

        {loading && (
          <div className="text-center my-3">
            <Spinner animation="border" variant="success" />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Table bordered hover responsive size="sm" style={{ border: "1px solid #2BED45", }} >
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Customer ID</th>
                <th style={{ textAlign: "center" }}>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center">
                    No feedback available.
                  </td>
                </tr>
              ) : (
                feedbacks.map((fb, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{fb.customerId}</td>
                    <td>{fb.feedback}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default Comments;
