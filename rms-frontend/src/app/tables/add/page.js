"use client";

import { useState, useEffect } from "react";

export default function TableManagePage() {
  const [tables, setTables] = useState([]);
  const [formData, setFormData] = useState({
    number: "",
    reserved: false,
    capacity: "",
  });
  const [selectedTable, setSelectedTable] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/tables/";

  // Fetch tables on load
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setTables(data);
        } else {
          setMessage("❌ Failed to fetch tables.");
        }
      } catch (error) {
        setMessage("❌ Error fetching tables.");
      }
    };
    fetchTables();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: inputValue }));
  };

  // Handle Add or Update table
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { number, capacity } = formData;

    if (!number || !capacity) {
      setMessage("❌ Table number and capacity are required.");
      return;
    }

    try {
      const method = selectedTable ? "PUT" : "POST";
      const url = selectedTable ? `${API_URL}${selectedTable.id}/` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(`✅ Table ${selectedTable ? "updated" : "added"} successfully!`);
        resetForm();
        refreshTables();
      } else {
        const errorData = await response.json();
        setMessage(`❌ Error: ${errorData?.detail || "Operation failed."}`);
      }
    } catch (error) {
      setMessage("❌ Error submitting the form.");
    }
  };

  // Populate form for editing a table
  const handleEdit = (table) => {
    setSelectedTable(table);
    setFormData({
      number: table.number,
      reserved: table.reserved,
      capacity: table.capacity,
    });
  };

  // Reset form and selection
  const resetForm = () => {
    setFormData({ number: "", reserved: false, capacity: "" });
    setSelectedTable(null);
  };

  // Refresh table list after add or update
  const refreshTables = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      }
    } catch (error) {
      setMessage("❌ Error refreshing tables.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[#FAF9F6] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#4A4A4A] mb-8">Manage Tables</h1>

      {message && (
        <p className="mb-6 text-lg font-semibold text-[#8B4513]">{message}</p>
      )}

      {/* Table Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8 mb-8"
      >
        <label className="block mb-4">
          <span className="text-[#8B4513] font-medium">Table Number:</span>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            placeholder="Enter table number"
            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          />
        </label>

        <label className="block mb-4">
          <span className="text-[#8B4513] font-medium">Capacity:</span>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            placeholder="Enter seating capacity"
            className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          />
        </label>

        <label className="block mb-4">
          <input
            type="checkbox"
            name="reserved"
            checked={formData.reserved}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-[#8B4513] font-medium">Reserved</span>
        </label>

        <button
          type="submit"
          className="w-full bg-[#8B4513] text-white p-3 rounded-lg font-semibold hover:bg-[#A0522D] transition-all duration-300"
        >
          {selectedTable ? "Update Table" : "Add Table"}
        </button>

        {selectedTable && (
          <button
            type="button"
            onClick={resetForm}
            className="mt-4 w-full text-[#8B4513] underline"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Table List */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-[#4A4A4A] mb-4">Tables</h2>
        <ul className="space-y-4">
          {tables.map((table) => (
            <li
              key={table.id}
              className="flex justify-between items-center p-4 bg-white shadow-sm rounded-lg"
            >
              <div>
                <p className="text-lg font-medium text-[#4A4A4A]">
                  Table #{table.number}
                </p>
                <p className="text-sm text-gray-600">
                  Capacity: {table.capacity} | Reserved: {table.reserved ? "Yes" : "No"}
                </p>
              </div>
              <button
                onClick={() => handleEdit(table)}
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
