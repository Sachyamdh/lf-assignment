const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AppError = require("../middleware/AppError");
const crypto = require("crypto");

/**
 * Generates a JWT token for the user.
 * @param {string} userId - The ID of the user.
 * @param {string} userName - The name of the user.
 * @returns {string} - The generated JWT token.
 * @throws {AppError} - If JWT_KEY or JWT_EXPIRATION is not set in environment variables.
 */
const jwtToken = async (userId, userName) => {
  if (!process.env.JWT_KEY || !process.env.JWT_EXPIRY) {
    throw new AppError(
      "Server Error",
      "JWT_KEY or JWT_EXPIRATION not set in environment variables",
      500
    );
  }
  const token = jwt.sign({ userId, userName }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};

//function to verifuy the token, whether the token is valid or not
const jwtVerify = async (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      throw new AppError(err.stack, err.message, err.status || 401);
    }
    return true;
  });
};

//encrypt the password using bcrypt
const hashing = async (password) => {
  if (!process.env.SALT_ROUNDS) {
    throw new AppError(
      "Server Error",
      "SALT_ROUNDS not set in environment variables",
      500
    );
  }
  const saltRounds = process.env.SALT_ROUNDS;
  return bcrypt.hash(password, parseInt(saltRounds));
};

//compare the password with the hashed password to verify the password
/**
 * Compares a plain password with a hashed password.
 * @param {string} password - The plain password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

//randomly generate a token for the user
const generateEmailToken = async () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = {
  generateEmailToken,
  jwtToken,
  jwtVerify,
  hashing,
  comparePassword,
};
