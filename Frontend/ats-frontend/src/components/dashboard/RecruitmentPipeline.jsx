import { useEffect, useState } from "react";
import { getPipeline } from "../../services/dashboardService";
import {
  UserPlus,
  FileText,
  Star,
  CalendarDays,
  CheckCircle,
  XCircle,
  ArrowRight
} from "lucide-react";
function RecruitmentPipeline() {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("thisMonth");
      useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await getPipeline(period);
              setData(response);
            }
            catch (error) {
              console.log(error);
            }
          };
          fetchData();
        }, [period]);
  const cardColors = [
    "bg-blue-50 text-blue-700",
    "bg-cyan-50 text-cyan-700",
    "bg-purple-50 text-purple-700",
    "bg-orange-50 text-orange-700",
    "bg-green-50 text-green-700",
    "bg-red-50 text-red-700"
  ];
  const barColors = [
    "bg-blue-500",
    "bg-cyan-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-green-500",
    "bg-red-500"
  ];
  const icons = [
    <UserPlus size={12} />,
    <FileText size={12} />,
    <Star size={12} />,
    <CalendarDays size={12} />,
    <CheckCircle size={12} />,
    <XCircle size={12} />
  ];
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          Recruitment Process
        </h3>
        <select
          value={period}
          onChange={(e)=>setPeriod(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1 text-xs"
        >
              <option value="today">
                Today
              </option>
              <option value="thisWeek">
                This Week
              </option>
              <option value="thisMonth">
                This Month
              </option>
              <option value="previousMonth">
                Previous Month
              </option>
        </select>
      </div>
      {/* Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1">
        {
          data.map((item,index)=>(
            <div
              key={index}
              className="flex items-center"
            >
              <div
                className={`
                w-full
                rounded-lg
                p-3
                text-center
                ${cardColors[index]}
                `}
              >
                <div className="p-1 flex justify-center mb-1">
                  {icons[index]}
                </div>
                <p className="font-medium text-[11px]">
                  {item.title}
                </p>
                <h2 className="text-lg font-bold">
                  {item.count}
                </h2>
                <p className="text-[10px]">
                  {item.percentage}%
                </p>
              </div>
              {
                index !== data.length-1 && (
                  <ArrowRight
                    size={10}
                    className="mx-1 text-blue-600 shrink-0"
                  />
                )
              }
            </div>
          ))
        }
      </div>
      {/* Progress Bar */}
      <div className="flex h-2 rounded-full overflow-hidden mt-3">
        {
          data.map((item,index)=>(
            <div
              key={index}
              style={{
                width:`${item.percentage}%`
              }}
              className={barColors[index]}
            >
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default RecruitmentPipeline;