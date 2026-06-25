import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaClipboardList,
  FaCalendarAlt,
  FaGift,
  FaUserTie,
  FaFileAlt,
  FaFilePdf,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";
function Sidebar({ sidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
    { name: "Candidates", icon: <FaUsers />, path: "/candidates" },
    { name: "Applications", icon: <FaClipboardList />, path: "/applications" },
    { name: "Interviews", icon: <FaCalendarAlt />, path: "/interview" },
    { name: "Offers", icon: <FaGift />, path: "/offers" },
    { name: "Employees", icon: <FaUserTie />, path: "/employees" },
    { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
    { name: "Resume Bank", icon: <FaFilePdf />, path: "/resumebank" },
    { name: "Settings", icon: <FaCog />, path: "/settings" }
  ];
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
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-red-600"
        >
          <FaSignOutAlt />
          {sidebarOpen && "Logout"}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;