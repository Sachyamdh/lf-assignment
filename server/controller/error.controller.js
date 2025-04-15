const AppError = require("../middleware/AppError");

// Development error handler
const sendErrorDev = (err, res) => {
  console.error(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack.split(":")[0],
    timestamp: err.timestamp,
  });
};

// Production error handler
const sendErrorProd = (err, res) => {
  // Operational  error: send message to client
  // example user not found, invalid input data
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // 1) Log error
    console.error("ERROR", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

// Handle specific error types
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(err, message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  throw new AppError(err, message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(err, message, 400);
};

const handleJWTError = () =>
  new AppError(
    new Error("Invalid token"),
    "Invalid token. Please log in again!",
    401
  );

const handleJWTExpiredError = (err) => new AppError(err, "Invalid Token", 401);

const handleZodError = (err) => {
  const errors = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(err, message, 400);
};

// Global error handler middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message };

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
