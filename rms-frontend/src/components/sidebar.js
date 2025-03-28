"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/signin");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        toast.error("You are not signed in");
        router.push("/signin");
      }
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!user) return null; // Don't render if user data isn't loaded

  const { name, role, shift } = user;

  const getWorkStatus = () => {
    const hours = currentTime.getHours();
    const shiftTimings = {
      morning: [6, 14],
      evening: [14, 22],
      night: [22, 6],
    };

    const [start, end] = shiftTimings[shift] || [0, 0];

    if (shift === "night") {
      return hours >= start || hours < end ? "🟢 On Duty" : "🔴 Off Duty";
    }
    return hours >= start && hours < end ? "🟢 On Duty" : "🔴 Off Duty";
  };

  return (
    <aside className="w-72 bg-gradient-to-b   border-white from-gray-900 to-gray-800 text-white p-6 flex flex-col gap-8 min-h-screen shadow-xl ">
      {/* User Info */}
      <div className="p-6 rounded-2xl bg-gray-700 shadow-lg animate-fade-in">
        <h2 className="text-3xl font-bold mb-3">👤 {name}</h2>
        <p className="text-lg">Role: <span className="font-semibold">{role}</span></p>
        <p className="text-lg">Shift: <span className="font-semibold">{shift.charAt(0).toUpperCase() + shift.slice(1)}</span></p>
   
      </div>

<div>
<p className="text-lg mt-2 border p-2 rounded-2xl">{getWorkStatus()}</p>
<p className="text-sm mt-4 border p-3 rounded-2xl">⏰ {currentTime.toLocaleTimeString()}</p>
</div>
      {/* Navigation */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{role === "manager" ? "" : "🛠️ Staff Panel"}</h2>
        <ul className="space-y-3">
          {role === "manager" ? (
            <>
             
            </>
          ) : (
            <>
              <li><Link href="/orders" className="block p-2 rounded-xl bg-pink-600 hover:bg-pink-500 transition-transform transform hover:scale-105">📋 Pending Orders</Link></li>
              <li><Link href="/menudisplay" className="block p-2 rounded-xl bg-teal-600 hover:bg-teal-500 transition-transform transform hover:scale-105">🍽️ Available Food Items</Link></li>
              <li><Link href="/tables" className="block p-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-transform transform hover:scale-105">🍴 Unreserved Tables</Link></li>
            </>
          )}
          
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="mt-auto p-3 rounded-lg bg-red-600 hover:bg-red-500 transition-transform transform hover:scale-105 font-semibold"
      >
        🚪 Logout
      </button>
      {/* Footer */}
      <div className="mt-auto text-center opacity-75">
        <p>✨ RMS Dashboard</p>
      </div>
    </aside>
  );
};

export default Sidebar;
