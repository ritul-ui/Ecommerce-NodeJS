const sgmail = require("@sendgrid/mail");
require("dotenv").config();

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(to, subject, text) {
  const msg = {
    to: to,
    from: process.env.SENDGRID_FROM_EMAIL, // Use your verified sender email
    subject: subject,
    text: text,
  };

  return sgmail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully");
      return { success: true, message: "Email sent successfully" };
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      return { success: false, message: "Error sending email", error: error };
    });
}

exports.sendEmail = sendEmail;
