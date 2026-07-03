export const exportCandidates = (data) => {
  const headers = [
    "Candidate Name",
    "Email",
    "Mobile",
    "Education",
    "Specialization",
    "Hospital",
    "Hospital Location",
    "Interview Status",
    "Interview Date",
    "Interview Time",
    "Salary Expectation",
    "Experience",
    "Remarks",
  ];

  const escapeCSV = (value) => {
    if (value === null || value === undefined) return "";
    return `"${String(value).replace(/"/g, '""')}"`;
  };

  const rows = data.map((c) => [
    escapeCSV(c.candidate),
    escapeCSV(c.email),
    escapeCSV(c.mobile),
    escapeCSV(c.education),
    escapeCSV(c.specialization),
    escapeCSV(c.hospital),
    escapeCSV(c.hospitalLocation),
    escapeCSV(c.interviewStatus),
    escapeCSV(c.interviewDate),
    escapeCSV(c.interviewTime),
    escapeCSV(c.salary),
    escapeCSV(c.experience),
    escapeCSV(c.remarks),
  ]);

  let csv = headers.map(escapeCSV).join(",") + "\n";
  rows.forEach((row) => {
    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Candidates_${new Date()
    .toISOString()
    .split("T")[0]}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};