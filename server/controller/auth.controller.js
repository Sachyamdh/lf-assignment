const AppError = require("../middleware/AppError");
const User = require("../services/user.service");
const { jwtToken } = require("../utils/authUtils");

//signUp User
const signUp = async (req, res) => {
  const { email, password, confirmPassword, ...data } = req?.body;
  console.log("Data", email, password, confirmPassword, data);
  const userService = await User.registerUser(req.body);

  res.status(204).json({ status: "success", message: "Verify Email Address" });
};

const signIn = async (req, res) => {
  console.log("Login initiated", req.body);

  res.status(200).json({ message: "User logged in successfully" });
};

const resetPassword = async (req, res) => {
  console.log("Reset password initiated", req.body);

  res.status(200).json({ message: "Password reset successfully" });
};

const deleteUser = async (req, res) => {
  console.log("Delete user initiated", req.body);

  res.status(200).json({ message: "User deleted successfully" });
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
  const JWTToken = jwtToken(user.id, user.userName);
  if (!JWTToken) {
    throw new AppError("Server Error", "Token generation failed", 500);
  }
  console.log("JWT Token", JWTToken);

  res.setHeader("Authorization", `Bearer ${JWTToken}`);
  res.status(201).json({
    status: "success",
    message: "Email verified successfully",
  });
};

module.exports = { signUp, verifyEmail, signIn, resetPassword, deleteUser };
