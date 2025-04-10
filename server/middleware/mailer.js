const sgMail = require("@sendgrid/mail");
const AppError = require("../middleware/AppError");

if (!process.env.SENDGRID_API_KEY) {
  throw new AppError(
    "Server Error",
    "SENDGRID_API_KEY not set in environment variables",
    500
  );
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendVerificationEmail(to, subject, verificationUrl) {
  //creating a html template for the email
  const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Verify Your Email</title>
              <style>
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  body { font-family: 'Arial', sans-serif; background-color: #fff; color: #333; padding: 20px; }
                  h1, h2, h3 { font-family: 'Helvetica', sans-serif; color: #000; text-align: center; }
                  h1 { font-size: 2.5em; margin-top: 50px; }
                  h2 { font-size: 2em; margin-top: 20px; color: #444; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
                  .cta-button { display: inline-block; padding: 15px 30px; margin-top: 20px; background-color: #000; color: #fff; font-weight: bold; text-decoration: none; text-align: center; border-radius: 5px; transition: background-color 0.3s; }
                  .cta-button:hover { background-color: #333; }
                  .footer { text-align: center; margin-top: 30px; font-size: 0.9em; color: #777; }
              </style>
          </head>
          <body>
      
              <div class="container">
                  <h1>Welcome to Our Service!</h1>
                  <h2>Please verify your email address</h2>
                  <p>Thank you for signing up! To complete your registration, please click the link below to verify your email:</p>
                  <a href="${verificationUrl}" class="cta-button">Verify Email</a>
      
                  <div class="footer">
                      <p>&copy; 2025 Your Company. All rights reserved.</p>
                  </div>
              </div>
      
          </body>
          </html>
        `;

  const msg = {
    to: to,
    from: process.env.SENDER_EMAIL,
    subject: subject,
    html: htmlContent,
  };

  console.log("Sending email to:", msg, verificationUrl);
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
