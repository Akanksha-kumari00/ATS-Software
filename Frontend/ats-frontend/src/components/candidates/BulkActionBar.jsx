import { useNavigate } from "react-router-dom";
import {
  Mail,
  CalendarDays,
  Download,
  Trash2,
  X,
} from "lucide-react";

function BulkActionBar({
  selectedCount,
  onSendMail,
  onExport,
  onDelete,
  onClear,
  
}) {
   const navigate = useNavigate();
  if (selectedCount === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg text-white px-5 py-4 mb-4">

      <div className="flex items-center justify-between flex-wrap gap-4">

        <div>
          <h3 className="font-semibold text-lg">
            {selectedCount} Candidate{selectedCount > 1 ? "s" : ""} Selected
          </h3>

          <p className="text-blue-100 text-sm">
            Perform bulk actions on selected candidates.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <button
            onClick={onSendMail}
            className="bg-white text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-50"
          >
            <Mail size={16} />
            Send Mail
          </button>

          <button
            onClick={() => navigate("/interview")}
            className="bg-white text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-50"
          >
            <CalendarDays size={16} />
            Interview
          </button>

          <button
            onClick={onExport}
            className="bg-white text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-50"
          >
            <Download size={16} />
            Export
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
          >
            <Trash2 size={16} />
            Delete
          </button>
          <button
            onClick={onClear}
            className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black"
          >
            <X size={16} />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
export default BulkActionBar;