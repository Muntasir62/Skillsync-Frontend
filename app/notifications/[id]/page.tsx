"use client";
import { use } from "react";
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

export default function Notification({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotification();
  }, [id]);

  const fetchNotification = async () => {
    try {
      const token = localStorage.getItem("access_token");
      
      setNotification({
        id: parseInt(id),
        title: "System Maintenance",
        message: "The system will be down for maintenance on Saturday from 2 AM to 4 AM. Please save your work beforehand.",
        recipient: "all_users",
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      setError("Failed to fetch notification details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading notification details...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  if (!notification) return <div style={{ padding: "20px" }}>Notification not found</div>;

  return (
   <div className="container p-5 max-w-3xl mx-auto">
      <Image
        src="/notifications.jpg"
        width={300}
        height={200}
        alt="Notification details"
        className="mx-auto block"
      />
      
      <h1 className="text-center text-darker mt-4 mb-4">Notification Details</h1>
      
      <div className="card p-5 rounded-lg shadow-md">
        <p className="text-dark"><strong className="text-darker">ID:</strong> {notification.id}</p>
        <p className="text-dark"><strong className="text-darker">Title:</strong> {notification.title}</p>
        <p className="text-dark"><strong className="text-darker">Message:</strong> {notification.message}</p>
        <p className="text-dark"><strong className="text-darker">Recipient:</strong> {notification.recipient}</p>
        <p className="text-dark"><strong className="text-darker">Timestamp:</strong> {new Date(notification.timestamp).toLocaleString()}</p>
      </div>
      
      <div className="text-center mt-4">
        <Link href="/notifications">
          <button>Back To Notifications</button>
        </Link>
      </div>
    </div>
  );
}