"use client"; // For Next.js client-side interactivity

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaChair,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

const AddOrderPage = () => {
  const router = useRouter();

  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);

  const API_URL = "http://127.0.0.1:8000/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, tableRes] = await Promise.all([
          fetch(`${API_URL}/menuitems/`), // ✅ Fixed template literals
          fetch(`${API_URL}/tables/`), // ✅ Fixed template literals
        ]);

        if (!menuRes.ok || !tableRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [menuData, tableData] = await Promise.all([
          menuRes.json(),
          tableRes.json(),
        ]);

        setMenuItems(menuData);
        setTables(tableData);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading menu items or tables.");
      }
    };

    fetchData();
  }, []);

  const toggleMenuItem = (id) => {
    setSelectedMenuItems((prev) => {
      const existingItem = prev.find((item) => item.menu_item === id);
      return existingItem
        ? prev.filter((item) => item.menu_item !== id)
        : [...prev, { menu_item: id, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setSelectedMenuItems((prev) =>
      prev.map((item) =>
        item.menu_item === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const toggleTable = (id) => {
    setSelectedTables((prev) =>
      prev.includes(id) ? prev.filter((table) => table !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMenuItems.length === 0 || selectedTables.length === 0) {
      alert("Please select at least one menu item and one table.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/orders/`, {
        // ✅ Corrected
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Pending",
          order_items: selectedMenuItems,
          tables: selectedTables,
        }),
      });

      if (!response.ok) throw new Error("Failed to create order");
      alert("Order successfully created!");
      router.push("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating the order. Please try again.");
    }
  };

  return (
    <motion.div className="p-8 min-h-screen bg-blue-100 rounded-tl-3xl flex flex-col items-center">
      <motion.h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
        <FaUtensils /> Add New Order
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="w-full l bg-white p-6 rounded-xl shadow-lg mt-6"
      >
        <h2 className="text-xl font-semibold mb-4">Select Menu Items:</h2>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-gray-100 p-3 rounded-xl shadow"
            >
              <input
                type="checkbox"
                value={item.id}
                checked={
                  !!selectedMenuItems.find((i) => i.menu_item === item.id)
                }
                onChange={() => toggleMenuItem(item.id)}
                className="h-5 w-5 text-red-600"
              />
              <span className="ml-3">
                {item.name} (₹{item.price})
              </span>
              {selectedMenuItems.find((i) => i.menu_item === item.id) && (
                <input
                  type="number"
                  min="1"
                  value={
                    selectedMenuItems.find((i) => i.menu_item === item.id)
                      ?.quantity
                  }
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value, 10) || 1)
                  }
                  className="ml-3 w-16 p-1 border rounded"
                />
              )}
            </motion.div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">Select Tables:</h2>
        <div className="grid grid-cols-2 gap-4">
          {tables.map((table) => (
            <motion.label
              key={table.id}
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-gray-100 p-3 rounded-xl shadow cursor-pointer"
            >
              <input
                type="checkbox"
                value={table.id}
                checked={selectedTables.includes(table.id)}
                onChange={() => toggleTable(table.id)}
                className="h-5 w-5 text-green-600"
              />
              <span className="ml-3 flex items-center gap-1">
                <FaChair /> Table #{table.id} (Capacity: {table.capacity})
              </span>
            </motion.label>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="mt-6 w-full bg-gray-900 hover:bg-gray-900 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          <FaCheckCircle /> Create Order
        </motion.button>
      </form>

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => router.push("/orders")}
        className="mt-6 text-gray-800 hover:underline flex items-center gap-2"
      >
        <FaArrowLeft /> Back to Orders
      </motion.button>
    </motion.div>
  );
};

export default AddOrderPage;
