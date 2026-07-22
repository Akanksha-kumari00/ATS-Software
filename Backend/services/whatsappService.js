const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsApp = async (mobile, message) => {
  console.log(
    "FROM:",
    process.env.TWILIO_WHATSAPP_NUMBER
  );
  console.log(
    "TO:",
    `whatsapp:+91${mobile}`
  );

  return await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: `whatsapp:+91${mobile}`,
    body: message,
  });
};

module.exports = sendWhatsApp;