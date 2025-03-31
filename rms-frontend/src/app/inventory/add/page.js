"use client";

import { useState, useEffect } from "react";

export default function InventoryManagePage() {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({ name: "", quantity: "" });
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/inventory/";

  // Fetch inventory items on page load
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setInventory(data);
        } else {
          setMessage("❌ Failed to fetch inventory.");
        }
      } catch (error) {
        setMessage("❌ Error fetching inventory.");
      }
    };
    fetchInventory();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add or Update inventory item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity) {
      setMessage("❌ Both name and quantity are required.");
      return;
    }

    try {
      const method = selectedItem ? "PUT" : "POST";
      const url = selectedItem ? `${API_URL}${selectedItem.id}/` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(`✅ Item ${selectedItem ? "updated" : "added"} successfully!`);
        resetForm();
        refreshInventory();
      } else {
        const errorData = await response.json();
        setMessage(`❌ Error: ${errorData?.detail || "Operation failed."}`);
      }
    } catch (error) {
      setMessage("❌ Error submitting the form.");
    }
  };

  // Populate form for editing an item
  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({ name: item.name, quantity: item.quantity });
  };

  // Reset form and selection
  const resetForm = () => {
    setFormData({ name: "", quantity: "" });
    setSelectedItem(null);
  };

  // Refresh inventory after add or update
  const refreshInventory = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setInventory(data);
      }
    } catch (error) {
      setMessage("❌ Error refreshing inventory.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[#FAF9F6] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#4A4A4A] mb-8">Manage Inventory</h1>

      {message && (
        <p className="mb-6 text-lg font-semibold text-[#8B4513]">{message}</p>
      )}

      {/* Inventory Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8 mb-8"
      >
        <label className="block mb-4">
          <span className="text-[#8B4513] font-medium">Item Name:</span>
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

        <label className="block mb-4">
          <span className="text-[#8B4513] font-medium">Quantity:</span>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            placeholder="Enter quantity"
            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-[#8B4513] text-white p-3 rounded-lg font-semibold hover:bg-[#A0522D] transition-all duration-300"
        >
          {selectedItem ? "Update Item" : "Add Item"}
        </button>

        {selectedItem && (
          <button
            type="button"
            onClick={resetForm}
            className="mt-4 w-full text-[#8B4513] underline"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Inventory List */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-[#4A4A4A] mb-4">Inventory Items</h2>
        <ul className="space-y-4">
          {inventory.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-4 bg-white shadow-sm rounded-lg"
            >
              <div>
                <p className="text-lg font-medium text-[#4A4A4A]">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleEdit(item)}
                className="bg-[#8B4513] text-white px-4 py-2 rounded-lg hover:bg-[#A0522D]"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
