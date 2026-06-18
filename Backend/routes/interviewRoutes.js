
const express = require("express");

const router = express.Router();

const {
  getInterviews,
  scheduleInterview,
} = require("../controllers/interviewController");

router.get("/", getInterviews);

router.put("/schedule/:id", scheduleInterview);

module.exports = router;