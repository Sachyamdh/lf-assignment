const AppError = require("../middleware/AppError");

exports.tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    return next(new AppError(err, err.message, 404));
  }
};
