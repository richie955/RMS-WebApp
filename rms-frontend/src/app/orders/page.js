"use client"; // For Next.js client-side interactivity

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation in Next.js

// OrderCard Component – Displays and updates each order
const OrderCard = ({ order, onUpdateStatus, onGenerateBill }) => {
  const { id, status, created_at, order_items, tables } = order;

  // Toggle Order Status between Pending and Completed
  const toggleStatus = () => {
    const newStatus = status === "Pending" ? "Completed" : "Pending";
    onUpdateStatus(id, newStatus);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Order #{id}</h3>

      <p className="text-gray-600">
        <span className="font-semibold">Status:</span> {status}
      </p>

      <p className="text-gray-600">
        <span className="font-semibold">Created At:</span>{" "}
        {new Date(created_at).toLocaleString()}
      </p>

      {/* Display Menu Items with Quantities */}
      <p className="text-gray-600 mt-2">
        <span className="font-semibold">Menu Items:</span>{" "}
        {order_items.length > 0
          ? order_items
              .map(
                (item) =>
                  `${item.menu_item_name} (x${item.quantity})`
              )
              .join(", ")
          : "No items"}
      </p>

      <p className="text-gray-600 mt-2">
        <span className="font-semibold">Tables:</span>{" "}
        {tables.length > 0 ? tables.join(", ") : "No tables"}
      </p>

      {/* Toggle Status Button */}
      <button
        onClick={toggleStatus}
        className={`mt-4 px-4 py-2 rounded ${
          status === "Pending"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-yellow-500 hover:bg-yellow-600"
        } text-white`}
      >
        Mark as {status === "Pending" ? "Completed" : "Pending"}
      </button>

      {/* Generate Bill Button – Visible for Completed Orders */}
      {status === "Completed" && (
        <button
          onClick={() => onGenerateBill(id)}
          className="mt-4 ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          🧾 Generate Bill
        </button>
      )}
    </div>
  );
};

// OrderPage Component – Manages the list of orders
const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter(); // Next.js navigation hook
  const API_URL = "http://127.0.0.1:8000/api/orders/";

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Error loading orders. Please check the backend.");
    }
  };

  // Update order status in the backend
  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update order status");

      // Update local state after successful API call
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order. Please try again.");
    }
  };

  // Navigate to the Add Order page
  const goToAddOrder = () => {
    router.push("/orders/add");
  };

  // Navigate to Bill Page with order ID
  const goToBillPage = (orderId) => {
    router.push(`/generate-bill/${orderId}`);
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <button
          onClick={goToAddOrder}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Add Order
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders available.</p>
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
  );
};

export default OrderPage;
