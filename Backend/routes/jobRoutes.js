const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

router.get("/stats", jobController.getJobStats);
router.get("/", jobController.getJobs);

module.exports = router;