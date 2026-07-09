console.log("Candidate Routes Loaded");
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
// =======================
// Multer Configuration
// ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });
// =======================
// Get All Candidates
// =======================
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM candidates ORDER BY id DESC"
    );
    res.status(200).json(result);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message
    });
  }
});

// =======================
// Add Candidate
// =======================
router.post("/", upload.single("cv"), async (req, res) => {
  try {
    let {
      recruiter_name,
      candidate_name,
      gender,
      education,
      specialization,
      mobile,
      email,
      hospital_name,
      hospital_location,
      cv_forward_date,
      salary_expectation,
      experience,  
      status,
      interview_status,
      remarks,
      interview_date,
      interview_time,
    } = req.body;

    // Convert empty values to NULL
    remarks = remarks || null;
    interview_date = interview_date || null;
    interview_time = interview_time || null;

    const cv_name = req.file ? req.file.originalname : null;
    const cv_path = req.file ? req.file.path : null;

    // =======================
    // Duplicate Check
    // =======================

    const errors = [];

    if (candidate_name) {
      const [rows] = await db.query(
        "SELECT id FROM candidates WHERE candidate_name = ?",
        [candidate_name]
      );

      if (rows.length) {
        errors.push("Candidate name already exists");
      }
    }

    if (mobile) {
      const [rows] = await db.query(
        "SELECT id FROM candidates WHERE mobile = ?",
        [mobile]
      );

      if (rows.length) {
        errors.push("Mobile number already exists");
      }
    }

    if (email) {
      const [rows] = await db.query(
        "SELECT id FROM candidates WHERE email = ?",
        [email]
      );

      if (rows.length) {
        errors.push("Email already exists");
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    // =======================
    // Insert Candidate
    // =======================

    const sql = `
      INSERT INTO candidates(
        recruiter_name,
        candidate_name,
        gender,
        education,
        specialization,
        mobile,
        email,
        hospital_name,
        hospital_location,
        cv_name,
        cv_path,
        cv_forward_date,
        salary_expectation,
        experience,  
        status,
        interview_status,
        remarks,
        interview_date,
        interview_time
      )
      VALUES(
        ?,?,?,?,?,?,
        ?,?,?,?,?,?,
        ?,?,?,?,?,?,?
      )
    `;

    const [result] = await db.query(sql, [
      recruiter_name,
      candidate_name,
      gender,
      education,
      specialization,
      mobile,
      email,
      hospital_name,
      hospital_location,
      cv_name,
      cv_path,
      cv_forward_date,
      salary_expectation,
      experience,  
      status,
      interview_status,
      remarks,
      interview_date,
      interview_time,
    ]);

    // =======================
    // Resume Bank
    // =======================

    if (req.file) {
      await db.query(
        `INSERT INTO resume_bank
        (candidate_name, mobile, specialization, resume_file)
        VALUES (?, ?, ?, ?)`,
        [
          candidate_name,
          mobile,
          specialization,
          cv_path,
        ]
      );
    }

    res.status(201).json({
      success: true,
      message: "Candidate Added Successfully",
      id: result.insertId,
    });

  } catch (err) {

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Duplicate data found.",
      });
    }

    console.error("Candidate Insert Error:", err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
// Application stats
router.get("/stats", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
      COUNT(*) AS totalApplications,
      SUM(CASE WHEN status = 'CV Shared' THEN 1 ELSE 0 END) AS cvShared,
      SUM(CASE WHEN status = 'Shortlisted' THEN 1 ELSE 0 END) AS shortlisted,
      SUM(CASE WHEN status = 'Interview' THEN 1 ELSE 0 END) AS interview,
      SUM(CASE WHEN status = 'Selected' THEN 1 ELSE 0 END) AS selected,
      SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected
      FROM candidates
    `);
    res.json(rows[0]);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
});
// =======================
// Get Shortlisted Candidates
// =======================
// =======================
// Get Candidates For Interview Schedule
// =======================
router.get("/shortlisted", async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT
        id,
        recruiter_name,
        candidate_name,
        gender,
        education,
        specialization,
        mobile,
        email,
        hospital_name,
        hospital_location,
        cv_forward_date,
        salary_expectation,
        status,
        interview_status,
        interview_date,
        interview_time,
        remarks
      FROM candidates
    WHERE
(
    status IN ('CV Shared','Shortlisted','Interview','Upcoming')
)
AND
(
    interview_status IS NULL
    OR interview_status IN ('Pending','Upcoming','Confirmed')
)
      ORDER BY candidate_name ASC
    `);

    res.json(result);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message,
    });

  }
});
// =======================
// Get Candidate By Id
// =======================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "SELECT * FROM candidates WHERE id = ?",
      [id]
    );
          if (result.length === 0) {
            return res.status(404).json({
              message: "Candidate not found"
            });
          }
          res.json(result[0]);
        }
        catch (err) {
          console.error(err);
          res.status(500).json({
            message: err.message
          });
  }
});
// =======================
// Update Candidate
// =======================
router.put("/:id", upload.single("cv"), async (req, res) => {
  console.log("BODY:", req.body);
console.log("FILE:", req.file);
  try {
    const { id } = req.params;
    const {
      recruiter_name,
      candidate_name,
      education,
      gender,
      specialization,
      mobile,
      email,
      hospital_name,
      hospital_location,
      cv_forward_date,
      salary_expectation,
       experience,
      status,
      interview_status,
      remarks,
      interview_date,
      interview_time
    } = req.body;
    await db.query(
      `
      UPDATE candidates
      SET
      recruiter_name=?,
      candidate_name=?,
      gender=?,
      education=?,
      specialization=?,
      mobile=?,
      email=?,
      hospital_name=?,
      hospital_location=?,
      cv_forward_date=?,
      salary_expectation=?,
       experience=?,
      status=?,
      interview_status=?,
      remarks=?,
      interview_date=?,
      interview_time=?
      WHERE id=?
      `,
      [
        recruiter_name,
        candidate_name,
        gender,
        education,
        specialization,
        mobile,
        email,
        hospital_name,
        hospital_location,
        cv_forward_date,
        salary_expectation,
        experience,
        status,
        interview_status,
        remarks,
        interview_date,
        interview_time,
        id
      ]
    );
    res.json({
      message: "Updated Successfully"
    });
  }
  catch (err) {
  console.log("========== ERROR ==========");
  console.log(err);
  console.log("SQL:", err.sqlMessage);
  console.log("CODE:", err.code);

  res.status(500).json({
    message: err.message,
    sql: err.sqlMessage,
  });
}
});
// =======================
// Delete Candidate
// =======================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "DELETE FROM candidates WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Candidate not found"
      });
    }
    res.json({
      message: "Candidate Deleted Successfully"
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message
    });
  }
});
module.exports = router; 