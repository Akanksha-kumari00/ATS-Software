import {
  X,
  Mail,
  Phone,
  Building2,
  MapPin,
  GraduationCap,
  Briefcase,
  IndianRupee,
  CalendarDays,
  Clock,
  FileText,
  User,
} from "lucide-react";

function CandidateDetails({ candidate, onClose }) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-screen shadow-2xl overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold">
              {candidate.candidate_name}
            </h2>
            <p className="text-sm text-gray-500">
              {candidate.education} • {candidate.specialization}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-5 space-y-5">

          {/* Basic Info */}
          <div className="bg-gray-50 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-3">
              <User className="text-blue-600" size={18} />
              <h3 className="font-semibold">
                Candidate Information
              </h3>
            </div>

            <div className="space-y-3 text-sm">

              <div className="flex gap-3">
                <Phone size={16} className="text-gray-500 mt-1" />
                <span>{candidate.mobile || "-"}</span>
              </div>

              <div className="flex gap-3">
                <Mail size={16} className="text-gray-500 mt-1" />
                <span>{candidate.email || "-"}</span>
              </div>

            </div>

          </div>

          {/* Hospital */}
          <div className="bg-gray-50 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-3">
              <Building2 className="text-green-600" size={18} />
              <h3 className="font-semibold">
                Hospital
              </h3>
            </div>

            <div className="space-y-3 text-sm">

              <div className="flex gap-3">
                <Building2 size={16} className="text-gray-500 mt-1" />
                <span>{candidate.hospital_name || "-"}</span>
              </div>

              <div className="flex gap-3">
                <MapPin size={16} className="text-gray-500 mt-1" />
                <span>{candidate.hospital_location || "-"}</span>
              </div>

            </div>

          </div>

          {/* Profile */}
          <div className="bg-gray-50 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-3">
              <GraduationCap
                className="text-purple-600"
                size={18}
              />
              <h3 className="font-semibold">
                Professional Details
              </h3>
            </div>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Education
                </span>
                <span>{candidate.education || "-"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Specialization
                </span>
                <span>{candidate.specialization || "-"}</span>
              </div>

             <div className="flex items-center justify-between">
  <div className="flex items-center gap-2 text-gray-600">
    <Briefcase size={16} />
    <span>Experience</span>
  </div>

  <span className="font-medium">
    {candidate.experience || "-"}
  </span>
</div>

<div className="flex items-center justify-between">
  <div className="flex items-center gap-2 text-gray-600">
    <IndianRupee size={16} />
    <span>Salary</span>
  </div>

  <span className="font-medium">
    {candidate.salary_expectation || "-"}
  </span>
</div>

            </div>

          </div>

          {/* Interview */}
          <div className="bg-gray-50 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-3">
              <CalendarDays
                className="text-orange-600"
                size={18}
              />
              <h3 className="font-semibold">
                Interview
              </h3>
            </div>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-medium">
                  {candidate.interview_status || "-"}
                </span>
              </div>

              <div className="flex gap-3">
                <CalendarDays
                  size={16}
                  className="text-gray-500 mt-1"
                />
                <span>
                  {candidate.interview_date
                    ? new Date(
                        candidate.interview_date
                      ).toLocaleDateString()
                    : "-"}
                </span>
              </div>

              <div className="flex gap-3">
                <Clock
                  size={16}
                  className="text-gray-500 mt-1"
                />
                <span>
                  {candidate.interview_time || "-"}
                </span>
              </div>

            </div>

          </div>

          {/* Resume */}
          <div className="bg-gray-50 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-3">
              <FileText
                className="text-red-600"
                size={18}
              />
              <h3 className="font-semibold">
                Resume
              </h3>
            </div>

            {candidate.cv_path ? (
              <a
                href={`http://localhost:5000/${candidate.cv_path.replace(
                  /\\/g,
                  "/"
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                <FileText size={16} />
                View Resume
              </a>
            ) : (
              <p className="text-gray-500 text-sm">
                Resume not uploaded
              </p>
            )}

          </div>

          {/* Remarks */}
          <div className="bg-gray-50 rounded-xl p-4">

            <h3 className="font-semibold mb-2">
              Remarks
            </h3>

            <p className="text-sm text-gray-600">
              {candidate.remarks || "No remarks available"}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;