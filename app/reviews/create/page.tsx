/*"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";

const reviewSchema = z.object({
  courseId: z.string().regex(/^[0-9]+$/, "Course ID must be a number"),
  userId: z.string().regex(/^[0-9]+$/, "User ID must be a number"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

type ReviewForm = z.infer<typeof reviewSchema>;

export default function CreateReview() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 1 },
  });

  const onSubmit = async (data: ReviewForm) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/admin/reviews`,
        { ...data, courseId: parseInt(data.courseId), userId: parseInt(data.userId) },
        { withCredentials: true }
      );
      if (response.status === 201) {
        alert("Review created successfully!");
        router.push("/reviews");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create review");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Create New Review</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Course ID</label>
          <input
            type="text"
            {...register("courseId")}
            placeholder="Enter course ID"
            className="w-full p-2 border rounded"
            disabled={isSubmitting}
          />
          {errors.courseId && <span className="text-red-500 text-sm">{errors.courseId.message}</span>}
        </div>
        
        <div>
          <label className="block text-sm font-medium">User ID</label>
          <input
            type="text"
            {...register("userId")}
            placeholder="Enter user ID"
            className="w-full p-2 border rounded"
            disabled={isSubmitting}
          />
          {errors.userId && <span className="text-red-500 text-sm">{errors.userId.message}</span>}
        </div>
        
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <input
            type="number"
            {...register("rating", { valueAsNumber: true })}
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            disabled={isSubmitting}
          />
          {errors.rating && <span className="text-red-500 text-sm">{errors.rating.message}</span>}
        </div>
        
        <div>
          <label className="block text-sm font-medium">Comment</label>
          <textarea
            {...register("comment")}
            placeholder="Enter review comment"
            className="w-full p-2 border rounded"
            rows={4}
            disabled={isSubmitting}
          />
          {errors.comment && <span className="text-red-500 text-sm">{errors.comment.message}</span>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Creating Review..." : "Create Review"}
        </button>
      </form>
      
      <div className="text-center mt-4">
        <Link href="/reviews">
          <button className="text-blue-600 hover:underline">Back to Reviews</button>
        </Link>
      </div>
    </div>
  );
}
  */