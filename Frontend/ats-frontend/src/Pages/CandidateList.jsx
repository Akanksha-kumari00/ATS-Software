import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import api from "../services/api";

import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import CandidateTable from "../components/candidate/CandidateTable";

function CandidateList() {
  const user = localStorage.getItem("user");

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await api.get("/candidates");

        setCandidates(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">
        <Navbar />

        <div className="p-6">

          <h1 className="text-2xl font-bold mb-6">
            Candidate List
          </h1>

          {loading ? (
            <p>Loading Candidates...</p>
          ) : (
            <CandidateTable candidates={candidates} />
          )}

        </div>
      </div>
    </div>
  );
}

export default CandidateList;