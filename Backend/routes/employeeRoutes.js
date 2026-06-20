const express = require("express");
const db = require("../config/db");

const router = express.Router();
// GET ALL EMPLOYEES
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
module.exports = router;