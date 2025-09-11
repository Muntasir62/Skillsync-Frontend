"use client";
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

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://localhost:4000/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err: any) {
      setError("Failed to fetch users. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:4000/admin/users/${userId}/delete`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user.id !== userId));
      alert("User deleted successfully");
    } catch (err: any) {
      setError("Failed to delete user");
      console.error(err);
    }
  };

  const suspendUser = async (userId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(`http://localhost:4000/admin/users/${userId}/suspend`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isActive: false } : user
      ));
      alert("User suspended successfully");
    } catch (err: any) {
      setError("Failed to suspend user");
      console.error(err);
    }
  };

  const verifyUser = async (userId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(`http://localhost:4000/admin/users/${userId}/verify`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isVerified: true } : user
      ));
      alert("User verified successfully");
    } catch (err: any) {
      setError("Failed to verify user");
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading users...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>Welcome To SkillSync</h1>
        <Image
          src="/users.png"
          width={300}
          height={300}
          alt="User management"
        />
      </header>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>User Management</h1>
        <Link href="/home">
          <button>Back To Homepage</button>
        </Link>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Verified</th>
            <th>Actions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? "Active" : "Suspended"}</td>
              <td>{user.isVerified ? "Yes" : "No"}</td>
              <td>
                {!user.isVerified && (
                  <button onClick={() => verifyUser(user.id)}>Verify</button>
                )}
                {user.isActive && (
                  <button onClick={() => suspendUser(user.id)}>Suspend</button>
                )}
                <button 
                  className="danger" 
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link href={`/users/${user.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <p>No users found.</p>
        </div>
      )}
    </div>
  );
}