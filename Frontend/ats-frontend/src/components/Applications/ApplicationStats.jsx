import { useEffect, useState } from "react";
import { getApplicationStats } from "../../services/applicationService";

export default function ApplicationStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await getApplicationStats();
      const data = res?.data || {};
      const formatted = [
        { label: "Total Applications", value: data.totalApplications || 0, color: "bg-blue-100 text-blue-700" },
        { label: "CV Shared", value: data.cvShared || 0, color: "bg-purple-100 text-purple-700" },
        { label: "Shortlisted", value: data.shortlisted || 0, color: "bg-orange-100 text-orange-700" },
        { label: "Interview", value: data.interview || 0, color: "bg-yellow-100 text-yellow-700" },
        { label: "Selected", value: data.selected || 0, color: "bg-emerald-100 text-emerald-700" },
        { label: "Rejected", value: data.rejected || 0, color: "bg-red-100 text-red-700" },
      ];

      setStats(formatted);
    } 
    catch (error) {
  console.error(error);
  setError("Failed to load stats");
}
finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-xl"></div>
        ))}
      </div>
    );
  }
  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="p-4 rounded-2xl shadow-sm border bg-white hover:shadow-md transition">
          <p className="text-xs text-gray-500">{s.label}</p>
          <p className="text-xl font-bold mt-1">{s.value}</p>
        </div>
      ))}
    </div>
  );
}