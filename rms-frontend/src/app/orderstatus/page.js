"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// OrderCard Component – Displays and updates each order
const OrderCard = ({ order, onUpdateStatus, onGenerateBill }) => {
  const { id, status, created_at, order_items, tables } = order;

  // Toggle Order Status between Pending and Completed
  const toggleStatus = () => {
    const newStatus = status === "Pending" ? "Completed" : "Pending";
    onUpdateStatus(id, newStatus);
  };

  return (
    <div className="p-6 rounded-xl shadow-lg border bg-white hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Order #{id}</h3>

      <p className="text-gray-700">
        <span className="font-semibold">Status:</span>{" "}
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full 
          ${
            status === "Pending"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {status}
        </span>
      </p>

      <p className="text-gray-700">
        <span className="font-semibold">Created At:</span>{" "}
        {new Date(created_at).toLocaleString()}
      </p>

      {/* Display Menu Items with Quantities */}
      <p className="text-gray-800 mt-2">
        <span className="font-semibold">Menu Items:</span>{" "}
        {order_items.length > 0
          ? order_items
              .map((item) => `${item.menu_item_name} (x${item.quantity})`)
              .join(", ")
          : "No items"}
      </p>

      <p className="text-gray-800 mt-2">
        <span className="font-semibold">Tables:</span>{" "}
        {tables.length > 0 ? tables.join(", ") : "No tables"}
      </p>

      {/* Buttons section - Stacked vertically */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={toggleStatus}
          className={`px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-300 shadow-md 
            ${
              status === "Pending"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
        >
          Mark as {status === "Pending" ? "Completed" : "Pending"}
        </button>

        {/* Generate Bill Button – Visible for Completed Orders */}
        {status === "Completed" && (
          <button
            onClick={() => onGenerateBill(id)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300"
          >
            🧾 Generate Bill
          </button>
        )}
      </div>
    </div>
  );
};

// OrderPage Component – Manages the list of orders
const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter(); // Next.js navigation hook

  const LOCAL_STORAGE_KEY = "rms_orders";

  // Sample static orders (added if no data exists)
  const staticOrders = [
    {
      id: 1,
      status: "Pending",
      created_at: new Date().toISOString(),
      order_items: [
        { menu_item_name: "Burger", quantity: 2 },
        { menu_item_name: "Fries", quantity: 1 },
      ],
      tables: [3],
    },
    {
      id: 2,
      status: "Completed",
      created_at: new Date().toISOString(),
      order_items: [{ menu_item_name: "Pizza", quantity: 1 }],
      tables: [5, 6],
    },
    {
      id: 3,
      status: "Pending",
      created_at: new Date().toISOString(),
      order_items: [
        { menu_item_name: "Pasta", quantity: 3 },
        { menu_item_name: "Garlic Bread", quantity: 2 },
      ],
      tables: [2],
    },
  ];

  // Load orders from local storage or add static ones
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedOrders && storedOrders.length > 0) {
      setOrders(storedOrders);
    } else {
      saveOrders(staticOrders);
    }
  }, []);

  // Save orders to local storage
  const saveOrders = (updatedOrders) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  // Update order status
  const updateOrderStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    saveOrders(updatedOrders);
  };

  // Navigate to the Add Order page
  const goToAddOrder = () => {
    router.push("/orders/add");
  };

  // Navigate to Bill Page with order ID
  const goToBillPage = (orderId) => {
    router.push(`/generate-bill/${orderId}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-violet-200 p-4">
      <div className="w-full h-[calc(100vh-2rem)] bg-white shadow-xl rounded-xl p-8 border border-gray-300 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">🍽️ Order Management</h1>
          <button
            onClick={goToAddOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-medium transition-all duration-300"
          >
            ➕ Add Order
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">No orders available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={updateOrderStatus}
                onGenerateBill={goToBillPage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;


