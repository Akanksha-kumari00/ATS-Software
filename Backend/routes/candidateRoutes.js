console.log("Candidate Routes Loaded");
const XLSX = require("xlsx");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
exports.importCandidates = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an Excel file.",
      });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);
    let imported = 0;
    let skipped = 0;
    for (const row of rows) {
      // Mobile is mandatory
      if (!row.Mobile) {
        skipped++;
        continue;
      }
      // Duplicate Mobile Check
      const [exist] = await db.query(
        "SELECT id FROM candidates WHERE mobile=?",
        [row.Mobile]
      );
      if (exist.length > 0) {
        skipped++;
        continue;
      }
      await db.query(
        `
        INSERT INTO candidates
        (
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
          remarks,
          interview_date,
          interview_time,
          experience
        )
        VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `,
        [
          row.RecruiterName || "",
          row.CandidateName || "",
          row.Gender || null,
          row.Education || "",
          row.Specialization || "",
          row.Mobile,
          row.Email || "",
          row.HospitalName || "",
          row.HospitalLocation || "",
          row.CVForwardDate || null,
          row.SalaryExpectation || "",
          row.Status || "New",
          row.InterviewStatus || "Pending",
          row.Remarks || "",
          row.InterviewDate || null,
          row.InterviewTime || null,
          row.Experience || "",
        ]
      );

      imported++;
    }

    // Delete uploaded excel after import
    fs.unlinkSync(req.file.path);
    res.json({
      success: true,
      imported,
      skipped,
      total: rows.length,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
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
// Import Candidates
// =======================
router.post("/import", upload.single("file"), async (req, res) => {
  return exports.importCandidates(req, res);
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
      interview_time,
    } = req.body;

    // Existing CV fetch karo
    const [rows] = await db.query(
      "SELECT cv_name, cv_path FROM candidates WHERE id=?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    let cv_name = rows[0].cv_name;
    let cv_path = rows[0].cv_path;


    if (req.file) {
      cv_name = req.file.originalname;
      cv_path = req.file.path.replace(/\\/g, "/");
    }

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
      interview_time=?,
      cv_name=?,
      cv_path=?
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
        cv_name,
        cv_path,
        id,
      ]
    );
    // =======================
    // Resume Bank Sync
    // =======================
    if (req.file) {
      const [resumeRows] = await db.query(
        "SELECT id FROM resume_bank WHERE mobile = ?",
        [mobile]
      );

      if (resumeRows.length > 0) {
        await db.query(
          `
      UPDATE resume_bank
      SET
        candidate_name = ?,
        specialization = ?,
        resume_file = ?,
        uploaded_date = NOW()
      WHERE mobile = ?
      `,
          [
            candidate_name,
            specialization,
            cv_path,
            mobile,
          ]
        );

        console.log("Resume Bank Updated");
      } else {
        await db.query(
          `
      INSERT INTO resume_bank
      (
        candidate_name,
        mobile,
        specialization,
        resume_file
      )
      VALUES (?,?,?,?)
      `,
          [
            candidate_name,
            mobile,
            specialization,
            cv_path,
          ]
        );

        console.log("Resume Bank Inserted");
      }
    }
    res.json({
      message: "Updated Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
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