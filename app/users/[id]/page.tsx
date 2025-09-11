"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'learner' | 'instructor';
  isActive: boolean;
  isVerified: boolean;
}

export default function User({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`http://localhost:4000/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (err: any) {
      setError("Failed to fetch user details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading user details...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
     <div className="container p-5 max-w-2xl mx-auto">
      <Image
        src="/users.png"
        width={200}
        height={200}
        alt="User details"
        className="mx-auto block"
      />
      
      <h1 className="text-center text-darker mt-4 mb-4">User Details</h1>
      
      <div className="card p-5 rounded-lg shadow-md">
        <p className="text-dark"><strong className="text-darker">ID:</strong> {user.id}</p>
        <p className="text-dark"><strong className="text-darker">Name:</strong> {user.name}</p>
        <p className="text-dark"><strong className="text-darker">Email:</strong> {user.email}</p>
        <p className="text-dark"><strong className="text-darker">Role:</strong> {user.role}</p>
        <p className="text-dark"><strong className="text-darker">Active Status:</strong> {user.isActive ? "Active" : "Suspended"}</p>
        <p className="text-dark"><strong className="text-darker">Verified Status:</strong> {user.isVerified ? "Verified" : "Not Verified"}</p>
      </div>
      
      <div className="text-center mt-4">
        <Link href="/users">
          <button>Back To Users</button>
        </Link>
      </div>
    </div>
  );
}
