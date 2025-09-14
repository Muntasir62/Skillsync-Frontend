"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface Course {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy: {
    id: number;
    name: string;
  } | null;
  createdAt: string;
}

export default function CourseDetails() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Authentication required");
          return;
        }

       
        const adminId = localStorage.getItem("admin_id") || "1";
        const response = await axios.get(
          `http://localhost:4000/admin/courses/${adminId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

       
        const foundCourse = response.data.find((c: Course) => c.id === Number(params.id));
        if (!foundCourse) {
          throw new Error("Course not found");
        }
        
        setCourse(foundCourse);
      } catch (err: any) {
        console.error("Error fetching course:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCourse();
    }
  }, [params.id]);

  if (loading) return <div className="p-6">Loading course details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!course) return <div className="p-6">Course not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Course Details</h1>
        <Image
          src="/courses.jpg"
          width={200}
          height={200}
          alt="Course details"
          className="mx-auto"
        />
      </header>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="font-semibold text-white">ID:</div>
          <div className="text-white">{course.id}</div>

          <div className="font-semibold text-white">Title:</div>
          <div className="text-white">{course.title}</div>

          <div className="font-semibold text-white">Description:</div>
          <div className="text-white">{course.description}</div>

          <div className="font-semibold text-white">Status:</div>
          <div>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              course.status === 'approved' 
                ? "bg-green-600 text-white border-2 border-green-700"
                : course.status === 'rejected'
                ? "bg-red-600 text-white border-2 border-red-700"
                : "bg-yellow-600 text-white border-2 border-yellow-700"
            }`}>
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </span>
          </div>

          <div className="font-semibold text-white">Approved By:</div>
          <div className="text-white">{course.approvedBy?.name || 'N/A'}</div>

          <div className="font-semibold text-white">Created At:</div>
          <div className="text-white">
            {new Date(course.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Link href="/courses" className="flex-1">
            <button 
              type="button"
              className="w-full bg-gray-500 text-white p-3 rounded hover:bg-gray-600 transition-colors"
            >
              Back to Courses
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}