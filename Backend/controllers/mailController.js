
const transporter = require("../config/mailer");
const sendWhatsApp = require("../services/whatsappService");

exports.sendBulkMail = async (req, res) => {

  try {
    const {
      recipients,
      mobiles,
      subject,
      message,
    } = req.body;

    if (!recipients || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No recipients selected",
      });
    }

    await transporter.sendMail({
      from: `"DCS Healthcare Services" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject,
      text: message,
    });

    if (mobiles?.length) {
      for (const mobile of mobiles) {
        await sendWhatsApp(mobile, message);
      }
    }

    res.json({
      success: true,
      message: "Email and WhatsApp sent successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};