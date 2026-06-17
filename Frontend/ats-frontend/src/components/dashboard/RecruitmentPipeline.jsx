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

    "bg-blue-50 text-blue-600",

    "bg-cyan-50 text-cyan-600",

    "bg-purple-50 text-purple-600",

    "bg-orange-50 text-orange-600",

    "bg-green-50 text-green-600",

    "bg-red-50 text-red-600"

  ];

  const barColors = [

    "bg-blue-500",

    "bg-cyan-500",

    "bg-purple-400",

    "bg-orange-400",

    "bg-green-400",

    "bg-red-400"

  ];

  const icons = [

    <UserPlus size={10} />,

    <FileText size={10} />,

    <Star size={10} />,

    <CalendarDays size={10} />,

    <CheckCircle size={10} />,

    <XCircle size={10} />

  ];

  return (

    <div className="bg-white rounded-xl p-2 shadow-sm">

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

      <div className="grid grid-cols-6 gap-1">

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

                p-2

                text-center

                ${cardColors[index]}

                `}

              >

                <div className="flex justify-center mb-1">

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

      <div className="flex h-1.5 rounded-full overflow-hidden mt-2">

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