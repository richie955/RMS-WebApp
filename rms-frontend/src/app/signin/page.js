"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // Store user details

  // Force light mode
  useEffect(() => {
    document.documentElement.classList.remove("dark"); // Removes dark theme
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signin/",
        form,
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("User details:", response.data.user);
        setUser(response.data.user); // Store user details in state
        router.push("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setError(err.response?.data?.detail || "Login failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-200 to-blue-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white backdrop-blur-xl rounded-4xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 text-sm text-center">Login to access your account</p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-2 text-white bg-pink-900 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
