"use client";
import Link from "next/link";
import Image from "next/image";
import {  z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const signupSchema = z.object 
(
  {
    name : z
    .string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[a-zA-Z]+$/, "Name must contain only alphabets"),
    email: z.string().email("Invalid email address"),
    password : z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      "Password must be 6+ chars, include 1 uppercase & 1 special character"
    ),
    accessLevel : z.enum(["super_admin", "moderator", "analyst"]),


  }
);
type SignupForm = z.infer<typeof signupSchema>;

export default function Signup()
{
  const [message, setMessage] = useState("");
  const 
  {
    register,
    handleSubmit,
    formState : {errors, isSubmitting },

  } = useForm<SignupForm>
  ({
    resolver : zodResolver(signupSchema),

  });
  const onSubmit = async(data : SignupForm) =>
  {
    try
    {
      const res = await axios.post("http://localhost:4000/admin/addadmin", data);
      setMessage("Registration Successful!");
      console.log("Response:", res.data);


    }
    catch (err: any)
    {
      console.error(err.response?.data || err.message);
      if (err.response?.data?.message)
      {
        setMessage(  err.response.data.message.join(", "));

      }
      else 
        {
        setMessage(" Registration failed. Please try again.");
      }
    }
  };
  
    return (
        <>
         <header>
          <h1>Welcome To SkillSync</h1>
        <Image
        src="/register.jpg"
        width={500}
        height={500}
        alt="List of notifications"
      />
         </header>
        <h1>Registration Form </h1>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>

          <div>
          Name:{" "}
          <input type="text" {...register("name")} placeholder="Name" />
          {errors.name && (
            <p style={{ color: "red" }}>{errors.name.message}</p>
          )}
        </div>
        <br />

         <div>
          Email:{" "}
          <input type="email" {...register("email")} placeholder="Email" />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <br />

        <div>
          Password:{" "}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <br />
       
        
          <div>
          Select Role:{" "}
          <select {...register("accessLevel")}>
            <option value="super_admin">Super Admin</option>
            <option value="moderator">Moderator</option>
            <option value="analyst">Analyst</option>
          </select>
          {errors.accessLevel && (
            <p style={{ color: "red" }}>{errors.accessLevel.message}</p>
          )}
        </div>
        <br />
        
        
          <button type="submit" disabled = {isSubmitting}> 
             {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        
        </form>
         {message && <p>{message}</p>}
        <br />
         <Link href="login">Already have an account? Login</Link>
         <footer>
          
         </footer>
        </>
    );
}