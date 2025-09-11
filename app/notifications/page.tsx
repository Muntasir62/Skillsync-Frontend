"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
  message: string;
  recipient: string;
  timestamp: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://localhost:4000/admin/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data);
    } catch (err: any) {
      setError("Failed to fetch notifications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createNotification = async () => {
    
    alert("This would open a form to create a new notification");
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading notifications...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>Welcome To SkillSync</h1>
        <Image
          src="/notifications.jpg"
          width={300}
          height={300}
          alt="Notification management"
        />
      </header>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Notification Management</h1>
        <div>
          <button onClick={createNotification} style={{ marginRight: "10px" }}>
            Create Notification
          </button>
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
            <th>Message</th>
            <th>Recipient</th>
            <th>Timestamp</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map(notification => (
            <tr key={notification.id}>
              <td>{notification.id}</td>
              <td>{notification.title}</td>
              <td>{notification.message.substring(0, 50)}...</td>
              <td>{notification.recipient}</td>
              <td>{new Date(notification.timestamp).toLocaleDateString()}</td>
              <td>
                <Link href={`/notifications/${notification.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {notifications.length === 0 && (
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <p>No notifications found.</p>
        </div>
      )}
    </div>
  );
}