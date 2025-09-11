"use client";
import { use } from "react";
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

export default function Review({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReview();
  }, [id]);

  const fetchReview = async () => {
    try {
      const token = localStorage.getItem("access_token");
    
      setReview({
        id: parseInt(id),
        courseId: 101,
        userId: 202,
        rating: 4,
        comment: "This course was very informative and well-structured. The instructor explained complex concepts clearly and provided practical examples that helped reinforce the learning. The only downside was that some sections felt a bit rushed.",
        createdAt: new Date().toISOString()
      });
    } catch (err: any) {
      setError("Failed to fetch review details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading review details...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  if (!review) return <div style={{ padding: "20px" }}>Review not found</div>;

  return (
    <div className="container p-5 max-w-3xl mx-auto">
      <Image
        src="/reviews.jpg"
        width={300}
        height={200}
        alt="Review details"
        className="mx-auto block"
      />
      
      <h1 className="text-center text-darker mt-4 mb-4">Review Details</h1>
      
      <div className="card p-5 rounded-lg shadow-md">
        <p className="text-dark"><strong className="text-darker">ID:</strong> {review.id}</p>
        <p className="text-dark"><strong className="text-darker">Course ID:</strong> {review.courseId}</p>
        <p className="text-dark"><strong className="text-darker">User ID:</strong> {review.userId}</p>
        <p className="text-dark"><strong className="text-darker">Rating:</strong> {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
        <p className="text-dark"><strong className="text-darker">Comment:</strong> {review.comment}</p>
        <p className="text-dark"><strong className="text-darker">Created:</strong> {new Date(review.createdAt).toLocaleString()}</p>
      </div>
      
      <div className="text-center mt-4">
        <Link href="/reviews">
          <button>Back To Reviews</button>
        </Link>
      </div>
    </div>
  );
}