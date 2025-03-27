"use client";

import { useState } from "react";

const tables = [
  { id: 1, number: "Table 1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pdj3iXToiH4XrZeH6tGYt39SGdBGP-qbYg&s" },
  { id: 2, number: "Table 2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pdj3iXToiH4XrZeH6tGYt39SGdBGP-qbYg&s" },
  { id: 3, number: "Table 3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pdj3iXToiH4XrZeH6tGYt39SGdBGP-qbYg&s" },
  { id: 4, number: "Table 4", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pdj3iXToiH4XrZeH6tGYt39SGdBGP-qbYg&s" },
  { id: 5, number: "Table 5", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pdj3iXToiH4XrZeH6tGYt39SGdBGP-qbYg&s" },
  { id: 6, number: "Table 6", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pdj3iXToiH4XrZeH6tGYt39SGdBGP-qbYg&s" },
  { id: 7, number: "Table 7", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pdj3iXToiH4XrZeH6tGYt39SGdBGP-qbYg&s" },
  { id: 8, number: "Table 8", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pdj3iXToiH4XrZeH6tGYt39SGdBGP-qbYg&s" },
];

export default function TableReservation() {
  const [reservedTables, setReservedTables] = useState({});

  const handleReserve = (id) => {
    setReservedTables((prev) => ({ ...prev, [id]: true }));
  };

  const handleUnreserve = (id) => {
    setReservedTables((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-[#975449] min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-6 text-gold-500">Table Reservations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`border p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
              reservedTables[table.id] ? "bg-[#60352e]" : "bg-[#b99589]"
            }`}
          >
            <img
              src={table.image}
              alt={table.number}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-lg font-semibold mt-3 text-center">{table.number}</p>
            <div className="flex justify-center mt-3 space-x-3">
              {!reservedTables[table.id] ? (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => handleReserve(table.id)}
                >
                  Reserve
                </button>
              ) : (
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                  onClick={() => handleUnreserve(table.id)}
                >
                  Unreserve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
