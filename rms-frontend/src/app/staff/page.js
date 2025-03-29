"use client"; // Required for Next.js client-side interactivity

import React, { useState, useEffect } from "react";

// Role and Shift Choices
const ROLE_CHOICES = [
  { value: "manager", label: "Manager" },
  { value: "waiter", label: "Waiter" },
  { value: "cook", label: "Cook" },
];

const SHIFT_CHOICES = [
  { value: "morning", label: "Morning" },
  { value: "evening", label: "Evening" },
  { value: "night", label: "Night" },
];

const EmployeeCard = ({ id, name, email, role, shift, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedRole, setUpdatedRole] = useState(role);
  const [updatedShift, setUpdatedShift] = useState(shift);

  const handleUpdate = async () => {
    try {
      await onUpdate(id, updatedRole, updatedShift);
      setEditMode(false); // Exit edit mode after successful update
    } catch (error) {
      console.error("Update failed:", error);
      alert("Error updating staff. Check the console for details.");
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-gray-100 text-center">
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{email}</p>

      {editMode ? (
        <div className="mt-4">
          {/* Role Dropdown */}
          <select
            value={updatedRole}
            onChange={(e) => setUpdatedRole(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          >
            {ROLE_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>

          {/* Shift Dropdown */}
          <select
            value={updatedShift}
            onChange={(e) => setUpdatedShift(e.target.value)}
            className="p-2 border rounded w-full"
          >
            {SHIFT_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>

          {/* Save Button */}
          <button
            onClick={handleUpdate}
            className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Save
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => setEditMode(false)}
            className="mt-2 ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-700">
            {ROLE_CHOICES.find((r) => r.value === role)?.label}
          </p>
          <p className="text-gray-700">
            {SHIFT_CHOICES.find((s) => s.value === shift)?.label} shift
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const API_URL = "http://127.0.0.1:8000/api/users/";

  // Fetch all employees from API
  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch staff");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Error fetching employees.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Update staff role and shift
  const updateEmployee = async (id, newRole, newShift) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole, shift: newShift }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
        throw new Error("Failed to update staff");
      }

      // Refresh the staff list after update
      await fetchEmployees();
      alert("Staff updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Error updating staff.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Staff</h1>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            {...employee}
            onUpdate={updateEmployee}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
