"use client"; // For Next.js client-side interactivity

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AddOrderPage = () => {
  const router = useRouter();

  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);

  const API_URL = "http://127.0.0.1:8000/api";

  // Fetch menu items and tables from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, tableRes] = await Promise.all([
          fetch(`${API_URL}/menuitems/`),
          fetch(`${API_URL}/tables/`),
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

  // Toggle menu item selection with quantity
  const toggleMenuItem = (id) => {
    setSelectedMenuItems((prev) => {
      const existingItem = prev.find((item) => item.menu_item === id);

      if (existingItem) {
        return prev.filter((item) => item.menu_item !== id); // Deselect item
      } else {
        return [...prev, { menu_item: id, quantity: 1 }]; // Add with default quantity
      }
    });
  };

  // Update quantity for selected menu item
  const updateQuantity = (id, quantity) => {
    setSelectedMenuItems((prev) =>
      prev.map((item) =>
        item.menu_item === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Handle table selection
  const toggleTable = (id) => {
    setSelectedTables((prev) =>
      prev.includes(id) ? prev.filter((table) => table !== id) : [...prev, id]
    );
  };

  // Submit new order to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedMenuItems.length === 0 || selectedTables.length === 0) {
      alert("Please select at least one menu item and one table.");
      return;
    }

    const newOrder = {
      status: "Pending",
      order_items: selectedMenuItems,
      tables: selectedTables,
    };

    try {
      const response = await fetch(`${API_URL}/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) throw new Error("Failed to create order");

      alert("Order successfully created!");
      router.push("/orders"); // Redirect to orders page
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating the order. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">➕ Add New Order</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Menu Items Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Menu Items & Quantity:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {menuItems.map((item) => {
              const selectedItem = selectedMenuItems.find(
                (selected) => selected.menu_item === item.id
              );

              return (
                <div key={item.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={!!selectedItem}
                    onChange={() => toggleMenuItem(item.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>{item.name} (₹{item.price})</span>

                  {/* Quantity Input (only when item is selected) */}
                  {selectedItem && (
                    <input
                      type="number"
                      min="1"
                      value={selectedItem.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10) || 1)
                      }
                      className="w-16 p-1 border rounded"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Table Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Tables:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tables.map((table) => (
              <label key={table.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  value={table.id}
                  checked={selectedTables.includes(table.id)}
                  onChange={() => toggleTable(table.id)}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span>Table #{table.id} (Capacity: {table.capacity})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          ✅ Create Order
        </button>
      </form>

      {/* Back to Orders Button */}
      <button
        onClick={() => router.push("/orders")}
        className="mt-6 text-gray-700 hover:underline"
      >
        ⬅️ Back to Orders
      </button>
    </div>
  );
};

export default AddOrderPage;
