console.log("Candidate Routes Loaded");
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
// =======================
// Multer Configuration
// =======================
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
router.post("/",upload.single("cv"),
  async (req, res) => {
    try {
      const {
        recruiter_name,
        candidate_name,
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
        interview_time
      } = req.body;
      const cv_name = req.file
        ? req.file.originalname
        : null;
      const cv_path = req.file
        ? req.file.path
        : null;
        const formatDateTime = (date) => {
          if (!date) return null;
          return new Date(date)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        };
      const sql = `
      INSERT INTO candidates(
      recruiter_name,
      candidate_name,
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
      status,
      interview_status,
      remarks,
      interview_date,
      interview_time
      )
      VALUES(
      ?,?,?,?,?,?,
      ?,?,?,?,?,?,
      ?,?,?,?,?
      )
      `;
      const [result] = await db.query(
        sql,
        [
          recruiter_name,
          candidate_name,
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
          status,
          interview_status,
          remarks,
          interview_date,
          interview_time
        ]
      );
      res.status(201).json({
        message: "Candidate Added Successfully",
        id: result.insertId
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        message: err.message
      });
    }
  }
);
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
router.get("/shortlisted", async (req, res) => {
  try {
    const [result] = await db.query(
      `
      SELECT
      id,
      candidate_name,
      specialization
      FROM candidates
      WHERE status = 'Shortlisted'
      ORDER BY candidate_name ASC
      `
    );
    res.json(result);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message
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
/*router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      interview_status,
      remarks
    } = req.body;
    await db.query(
      `
      UPDATE candidates
      SET
      status=?,
      interview_status=?,
      remarks=?
      WHERE id=?
      `,
      [
        status,
        interview_status,
        remarks,
        id
      ]
    );
      res.json({
        message: "Candidate Updated Successfully"
      });
    }

      catch (err) {
        console.error(err);
        res.status(500).json({
          message: err.message
        });
      }
    });*/
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      recruiter_name,
      candidate_name,
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
      interview_time
    } = req.body;
    await db.query(
      `
      UPDATE candidates
      SET
      recruiter_name=?,
      candidate_name=?,
      education=?,
      specialization=?,
      mobile=?,
      email=?,
      hospital_name=?,
      hospital_location=?,
      cv_forward_date=?,
      salary_expectation=?,
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
        id
      ]
    );
    res.json({
      message: "Updated Successfully"
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
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