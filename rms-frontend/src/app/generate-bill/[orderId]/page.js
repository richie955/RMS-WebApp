"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";

const BillPage = () => {
  const { orderId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [html2pdf, setHtml2pdf] = useState(null);
  const invoiceRef = useRef(null);

  const [billStatus, setBillStatus] = useState("loading"); // "loading" | "unpaid" | "paid" | "generate"

  const checkBillStatus = async () => {
    try {
      const billCheckResponse = await axios.get(
        `http://127.0.0.1:8000/api/bills/?order=${orderId}`
      );
      const existingBill = billCheckResponse.data[0];

      if (existingBill) {
        setBillStatus(existingBill.is_paid ? "paid" : "unpaid");
      } else {
        setBillStatus("generate");
      }
    } catch (error) {
      console.error("❌ Error checking bill status:", error);
      alert("Error checking bill status.");
    }
  };

  useEffect(() => {
    checkBillStatus();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/orders/${orderId}/`
      );
      setOrderItems(response.data.order_items || []);
    } catch (error) {
      console.error("Error fetching order details:", error);
      alert("Error loading bill.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const handlePay = async () => {
    const totalAmount = calculateTotal();

    try {
      if (billStatus === "paid") return; // If already paid, do nothing

      // Check if a bill exists again before proceeding
      const billCheckResponse = await axios.get(
        `http://127.0.0.1:8000/api/bills/?order=${orderId}`
      );
      const existingBill = billCheckResponse.data[0];

      if (existingBill) {
        const billId = existingBill.id;
        if (!existingBill.is_paid) {
          const payload = { is_paid: true, total_amount: totalAmount };
          console.log("📦 PATCH Payload (Update Bill):", payload);

          await axios.patch(
            `http://127.0.0.1:8000/api/bills/${billId}/`,
            payload
          );
          setBillStatus("paid"); // Update button status
        }
      } else {
        const payload = {
          order: orderId,
          is_paid: true,
          total_amount: totalAmount,
        };
        console.log("📦 POST Payload (Create Bill):", payload);

        await axios.post(`http://127.0.0.1:8000/api/bills/`, payload);
        setBillStatus("paid"); // Update button status
      }
    } catch (error) {
      console.error("❌ Error while processing bill:", error);
      alert("❌ Error processing bill. Please try again.");
    }
  };

  useEffect(() => {
    if (orderId) fetchOrderDetails();
  }, [orderId]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading bill...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Invoice Content (for display and PDF generation) */}
      <div ref={invoiceRef} className="p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🧾 Invoice (Order #{orderId})
        </h2>

        {/* Invoice Header */}
        <div className="flex justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold">Restaurant XYZ</h3>
            <p>123 Main Street</p>
            <p>City, State, ZIP</p>
            <p>Phone: +91-9876543210</p>
          </div>
          <div>
            <p className="text-right font-semibold">Invoice Date:</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Order Items */}
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md mb-6">
          <thead className="bg-gray-200">
            <tr className="text-gray-700 text-lg">
              <th className="p-4 border">Item</th>
              <th className="p-4 border">Quantity</th>
              <th className="p-4 border">Price (₹)</th>
              <th className="p-4 border">Total (₹)</th>
            </tr>
          </thead>

          <tbody>
            {orderItems.length > 0 ? (
              orderItems.map((item, index) => (
                <tr
                  key={index}
                  className={`text-gray-800 text-center ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-4 border font-medium">
                    {item.menu_item_name}
                  </td>
                  <td className="p-4 border">{item.quantity}</td>
                  <td className="p-4 border">
                    ₹{parseFloat(item.price).toFixed(2)}
                  </td>
                  <td className="p-4 border font-semibold">
                    ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 border text-center text-red-500">
                  No items found in this order!
                </td>
              </tr>
            )}
          </tbody>

          {/* Invoice Footer */}
          <tfoot className="bg-gray-100 font-bold text-gray-700">
            <tr>
              <td colSpan="3" className="p-4 border text-right">
                Total Amount:
              </td>
              <td className="p-4 border text-center text-green-600 text-xl">
                ₹{calculateTotal().toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        <p className="text-sm text-gray-500 mt-4">
          Thank you for dining with us! 🍽️
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePay}
              className={`px-6 py-3 rounded-lg ${
                billStatus === "paid"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              disabled={billStatus === "paid"}
            >
              {billStatus === "loading"
                ? "⏳ Loading..."
                : billStatus === "paid"
                ? "✅ Already Paid"
                : "🧾 Mark as Paid"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export component dynamically to prevent SSR issues
export default dynamic(() => Promise.resolve(BillPage), { ssr: false });
