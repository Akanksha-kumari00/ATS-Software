const express = require("express");
const router = express.Router();

const db = require("../config/db");
const dashboardController = require("../controllers/dashboardController");
const {
  getRecruitmentPipeline
} = require("../controllers/dashboardController");

router.get("/stats", async (req, res) => {
  try {
    const sql = `
      SELECT
        COUNT(*) AS totalCandidates,
        SUM(status='New') AS newCandidates,
        SUM(status='Interview') AS interviewCandidates,
        SUM(status='Selected') AS selectedCandidates,
        SUM(status='Rejected') AS rejectedCandidates
      FROM candidates
    `;
    const [result] = await db.query(sql);
    res.json(result[0]);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.get("/pipeline", getRecruitmentPipeline);

router.get("/hospital-wise",dashboardController.getHospitalWiseHiring);
router.get("/recent-applications",dashboardController.getRecentApplications);
router.get("/upcoming-interviews",dashboardController.getUpcomingInterviews);

module.exports = router;