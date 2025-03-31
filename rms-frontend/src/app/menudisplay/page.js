"use client";

import { useState } from "react";

const menuItems = {
  mainCourse: [
    { name: "Chicken Biriyani", price: "₹180", image: "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/rwqajshg/e74d14f3-fd49-49c6-afd0-6ee84ee89b5d.png" },
    { name: "Beef Biriyani", price: "₹250", image: "https://onestophalal.com/cdn/shop/articles/beef_biryani-1692140447453_1200x.jpg?v=1692147590" },
    { name: "Noodles", price: "₹160", image: "https://takestwoeggs.com/wp-content/uploads/2023/11/Soy-Sauce-Pan-Fried-Noodles-Takestwoeggs-sq-500x500.jpg" },
    { name: "Pasta", price: "₹140", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGj5fp8DwKOgB02Y1w-suEvsEg_E0eYYdO_A&s" },
    { name: "Shawarma", price: "₹100", image: "https://i.pinimg.com/736x/cf/5b/a3/cf5ba387fb0527c3f672c33ab49b1567.jpg" },
    { name: "Kerala Porotta", price: "₹15", image: "https://i.pinimg.com/736x/11/aa/a0/11aaa0334c17590089799fc3048e8eaf.jpg" },
    { name: "Butter nan", price: "₹20", image: "https://i.pinimg.com/736x/70/c6/b4/70c6b4552909525c98f20bd5df173ecb.jpg" },
    { name: "Chilli Chicken", price: "₹170", image: "https://i.pinimg.com/736x/40/3d/8f/403d8f30b314f7a9fdc1e49c42027b23.jpg" },
    { name: "Butter Chicken", price: "₹180", image: "https://i.pinimg.com/736x/f2/14/88/f21488ca4669b966e9f1b0d2d0d899e2.jpg" },
    { name: "Garlic Chicken", price: "₹180", image: "https://i.pinimg.com/736x/67/f9/cd/67f9cd8f1a4f182dfe39c7f567b0a1d3.jpg" },
  
  ],
  beverages: [
    { name: "Tea", price: "₹20", image: "https://www.teaforturmeric.com/wp-content/uploads/2021/11/Masala-Chai-Tea-9-728x1092.jpg" },
    { name: "Coffee", price: "₹30", image: "https://i.pinimg.com/736x/e4/7b/53/e47b53bcb1a2fd4c17797a19aba368da.jpg" },
    { name: "Classic Lemonade", price: "₹25", image: "https://i.pinimg.com/736x/cd/b4/3c/cdb43cac4d0325bb35a095aa48259adc.jpg" },
    { name: "Mojito", price: "₹60", image: "https://i.pinimg.com/736x/85/ad/2e/85ad2ef9c98aaf765263fb3f0e74de61.jpg" },
    { name: "Chocolate Shake", price: "₹80", image: "https://i.pinimg.com/736x/67/bb/52/67bb5211c0ba1e82647cc0bf2b043edf.jpg" },
    
  ],
  desserts: [
    { name: "Tiramisu", price: "₹100", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFvDLlt3ElPjrLrWkCQrGyCvUXeyforNwOg&s" },
    { name: "Chocolate Brownie", price: "₹80", image: "https://chocolatecoveredkatie.com/wp-content/uploads/2022/11/Vegan-Brownies.jpg" },
    { name: "Creme Brulee", price: "₹120", image: "https://i.pinimg.com/736x/43/07/21/430721b992ca3afffcef2548538b04b9.jpg" },
    { name: "Pudding", price: "₹60", image: "https://i.ytimg.com/vi/YpZoIAvnkBw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB6-oIsOOLjJ2DC6Yr-1CUoLBoR6g" },
    { name: "Eclair", price: "₹80", image: "https://i.pinimg.com/736x/38/cd/0c/38cd0c4d1cd188e5a50ed4ae1a0998bc.jpg" },
    
  ],
};

export default function MenuPage() {
  const [selectedItems, setSelectedItems] = useState({});

  const handleAdd = (item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: (prev[item] || 0) + 1,
    }));
  };

  return (
    <div className="p-6  mx-auto bg-[#F5DEB3]">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#8B4513]">Menu</h1>
      {Object.entries(menuItems).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold bg-[#8b4513] text-[#F5DEB3] p-3 rounded-2xl">{category.toUpperCase()}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-3">
            {items.map((item, index) => (
              <div key={index} className=" rounded-2xl shadow-md flex flex-col items-center bg-[#FFE4C4]">
                <img src={item.image} alt={item.name} className= "w-full h-44 object-cover rounded-t-xl" />
                <div className="flex flex-row p-3 gap-2 items-center">
                <div className=" text-center text-[#aa5518] font-semibold ">{item.name} </div>  <div className="font-bold border  rounded-3xl p-2 px-3 h-fit w-fit"> {item.price}</div>
            </div>
                <button 
                  className="bg-[#8B4513] text-white px-3 py-1 font-bold rounded-b-xl w-full hover:bg-[#A0522D] mt-2"
                
                >
                  Add
                </button>
                {selectedItems[item.name] && (
                  <p className="text-gray-600 mt-1">Added: {selectedItems[item.name]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}