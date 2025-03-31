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
    <div className="min-h-screen  rounded-tl-3xl flex-col flex items-center py-12 justify-center bg-blue-100">
      <div className=" w-[300px] text-sm bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Manage Inventory</h1>

        {message && (
          <p className="mb-6 text-lg font-semibold text-center text-gray-800">{message}</p>
        )}

        {/* Inventory Form */}
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <label className="block">
            <span className="text-gray-800 font-medium">Item Name:</span>
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

          <label className="block">
            <span className="text-gray-800 font-medium">Quantity:</span>
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
            className="w-full bg-gray-800 text-white p-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300"
          >
            {selectedItem ? "Update Item" : "Add Item"}
          </button>

          {selectedItem && (
            <button
              type="button"
              onClick={resetForm}
              className="mt-2 w-full text-gray-800 underline text-center"
            >
              Cancel Edit
            </button>
          )}
        </form>
        </div>

        {/* Inventory List */}
        <ul className="mt-6 space-y-4 w-full p-12">
          {inventory.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-4 bg-gray-100 shadow-sm rounded-lg"
            >
              <div>
                <p className="text-lg font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleEdit(item)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>

    </div>

  );
}
