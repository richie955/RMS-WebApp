"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const menuItems = {

  mainCourse: [
    { name: "Chicken Biriyani", price: "180", image: "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/rwqajshg/e74d14f3-fd49-49c6-afd0-6ee84ee89b5d.png" },
    { name: "Beef Biriyani", price: "250", image: "https://onestophalal.com/cdn/shop/articles/beef_biryani-1692140447453_1200x.jpg?v=1692147590" },
    { name: "Noodles", price: "160", image: "https://takestwoeggs.com/wp-content/uploads/2023/11/Soy-Sauce-Pan-Fried-Noodles-Takestwoeggs-sq-500x500.jpg" },
    { name: "Pasta", price: "140", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGj5fp8DwKOgB02Y1w-suEvsEg_E0eYYdO_A&s" },
    { name: "Kerala Porotta", price: "15", image: "https://i.pinimg.com/736x/11/aa/a0/11aaa0334c17590089799fc3048e8eaf.jpg" },
    { name: "Butter nan", price: "20", image: "https://i.pinimg.com/736x/70/c6/b4/70c6b4552909525c98f20bd5df173ecb.jpg" },
    { name: "Chilli Chicken", price: "170", image: "https://i.pinimg.com/736x/40/3d/8f/403d8f30b314f7a9fdc1e49c42027b23.jpg" },
    { name: "Butter Chicken", price: "180", image: "https://i.pinimg.com/736x/f2/14/88/f21488ca4669b966e9f1b0d2d0d899e2.jpg" },
  ],

  beverages: [
    { name: "Tea", price: " 20.00", image: "https://www.teaforturmeric.com/wp-content/uploads/2021/11/Masala-Chai-Tea-9-728x1092.jpg" },
    { name: "Coffee", price: "30.00", image: "https://i.pinimg.com/736x/e4/7b/53/e47b53bcb1a2fd4c17797a19aba368da.jpg" },
    { name: "Classic Lemonade", price: "25.00", image: "https://i.pinimg.com/474x/96/5e/3f/965e3faa1cad12b0d08e767811343ca7.jpg" },
    { name: "Chocolate Shake", price: "80.00", image: "https://i.pinimg.com/736x/e8/30/b6/e830b66c2dfd63fba5989291c774a25a.jpg" },
   ],

  desserts: [
    { name: "Tiramisu", price: "100", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFvDLlt3ElPjrLrWkCQrGyCvUXeyforNwOg&s" },
    { name: "Chocolate Brownie", price: "80", image: "https://chocolatecoveredkatie.com/wp-content/uploads/2022/11/Vegan-Brownies.jpg" },
    { name: "Creme Brulee", price: "120", image: "https://www.recipetineats.com/tachyon/2016/09/Creme-Brulee_8-SQ.jpg" },
    { name: "Pudding", price: "60", image: "https://i.ytimg.com/vi/YpZoIAvnkBw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB6-oIsOOLjJ2DC6Yr-1CUoLBoR6g"},
 
],
};

export default function MenuPage() {
  const [selectedItems, setSelectedItems] = useState({});
  const router = useRouter();

  const handleAdd = (item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item.name]: {
        quantity: (prev[item.name]?.quantity || 0) + 1,
        price: item.price,
      },
    }));
  };

  const handleRemove = (item) => {
    setSelectedItems((prev) => {
      if (!prev[item.name]) return prev;
      const updatedItems = { ...prev };
      updatedItems[item.name].quantity -= 1;
      if (updatedItems[item.name].quantity === 0) delete updatedItems[item.name];
      return updatedItems;
    });
  };

  const handleGenerateBill = () => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    router.push("/bill");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Menu</h1>

      {Object.entries(menuItems).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold bg-[#5c4033] text-white p-3 rounded">
            {category.toUpperCase()}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">
            {items.map((item, index) => (
              <div key={index} className="border p-3 rounded-lg shadow-md flex flex-col items-center">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
                <p className="font-medium mt-2 text-center">{item.name}</p>
                <p className="text-gray-700">₹{item.price}</p>
                <div className="flex mt-2 gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" onClick={() => handleAdd(item)}>Add</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => handleRemove(item)} disabled={!selectedItems[item.name]}>Remove</button>
                </div>
                {selectedItems[item.name] && <p className="text-gray-600 mt-1">Added: {selectedItems[item.name].quantity}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={handleGenerateBill}>
          Generate Bill
        </button>
      </div>
    </div>
  );
}
