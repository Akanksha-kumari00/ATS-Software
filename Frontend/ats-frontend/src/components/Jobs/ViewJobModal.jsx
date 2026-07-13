export default function ViewJobModal({
  open,
  onClose,
  job,
}) {
  if (!open || !job) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-[650px] max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">
            Job Details
          </h2>
          <button
            onClick={onClose}
            className="text-xl"
          >
            ✖
       </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <b>Job Code</b>
            <p>{job.job_code}</p>
          </div>
          <div>
            <b>Position</b>
            <p>{job.position_title}</p>
          </div>
          <div>
            <b>Specialization</b>
            <p>{job.specialization}</p>
          </div>
          <div>
            <b>Hospital</b>
            <p>{job.hospital_name}</p>
          </div>
          <div>
            <b>Location</b>
            <p>{job.city}, {job.state}</p>
          </div>
          <div>
            <b>Beds</b>
            <p>{job.beds}</p>
          </div>
          <div>
            <b>Experience</b>
            <p>{job.min_experience} - {job.max_experience} Years</p>
          </div>
          <div>
            <b>Salary</b>
            <p>₹ {job.min_salary} - ₹ {job.max_salary}</p>
          </div>
          <div>
            <b>Recruiter</b>
            <p>{job.recruiter_name}</p>
          </div>
          <div>
            <b>Status</b>
            <p>{job.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}