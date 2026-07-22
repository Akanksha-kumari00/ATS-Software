const express = require("express");
const router = express.Router();

const {
  sendBulkMail,
} = require("../controllers/mailController");
router.post("/bulk", sendBulkMail);
module.exports = router;