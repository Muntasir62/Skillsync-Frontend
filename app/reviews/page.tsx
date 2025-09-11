"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface Review {
  id: number;
  courseId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://localhost:4000/admin/reviews", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(response.data);
    } catch (err: any) {
      setError("Failed to fetch reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:4000/admin/reviews/${reviewId}/delete`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setReviews(reviews.filter(review => review.id !== reviewId));
      alert("Review deleted successfully");
    } catch (err: any) {
      setError("Failed to delete review");
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading reviews...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>Welcome To SkillSync</h1>
        <Image
          src="/reviews.jpg"
          width={300}
          height={300}
          alt="Review management"
        />
      </header>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Review Management</h1>
        <Link href="/home">
          <button>Back To Homepage</button>
        </Link>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course ID</th>
            <th>User ID</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Created At</th>
            <th>Actions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.courseId}</td>
              <td>{review.userId}</td>
              <td>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</td>
              <td>{review.comment.substring(0, 50)}...</td>
              <td>{new Date(review.createdAt).toLocaleDateString()}</td>
              <td>
                <button 
                  className="danger" 
                  onClick={() => deleteReview(review.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link href={`/reviews/${review.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {reviews.length === 0 && (
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <p>No reviews found.</p>
        </div>
      )}
    </div>
  );
}