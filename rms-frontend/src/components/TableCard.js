const TableCard = ({ id, number, capacity, reserved, toggleReservation }) => {
    return (
      <div className="flex flex-col items-center p-5 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-64">
        <p className="text-xl font-semibold text-white mb-1">Table {number}</p>
        <p className="text-sm text-gray-400 mb-4">Capacity: {capacity}</p>
        
        <button
          className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            reserved
              ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
              : "bg-white hover:bg-gray-200 text-gray-900"
          }`}
          onClick={() => toggleReservation(id, reserved)}
        >
          {reserved ? "Unreserve" : "Reserve"}
        </button>
      </div>
    );
  };
  
  export default TableCard;
  