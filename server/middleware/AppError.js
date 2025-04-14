class AppError extends Error {
  constructor(err, message, statusCode) {
    super(message);

    this.error = err;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.timestamp = new Date().toISOString();

    Error.captureStackTrace(this, this.constructor);

    // Development logging
    if (process.env.NODE_ENV === "development") {
      console.error("\x1b[31m%s\x1b[0m", "ERROR ", this);
    }
  }

  toJSON() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
      timestamp: this.timestamp,
      ...(process.env.NODE_ENV === "development" && {
        stack: this.stack,
        originalError: this.error?.message,
      }),
    };
  }
}

module.exports = AppError;
