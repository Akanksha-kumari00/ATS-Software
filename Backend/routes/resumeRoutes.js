const express = require("express");
const router = express.Router();
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

router.get("/", async (req, res) => {
  try {

    const { search = "", specialization = "", uploadDate = "" } = req.query;
    let sql = `
      SELECT *
      FROM resume_bank
      WHERE 1=1
    `;

    const params = [];
    // Search by Candidate Name or Mobile
    if (search) {
      sql += `
        AND (
          candidate_name LIKE ?
          OR mobile LIKE ?
        )
      `;
      params.push(`%${search}%`, `%${search}%`);
    }

    // Filter by Specialization
    if (specialization) {
      sql += ` AND specialization LIKE ? `;
      params.push(`%${specialization}%`);
    }

    // Filter by Upload Date
    if (uploadDate) {
      sql += ` AND DATE(uploaded_date) = ? `;
      params.push(uploadDate);
    }

    sql += ` ORDER BY uploaded_date DESC`;

    const [rows] = await db.query(sql, params);

    res.json(rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});
// Delete Resume
router.delete("/:id", async (req, res) => {
  try {

    const { id } = req.params;

    // Resume Find
    const [rows] = await db.query(
      "SELECT * FROM resume_bank WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const resume = rows[0];

    // Delete file from uploads folder
    if (resume.resume_file) {

      const normalizedPath = resume.resume_file.replace(/\\/g, "/");
      const filePath = path.join(__dirname, "..", normalizedPath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete database record
    await db.query(
      "DELETE FROM resume_bank WHERE id = ?",
      [id]
    );

    res.json({
      message: "Resume Deleted Successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
      stack: err.stack
    });
  }
});

module.exports = router;