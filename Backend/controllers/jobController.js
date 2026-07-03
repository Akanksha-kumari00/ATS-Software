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
        h.email,
        u.name AS recruiter_name
      FROM job_positions jp
      LEFT JOIN clients_hospitals h
        ON jp.hospital_id = h.id
      LEFT JOIN users u
        ON jp.recruiter_id = u.id
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
      vacancies,
      min_experience,
      max_experience,
      min_salary,
      max_salary,
      accommodation,
      opening_date,
      status
    } = req.body;

    await db.query(
      `UPDATE job_positions SET
        position_title=?,
        specialization=?,
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
        vacancies,
        min_experience,
        max_experience,
        min_salary,
        max_salary,
        accommodation,
        opening_date,
        status,
        req.params.id
      ]
    );
    res.json({
      message: "Job Updated Successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

exports.createJob = async (req, res) => {
  try {
    const {
      job_code,
      position_title,
      specialization,
      hospital_id,
      recruiter_id,
      vacancies,
      min_experience,
      max_experience,
      min_salary,
      max_salary,
      accommodation,
      opening_date,
      status,
    } = req.body;

    await db.query(
      `INSERT INTO job_positions
      (
        job_code,
        position_title,
        specialization,
        hospital_id,
        recruiter_id,
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
        recruiter_id,
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
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};