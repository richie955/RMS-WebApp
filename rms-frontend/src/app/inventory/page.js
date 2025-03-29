"use client";

import React, { useState } from "react";

const initialInventory = [
  { name: "Tomatoes", availability: "In Stock", quantity: 20 },
  { name: "Cheese", availability: "Low Stock", quantity: 5 },
  { name: "Bread", availability: "Out of Stock", quantity: 0 },
  { name: "Lettuce", availability: "In Stock", quantity: 15 },
  { name: "Rice", availability: "In Stock", quantity: 20 },
  { name: "Flour", availability: "Low Stock", quantity: 5 },
  { name: "Chicken", availability: "Out of Stock", quantity: 0 },
  { name: "Mutton", availability: "In Stock", quantity: 15 },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [newIngredient, setNewIngredient] = useState({ name: "", quantity: "" });
  const [removeIngredient, setRemoveIngredient] = useState("");

  const updateQuantity = (index, change) => {
    setInventory((prevInventory) => {
      const newInventory = [...prevInventory];
      newInventory[index].quantity = Math.max(0, newInventory[index].quantity + change);
      newInventory[index].availability =
        newInventory[index].quantity === 0
          ? "Out of Stock"
          : newInventory[index].quantity < 10
          ? "Low Stock"
          : "In Stock";
      return newInventory;
    });
  };

  const handleAddIngredient = () => {
    if (!newIngredient.name || newIngredient.quantity === "") return;
    const quantity = parseInt(newIngredient.quantity, 10);
    if (isNaN(quantity) || quantity < 0) return;

    setInventory((prevInventory) => [
      ...prevInventory,
      {
        name: newIngredient.name,
        quantity,
        availability: quantity === 0 ? "Out of Stock" : quantity < 10 ? "Low Stock" : "In Stock",
      },
    ]);
    setNewIngredient({ name: "", quantity: "" });
  };

  const handleRemoveIngredient = () => {
    setInventory((prevInventory) => prevInventory.filter((item) => item.name !== removeIngredient));
    setRemoveIngredient("");
  };

  return (
    <div className="min-h-screen bg-[#F0EDE5] p-6">
      <div className=" mx-auto bg-[#C47955] shadow-lg rounded-lg p-6 text-green">
        <h1 className="text-2xl font-semibold mb-4">Inventory</h1>
        <div className="grid gap-4">
          {inventory.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border rounded-lg bg-[#F5DEB3] shadow-sm"
            >
              <span className="font-medium text-lg">{item.name}</span>
              <span
                className={
                  item.availability === "In Stock"
                    ? "text-green-800"
                    : item.availability === "Low Stock"
                    ? "text-yellow-800"
                    : "text-red-800"
                }
              >
                {item.availability}
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => updateQuantity(index, -1)}
                >
                  -
                </button>
                <span className="text-gray-900">Qty: {item.quantity}</span>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => updateQuantity(index, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add & Remove Ingredient Section */}
        <div className="mt-6 p-4 bg-[#F5DEB3] rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#8B4513] mb-3">Manage Inventory</h2>

          {/* Add Ingredient */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-[#8B4513]">Add Ingredient</h3>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Ingredient Name"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newIngredient.quantity}
                onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
                className="border p-2 rounded w-24"
              />
              <button
                className="bg-[#8B4513] text-white px-3 py-2 rounded hover:bg-[#A0522D]"
                onClick={handleAddIngredient}
              >
                Add
              </button>
            </div>
          </div>

          {/* Remove Ingredient */}
          <div>
            <h3 className="text-lg font-medium text-[#8B4513]">Remove Ingredient</h3>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Ingredient Name"
                value={removeIngredient}
                onChange={(e) => setRemoveIngredient(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                onClick={handleRemoveIngredient}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
