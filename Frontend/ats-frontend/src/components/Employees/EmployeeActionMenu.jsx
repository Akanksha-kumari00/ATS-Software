import {
  FaEllipsisV,
  FaEdit,
  FaEye,
  FaTrash,
} from "react-icons/fa";

export default function EmployeeActionMenu({
  emp,
  onEdit,
  onView,
  onDelete,
  openMenuId,
  setOpenMenuId,
}) {

  const isOpen = openMenuId === emp.id;
  return (
    <div className="relative flex justify-center">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenuId(
            isOpen
              ? null
              : emp.id
          );
        }}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <FaEllipsisV />
      </button>
      {isOpen && (
        <div
          onClick={(e) =>
            e.stopPropagation()
          }
          className="absolute right-0 top-8 w-32 bg-white border rounded-lg shadow-lg z-[9999]"
        >

          <button

            onClick={() => {
              onView(emp);
              setOpenMenuId(null);

            }}

            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100"

          >
            <FaEye />
            View
          </button>
          <button
            onClick={() => {
              onEdit(emp);
              setOpenMenuId(null);
            }}
            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100"
          >
            <FaEdit />
            Edit
          </button>
          <button
            onClick={() => {
              onDelete(emp.id);
              setOpenMenuId(null);
            }}
            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-red-100 text-red-600"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}