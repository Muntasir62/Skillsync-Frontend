"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[a-zA-Z]+$/, "Name must contain only alphabets"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      "Password must be 6+ chars, include 1 uppercase & 1 special character"
    ),
  accessLevel: z.enum(["super_admin", "moderator", "analyst"]),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      const response = await axios.post("http://localhost:4000/admin/addadmin", data);
      setMessage("Registration Successful! Redirecting to login...");
      console.log("Response:", response.data);
      
     
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      if (err.response?.data?.message) {
        setMessage(err.response.data.message.join(", "));
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>Welcome To SkillSync</h1>
        <Image
          src="/register.jpg"
          width={300}
          height={300}
          alt="Registration illustration"
        />
      </header>
      
      <h1 style={{ textAlign: "center" }}>Admin Registration</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            disabled={isSubmitting}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Create a strong password"
            disabled={isSubmitting}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <div>
          <label>Role:</label>
          <select {...register("accessLevel")} disabled={isSubmitting}>
            <option value="">Select a role</option>
            <option value="super_admin">Super Admin</option>
            <option value="moderator">Moderator</option>
            <option value="analyst">Analyst</option>
          </select>
          {errors.accessLevel && <span className="error">{errors.accessLevel.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>
      
      {message && (
        <div className={message.includes("Successful") ? "success" : "error"}>
          {message}
        </div>
      )}
      
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link href="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}