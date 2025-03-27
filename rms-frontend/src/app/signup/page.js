"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "waiter",
    shift: "morning",
  });

  const handleSubmit = async (e) => {
    
    console.log(form);
   
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", form, {
        withCredentials: true,
      });


      if (response.status === 201) {
        router.push("/signin");
      } else {
        alert("Error during sign-up");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Error during sign-up");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
    <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800/40 backdrop-blur-xl rounded-4xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white">Sign Up</h2>
      <p className="text-gray-600 text-sm text-center dark:text-gray-400">Create a new account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="manager">Manager</option>
            <option value="waiter">Waiter</option>
            <option value="cook">Cook</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Shift</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={form.shift}
            onChange={(e) => setForm({ ...form, shift: e.target.value })}
          >
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-2 text-white bg-pink-900 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">
        Already have an account? <a href="/signin" className="text-blue-500">Sign In</a>
      </p>
    </div>
  </div>
  );
}
