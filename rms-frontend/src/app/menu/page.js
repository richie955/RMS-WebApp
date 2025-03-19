"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/menuitems/")
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Menu</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={item.menuitem_image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-xl font-bold text-green-600">₹{item.price}</span>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    item.available ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                  }`}
                >
                  {item.available ? "Available" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
