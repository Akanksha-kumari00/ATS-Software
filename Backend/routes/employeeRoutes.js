const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM employees"
    );
    res.json(rows);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

// UPDATE EMPLOYEE
/*
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone_number,
    job_profile,
    working_position,
    cv_forwarded,
    interview_done,
    joining_status
  } = req.body;

  const sql = `
    UPDATE Employees SET
      name=?,
      email=?,
      phone_number=?,
      job_profile=?,
      working_position=?,
      cv_forwarded=?,
      interview_done=?,
      joining_status=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      name,
      email,
      phone_number,
      job_profile,
      working_position,
      cv_forwarded,
      interview_done,
      joining_status,
      id
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Database Error");
      }

      res.send({
        success: true,
        message: "Employee updated successfully"
      });
    }
  );
});*/
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone_number,
      job_profile,
      working_position,
      cv_forwarded,
      interview_done,
      joining_status
    } = req.body;
    const sql = `
      UPDATE employees
      SET
      name=?,
      email=?,
      phone_number=?,
      job_profile=?,
      working_position=?,
      cv_forwarded=?,
      interview_done=?,
      joining_status=?
      WHERE id=?
    `;
    await db.query(
      sql,
      [
        name,
        email,
        phone_number,
        job_profile,
        working_position,
        cv_forwarded,
        interview_done,
        joining_status,
        id
      ]
    );
    res.json({
      success: true,
      data: {
        id: Number(id),
        name,
        email,
        phone_number,
        job_profile,
        working_position,
        cv_forwarded,
        interview_done,
        joining_status
      }
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});
module.exports = router;