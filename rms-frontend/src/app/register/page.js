"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RestaurantSignup = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        restaurantName,
        contactPerson,
        email,
        password,
        phoneNumber,
        address,
      });
      console.log("Signup Success:", response.data);
      router.push("/dashboard"); // Redirect after signup
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br  from-purple-500 via-pink-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/30 dark:bg-gray-800/40 backdrop-blur-xl rounded-4xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white">Restaurant Signup</h2>
        <p className="text-gray-600 text-sm text-center dark:text-gray-600">Register your restaurant</p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Restaurant Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter restaurant name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Point of Contact</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter contact person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter restaurant address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-2 text-white bg-pink-900 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantSignup;
