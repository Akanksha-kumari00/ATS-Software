import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaClipboardList,
  FaCalendarAlt,
  FaGift,
  FaUserTie,
  FaFilePdf,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";
function Sidebar({ sidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
    { name: "Candidates", icon: <FaUsers />, path: "/candidates" },
    { name: "Applications", icon: <FaClipboardList />, path: "/applications" },
    { name: "Interviews", icon: <FaCalendarAlt />, path: "/interview" },
    { name: "Clients", icon: <FaGift />, path: "/clients" },
    { name: "Employees", icon: <FaUserTie />, path: "/employees" },
    { name: "Resume Bank", icon: <FaFilePdf />, path: "/resumebank" },
    { name: "Settings", icon: <FaCog />, path: "/settings" }
  ];
  const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/");
};
  return (
    <div
      className={`
      ${sidebarOpen ? "w-52" : "w-20"}
      h-screen
      bg-[#07162b]
      text-white
      flex
      flex-col
      duration-300
      shrink-0
      `}
    >

      <div className="h-20 flex items-center justify-center border-b border-slate-800">

        <h1 className="text-xl font-bold">

          {sidebarOpen ? "ATS Portal" : "ATS"}

        </h1>
      </div>
      <div className="flex-1 px-3 py-4 space-y-1">
        {menu.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className={`
            flex items-center gap-3
            px-4 py-3
            rounded-xl
            text-sm
            cursor-pointer
            transition-all
            duration-300
            hover:translate-x-1
            ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }
            `}
          >
            {item.icon}
            {sidebarOpen &&
              <span>
                {item.name}
              </span>
            }
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800 p-3">
        <div
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-red-600"
        >
          <FaSignOutAlt />
          {sidebarOpen && "Logout"}
        </div>
      </div>
      {showLogoutModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-80 rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">

      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <FaSignOutAlt className="text-3xl text-red-600" />
        </div>
      </div>

      <h2 className="mt-4 text-center text-xl font-bold text-gray-800">
        Logout
      </h2>

      <p className="mt-2 text-center text-sm text-gray-500">
        Are you sure you want to logout from your account?
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setShowLogoutModal(false)}
         className="flex-1 rounded-lg border border-gray-300 bg-white py-2 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleLogout}
          className="flex-1 rounded-lg bg-red-600 py-2 font-medium text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}
export default Sidebar;