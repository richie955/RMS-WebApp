"use client";

import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import Link from "next/link";


export default function MenuPage() {
  const [menuItems, setMenuItems] = useState({});
  const [selectedItems, setSelectedItems] = useState({});

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/menuitems/");
        const data = await response.json();

        // Organize items by category
        const organizedMenu = data.reduce((acc, item) => {
          const category = item.category || "Other";
          if (!acc[category]) acc[category] = [];
          acc[category].push(item);
          return acc;
        }, {});

        setMenuItems(organizedMenu);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);



  return (
    <div className="p-6 mx-auto bg-gray-100 min-h-screen rounded-tl-3xl">
       <div className="flex justify-between">
    <h1 className="text-3xl font-bold text-center py-6 text-gray-800 flex items-center gap-3 justify-center">
      <FaBoxOpen className="text-gray-800" /> Menu
    </h1>
    <Link
  href="/menu/add"
  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 h-fit mt-5 text-sm rounded-lg shadow-lg font-medium transition-all duration-300"
>
  ➕ Add Items
</Link>

        </div>

      {Object.keys(menuItems).length === 0 ? (
        <p className="text-center ">Loading menu...</p>
      ) : (
        Object.entries(menuItems).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-bold bg-gray-800 text-white  p-3 rounded-2xl">
              {category.toUpperCase()}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-3">
              {items.map((item) => (
                <div key={item.id} className="rounded-2xl shadow-md flex flex-col items-center bg-white">
                  <img
                    src={item.menuitem_image || "https://via.placeholder.com/300"}
                    alt={item.name}
                    className="w-full h-44 object-cover rounded-t-xl"
                  />
            
                    <div className="text-center ] font-semibold mt-3">{item.name}</div>
                    <div className="font-bold border my-2 px-2 p-1 rounded bg-gray-900 text-white b-3 h-fit w-fit">₹{item.price}</div>
                  
                  {/* <button
                    className="bg-[#8B4513] text-white px-3 py-1 font-bold rounded-b-xl w-full hover:bg-[#A0522D] mt-2"
                
                  >
                    Add
                  </button> */}

                  {selectedItems[item.name] && (
                    <p className="text-gray-600 mt-1">Added: {selectedItems[item.name]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
