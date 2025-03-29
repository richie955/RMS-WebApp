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
    <div className="p-8 min-h-screen bg-[#FAF9F6] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#4A4A4A] mb-8">Add Menu Item</h1>

      {message && (
        <p className="mb-6 text-lg font-semibold text-[#8B4513]">{message}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8"
      >
        {/* Name */}
        <label className="block mb-4">
          <span className="text-[#8B4513] font-medium">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter item name"
            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          />
        </label>

        {/* Description */}
        <label className="block mb-4">
          <span className="text-[#8B4513] font-medium">Description:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional: Add a short description"
            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          />
        </label>

        {/* Price */}
        <label className="block mb-4">
          <span className="text-[#8B4513] font-medium">Price (₹):</span>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Enter price"
            step="0.01"
            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          />
        </label>

        {/* Category (Dropdown) */}
        <label className="block mb-4">
          <span className="text-[#8B4513] font-medium">Category:</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
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
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="h-5 w-5 text-[#8B4513] focus:ring-[#8B4513]"
          />
          <span className="ml-2 text-[#8B4513] font-medium">Available</span>
        </label>

        {/* Image Upload */}
        <label className="block mb-6">
          <span className="text-[#8B4513] font-medium">Upload Image:</span>
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
          className="w-full bg-[#8B4513] text-white p-3 rounded-lg font-semibold hover:bg-[#A0522D] transition-all duration-300"
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
}
