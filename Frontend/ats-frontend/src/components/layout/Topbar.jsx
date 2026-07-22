import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNotifications,markAsRead,} from "../../services/notificationService";
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
const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(
    (n) => n.is_read === 0
  ).length;
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
useEffect(() => {
  loadNotifications();

  const interval = setInterval(() => {
    loadNotifications();
  }, 30000); // 30 sec me refresh

  return () => clearInterval(interval);
}, []);

const loadNotifications = async () => {
  const data = await getNotifications();
  setNotifications(data);
};
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
        <div className="relative">
          <FaBell
            size={18}
            className="text-gray-600 cursor-pointer"

            onClick={() => setShowNotifications(!showNotifications)}
          />

         {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center pointer-events-none">
              {unreadCount}
            </span>
          )}
          {showNotifications && (
        <div className="absolute right-0 top-8 w-80 bg-white border rounded-lg shadow-lg bg-white z-[9999] pointer-events-auto">
            <div className="p-3 border-b font-semibold">
              Notifications
            </div>
        <div className="max-h-120 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-50">
            {notifications.length === 0 ? (
              <div className="p-3 text-gray-500 ">
                No Notifications
              </div>
            ) : (
              notifications.map((item) => (
          <div
            key={item.id}
            className="p-3 border-b bg-yellow-100 cursor-pointer"
            onClick={async () => {
              try {
                console.log("Clicked", item.id);

                const res = await markAsRead(item.id);
                console.log("API Response:", res.data);

                await loadNotifications();
              } catch (err) {
                console.error("API Error:", err);
              }
            }}
          >
          <p className="font-semibold text-sm">{item.title}</p>

          <p className="text-xs text-gray-600">
            {item.message}
          </p>

          <p className="text-[10px] text-gray-400 mt-1">
            {new Date(item.created_at).toLocaleString()}
          </p>
            </div>
          ))
        )}

      </div>
      </div>
    )}
        </div>
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