"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import TableCard from "@/components/TableCard";

const TableReservation = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tables/");
        setTables(response.data);
      } catch (error) {
        toast.error("Failed to fetch tables");
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  const toggleReservation = async (id, reserved) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tables/${id}/`, {
        reserved: !reserved,
      });
      setTables((prev) =>
        prev.map((table) =>
          table.id === id ? { ...table, reserved: !reserved } : table
        )
      );
      toast.success(`Table ${id} ${reserved ? "unreserved" : "reserved"}`);
    } catch (error) {
      toast.error("Failed to update reservation status");
    }
  };

  return (
    <div className="flex justify-center  rounded-tl-3xl px-8 items-center min-h-screen bg-blue-100 ">
      <div className="w-full  rounded-2xl  border-gray-700">
        <h1 className="text-3xl font-bold  mb-6 -mt-10  ">
          🍽 Table Reservations
        </h1>

        {loading ? (
          <p className="text-center text-gray-300">Loading tables...</p>
        ) : (

          
          <div className="space-y-6">

             {/* Unreserved Tables */}
             <div>
              <h2 className="text-xl font-semibold  mb-3">
                Available Tables
              </h2>
              <div className="flex flex-wrap gap-6">
                {tables
                  .filter((table) => !table.reserved)
                  .map((table) => (
                    <TableCard
                      key={table.id}
                      id={table.id}
                      number={table.number}
                      capacity={table.capacity}
                      reserved={table.reserved}
                      toggleReservation={toggleReservation}
                    />
                  ))}
              </div>
            </div>
            {/* Reserved Tables */}
            <div>
              <h2 className="text-xl font-semibold  mb-3">
                Reserved Tables
              </h2>
              <div className="flex flex-wrap gap-6">
                {tables
                  .filter((table) => table.reserved)
                  .map((table) => (
                    <TableCard
                      key={table.id}
                      id={table.id}
                      number={table.number}
                      capacity={table.capacity}
                      reserved={table.reserved}
                      toggleReservation={toggleReservation}
                    />
                  ))}
              </div>
            </div>

           
          </div>
        )}
      </div>
    </div>
  );
};

export default TableReservation;
