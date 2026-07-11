import { MoreVertical } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  FileText,
} from "lucide-react";
function CandidateTable({
  candidates = [],
  selectedCandidates = [],
  onSelectCandidate,
  onSelectAll,
  setSelectedCandidate,
  onEdit,
  onDelete,
  onScheduleInterview,
  onSendMail,
})
 {
  return (
   <div className="bg-white rounded-xl shadow p-3 overflow-visible">
  <div className="relative overflow-visible">
    <div className="overflow-x-auto">
        <table className="min-w-[1250px] w-full text-sm">
          {/* HEADER */}
          
          <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10 text-xs uppercase">
            
            <tr>
              <th className="w-12 p-3">
              <input
              type="checkbox"
              checked={
              candidates.length > 0 &&
              selectedCandidates.length === candidates.length
              }
              onChange={onSelectAll}
              />
              </th>
              <th className="p-2 text-left">Candidate</th>
              <th className="p-2 text-left">Profile</th>
              <th className="p-2 text-left">Hospital</th>
              <th className="p-2 text-left">Interview</th>
              <th className="p-2 text-left">Salary</th>
              <th className=" text-left">Exp</th>
              <th className="p-3 text-left">CV</th>
              <th className="text-left">Gender</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y">
            {candidates.map((c) => (
              
              <tr
                key={c.id}
                onClick={() => setSelectedCandidate(c)}
               className="hover:bg-blue-50 transition-all duration-150 cursor-pointer"
              >
                <td
                  className="p-3"
                  onClick={(e)=>e.stopPropagation()}
                  >
                  <input
                  type="checkbox"
                  checked={selectedCandidates.includes(c.id)}
                  onChange={()=>onSelectCandidate(c.id)}
                  />
                  </td>
                {/* Candidate */}
                <td className="p-2 relative">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {c.candidate_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {c.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {c.mobile}
                    </p>
                  </div>
                </td>
                {/* Profile */}
                <td className="p-2">
                  <p>{c.education}</p>
                  <p className="text-xs text-gray-500">
                    {c.specialization}
                  </p>
                </td>
                {/* Hospital */}
                <td className="p-2">
                  <p>{c.hospital_name}</p>
                  <p className="text-xs text-gray-500">
                    {c.hospital_location}
                  </p>
                </td>
                {/* Interview */}
                <td className="p-2 text-xs">
                  <p className="font-medium">
                    {c.interview_status}
                    </p>

                  <p className="text-gray-500">
                    {c.interview_date
                      ? new Date(
                          c.interview_date
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                  <p className="text-gray-400">
                    {c.interview_time}
                  </p>
                </td>
                {/* Salary */}
                <td className=" font-medium">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    ₹ {c.salary_expectation}
                    </span>
                </td>
                {/* Experience */}
                <td >
                  {c.experience}
                </td>
                {/* CV */}
                <td className="p-2">
                  {c.cv_path ? (
                    <a
                      href={`http://localhost:5000/${c.cv_path.replace(/\\/g, "/")}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 text-xs"
                    >
                      <FileText size={15} />
                      CV
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      No CV
                    </span>
                  )}
                </td>
                {/* Gender */}
                <td className=" text-xs text-gray-600">
                  {c.gender || "-"}
                </td>

                {/* Action */}
              <td
                className="p-2  relative"
                onClick={(e) => e.stopPropagation()}
              >
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="p-2 rounded-lg hover:bg-gray-100">
                  <MoreVertical size={18} />
                </MenuButton>
                      <MenuItems   anchor="bottom end" className=" mb-2 w-52 bg-white border rounded-xl shadow-xl z-[9999]">
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => setSelectedCandidate(c)}
                              className={`${
                                active ? "bg-gray-100" : ""
                              } w-full text-left px-4 py-2`}
                            >
                              👁 View Profile
                            </button>
                          )}
                        </MenuItem>
                      {c.cv_path && (
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href={`http://localhost:5000/${c.cv_path.replace(/\\/g, "/")}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`${active ? "bg-gray-100" : ""} block px-4 py-2`}
                        >
                          📄 View CV
                        </a>
                      )}
                    </MenuItem>
                  )}
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => onScheduleInterview(c)}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } w-full text-left px-4 py-2`}
                      >
                        📅 Schedule Interview
                      </button>
                    )}
                  </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => onSendMail(c)}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } w-full text-left px-4 py-2`}
                    >
                      ✉ Send Mail
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => onEdit(c)}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } w-full text-left px-4 py-2`}
                    >
                      ✏ Edit
                    </button>
                  )}
                </MenuItem>

                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => onDelete(c.id)}
                        className={`${
                          active ? "bg-red-50 text-red-600" : "text-red-600"
                        } w-full text-left px-4 py-2`}
                      >
                        🗑 Delete
                      </button>
                    )}
                  </MenuItem>

                </MenuItems>
                     </Menu>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      </div>
    </div>
  );
}

export default CandidateTable;