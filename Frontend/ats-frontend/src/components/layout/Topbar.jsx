/*import {
  FaSearch,
  FaBell,
  FaCalendarAlt
} from "react-icons/fa";

function Topbar() {

  return (

    <div className="h-12 bg-white flex justify-between items-center px-4 border-b border-gray-200">

      

      <div>

        <h5 className="text-2xl font-bold">

          Dashboard

        </h5>

      </div>


      <div className="flex items-center gap-5">

        <div className="flex items-center bg-gray-100 h-10 w-80 rounded-lg px-4">

          <FaSearch className="text-gray-500"/>

          <input

            type="text"

            placeholder="Search candidates, jobs, skills..."

            className="ml-2 bg-transparent outline-none w-full text-sm"

          />

        </div>

        <FaCalendarAlt size={18}/>

        <FaBell size={18}/>

        <div className="flex items-center gap-2">

          <div>

            <p className="font-semibold text-sm">

              Admin

            </p>


          </div>

          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">

            A

          </div>

        </div>

      </div>

    </div>

  );

}

export default Topbar;*/
import { useLocation } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaCalendarAlt
} from "react-icons/fa";

function Topbar() {
  const location = useLocation();

  const getTitle = (path) => {
    switch (path) {
      case "/":
        return "Dashboard";
      case "/candidates":
        return "Candidates";
      case "/applications":
        return "Applications";
      case "/interviews":
        return "Interviews";
      default:
        return "ATS System";
    }
  };

  return (
    <div className="h-14 bg-white flex justify-between items-center px-5 border-b border-gray-200">

     <div>
        <h5 className="text-xl font-bold text-gray-800">
          {getTitle(location.pathname)}
        </h5>
      </div>

      
      <div className="flex items-center gap-5">

        
        <div className="flex items-center bg-gray-100 h-10 w-72 rounded-lg px-3">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search candidates, jobs..."
            className="ml-2 bg-transparent outline-none w-full text-sm"
          />
        </div>

        
        <FaCalendarAlt size={18} className="text-gray-600 cursor-pointer" />

        {/* Notification */}
        <FaBell size={18} className="text-gray-600 cursor-pointer" />

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="font-semibold text-sm">Admin</p>
            <p className="text-xs text-gray-500">HR Manager</p>
          </div>

          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            A
          </div>
        </div>

      </div>
    </div>
  );
}

export default Topbar;