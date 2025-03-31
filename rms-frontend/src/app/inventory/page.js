"use client";
import { FaBoxOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";


export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch inventory items from the backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/inventory/");
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="mx-auto p-8 bg-blue-100 min-h-screen overflow-hidden rounded-2xl">
      <div className="flex justify-between">
    <h1 className="text-3xl font-bold text-center py-6 text-gray-800 flex items-center gap-3 justify-center">
      <FaBoxOpen className="text-gray-800" /> Inventory
    </h1>
    <Link
  href="/inventory/add"
  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 h-fit mt-5 text-sm rounded-lg shadow-lg font-medium transition-all duration-300"
>
  ➕ Add Items
</Link>

        </div>
    <div className="overflow-hidden rounded-2xl shadow-lg bg-white p-6">
      {loading ? (
        <div className="flex items-center gap-2 justify-center mt-6 text-gray-800">
          <span className="animate-spin h-5 w-5 border-4 border-blue-300 border-t-transparent rounded-full"></span>
          <p>Loading inventory...</p>
        </div>
      ) : inventory.length === 0 ? (
        <p className="text-center text-gray-800 mt-6 text-lg">
          No items in inventory. 📦
        </p>
      ) : (
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-4 text-left">Item Name</th>
              <th className="p-4 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {inventory.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition"
              >
                <td className="p-4 font-medium text-gray-800">
                  {item.name || "Unnamed Item"}
                </td>
                <td className="p-4 font-medium text-gray-800">
                  {item.quantity ?? "N/A"} kg
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
  );
}
