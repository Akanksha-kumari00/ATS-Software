const transporter = require("../config/mailer");

exports.sendBulkMail = async (req, res) => {
 
  try {
    const { recipients, subject, message } = req.body;
        console.log("Recipients:", recipients);
    console.log("Subject:", subject);
    if (!recipients || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No recipients selected",
      });
    }
   
  const info = await transporter.sendMail({
  from: `"DCS Healthcare Services" <${process.env.SMTP_USER}>`,
  to: recipients, 
  subject,
  text: message,
  html: `
    <div style="font-family:Arial,sans-serif;padding:20px">
      <h2 style="color:#0A66C2;">DCS Healthcare Consultancy</h2>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p>
        Regards,<br>
        <b>DCS Healthcare Consultancy</b><br>
        Healthcare Recruitment Team
      </p>
    </div>
  `,
});
    res.json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
        success:false,
        message:err.message
    });
}
  };