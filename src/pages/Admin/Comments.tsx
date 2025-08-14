import React, { useState, useEffect } from "react";
import "../css/Comments.css";


interface Feedback {
  customerId: number;
  feedback: string;
}

const Comments: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="feedback-card">
      <div className="feedback-header">Feedback</div>

      {loading && <p className="feedback-loading">Loading...</p>}
      {error && <p className="feedback-error">{error}</p>}

      <table className="feedback-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0 ? (
            <tr>
              <td colSpan={2} className="feedback-empty">
                No feedback available.
              </td>
            </tr>
          ) : (
            feedbacks.map((fb, index) => (
              <tr key={index}>
                <td>{fb.customerId}</td>
                <td>{fb.feedback}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Comments;
