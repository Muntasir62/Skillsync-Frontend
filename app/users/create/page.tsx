"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Image from "next/image";


type UserRole = 'learner' | 'instructor';


const userSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z]+$/, "Name must contain only alphabets"),
  email: z.string()
    .email("Invalid email format"),
  password: z.string()
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      "Password must have 6+ chars, 1 uppercase & 1 special character"
    ),
  role: z.enum(["learner", "instructor"]) 
});

type UserForm = z.infer<typeof userSchema>;


export default function CreateUser() {
  const router = useRouter();
  const [error, setError] = useState("");
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserForm>({
    resolver: zodResolver(userSchema)
  });

  const onSubmit = async (data: UserForm) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Authentication required");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/admin/users",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 201) {
        alert("User created successfully!");
        router.push("/users");
        router.refresh();
      }
    } catch (err: any) {
      console.error("Error creating user:", err);
      setError(err.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Create New User</h1>
        <Image
          src="/users.png"
          width={200}
          height={200}
          alt="Create user"
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
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name (alphabets only)"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            {...register("password")}
            type="password"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            {...register("role")}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <option value="">Select a role</option>
            <option value="learner">Learner</option>
            <option value="instructor">Instructor</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
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
              "Create User"
            )}
          </button>
          
          <Link href="/users" className="flex-1">
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