"use client"; // Required for Next.js to enable client-side interactivity

import React, { useState } from "react";

const initialEmployees = [
  { name: "Manisha John Varghese", title: "Co-Founder", image: "https://media.licdn.com/dms/image/v2/D4D03AQG5PIVHQruGZw/profile-displayphoto-shrink_200_200/B4DZO0ibHAHYAY-/0/1733900743865?e=2147483647&v=beta&t=NyAROizU_6DEFOIzYtx797enBh9vQPNJUtWKMLd8E7Q", bgColor: "bg-orange-200", email: "manisha@example.com", phone: "123-456-7890" },
  { name: "Scott Farquhar", title: "Co-Founder & Co-CEO", image: "/scott.jpg", bgColor: "bg-yellow-200", email: "scott@example.com", phone: "123-456-7890" },
  { name: "Sri Viswanath", title: "Chief Technology Officer", image: "/sri.jpg", bgColor: "bg-red-200", email: "sri@example.com", phone: "123-456-7890" },
  { name: "Anu Bharadwaj", title: "Head of Enterprise & Cloud Platform", image: "/anu.jpg", bgColor: "bg-green-200", email: "anu@example.com", phone: "123-456-7890" },
  { name: "Erika Fisher", title: "Chief Administrative Officer", image: "/erika.jpg", bgColor: "bg-blue-200", email: "erika@example.com", phone: "123-456-7890" },
  { name: "James Beer", title: "Chief Financial Officer", image: "/james.jpg", bgColor: "bg-orange-200", email: "james@example.com", phone: "123-456-7890" },
];

const EmployeeCard = ({ name, title, image, bgColor, email, phone }) => {
  return (
    <div>
    <div>
        className={`p-4 rounded-lg shadow-md ${bgColor} text-center`}
    </div>
      <img src={image} alt={name} className="w-24 h-24 mx-auto rounded-full object-cover" />
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-gray-700">{title}</p>
      <p className="text-gray-600 text-sm">{email}</p>
      <p className="text-gray-600 text-sm">{phone}</p>
    </div>
  );
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [newEmployee, setNewEmployee] = useState({ name: "", title: "", image: "", bgColor: "bg-gray-200", email: "", phone: "" });

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewEmployee({ ...newEmployee, image: imageUrl });
    }
  };

  const addEmployee = (e) => {
    e.preventDefault();
    if (newEmployee.name && newEmployee.title && newEmployee.image && newEmployee.email && newEmployee.phone) {
      setEmployees([...employees, newEmployee]);
      setNewEmployee({ name: "", title: "", image: "", bgColor: "bg-gray-200", email: "", phone: "" });
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Our Leadership Team</h1>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((employee, index) => (
          <EmployeeCard key={index} {...employee} />
        ))}
      </div>

      {/* Add Staff Form */}
      <div className="mt-10 p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Staff</h2>
        <form onSubmit={addEmployee} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Employee Name" value={newEmployee.name} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="title" placeholder="Job Title" value={newEmployee.title} onChange={handleChange} className="p-2 border rounded" required />
          <input type="email" name="email" placeholder="Email" value={newEmployee.email} onChange={handleChange} className="p-2 border rounded" required />
          <input type="tel" name="phone" placeholder="Phone Number" value={newEmployee.phone} onChange={handleChange} className="p-2 border rounded" required />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded" required />
          {/* Image Preview */}
          {newEmployee.image && <img src={newEmployee.image} alt="Preview" className="w-24 h-24 mx-auto rounded-full object-cover mt-2" />}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Staff</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeManagement;