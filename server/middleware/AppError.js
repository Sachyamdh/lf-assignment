class AppError extends Error {
  constructor(err, message, statusCode) {
    super(message);

    this.error = err;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);

    // console.error("Error: ", this.error);
    // console.error("Message: ", this.message);
    // console.error("Status Code: ", this.statusCode);
  }
}

module.exports = AppError;
