"use client";
import { useParams, useRouter } from "next/navigation";
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

export default function NotificationDetails() {
  const params = useParams();
  const router = useRouter();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/admin/notifications/${params.id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setNotification(response.data);
      } catch (err: any) {
        console.error("Error fetching notification:", err);
        setError(err.response?.data?.message || "Failed to fetch notification details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNotification();
    }
  }, [params.id]);

  if (loading) return <div className="p-6">Loading notification details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!notification) return <div className="p-6">Notification not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Notification Details</h1>
        <Image
          src="/notifications.jpg"
          width={200}
          height={200}
          alt="Notification details"
          className="mx-auto"
        />
      </header>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="font-semibold text-white">ID:</div>
          <div className="text-white">{notification.id}</div>

          <div className="font-semibold text-white">Title:</div>
          <div className="text-white">{notification.title}</div>

          <div className="font-semibold text-white">Message:</div>
          <div className="text-white">{notification.message}</div>

          <div className="font-semibold text-white">Recipient:</div>
          <div className="text-white">{notification.recipient}</div>

          <div className="font-semibold text-white">Timestamp:</div>
          <div className="text-white">
            {new Date(notification.timestamp).toLocaleString()}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Link href="/notifications" className="flex-1">
            <button 
              type="button"
              className="w-full bg-gray-500 text-white p-3 rounded hover:bg-gray-600 transition-colors"
            >
              Back to Notifications
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}