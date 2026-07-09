const db = require("../config/db");

// ========================
//GET Hospital
exports.getHospitals = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    // Total Records
    const [[countResult]] = await db.query(`
      SELECT COUNT(*) AS total
      FROM clients_hospitals
    `);
    const totalRecords = countResult.total;
    // Paginated Data
    const [rows] = await db.query(`
      SELECT
        h.id,
        h.client_code,
        h.hospital_name,
        h.hospital_owner,
        h.hospital_type,
        h.beds,
        h.city,
        h.state,
        h.address,
        h.contact_person,
        h.contact_designation,
        h.mobile,
        h.email,
        h.bde_name,
        h.bde_percentage,
        h.agreement_days,
        h.agreement_date,
        h.agreement_expiry,
        h.payment_terms,
        h.position_summary,
        h.remarks,
        h.status,
        h.created_at,
        h.updated_at
      FROM clients_hospitals h
      ORDER BY h.id DESC
      LIMIT ? OFFSET ?;
    `, [limit, offset]);

    res.json({
      hospitals: rows,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
    });

  } catch (err) {
    console.error("Hospital Error:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// ========================
// Dashboard Stats
// ========================

 exports.getHospitalStats = async (req, res) => {
  try {
    const [[stats]] = await db.query(`
      SELECT
        COUNT(*) AS totalClients,
        SUM(status='Active') AS activeClients,
        SUM(status='Inactive') AS inactiveClients,
        SUM(beds) AS totalBeds
      FROM clients_hospitals
    `);

    res.json(stats);
  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ========================
// Create
// ========================
exports.createHospital = async (req, res) => {
  try {

   const {
  client_code,
  hospital_name,
  hospital_owner,

  bde_name,
  bde_percentage,

  agreement_days,
  agreement_date,
  agreement_expiry,
  payment_terms,

  contact_person,
  contact_designation,
  email,
  mobile,

  city,
  state,
  address,

  beds,
  position_summary,
  hospital_type,

  remarks,
  status,
} = req.body;

    const [result] = await db.query(
      `INSERT INTO clients_hospitals
    (
    client_code,
    hospital_name,
    hospital_owner,

    bde_name,
    bde_percentage,

    agreement_days,
    agreement_date,
    agreement_expiry,
    payment_terms,

    contact_person,
    contact_designation,
    email,
    mobile,

    city,
    state,
    address,

    beds,
    position_summary,
    hospital_type,

    remarks,
    status
)

VALUES
(
?,?,?,?,?,
?,?,?,?,?,
?,?,?,?,?,
?,?,?,?,?,?
)
  `,
      [
  client_code,
  hospital_name,
  hospital_owner,

  bde_name,
  bde_percentage,

  agreement_days,
  agreement_date,
  agreement_expiry,
  payment_terms,

  contact_person,
  contact_designation,
  email,
  mobile,

  city,
  state,
  address,

  beds,
  position_summary,
  hospital_type,

  remarks,
  status,
]
    );

    res.json({
      success: true,
      id: result.insertId,
    });

  } catch (err) {
  console.error("Create Hospital Error:", err);

  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "Client Code already exists.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong.",
  });
}
};
// ========================
// Update
// ========================
exports.updateHospital = async (req, res) => {
  try {
    const { id } = req.params;

    const {
  client_code,
  hospital_name,
  hospital_owner,

  bde_name,
  bde_percentage,

  agreement_days,
  agreement_date,
  agreement_expiry,
  payment_terms,
  contact_person,
  contact_designation,
  email,
  mobile,
  city,
  state,
  address,
  beds,
  position_summary,
  hospital_type,
  remarks,
  status,
} = req.body;

   await db.query(
  `UPDATE clients_hospitals
SET
client_code=?,
hospital_name=?,
hospital_owner=?,

bde_name=?,
bde_percentage=?,

agreement_days=?,
agreement_date=?,
agreement_expiry=?,
payment_terms=?,

contact_person=?,
contact_designation=?,
email=?,
mobile=?,

city=?,
state=?,
address=?,

beds=?,
position_summary=?,
hospital_type=?,

remarks=?,
status=?

WHERE id=?`,
  [
    client_code,
    hospital_name,
    hospital_owner,

    bde_name,
    bde_percentage,

    agreement_days,
    agreement_date,
    agreement_expiry,
    payment_terms,

    contact_person,
    contact_designation,
    email,
    mobile,

    city,
    state,
    address,

    beds,
    position_summary,
    hospital_type,

    remarks,
    status,

    id,
  ]
);
    res.json({
      success: true,
      message: "Hospital updated successfully",
    });
  } catch (err) {
  console.error(err);

  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "Client Code already exists.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong.",
  });
}
};
// ========================
// Delete
// ========================
exports.deleteHospital = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM clients_hospitals WHERE id=?",
      [req.params.id]
    );
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};