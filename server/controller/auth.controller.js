const AppError = require("../middleware/AppError");
const User = require("../services/user.service");
const { jwtToken, jwtVerify } = require("../utils/authUtils");

//signUp User
const signUp = async (req, res) => {
  const { email, password, confirmPassword, ...data } = req?.body;
  const user = await User.registerUser(req.body);

  res
    .status(202)
    .json({ status: "success", message: "Check inbox for email verification" });
};

const verifyEmail = async (req, res) => {
  const token = req?.query?.token;
  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }
  // Verify the token and update the user's isVerified status

  const user = await User.verifyEmail(token);
  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
  // Send a success response
  const JWTTOKEN = await jwtToken(user.id, user.userName);
  if (!JWTTOKEN) {
    throw new AppError("Server Error", "Token generation failed", 500);
  }

  res.setHeader("Authorization", `Bearer ${JWTTOKEN}`);
  res.writeHead(302, { Location: "http://localhost:3000/home" });
  res.end();
};

const signIn = async (req, res) => {
  const { email, password } = req?.body;
  const user = await User.login(email, password);
  if (!user) {
    throw new AppError(
      "User not found",
      "No user associated with the email",
      404
    );
  }

  const JWTTOKEN = await jwtToken(user.id, user.userName);
  if (!JWTTOKEN) {
    throw new AppError("Server Error", "Token generation failed", 500);
  }
  res.setHeader("Authorization", `Bearer ${JWTTOKEN}`);
  res.status(200).json({ message: "User logged in successfully" });
};

const resetPassword = async (req, res) => {
  console.log("Reset password initiated", req.body);

  res.status(200).json({ message: "Password reset successfully" });
};

const verifyUser = async (req, res) => {
  const token = req?.body;
  if (!token) throw new AppError("Client Error", "No token available", 404);
  const verified = jwtVerify(token);
  if (!verified)
    throw new AppError("JWT Error", "Token verification failed", 404);
  res.status(200).json({ message: "success" });
};

module.exports = { signUp, verifyEmail, signIn, resetPassword, verifyUser };
