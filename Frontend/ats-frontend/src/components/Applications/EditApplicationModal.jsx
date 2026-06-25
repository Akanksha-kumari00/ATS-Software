import { useEffect, useState } from "react";
export default function EditApplicationModal({
open,
onClose,
application,
onSave
}) {
    const [form,setForm]=useState({});
        useEffect(()=>{
          if(application){
            setForm(application);
           }
        },[application]);
        if(!open || !application)
        return null;
return(
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
        <div className="bg-white w-[600px] rounded-xl p-6">
            <div className="flex justify-between mb-5">
                <h2 className="text-xl font-semibold">
                    Edit Application
                </h2>
                <button onClick={onClose}>
                    ✖
                </button>
            </div>
            <div className="space-y-4">
                <input
                    value={form.candidate_name || ""}
                    disabled
                    className="w-full border p-3 rounded-lg bg-gray-100"
                />
                <input
                    value={form.hospital_name || ""}
                    onChange={(e)=>
                    setForm({
                    ...form,
                    hospital_name:e.target.value
                    })
                    }
                    className="w-full border p-3 rounded-lg"
                />
               <input
  type="date"
  value={
    form.cv_forward_date
      ? new Date(form.cv_forward_date)
          .toISOString()
          .split("T")[0]
      : ""
  }
  onChange={(e) =>
    setForm({
      ...form,
      cv_forward_date: e.target.value
    })
  }
  className="w-full border p-3 rounded-lg"
/>
                <select
                        value={form.status || ""}
                        onChange={(e)=>
                        setForm({
                        ...form,
                        status:e.target.value
                        })
                        }
                        className="w-full border p-3 rounded-lg"
                >
                    <option>
                        CV Shared
                    </option>
                    <option>
                         Shortlisted
                    </option>
                    <option>
                        Interview
                    </option>
                    <option>
                        Selected
                    </option>
                    <option>
                        Rejected
                    </option>
               </select>
                    <input
                        value={form.recruiter_name || ""}
                        onChange={(e)=>
                        setForm({
                        ...form,
                        recruiter_name:e.target.value
                        })
                        }
                        className="w-full border p-3 rounded-lg"
                    />
                <div className="flex justify-end gap-3">
                    <button
                    onClick={onClose}
                    className="border px-4 py-2 rounded-lg"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={()=>onSave(form)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                    Save
                    </button>
                </div>
            </div>
        </div>
    </div>
);
}