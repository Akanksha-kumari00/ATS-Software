
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

  const buttonRef = useRef(null);

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.right + window.scrollX - 130,
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className="relative flex justify-center">
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();

            setOpenMenuId(isOpen ? null : emp.id);
          }}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <FaEllipsisV />
        </button>
      </div>

      {isOpen &&
        createPortal(
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed w-32 bg-white border rounded-lg shadow-lg z-[9999]"
            style={{
              top: position.top,
              left: position.left,
            }}
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
          </div>,
          document.body
        )}
    </>
  );
}