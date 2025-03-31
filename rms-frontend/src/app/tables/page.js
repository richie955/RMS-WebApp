"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const TableReservation = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tables/");
        setTables(response.data);
      } catch (error) {
        toast.error("Failed to fetch tables");
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  const toggleReservation = async (id, reserved) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tables/${id}/`, {
        reserved: !reserved,
      });
      setTables((prev) =>
        prev.map((table) =>
          table.id === id ? { ...table, reserved: !reserved } : table
        )
      );
      toast.success(`Table ${id} ${reserved ? "unreserved" : "reserved"}`);
    } catch (error) {
      toast.error("Failed to update reservation status");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 min-h-screen text-white rounded-xl shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400">
        🍽️ Table Reservations
      </h1>
      {loading ? (
        <p className="text-center text-gray-400">Loading tables...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                table.reserved ? "bg-red-700" : "bg-green-700"
              }`}
            >
              <p className="text-lg font-semibold text-center">Table {table.number}</p>
              <p className="text-sm text-center">Capacity: {table.capacity}</p>
              <div className="flex justify-center mt-3">
                <button
                  className="px-4 py-2 rounded bg-gray-900 hover:bg-gray-700"
                  onClick={() => toggleReservation(table.id, table.reserved)}
                >
                  {table.reserved ? "Unreserve" : "Reserve"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableReservation;