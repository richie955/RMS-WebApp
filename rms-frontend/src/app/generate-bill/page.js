export default function BillPage({ selectedItems = {} }) {
    const calculateTotal = () => {
      return Object.entries(selectedItems || {}).reduce(
        (total, [item, details]) => total + (details.price || 0) * (details.quantity || 0),
        0
      );
    };
  
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🧾 Customer Bill
        </h2>
  
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-200">
            <tr className="text-gray-700 text-lg">
              <th className="p-4 border">Item</th>
              <th className="p-4 border">Quantity</th>
              <th className="p-4 border">Price (₹)</th>
              <th className="p-4 border">Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems && Object.keys(selectedItems).length > 0 ? (
              Object.entries(selectedItems).map(([item, details], index) => (
                <tr
                  key={index}
                  className={`text-gray-800 text-center ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-4 border font-medium">{item}</td>
                  <td className="p-4 border">{details.quantity}</td>
                  <td className="p-4 border">₹{details.price.toFixed(2)}</td>
                  <td className="p-4 border font-semibold">
                    ₹{(details.price * details.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 border text-center text-red-500">
                  No items selected!
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="bg-gray-100 font-bold text-gray-700">
            <tr>
              <td colSpan="3" className="p-4 border text-right">Total Cost:</td>
              <td className="p-4 border text-center text-green-600 text-xl">
                ₹{calculateTotal().toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
  