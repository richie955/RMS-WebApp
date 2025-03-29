"use client";
import { useState,useEffect } from "react";
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
    <div className="flex items-center  justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-200 to-blue-300">
    <div className="w-full max-w-sm p-6 space-y-5 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
      <p className="text-gray-600 text-sm text-center">Create a new account</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {[
          { label: "Name", type: "text", field: "name" },
          { label: "Username", type: "text", field: "username" },
          { label: "Email", type: "email", field: "email" },
          { label: "Password", type: "password", field: "password" },
        ].map(({ label, type, field }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 outline-none"
              placeholder={`Enter ${label.toLowerCase()}`}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 outline-none"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="manager">Manager</option>
              <option value="waiter">Waiter</option>
              <option value="cook">Cook</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Shift</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 outline-none"
              value={form.shift}
              onChange={(e) => setForm({ ...form, shift: e.target.value })}
            >
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-2 mt-2 text-white bg-pink-900 rounded-lg hover:bg-blue-700 focus:ring-2 transition duration-300"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Already have an account? <a href="/signin" className="text-blue-500 hover:underline">Sign In</a>
      </p>
    </div>
  </div>
  );
}
