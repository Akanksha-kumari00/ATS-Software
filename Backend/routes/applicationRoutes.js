const express = require("express");
const router = express.Router();
const db = require("../config/db");
// ======================
// Get Applications
// ======================

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
      id,
      candidate_name,
      hospital_name,
      cv_forward_date,
      status,
      recruiter_name,
      email,
      mobile
      FROM candidates
      ORDER BY id DESC
    `);
    res.json(rows);
  }
  catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
});
//Applicatiom Stats
router.get("/stats", async (req, res) => {

  try {
    const [rows] = await db.query(`
     SELECT
    COUNT(*) AS totalApplications,
COUNT(CASE WHEN TRIM(status) = 'CV Shared' THEN 1 END) AS cvShared,
COUNT(CASE WHEN TRIM(status) = 'Shortlisted' THEN 1 END) AS shortlisted,
COUNT(CASE WHEN TRIM(status) = 'Interview' THEN 1 END) AS interview,
COUNT(CASE WHEN TRIM(status) = 'Selected' THEN 1 END) AS selected,
COUNT(CASE WHEN TRIM(status) = 'Rejected' THEN 1 END) AS rejected
FROM candidates;
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

router.put("/:id", async (req, res) => {
  
  try {
    const { id } = req.params;
    const {
      hospital_name,
       cv_forward_date,
      status,
      recruiter_name
    } = req.body;
     const formattedDate = cv_forward_date
      ? new Date(cv_forward_date)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")
      : null;
     
    await db.query(
      `
      UPDATE candidates
      SET
      hospital_name=?,
      cv_forward_date=?,
      status=?,
      recruiter_name=?
      WHERE id=?
      `,
      [
        hospital_name,
        formattedDate,
        status,
        recruiter_name,
        id
      ]
    );
    res.json({
      message:"Application Updated"
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      message:error.message
    });
  }
});
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