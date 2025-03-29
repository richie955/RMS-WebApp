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
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">📊 All Bills</h1>

      {bills.length === 0 ? (
        <p className="text-center text-gray-600">No bills available.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="p-4 border">Bill ID</th>
              <th className="p-4 border">Order ID</th>
              <th className="p-4 border">Total Amount (₹)</th>
              <th className="p-4 border">Status</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr
                key={bill.id}
                className="text-gray-800 text-center hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 border">{bill.id}</td>
                <td className="p-4 border">{bill.order}</td>
                <td className="p-4 border font-semibold">₹{bill.total_amount}</td>
                <td className={`p-4 border font-semibold ${bill.is_paid ? "text-green-600" : "text-red-600"}`}>
                  {bill.is_paid ? "✅ Paid" : "❌ Unpaid"}
                </td>
                <td className="p-4 border">
                  <button
                    onClick={() => viewBillDetails(bill.order)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    📄 View Bill
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BillsPage;
