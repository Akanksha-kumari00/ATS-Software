import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LayoutHeader({ showBack = true }) {
  const navigate = useNavigate();

  return (
    <div className="mb-2">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition"
        >
          <ArrowLeft size={15} />
          Back
        </button>
      )}
    </div>
  );
}

export default LayoutHeader;