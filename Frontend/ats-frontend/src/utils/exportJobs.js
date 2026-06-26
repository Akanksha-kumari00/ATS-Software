export const exportJobs = (data) => {
  const headers = [
    "Job Code",
    "Position",
    "Specialization",
    "Hospital",
    "City",
    "State",
    "Beds",
    "Vacancies",
    "Experience",
    "Salary",
    "Accommodation",
    "Recruiter",
    "Status",
    "Opening Date",
  ];

  const rows = data.map((job) => [
    job.job_code,
    job.position_title,
    job.specialization,
    job.hospital_name,
    job.city,
    job.state,
    job.beds,
    job.vacancies,
    `${job.min_experience} - ${job.max_experience} Years`,
    `₹${job.min_salary} - ₹${job.max_salary}`,
    job.accommodation,
    job.recruiter_name,
    job.status,
    new Date(job.opening_date).toLocaleDateString("en-IN"),
  ]);

  let csv = headers.join(",") + "\n";

  rows.forEach((row) => {
    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "job_positions.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};