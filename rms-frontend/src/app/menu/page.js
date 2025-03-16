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
    <div>
      <h2>Menu Items</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItems;
