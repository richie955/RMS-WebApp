"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });
      console.log("Login Success:", response.data);
      router.push("/dashboard"); // Redirect after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
   // <div className="flex items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-300">
      //<div className="w-full max-w-md p-6 space-y-6 bg-yellow-400 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:bg-gray-800/40 dark:border-gray-700">
       // <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Welcome Back</h2>
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
       <div className="w-full max-w-md p-8 space-y-6 bg-white/30 dark:bg-gray-800/40 backdrop-blur-xl rounded-4xl
        shadow-2xl border border-gray-200 dark:border-gray-700">
         <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white">
           Welcome Back </h2>
        <p className="text-gray-600 text-sm text-center dark:text-gray-600">Login to access your account</p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
