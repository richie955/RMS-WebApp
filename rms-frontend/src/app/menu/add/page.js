"use client";

import { useState } from "react";

export default function MenuAddPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    available: true,
    category: "",
    menuitem_image: null,
  });
  const [message, setMessage] = useState("");

  const categories = ["Starter", "Main Course", "Dessert", "Beverage"];

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) form.append(key, value);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/menuitems/", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setMessage("✅ Menu item added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          available: true,
          category: "",
          menuitem_image: null,
        });
      } else {
        const errorData = await response.json();
        setMessage(`❌ Error: ${errorData?.detail || "Failed to add item"}`);
      }
    } catch (error) {
      setMessage("❌ Error submitting the form.");
    }
  };

  return (
    <div className="p-8 min-h-screen rounded-tl-3xl bg-blue-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Add Menu Item</h1>

      {message && <p className="mb-4 text-lg font-semibold text-red-600">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md  text-sm rounded-lg p-6"
      >
        {/* Name */}
        <label className="block mb-3">
          <span className="text-gray-700 font-medium">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter item name"
            className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Description */}
        <label className="block mb-3">
          <span className="text-gray-700 font-medium">Description:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional: Add a short description"
            className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Price */}
        <label className="block mb-3">
          <span className="text-gray-700 font-medium">Price (₹):</span>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Enter price"
            step="0.01"
            className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Category */}
        <label className="block mb-3">
          <span className="text-gray-700 font-medium">Category:</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-2 p-2 w-full border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        {/* Availability */}
        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="h-5 w-5 text-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-700 font-medium">Available</span>
        </label>

        {/* Image Upload */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Upload Image:</span>
          <input
            type="file"
            name="menuitem_image"
            accept="image/*"
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
}
