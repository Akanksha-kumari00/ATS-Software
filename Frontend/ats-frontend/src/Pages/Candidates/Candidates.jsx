import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import CandidateHeader from "../../components/candidates/CandidateHeader";
import CandidateFilters from "../../components/candidates/CandidateFilters";
import CandidateTable from "../../components/candidates/CandidateTable";

import { getCandidates } from "../../services/candidateService";

function Candidates() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [candidates, setCandidates] = useState([]);

  const [search, setSearch] = useState("");

  const [ setSelectedCandidate] = useState(null);

  const [filters, setFilters] = useState({

    speciality: "",

    experience: "",

    location: [],

    hiringStage: []

  });

  useEffect(() => {

    const loadCandidates = async () => {

      try {

        const data = await getCandidates();

        setCandidates(data);

      }

      catch (error) {

        console.log(error);

      }

    };

    loadCandidates();

  }, []);



  const filteredCandidates = candidates.filter((candidate) => {

    const searchMatch =

      candidate.candidate_name

      ?.toLowerCase()

      .includes(search.toLowerCase());


    const specialityMatch =

      !filters.speciality ||

      candidate.specialization === filters.speciality;


    const experienceMatch =

      !filters.experience ||

      candidate.experience === filters.experience;


    const locationMatch =

      filters.location.length === 0 ||

      filters.location.includes(

        candidate.hospital_location

      );


    const stageMatch =

      filters.hiringStage.length === 0 ||

      filters.hiringStage.includes(

        candidate.status

      );


    return (

      searchMatch &&

      specialityMatch &&

      experienceMatch &&

      locationMatch &&

      stageMatch

    );

  });



  return (

    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">

      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="flex-1 overflow-y-auto">

        <Topbar

          sidebarOpen={sidebarOpen}

          setSidebarOpen={setSidebarOpen}

        />

        <div className="p-4">

          <div className="grid grid-cols-12 gap-4">

            {/* Filters */}

            <div className="col-span-2">

              <CandidateFilters

                filters={filters}

                setFilters={setFilters}

              />

            </div>

            {/* Table */}

            <div className="col-span-10">

              <CandidateHeader

                search={search}

                setSearch={setSearch}

              />

              <CandidateTable

                candidates={filteredCandidates}

                setSelectedCandidate={setSelectedCandidate}

              />

            </div>

         


          </div>

        </div>

      </div>

    </div>

  );

}

export default Candidates;