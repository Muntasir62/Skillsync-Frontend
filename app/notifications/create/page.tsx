"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Image from "next/image";


const notificationSchema = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters"),
  recipient: z.string()
    .min(1, "Recipient is required")
});

type NotificationForm = z.infer<typeof notificationSchema>;

export default function CreateNotification() {
  const router = useRouter();
  const [error, setError] = useState("");
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NotificationForm>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: "",
      message: "",
      recipient: ""
    }
  });

  const onSubmit = async (data: NotificationForm) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Authentication required. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/admin/notifications",
        {
          title: data.title,
          message: data.message,
          recipient: data.recipient
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 201) {
        alert("Notification created successfully!");
        router.push("/notifications");
        router.refresh();
      }
    } catch (err: any) {
      console.error("Error creating notification:", err);
      setError(err.response?.data?.message || "Failed to create notification. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Create New Notification</h1>
        <Image
          src="/notifications.jpg"
          width={200}
          height={200}
          alt="Create notification"
          className="mx-auto"
        />
      </header>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter notification title (min 3 characters)"
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("message")}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter notification message (min 10 characters)"
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Recipient <span className="text-red-500">*</span>
          </label>
          <input
            {...register("recipient")}
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter recipient (e.g., all_users, user_123)"
            disabled={isSubmitting}
          />
          {errors.recipient && (
            <p className="text-red-500 text-sm mt-1">{errors.recipient.message}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">⌛</span>
                Creating...
              </span>
            ) : (
              "Create Notification"
            )}
          </button>
          
          <Link href="/notifications" className="flex-1">
            <button 
              type="button"
              className="w-full bg-gray-500 text-white p-3 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}