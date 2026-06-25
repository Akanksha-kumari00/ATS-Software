/*import { FaEnvelope, FaPhone, FaGraduationCap } from "react-icons/fa";

function CandidateDetails({ candidate }) {
  if (!candidate) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-6">
              Candidate Profile
            </h2>
            <div className="flex flex-col items-center mt-10">
                 <div className="w-20 h-20 rounded-full bg-gray-200"></div>
                      <p className="mt-6 text-gray-500">
                        Select a candidate
                      </p>
            </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold">
                {candidate.candidate_name?.charAt(0)}
              </div>
              <h2 className="mt-4 text-xl font-semibold">
                {candidate.candidate_name}
              </h2>
        </div>
        <div className="mt-8 space-y-5">
              <div>
                  <p className="text-xs text-gray-500">
                    Recruiter
                  </p>
                  <p>
                    {candidate.recruiter_name}
                  </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <FaEnvelope />
                  Email
                </p>
                <p>
                  {candidate.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <FaPhone />
                  Mobile
                </p>
                <p>
                  {candidate.mobile}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <FaGraduationCap />
                  Education
                </p>
                <p>
                  {candidate.education}
                </p>
              </div>
        </div>
    </div>
  );
}
export default CandidateDetails;*/