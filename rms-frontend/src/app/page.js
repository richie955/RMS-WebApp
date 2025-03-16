export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">

      <nav className="bg-blue-900 text-white p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Restaurant Management System</h1>
        <ul className="flex gap-6">
          <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
          <li><a href="/orders" className="hover:underline">Orders</a></li>
          <li><a href="/menu" className="hover:underline">Menu</a></li>
          <li><a href="/inventory" className="hover:underline">Inventory</a></li>
          <li><a href="/staff" className="hover:underline">Staff</a></li>
        </ul>
      </nav>

      <header className="bg-blue-900 text-white text-center py-16">
        <h2 className="text-4xl font-bold">Welcome to RMS</h2>
        <p className="mt-2 text-lg">Effortlessly manage your restaurant</p>
        <a href="/orders" className="mt-4 inline-block bg-white text-blue-900 px-6 py-2 rounded font-semibold">
          Manage Orders
        </a>
      </header>

      <section className="p-6 grid grid-cols-3 gap-6 text-center">
        <a href="/orders/add" className="bg-blue-900 text-white py-4 rounded font-semibold">➕ Add Order</a>
        <a href="/menu/add" className="bg-blue-900 text-white py-4 rounded font-semibold">🍽️ Add Menu Item</a>
        <a href="/inventory" className="bg-blue-900 text-white py-4 rounded font-semibold">📦 View Inventory</a>
      </section>

      <section className="p-6">
        <h3 className="text-xl font-bold mb-4">📌 Active Orders</h3>
        <ul className="bg-blue-100 p-4 shadow rounded">
        </ul>
      </section>

      <section className="p-6 bg-blue-100 shadow rounded mx-6">
        <h3 className="text-xl font-bold mb-4">📊 Dashboard</h3>
        <div className="flex justify-between">
          <p>💰 Total Sales: ₹15,000</p>
          <p>🛒 Pending Orders: 5</p>
        </div>
      </section>
    </div>
  );
}
