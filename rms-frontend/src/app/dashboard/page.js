"use client";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access localStorage only on the client side
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) setRole(user.role);
    }
  }, []);

  const isAdmin = role === "manager";

  return (
   <div className="flex bg-gray-800">
     <div className="flex-1">
    


    <header className="bg-gray-900 text-white text-center py-16 h-[35%]">
      
      <h2 className="text-4xl font-bold">Welcome to RMS</h2>
      <p className="mt-2 text-lg">Effortlessly manage your restaurant</p>
      <a
        href="/orders"
        className="mt-4 inline-block bg-white text-indigo-900 px-6 py-2 rounded font-semibold"
      >
        Manage Orders
      </a>
    </header>

    <div className="p-12 h-[55%] bg-gray-800">

    <section className="p-4  rounded-2xl shadow-2xl grid grid-cols-3 gap-6 text-center bg-gray-700 ">
      {/* Common for Admin & Staff */}
      <a href="/orders" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">📋 View Orders</a>
      <a href="/tables" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">🍽️ View Tables</a>
      <a href="/inventory" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">📦 View Inventory</a>
      <a href="/menu" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">📖 View Menu</a>
      <a href="/orders/add" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">➕ Add Order</a>

      {/* Admin-Only Features */}
      {isAdmin && (
        <>
       
          <a href="/menu/add" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">🍔 Add Menu Item</a>
          <a href="/inventory/add" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">📥Manage Inventory</a>
          <a href="/tables/add" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">➕ Manage Tables</a>
          <a href="/staff" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">👥 Manage Staff</a>
          <a href="/orders" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">🧾 Generate Bill</a>
          <a href="/transactions" className="bg-gray-900 text-white py-4 rounded-2xl font-semibold">💳 Transaction History</a>
        </>
      )}
    </section>
    </div>
  </div></div>
  
  );
};

export default Dashboard;
