import { useEffect, useState } from "react";

import { getApplicationStats }from "../../services/applicationService";
import {
  FaFileAlt,
  FaShareAlt,
  FaUserCheck,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function ApplicationStats() {
   const [stats, setStats] = useState({});
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
  try {
    const res = await getApplicationStats();
    console.log("STATS API RESPONSE:", res);
    setStats(res);
  } catch (error) {
    console.log(error);
  }
};
  const cards = [
    {
      title: "Total Applications",
      value: stats?.totalApplications || 0,
      icon: <FaFileAlt />,
      iconBg: "bg-blue-200",
      iconColor: "text-blue-600",
    },
    {
      title: "CV Shared",
      value: stats?.cvShared || 0,
      icon: <FaShareAlt />,
      iconBg: "bg-purple-200",
      iconColor: "text-purple-600",
    },
    {
      title: "Shortlisted",
      value: stats?.shortlisted || 0,
      icon: <FaUserCheck />,
      iconBg: "bg-orange-200",
      iconColor: "text-orange-600",
    },
    {
      title: "Interview",
      value: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      iconBg: "bg-yellow-200",
      iconColor: "text-yellow-600",
    },
    {
      title: "Selected",
      value: stats?.selected || 0,
      icon: <FaCheckCircle />,
      iconBg: "bg-emerald-200",
      iconColor: "text-emerald-600",
    },
    {
      title: "Rejected",
      value: stats?.rejected || 0,
      icon: <FaTimesCircle />,
      iconBg: "bg-red-200",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-6 gap-3">
      {cards.map((item, index) => (
        <div
          key={index}
          className="
          bg-white
          rounded-xl
          px-2
          py-2
          shadow-sm
          border
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">
                {item.title}
              </p>
              <h2 className="text-2xl font-bold mt-1">
                {item.value}
              </h2>
            </div>
            <div
              className={`
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              ${item.iconBg}
              ${item.iconColor}
              `}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}

    </div>

  );
}


 

  


