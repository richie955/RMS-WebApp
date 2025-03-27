"use client"; // Required for Next.js to enable client-side interactivity

import React, { useState } from "react";

const initialEmployees = [
  { name: "Manisha John Varghese", title: "Co-Founder & Main Cleaner", email: "manisha@example.com", phone: "123-456-7890", image: "https://media.licdn.com/dms/image/v2/D4D03AQG5PIVHQruGZw/profile-displayphoto-shrink_200_200/B4DZO0ibHAHYAY-/0/1733900743865?e=2147483647&v=beta&t=NyAROizU_6DEFOIzYtx797enBh9vQPNJUtWKMLd8E7Q", bgColor: "bg-orange-200" },
  { name: "Scott Farquhar", title: "Co-Founder & Co-CEO", email: "scott@example.com", phone: "987-654-3210", image: "https://i0.wp.com/previsomedia.com/wp-content/uploads/2015/04/business-manager-2.jpg?fit=795%2C500&ssl=1", bgColor:"yellow" },
  { name: "Andrea Hawkins", title: "Chief Technology Officer", email: "sri@example.com", phone: "555-123-4567", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Woman_at_Lover%27s_Bridge_Tanjung_Sepat_%28cropped%29.jpg/1200px-Woman_at_Lover%27s_Bridge_Tanjung_Sepat_%28cropped%29.jpg", bgColor: "bg-red-200" },
  { name: "Anu Bharadwaj", title: "Head of Enterprise & Cloud Platform", email: "anu@example.com", phone: "777-888-9999", image: "https://t3.ftcdn.net/jpg/06/70/00/42/360_F_670004228_4EFH6zZn8kjVhc5q7FyXuAHn3PtSwpwy.jpg", bgColor: "bg-green-200" },
  { name: "Arun Ranjan", title: "Chief Administrative Officer", email: "erika@example.com", phone: "111-222-3333", image: "https://media.istockphoto.com/id/1369746033/photo/portrait-of-a-handsome-young-businessman-working-in-office.jpg?s=612x612&w=0&k=20&c=ca1AFfPfzOPtHZdAwa7QtCD1TFDws7PG9t_rqSibdC0=", bgColor: "bg-blue-200" },
  { name: "Richie James", title: "Chief Financial Officer", email: "james@example.com", phone: "444-555-6666", image: "https://media.licdn.com/dms/image/v2/D5635AQHtRbNxrewhgw/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1729406019024?e=1743274800&v=beta&t=Plp_KjqS6XoI0DW5-zqnBKAN9IUf7GKpbPEFPBosLxY", bgColor: "bg-orange-200" },
];

const EmployeeCard = ({ name, title, email, phone, image, bgColor, onRemove }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${bgColor} text-center`}>
      <img src={image} alt={name} className="w-24 h-24 mx-auto rounded-full object-cover" />
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-gray-700">{title}</p>
      <p className="text-gray-600">{email}</p>
      <p className="text-gray-600">{phone}</p>
      <button onClick={onRemove} className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600">
        Remove
      </button>
    </div>
  );
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [newEmployee, setNewEmployee] = useState({ name: "", title: "", email: "", phone: "", image: "", bgColor: "bg-gray-200" });

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
    if (newEmployee.name && newEmployee.title && newEmployee.email && newEmployee.phone && newEmployee.image) {
      setEmployees([...employees, newEmployee]);
      setNewEmployee({ name: "", title: "", email: "", phone: "", image: "", bgColor: "bg-gray-200" });
    }
  };

  const removeEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Our Leadership Team</h1>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((employee, index) => (
          <EmployeeCard key={index} {...employee} onRemove={() => removeEmployee(index)} />
        ))}
      </div>

      {/* Add Staff Form */}
      <div className="mt-10 p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Staff</h2>
        <form onSubmit={addEmployee} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Employee Name" value={newEmployee.name} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="title" placeholder="Job Title" value={newEmployee.title} onChange={handleChange} className="p-2 border rounded" required />
          <input type="email" name="email" placeholder="Email" value={newEmployee.email} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="phone" placeholder="Phone Number" value={newEmployee.phone} onChange={handleChange} className="p-2 border rounded" required />
          {/* Image Upload Field */}
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