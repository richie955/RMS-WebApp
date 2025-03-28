import React from "react";

const employees = [
  {
    name: "Mike Cannon-Brookes",
    title: "Co-Founder & Co-CEO",
    image: "https://example.com/mike.jpg", // Replace with actual URLs
    bgColor: "bg-orange-200",
  },
  {
    name: "Scott Farquhar",
    title: "Co-Founder & Co-CEO",
    image: "https://example.com/scott.jpg",
    bgColor: "bg-yellow-200",
  },
  {
    name: "Sri Viswanath",
    title: "Chief Technology Officer",
    image: "https://example.com/sri.jpg",
    bgColor: "bg-red-200",
  },
  {
    name: "Anu Bharadwaj",
    title: "Head of Enterprise & Cloud Platform",
    image: "https://example.com/anu.jpg",
    bgColor: "bg-green-200",
  },
  {
    name: "Erika Fisher",
    title: "Chief Administrative Officer & General Counsel",
    image: "https://example.com/erika.jpg",
    bgColor: "bg-blue-200",
  },
  {
    name: "James Beer",
    title: "Chief Financial Officer",
    image: "https://example.com/james.jpg",
    bgColor: "bg-orange-200",
  },
];

const EmployeeCard = ({ name, title, image, bgColor }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${bgColor} text-center`}>
      <img src={image} alt={name} className="w-24 h-24 mx-auto rounded-full" />
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-gray-700">{title}</p>
    </div>
  );
};

const EmployeeManagement = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Our Leadership Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((employee, index) => (
          <EmployeeCard key={index} {...employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
