"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface Course {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: { id: number; name: string };
  createdAt: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("access_token");
      
      const adminId = 1; 
      const response = await axios.get(`http://localhost:4000/admin/courses/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data);
    } catch (err: any) {
      setError("Failed to fetch courses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const approveCourse = async (courseId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(`http://localhost:4000/admin/courses/${courseId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCourses(courses.map(course => 
        course.id === courseId ? { ...course, status: 'approved' } : course
      ));
      alert("Course approved successfully");
    } catch (err: any) {
      setError("Failed to approve course");
      console.error(err);
    }
  };

  const rejectCourse = async (courseId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      const adminId = 1; 
      await axios.patch(`http://localhost:4000/admin/${adminId}/courses/${courseId}/reject`, {
        reason: "Not meeting quality standards"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCourses(courses.map(course => 
        course.id === courseId ? { ...course, status: 'rejected' } : course
      ));
      alert("Course rejected successfully");
    } catch (err: any) {
      setError("Failed to reject course");
      console.error(err);
    }
  };

  const deleteCourse = async (courseId: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:4000/admin/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCourses(courses.filter(course => course.id !== courseId));
      alert("Course deleted successfully");
    } catch (err: any) {
      setError("Failed to delete course");
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading courses...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>Welcome To SkillSync</h1>
        <Image
          src="/courses.jpg"
          width={300}
          height={300}
          alt="Course management"
        />
      </header>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Course Management</h1>
        <div>
          <Link href="/courses/create" style={{ marginRight: "10px" }}>
            <button>Create New Course</button>
          </Link>
          <Link href="/home">
            <button>Back To Homepage</button>
          </Link>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Approved By</th>
            <th>Actions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>{course.description.substring(0, 50)}...</td>
              <td>
                <span className={`status-${course.status}`}>
                  {course.status}
                </span>
              </td>
              <td>{course.approvedBy?.name || 'N/A'}</td>
              <td>
                {course.status === 'pending' && (
                  <>
                    <button onClick={() => approveCourse(course.id)}>
                      Approve
                    </button>
                    <button onClick={() => rejectCourse(course.id)}>
                      Reject
                    </button>
                  </>
                )}
                <button 
                  className="danger" 
                  onClick={() => deleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link href={`/courses/${course.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {courses.length === 0 && (
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <p>No courses found.</p>
        </div>
      )}
    </div>
  );
}