"use client";
import { useParams, useRouter } from "next/navigation";
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

export default function UserDetails() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/admin/users/${params.id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUser(response.data);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err.response?.data?.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  if (loading) return <div className="p-6">Loading user details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!user) return <div className="p-6">User not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <Image
          src="/users.png"
          width={200}
          height={200}
          alt="User details"
          className="mx-auto"
        />
      </header>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="font-semibold">ID:</div>
          <div>{user.id}</div>

          <div className="font-semibold">Name:</div>
          <div>{user.name}</div>

          <div className="font-semibold">Email:</div>
          <div>{user.email}</div>

          <div className="font-semibold">Role:</div>
          <div className="capitalize">{user.role}</div>
          <div className="font-semibold text-black">Status:</div> {/* Changed from text-white */}
<div>
  <span className={`px-2 py-1 rounded text-sm font-medium ${
    user.isActive 
      ? "bg-green-600 text-white border-2 border-green-700" 
      : "bg-red-600 text-white border-2 border-red-700"
  }`}>
    {user.isActive ? "Active" : "Suspended"}
  </span>
</div>

<div className="font-semibold text-black">Verified:</div> {/* Changed from text-white */}
<div>
  <span className={`px-2 py-1 rounded text-sm font-medium ${
    user.isVerified 
      ? "bg-green-600 text-white border-2 border-green-700"
      : "bg-yellow-600 text-white border-2 border-yellow-700"
  }`}>
    {user.isVerified ? "Verified" : "Not Verified"}
  </span>
</div>
                   
        </div>
        <div className="flex gap-4 mt-6">
          <Link href="/users" className="flex-1">
            <button 
              type="button"
              className="w-full bg-gray-500 text-white p-3 rounded hover:bg-gray-600 transition-colors"
            >
              Back to Users List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}