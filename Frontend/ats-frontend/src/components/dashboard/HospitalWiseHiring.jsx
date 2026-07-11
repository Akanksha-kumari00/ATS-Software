import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHospital,
  FaBriefcaseMedical ,
  FaUserCheck,
} from "react-icons/fa";

function HospitalWiseHiring() {
  const [summary, setSummary] = useState({
    totalHospitals: 0,
    totalPositions: 0,
    totalHiring: 0,
  });

 useEffect(() => {
  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/hiring-summary"
      );
      setSummary(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchSummary();
}, []);
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 h-full">

  <h5 className="text-xl font-semibold mb-2">
    Hiring Summary
  </h5>

  <div className="grid grid-cols-3 gap-2">

    {/* Hospital */}
    <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white p-3 h-30 flex flex-col justify-between">

      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mx-auto">
        <FaHospital size={16}/>
      </div>

      <div className="text-center">
        <p className="text-xs">Total Hospitals</p>
        <h2 className="text-3xl font-bold">{summary.totalHospitals}</h2>
      </div>

    </div>

    {/* Position */}
    <div className="rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 text-white p-3 h-30 flex flex-col justify-between">

      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mx-auto">
        <FaBriefcaseMedical size={16}/>
      </div>

      <div className="text-center">
        <p className="text-xs">Total Positions</p>
        <h2 className="text-3xl font-bold">{summary.totalPositions}</h2>
      </div>

    </div>

    {/* Hiring */}
    <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white p-3 h-30 flex flex-col justify-between">

      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mx-auto">
        <FaUserCheck size={16}/>
      </div>

      <div className="text-center">
        <p className="text-xs">Total Hiring</p>
        <h2 className="text-3xl font-bold">{summary.totalHiring}</h2>
      </div>

    </div>

  </div>

</div>
  );
}

export default HospitalWiseHiring;