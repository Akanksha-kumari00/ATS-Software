const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Total Records
    const [[countResult]] = await db.query(`
      SELECT COUNT(*) AS total
      FROM employees
    `);

    const totalRecords = countResult.total;
    const [rows] = await db.query(
      `
      SELECT *
      FROM employees
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    res.json({
      employees: rows,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

// UPDATE EMPLOYEE
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
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM employees WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;