const sgMail = require("@sendgrid/mail");
const AppError = require("../middleware/AppError");
const generateTemplate = require("../templates/compiled/generateTemplate");

if (!process.env.SENDGRID_API_KEY) {
  throw new AppError(
    "Server Error",
    "SENDGRID_API_KEY not set in environment variables",
    500
  );
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendVerificationEmail(to, subject,file, data) {
  //creating a html template for the email
  const html = generateTemplate(file, {
    title: data.header,
    header: data.header,
    subheader: data.subheader,
    bodyText: data.bodyText,
    buttonText: data.verificationUrl,
  });

  const msg = {
    to: to,
    from: process.env.SENDER_EMAIL,
    subject: subject,
    html: html,
  };

  console.info("Sending email to:", data.verificationUrl);
  try {
    await sgMail.send(msg);
    console.log(`Verification email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new AppError("Server Error", error.message, 500);
  }
}

module.exports = {
  sendVerificationEmail,
};
