export const exportApplications = (data) => {
  const headers = [
    "Candidate",
    "Email",
    "Phone",
    "Hospital",
    "Applied On",
    "Status",
    "Recruiter",
  ];

  const escapeCSV = (value) => {
    if (value === null || value === undefined) return "";
    return `"${String(value).replace(/"/g, '""')}"`;
  };

  const rows = data.map((item) => [
    escapeCSV(item.name),
    escapeCSV(item.email),
    escapeCSV(item.phone),
    escapeCSV(item.hospital),
    escapeCSV(item.date),
    escapeCSV(item.status),
    escapeCSV(item.recruiter),
  ]);

  let csv = headers.map(escapeCSV).join(",") + "\n";

  rows.forEach((row) => {
    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  const today = new Date().toISOString().split("T")[0];
  link.download = `Applications_${today}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(link.href);
};