/*export const exportApplications = (data) => {
  const headers = [
    "Candidate",
    "Email",
    "Phone",
    "Hospital",
    "Applied On",
    "Status",
    "Recruiter",
  ];

  const rows = data.map((item) => [
    item.name,
    item.email,
    item.phone,
    item.hospital_name,
    item.applied_on,
    item.status,
    item.recruiter_name,
  ]);
  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "applications.csv";
  link.click();
};*/
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

  const rows = data.map((item) => [

    item.name,

    item.email,

    item.phone,

    item.hospital,

    item.date,

    item.status,

    item.recruiter,

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

  link.download = "applications.csv";

  link.click();
};