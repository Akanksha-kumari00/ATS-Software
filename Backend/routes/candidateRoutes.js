console.log("Candidate Routes Loaded");
const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM candidates", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
});
router.post("/", (req, res) => {
  const {
    recruiter_name,
    candidate_name,
    education,
    mobile,
    email,
    hospital_name,
    hospital_location,
    salary_expectation,
    status,
    interview_status,
    remarks
  } = req.body;

  const sql = `
    INSERT INTO candidates
    (recruiter_name, candidate_name, education, mobile, email,
     hospital_name, hospital_location, salary_expectation,
     status, interview_status, remarks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      recruiter_name,
      candidate_name,
      education,
      mobile,
      email,
      hospital_name,
      hospital_location,
      salary_expectation,
      status,
      interview_status,
      remarks
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Candidate Added Successfully",
        id: result.insertId
      });
    }
  );
});

// Get Candidate By ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM candidates WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Candidate not found",
        });
      }

      res.json(result[0]);
    }
  );
});

// Update Candidate
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const {
    status,
    interview_status,
    remarks
  } = req.body;

  const sql = `
    UPDATE candidates
    SET status = ?, interview_status = ?, remarks = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, interview_status, remarks, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Candidate Updated Successfully"
      });
    }
  );
});

// Delete Candidate
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM candidates WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Candidate not found"
        });
      }

      res.json({
        message: "Candidate Deleted Successfully"
      });
    }
  );
});
module.exports = router;

