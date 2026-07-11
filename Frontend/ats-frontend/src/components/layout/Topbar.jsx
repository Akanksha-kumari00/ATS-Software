/*import { useLocation } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaCalendarAlt
} from "react-icons/fa";
function Topbar({
  sidebarOpen,
  setSidebarOpen
}) {
  const location = useLocation();
  const getTitle = (path) => {
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/candidates":
        return "Candidates";
      case "/applications":
        return "Applications";
      case "/interview":
        return "Interviews";
      case "/employees":
        return "Employees";
      case "/jobs":
         return "Position Section";
      case "/clients":
         return "Our Clients";   
      case "/resumebank":
        return "All Resumes"  
      case "/settings":
        return "Settings";
      default:
        return "ATS System";
    }
  };
  
  return (
    <div className="h-14 bg-white flex justify-between items-center px-5 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        >
          <FaBars
            className="text-xl text-gray-700"
          />
        </button>
        <h5 className="text-xl font-bold text-gray-800">
          {getTitle(location.pathname)}
        </h5>
      </div>

      <div className="flex items-center gap-5">
        <FaCalendarAlt
          size={18}
          className="text-gray-600 cursor-pointer"
        />
        <FaBell
          size={18}
          className="text-gray-600 cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="font-semibold text-sm">
              Admin
            </p>
            <p className="text-xs text-gray-500">
              HR Manager
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            A
          </div>
        </div>
      </div>
    </div>
  );
}
export default Topbar;*/
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaBell,
  FaCalendarAlt,
} from "react-icons/fa";

function Topbar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Admin",
    role: "HR Manager",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.log("Invalid user data");
      }
    }
  }, []);

  const getTitle = (path) => {
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/candidates":
        return "Candidates";
      case "/applications":
        return "Applications";
      case "/interview":
        return "Interviews";
      case "/employees":
        return "Employees";
      case "/jobs":
        return "Position Section";
      case "/clients":
        return "Our Clients";
      case "/resumebank":
        return "All Resumes";
      case "/settings":
        return "Settings";
      default:
        return "ATS System";
    }
  };
  return (
    <div className="h-14 bg-white flex justify-between items-center px-5 border-b border-gray-200">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className="text-xl text-gray-700" />
        </button>
        <h5 className="text-xl font-bold text-gray-800">
          {getTitle(location.pathname)}
        </h5>
      </div>
      {/* Right Side */}
      <div className="flex items-center gap-5">
        <FaCalendarAlt
           onClick={() => navigate("/interview")}
          size={18}
          className="cursor-pointer text-gray-600 cursor-pointer"
        />
        <FaBell
          size={18}
          className=" text-gray-600 cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="font-semibold text-sm">
              {user.name}
            </p>
            <p className="text-xs text-gray-500">
              {user.role}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold uppercase">
            {user.name ? user.name.charAt(0) : "A"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;