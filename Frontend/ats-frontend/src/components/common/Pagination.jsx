import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page = 1,
  totalPages = 1,
  totalRecords = 0,
  limit = 10,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const startRecord = totalRecords === 0 ? 0 : (page - 1) * limit + 1;
  const endRecord = Math.min(page * limit, totalRecords);

  // Generate page numbers
  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          page - 1,
          page,
          page + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t bg-white px-4 py-3">
      {/* Left */}
      <p className="text-sm text-gray-600">
        Showing <span className="font-semibold">{startRecord}</span> -{" "}
        <span className="font-semibold">{endRecord}</span> of{" "}
        <span className="font-semibold">{totalRecords}</span> records
      </p>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1 rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* Page Numbers */}
        {getPages().map((item, index) =>
          item === "..." ? (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(item)}
              className={`h-9 w-9 rounded-md text-sm font-medium transition ${
                page === item
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1 rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}