import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeActionMenu from "../Employees/EmployeeActionMenu";
export default function EmployeeTable({ employees, setEmployees }) {
  const emptyForm = {
    name: "",
    email: "",
    phone_number: "",
    job_profile: "",
    working_position: "",
    cv_forwarded: 0,
    interview_done: 0,
    joining_status: 0,
  };
  const [loading] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [mode, setMode] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  
  
  const handleView = (emp) => {
    setSelectedEmp(emp);
    setMode("view");
  };
  
  const handleEdit = (emp) => {
    setSelectedEmp(emp);
    setFormData(emp);
    setMode("edit");
  };
  useEffect(() => {

  const closeMenu = () => {

    setOpenMenuId(null);

  };

  document.addEventListener(
    "click",
    closeMenu
  );

  return () => {

    document.removeEventListener(
      "click",
      closeMenu
    );

  };

}, []);

      const handleDelete = async (id) => {
        try {
          await axios.delete(
            `http://localhost:5000/api/employees/${id}`
          );
          setEmployees((prev) =>
            prev.filter((emp) => emp.id !== id)
          );
        } catch (error) {
          console.log(error);
        }
      };
      const handleUpdate = async () => {
       try {
        const id = selectedEmp.id;
            await axios.put(
            `http://localhost:5000/api/employees/${id}`,
            formData
          );
            setEmployees((prev) =>
              prev.map((emp) =>
                emp.id === id
                  ? { ...emp, ...formData }
                  : emp
              )
            );
                handleClose();
                } 
                catch (error) {
                  console.log(error);
                  alert("Update Failed");
                  }
      };
        const handleClose = () => {
          setSelectedEmp(null);
          setFormData(emptyForm);
          setMode(null);
        };

  return (
  <div className=" rounded-xl border border-gray-200 relative">
      <table className="w-full">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Job Profile</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Working Position</th>
            <th className="p-4 text-center">CV</th>
            <th className="p-4 text-center">Interview</th>
            <th className="p-4 text-center">Joining</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-10 text-gray-500">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-blue-50">
                <td className="p-4 font-medium">{emp.name}</td>
                <td className="p-4">{emp.job_profile}</td>
                <td className="p-4">{emp.email}</td>
                <td className="p-4">{emp.phone_number}</td>
                <td className="p-4">{emp.working_position}</td>
                <td className="text-center">{emp.cv_forwarded}</td>
                <td className="text-center">{emp.interview_done}</td>
                <td className="text-center">{emp.joining_status}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                   <EmployeeActionMenu
                        emp={emp}
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleDelete}
                        openMenuId={openMenuId}
                        setOpenMenuId={setOpenMenuId}
                     />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {mode === "view" && selectedEmp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] p-6 rounded relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-3 text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Employee Details</h2>
            <p><b>Name:</b> {selectedEmp.name}</p>
            <p><b>Email:</b> {selectedEmp.email}</p>
            <p><b>Phone:</b> {selectedEmp.phone_number}</p>
            <p><b>Job:</b> {selectedEmp.job_profile}</p>
            <p><b>Position:</b> {selectedEmp.working_position}</p>
            <p><b>CV:</b> {selectedEmp.cv_forwarded}</p>
            <p><b>Interview:</b> {selectedEmp.interview_done}</p>
            <p><b>Joining:</b> {selectedEmp.joining_status}</p>
          </div>
        </div>
      )}
      {mode === "edit" && selectedEmp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[650px] p-6 rounded-lg relative">

            <button
              onClick={handleClose}
              className="absolute top-2 right-3 text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-5">Edit Employee</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border p-2 rounded"
                placeholder="Name"
              />
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border p-2 rounded"
                placeholder="Email"
              />
              <input
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                className="border p-2 rounded"
                placeholder="Phone"
              />
              <input
                value={formData.job_profile}
                onChange={(e) =>
                  setFormData({ ...formData, job_profile: e.target.value })
                }
                className="border p-2 rounded"
                placeholder="Job Profile"
              />
              <input
                value={formData.working_position}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    working_position: e.target.value,
                  })
                }
                className="border p-2 rounded "
                placeholder="Working Position"
    
              />
              <input
                value={formData.cv_forwarded}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cv_forwarded: e.target.value,
                  })
                }
                className="border p-2 rounded"
                placeholder="how much CV forword"
              >
            
              </input>
              <input
                value={formData.interview_done}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interview_done: e.target.value,
                  })
                }
                className="border p-2 rounded"
                placeholder="interview done"
              >
                
              </input>

              <input
                value={formData.joining_status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    joining_status:e.target.value,
                  })
                }
                className="border p-2 rounded"
                placeholder="how much joining"
              >
              </input>

            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}