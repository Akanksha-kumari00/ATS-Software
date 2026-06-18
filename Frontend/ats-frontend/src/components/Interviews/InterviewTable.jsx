import InterviewRow from "./InterviewRow";

export default function InterviewTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">

      {/* Table Header */}

      <div className="grid grid-cols-7 px-8 py-5 font-semibold text-gray-600 border-b">

  <div>Date</div>

  <div>Candidate</div>

  <div>Specialization</div>

  <div>Hospital</div>

  <div>Time</div>

  <div>Status</div>

  <div>Actions</div>

</div>

      {/* Rows */}

      {data.map((item) => (
        <InterviewRow
          key={item.id}
          item={item}
        />
      ))}

      {/* Footer */}

      <div className="flex justify-between items-center px-8 py-5">

  <p className="text-gray-500">

    Showing 1 to {data.length} interviews

  </p>

  <div className="flex gap-2">

    <button className="w-9 h-9 border rounded-lg">
      1
    </button>

    <button className="w-9 h-9 border rounded-lg">
      2
    </button>

    <button className="w-9 h-9 border rounded-lg">
      3
    </button>

  </div>

</div>
    </div>
  );
}