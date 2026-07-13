const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  
});
transporter.verify((err) => {
  if (err) {
    console.log("SMTP Error:", err);
  } else {
    console.log("Hostinger SMTP Connected ✅");
  }
});
module.exports = transporter;