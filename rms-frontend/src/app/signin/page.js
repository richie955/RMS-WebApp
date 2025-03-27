"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signin/", form, {
        withCredentials: true,
      });

      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Sign-in Error:", error);
      alert("Error during sign-in");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4">
      <h1 className="text-xl mb-4 font-semibold">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="p-2 border rounded placeholder-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="p-2 border rounded placeholder-gray-600"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded text-sm">
          Sign In
        </button>
      </form>
      <p className="mt-3 text-sm">
        Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
      </p>
    </div>
  );
}
