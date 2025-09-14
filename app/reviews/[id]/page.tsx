"use client";
import { useParams, useRouter } from "next/navigation";
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

export default function ReviewDetails() {
  const params = useParams();
  const router = useRouter();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/admin/reviews/${params.id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setReview(response.data);
      } catch (err: any) {
        console.error("Error fetching review:", err);
        setError(err.response?.data?.message || "Failed to fetch review details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReview();
    }
  }, [params.id]);

  if (loading) return <div className="p-6">Loading review details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!review) return <div className="p-6">Review not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Review Details</h1>
        <Image
          src="/reviews.jpg"
          width={200}
          height={200}
          alt="Review details"
          className="mx-auto"
        />
      </header>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="font-semibold text-white">ID:</div>
          <div className="text-white">{review.id}</div>

          <div className="font-semibold text-white">Course ID:</div>
          <div className="text-white">{review.courseId}</div>

          <div className="font-semibold text-white">User ID:</div>
          <div className="text-white">{review.userId}</div>

          <div className="font-semibold text-white">Rating:</div>
          <div className="text-white">
            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
          </div>

          <div className="font-semibold text-white">Comment:</div>
          <div className="text-white">{review.comment}</div>

          <div className="font-semibold text-white">Created At:</div>
          <div className="text-white">
            {new Date(review.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Link href="/reviews" className="flex-1">
            <button 
              type="button"
              className="w-full bg-gray-500 text-white p-3 rounded hover:bg-gray-600 transition-colors"
            >
              Back to Reviews List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}