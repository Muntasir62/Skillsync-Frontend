"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("access_token");
      const adminId = localStorage.getItem("admin_id") || "1"; 
      
      const response = await axios.post(
        `http://localhost:4000/admin/courses/${adminId}`,
        { title, description, instructorId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 201) {
        alert("Course created successfully!");
        router.push("/courses");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create course");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Create New Course</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
            required
            minLength={5}
            disabled={loading}
          />
        </div>
        
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter course description"
            required
            minLength={10}
            rows={4}
            disabled={loading}
          />
        </div>
        
        <div>
          <label>Instructor ID:</label>
          <input
            type="text"
            value={instructorId}
            onChange={(e) => setInstructorId(e.target.value)}
            placeholder="Enter instructor ID (must start with 0)"
            required
            pattern="^0[0-9]*$"
            title="Must be an integer starting with 0"
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "Creating Course..." : "Create Course"}
        </button>
      </form>
      
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link href="/courses">
          <button>Back to Courses</button>
        </Link>
      </div>
    </div>
  );
}