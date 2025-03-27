import Sidebar from "@/components/sidebar";

export default function Home() {
    return (
      <div className="min-h-screen flex bg-white text-black border-4">
        
        <Sidebar/>
        {/* Main Content */}
        <div className="flex-1">
          <nav className=" bg-pink-900 text-white p-4 flex justify-between">
            <h1 className="text-2xl font-bold">Restaurant Management System</h1>
          </nav>
  
          <header className=" bg-pink-900 text-white text-center py-16">
            <h2 className="text-4xl font-bold">Welcome to RMS</h2>
            <p className="mt-2 text-lg">Effortlessly manage your restaurant</p>
            <a href="/orders" className="mt-4 inline-block bg-white text-indigo-900 px-6 py-2 rounded font-semibold">
              Manage Orders
            </a>
          </header>
  
          <section className="p-6 grid grid-cols-3 gap-6 text-center">
            <a href="/orders/add" className=" bg-pink-900 text-white py-4 rounded font-semibold">➕ Add Order</a>
            <a href="/menu/add" className=" bg-pink-900 text-white py-4 rounded font-semibold">🍽️ Add Menu Item</a>
            <a href="/inventory" className="  bg-pink-900 text-white py-4 rounded font-semibold">📦 View Inventory</a>
          </section>
  
          <section className="p-6">
            <h3 className="text-xl font-bold mb-4">📌 Active Orders</h3>
            <ul className="bg-indigo-100 p-4 shadow rounded">
            </ul>
          </section>
  
          <section className="p-6 bg-indigo-100 shadow rounded mx-6">
            <h3 className="text-xl font-bold mb-4">📊 Dashboard</h3>
            <div className="flex justify-between">
              <p>💰 Total Sales: ₹15,000</p>
              <p>🛒 Pending Orders: 5</p>
            </div>
          </section>
        </div>
      </div>
    );
  }
