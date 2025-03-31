"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const BillsPage = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all bills from the API
  const fetchBills = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/bills/");
      setBills(response.data);
    } catch (error) {
      console.error("❌ Error fetching bills:", error);
      alert("Error loading bills. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Navigate to the detailed bill page
  const viewBillDetails = (orderId) => {
    router.push(`/generate-bill/${orderId}`);
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">⏳ Loading bills...</p>;

  return (
    <div className="mx-auto p-8 bg-blue-100 min-h-screen overflow-hidden rounded-2xl">
    <h1 className="text-3xl font-bold text-center py-6 text-gray-800">Payments</h1>
  
    <div className="overflow-hidden rounded-2xl shadow-lg bg-white p-6">
      
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
        <thead>
          <tr className="bg-blue-100 text-gray-700">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Order</th>
            <th className="p-4 text-left">Total Amount</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {bills.map((bill) => (
            <tr key={bill.id} className="hover:bg-gray-100 transition">
              <td className="p-4">{bill.id}</td>
              <td className="p-4">{bill.order}</td>
              <td className="p-4 font-medium">₹{bill.total_amount}</td>
              <td className="p-4 font-semibold">
                {bill.is_paid ? (
                  <span className="px-3 py-1 rounded-full text-green-700 bg-green-200 text-sm">
                    Paid
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-red-700 bg-red-200 text-sm">
                    Pending
                  </span>
                )}
              </td>
              <td
                className="p-4 text-blue-500 font-semibold cursor-pointer hover:underline"
                onClick={() => viewBillDetails(bill.order)}
              >
                View Bill
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default BillsPage;
