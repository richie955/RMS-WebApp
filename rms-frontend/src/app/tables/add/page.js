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
    <div className="min-h-screen rounded-tl-3xl flex flex-col justify-center items-center p-4 bg-blue-100">
 
      

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Tables</h1>

      {/* Success/Error Message */}
      {message && (
        <p className="mb-4 text-lg font-semibold text-green-700 bg-green-100 px-4 py-2 rounded-lg text-center">
          {message}
        </p>
      )}

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className=" w-[300px] mx-auto text-sm bg-white shadow-lg rounded-xl p-6 border border-gray-200"
      >
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Table Number:</span>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            placeholder="Enter table number"
            className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Capacity:</span>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            placeholder="Enter seating capacity"
            className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </label>

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="reserved"
            checked={formData.reserved}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-gray-700 font-semibold">Reserved</span>
        </label>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300"
        >
          {selectedTable ? "Update Table" : "Add Table"}
        </button>

        {selectedTable && (
          <button
            type="button"
            onClick={resetForm}
            className="mt-4 w-full text-red-600 font-medium underline"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Tables Section - Aligned Below Form */}
      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tables</h2>
        
        {tables.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No tables added yet.</p>
        ) : (
          <ul className="space-y-4">
            {tables.map((table) => (
              <li
                key={table.id}
                className="flex justify-between items-center p-4 bg-gray-100 shadow-md rounded-lg border border-gray-300"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">Table #{table.number}</p>
                  <p className="text-sm text-gray-600">
                    Capacity: {table.capacity} | Reserved: {table.reserved ? "Yes" : "No"}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(table)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}

      
    </div>
   </div>

  );
}
