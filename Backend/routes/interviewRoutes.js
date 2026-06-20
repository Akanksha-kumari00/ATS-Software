
const express = require("express");

const router = express.Router();

const {
  getInterviews,
  scheduleInterview,
  updateInterviewStatus,
} = require("../controllers/interviewController");

router.get("/", getInterviews);

router.put("/schedule/:id", scheduleInterview);
router.put("/status/:id", updateInterviewStatus);

module.exports = router;