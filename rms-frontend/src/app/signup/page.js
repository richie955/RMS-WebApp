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
    <div className="max-w-sm mx-auto mt-10 p-4">
      <h1 className="text-xl mb-4 font-semibold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="p-2 border rounded placeholder-gray-600"
        />
         <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          className="p-2 border rounded placeholder-gray-600"
        />
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
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="manager">Manager</option>
          <option value="waiter">Waiter</option>
          <option value="cook">Cook</option>
        </select>
        <select
          value={form.shift}
          onChange={(e) => setForm({ ...form, shift: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded text-sm">
          Sign Up
        </button>
      </form>
      <p className="mt-3 text-sm">
        Already have an account? <a href="/signin" className="text-blue-500">Sign In</a>
      </p>
    </div>
  );
}
