"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface Course {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: { name: string };
  createdAt: string;
  rejectionReason?: string;
}

export default function Course({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem("access_token");
   
      const adminResponse = await axios.get(`http://localhost:4000/admin/courses/${id}/approved-by`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      
      setCourse({
        id: parseInt(id),
        title: "Sample Course Title", 
        description: "This is a detailed description of the course content, learning objectives, and requirements.",
        status: "approved",
        approvedBy: adminResponse.data,
        createdAt: new Date().toISOString(),
        rejectionReason: undefined
      });
    } catch (err: any) {
      setError("Failed to fetch course details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading course details...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  if (!course) return <div style={{ padding: "20px" }}>Course not found</div>;

  return (
    <div className="container p-5 max-w-3xl mx-auto">
      <Image
        src="/courses.jpg"
        width={300}
        height={200}
        alt="Course details"
        className="mx-auto block"
      />
      
      <h1 className="text-center text-darker mt-4 mb-4">Course Details</h1>
      
      <div className="card p-5 rounded-lg shadow-md">
        <p className="text-dark"><strong className="text-darker">ID:</strong> {course.id}</p>
        <p className="text-dark"><strong className="text-darker">Title:</strong> {course.title}</p>
        <p className="text-dark"><strong className="text-darker">Description:</strong> {course.description}</p>
        <p className="text-dark"><strong className="text-darker">Status:</strong> <span className={`status-${course.status}`}>{course.status}</span></p>
        <p className="text-dark"><strong className="text-darker">Approved By:</strong> {course.approvedBy?.name || 'N/A'}</p>
        <p className="text-dark"><strong className="text-darker">Created:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
        {course.rejectionReason && (
          <p className="text-dark"><strong className="text-darker">Rejection Reason:</strong> {course.rejectionReason}</p>
        )}
      </div>
      
      <div className="text-center mt-4">
        <Link href="/courses">
          <button>Back To Courses</button>
        </Link>
      </div>
    </div>
  );
}
