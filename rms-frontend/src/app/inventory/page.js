"use client";

import { useEffect, useState } from "react";

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
    <div className="p-6 mx-auto bg-[#F5DEB3] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#8B4513]">Inventory</h1>

      {loading ? (
        <p className="text-center text-[#8B4513]">Loading inventory...</p>
      ) : inventory.length === 0 ? (
        <p className="text-center text-[#8B4513]">No items in inventory.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#FFE4C4] shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#8B4513] text-[#F5DEB3]">
              <tr>
                <th className="p-4 text-left">Item Name</th>
                <th className="p-4 text-left">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr
                  key={index}
                  className={`border-t ${
                    item.quantity === 0 ? "bg-red-100" : "bg-white"
                  } hover:bg-[#FFDAB9]`}
                >
                  <td className="p-4">{item.name || "Unnamed Item"}</td>
                  <td className="p-4">{item.quantity ?? "N/A"} kg </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
