const db = require("../config/db");
// Get Job Stats
exports.getJobStats = async (req, res) => {
  try {
    const [[stats]] = await db.query(`
      SELECT
        COUNT(*) AS totalPositions,
        SUM(CASE WHEN status='Open' THEN 1 ELSE 0 END) AS openPositions,
        SUM(CASE WHEN status='On Hold' THEN 1 ELSE 0 END) AS onHoldPositions,
        SUM(CASE WHEN status='Closed' THEN 1 ELSE 0 END) AS closedPositions
      FROM job_positions
    `);
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
// GET a job
exports.getJobs = async (req, res) => {
  try {
    const { search, fromDate, toDate } = req.query;
    let sql = `
      SELECT
        jp.*,
        h.hospital_name,
        h.city,
        h.state,
        h.beds,
        h.contact_person,
        h.contact_designation,
        h.mobile,
        h.email
      FROM job_positions jp
      LEFT JOIN clients_hospitals h
        ON jp.hospital_id = h.id
      WHERE 1=1
    `;

    const params = [];
    if (search) {
      sql += `
        AND (
          jp.position_title LIKE ?
          OR jp.specialization LIKE ?
          OR h.hospital_name LIKE ?
          OR h.contact_person LIKE ?
          OR h.contact_designation LIKE ?
          OR h.mobile LIKE ?
          OR h.email LIKE ?
        )
      `;
      params.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }
    if (fromDate) {
      sql += " AND jp.opening_date >= ?";
      params.push(fromDate);
    }
    if (toDate) {
      sql += " AND jp.opening_date <= ?";
      params.push(toDate);
    }
    sql += " ORDER BY jp.id DESC";
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
// Get Single Job
exports.getJobById = async (req, res) => {
  console.log("GET ID:", req.params.id);

  try {
    const [rows] = await db.query(
      "SELECT * FROM job_positions WHERE id=?",
      [req.params.id]
    );

    console.log(rows);
    if (rows.length === 0) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM job_positions WHERE id=?",
      [req.params.id]
    );
    res.json({
      message: "Job Deleted Successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
exports.updateJob = async (req, res) => {
  try {
    const {
      position_title,
      specialization,
      hospital_id,
      recruiter_name,
      vacancies,
      min_experience,
      max_experience,
      min_salary,
      max_salary,
      accommodation,
      opening_date,
      status,
    } = req.body;
    let formattedDate = opening_date;

if (opening_date) {
  formattedDate = new Date(opening_date)
    .toISOString()
    .split("T")[0];
}
    await db.query(
      `UPDATE job_positions SET
        position_title=?,
        specialization=?,
        hospital_id=?,
        recruiter_name=?,
        vacancies=?,
        min_experience=?,
        max_experience=?,
        min_salary=?,
        max_salary=?,
        accommodation=?,
        opening_date=?,
        status=?
      WHERE id=?`,
      [
        position_title,
        specialization,
        hospital_id,
        recruiter_name,
        vacancies,
        min_experience,
        max_experience,
        min_salary,
        max_salary,
        accommodation,
        formattedDate,
        status,
        req.params.id,
      ]
    );

    res.json({
      success: true,
      message: "Job Updated Successfully",
    });

  } catch (err) {
    console.error("Update Job Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Create job
exports.createJob = async (req, res) => {
  try {
    const {
      position_title,
      specialization,
      hospital_id,
      recruiter_name,
      vacancies,
      min_experience,
      max_experience,
      min_salary,
      max_salary,
      accommodation,
      opening_date,
      status,
    } = req.body;

    // Get last job code
    const [[lastJob]] = await db.query(`
      SELECT job_code
      FROM job_positions
      ORDER BY id DESC
      LIMIT 1
    `);

    let job_code = "JOB001";

    if (lastJob && lastJob.job_code) {
      const lastNumber = parseInt(lastJob.job_code.replace("JOB", ""), 10);
      job_code = `JOB${String(lastNumber + 1).padStart(3, "0")}`;
    }

    await db.query(
      `INSERT INTO job_positions
      (
        job_code,
        position_title,
        specialization,
        hospital_id,
        recruiter_name,
        vacancies,
        min_experience,
        max_experience,
        min_salary,
        max_salary,
        accommodation,
        opening_date,
        status
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        job_code,
        position_title,
        specialization,
        hospital_id,
        recruiter_name,
        vacancies,
        min_experience,
        max_experience,
        min_salary,
        max_salary,
        accommodation,
        opening_date,
        status,
      ]
    );

    res.json({
      success: true,
      message: "Job Created Successfully",
      job_code,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};