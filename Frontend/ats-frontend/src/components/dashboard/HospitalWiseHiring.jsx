import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function HospitalWiseHiring() {

  const [hospitalData, setHospitalData] = useState([]);

  const colors = [
    "#2563eb",
    "#10b981",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#94a3b8"
  ];

  useEffect(() => {

    const getHospitalData = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/dashboard/hospital-wise"
        );

        setHospitalData(response.data);

      }

      catch (error) {

        console.log(error);

      }

    };

    getHospitalData();

  }, []);

return (

  <div className="bg-white rounded-lg shadow-sm  p-1 h-full">

    <h3 className="text-sl font-semibold mb-2">

      Hospital Wise Hiring

    </h3>

    <div className="flex items-center">

      <div style={{ width: "120px", height: "120px" }}>

        <ResponsiveContainer>

          <PieChart>

            <Pie

              data={hospitalData}

              dataKey="total"

              nameKey="hospital_name"

              innerRadius={40}

              outerRadius={60}

            >

              {hospitalData.map((item, index) => (

                <Cell

                  key={index}

                  fill={colors[index % colors.length]}

                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="ml-3 flex-1">

        {hospitalData.map((item, index) => (

          <div

            key={index}

            className="flex justify-between items-center mb-2 "

          >

            <div className="flex items-center">

              <span

                style={{

                  width: "10px",

                  height: "10px",

                  borderRadius: "50%",

                  backgroundColor:

                    colors[index % colors.length],

                  marginRight: "5px"

                }}

              />

              <span className="text-sm" style={{ width: "120px" }}>

                    {item.hospital_name}

               </span>

            </div>

            <strong>

              {item.total}

            </strong>

          </div>

        ))}

      </div>

    </div>

  </div>

);
}

export default HospitalWiseHiring;