"use client";

import { useState, useEffect } from "react";

export default function MenuManagePage() {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    available: true,
    category: "",
    menuitem_image: null,
  });
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState("");

  const categories = ["Starter", "Main Course", "Dessert", "Beverage"];
  const apiUrl = "http://127.0.0.1:8000/api/menuitems/";

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) form.append(key, value);
    });

    try {
      const response = await fetch(
        formData.id ? `${apiUrl}${formData.id}/` : apiUrl,
        {
          method: formData.id ? "PUT" : "POST",
          body: form,
        }
      );

      if (response.ok) {
        setMessage(
          formData.id
            ? "✅ Menu item updated successfully!"
            : "✅ Menu item added successfully!"
        );
        setFormData({
          id: null,
          name: "",
          description: "",
          price: "",
          available: true,
          category: "",
          menuitem_image: null,
        });
        fetchMenuItems();
      } else {
        const errorData = await response.json();
        setMessage(
          `❌ Error: ${errorData?.detail || "Failed to process request"}`
        );
      }
    } catch (error) {
      setMessage("❌ Error submitting the form.");
    }
  };

  const handleEdit = (item) => {
    setFormData({ ...item, menuitem_image: null });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await fetch(`${apiUrl}${id}/`, { method: "DELETE" });
      if (response.ok) {
        setMessage("✅ Menu item deleted successfully!");
        fetchMenuItems();
      } else {
        setMessage("❌ Failed to delete item.");
      }
    } catch (error) {
      setMessage("❌ Error deleting the item.");
    }
  };

  return (
    <div className="p-8 rounded-tl-3xl min-h-screen bg-blue-100 flex justify-around items-center">
      <div>
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-3 ">Manage Menu</h1>

        {message && (
          <p className="mb-4 text-lg font-semibold text-red-600">{message}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md  bg-white shadow-md text-sm rounded-3xl p-6"
        >
          <input type="hidden" name="id" value={formData.id || ""} />
          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full border rounded-md"
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Description:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded-md"
            />
          </label>

          <label className="flex items-center mb-3">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <span className="ml-2 text-gray-700 font-medium">Available</span>
          </label>

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

          <div className="flex  gap-3">
            <label className="block mb-3">
              <span className="text-gray-700 font-medium">Price (₹):</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                className="mt-2 p-2 w-full border rounded-md"
              />
            </label>

            <label className="block mb-3">
              <span className="text-gray-700 font-medium">Category:</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            {formData.id ? "Update" : "Add"} Menu Item
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-700 mt-3 mb-4">
          Menu Items
        </h2>
        <ul className="w-full  ">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-white rounded-lg shadow-md mb-4 flex justify-between items-center"
            >
              <span>
                {item.name} - ₹{item.price}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(item)}
                  className="mr-2 text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
