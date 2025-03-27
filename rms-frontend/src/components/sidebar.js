const Sidebar = () => {
    return (
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col gap-4 min-h-screen rounded-xl-r-lg">

        <div className="p-3 rounded-xl-lg">
          <h2 className="text-xl font-bold">Admin</h2>
          <ul className="space-y-4 mt-2 font-semibold">
            <li><a href="/login" className="block p-2 rounded-xl bg-gray-700 hover:bg-gray-600">Login</a></li>
            <li><a href="/menudisplay" className="block p-2 rounded-xl bg-gray-700 hover:bg-gray-600">Menu</a></li>
            <li><a href="/inventory" className="block p-2 rounded-xl bg-gray-700 hover:bg-gray-600">Inventory</a></li>
            <li><a href="/table" className="block p-2 rounded-xl bg-gray-700 hover:bg-gray-600">Tables</a></li>
            <li><a href="/staff" className="block p-2 rounded-xl bg-gray-700 hover:bg-gray-600">Staff</a></li>
            <li><a href="/transactions" className="block p-2 rounded-xl bg-gray-700 hover:bg-gray-600">Transaction History</a></li>
          </ul>
        </div>
        
        <div className=" p-3 rounded-xl-lg">
          <h2 className="text-xl font-bold">Waiter</h2>
          <ul className="space-y-4 mt-2 font-semibold ">
            <li><a href="/login" className="block p-2 rounded-xl bg-gray-700 hover:bg-gray-600">Login</a></li>
            <li><a href="/orders" className="block p-2 rounded-xl bg-gray-700 hover:bg-gray-600">Orders</a></li>
            <li><a href="/menudisplay" className="block p-2 rounded-xl bg-gray-700 hover:bg-gray-600">Menu</a></li>
            <li><a href="/tables" className="block p-2 rounded-xl bg-gray-700 hover:bg-gray-600">Tables</a></li>
          </ul>
        </div>
      </aside>
    );
  };
  
  export default Sidebar;
  