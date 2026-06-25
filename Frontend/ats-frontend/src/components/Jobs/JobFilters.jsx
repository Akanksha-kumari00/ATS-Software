export default function JobFilters() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-3">

      <input
        type="text"
        placeholder="Search by position, hospital..."
        className="border p-2 rounded-lg w-full"
      />
 
      <input type="date" className="border p-2 rounded-lg" />
      <input type="date" className="border p-2 rounded-lg" />
      <button className="px-4 py-2 bg-gray-100 rounded-lg">
        Reset
      </button>

      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Search
      </button>

      <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
        Export
      </button>

    </div>
  );
}