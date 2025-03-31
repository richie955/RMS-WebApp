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

  useEffect(() => {
    const storedTables = JSON.parse(localStorage.getItem("tables")) || [];
    setTables(storedTables);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const saveTables = (updatedTables) => {
    localStorage.setItem("tables", JSON.stringify(updatedTables));
    setTables(updatedTables);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { number, capacity } = formData;

    if (!number || !capacity) {
      setMessage("❌ Table number and capacity are required.");
      return;
    }

    if (selectedTable) {
      const updatedTables = tables.map((table) =>
        table.id === selectedTable.id ? { ...selectedTable, ...formData } : table
      );
      saveTables(updatedTables);
      setMessage("✅ Table updated successfully!");
    } else {
      const newTable = { id: Date.now(), ...formData };
      saveTables([...tables, newTable]);
      setMessage("✅ Table added successfully!");
    }

    resetForm();
  };

  const handleEdit = (table) => {
    setSelectedTable(table);
    setFormData({ number: table.number, reserved: table.reserved, capacity: table.capacity });
  };

  const resetForm = () => {
    setFormData({ number: "", reserved: false, capacity: "" });
    setSelectedTable(null);
  };

  return (

    <div className="p-8 min-h-screen bg-cover bg-center flex flex-col items-center" style={{ backgroundImage: '/home/vaishnavi/Downloads/WhatsApp Image 2025-03-31 at 2.52.58 AM.jpeg' }}>
      <div className="bg-gradient-to-br from-purple-500 via-pink-200 to-blue-300 bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 text-center">Manage Tables</h1>

        {message && <p className="mb-4 text-lg font-semibold text-green-700 bg-green-100 px-4 py-2 rounded-lg text-center">{message}</p>}

        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <label className="block mb-4">
            <span className="text-gray-700 font-semibold">Table Number:</span>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              placeholder="Enter table number"
              className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            {selectedTable ? "Update Table" : "Add Table"}
          </button>

          {selectedTable && (
            <button type="button" onClick={resetForm} className="mt-4 w-full text-red-600 font-medium underline">
              Cancel Edit
            </button>
          )}
        </form>

        <div className="w-full max-w-3xl mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tables</h2>
          <ul className="space-y-4">
            {tables.map((table) => (
              <li key={table.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg border border-gray-200">
                <div>
                  <p className="text-lg font-semibold text-gray-800">Table #{table.number}</p>
                  <p className="text-sm text-gray-600">
                    Capacity: {table.capacity} | Reserved: {table.reserved ? "Yes" : "No"}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(table)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
