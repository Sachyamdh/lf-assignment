const { tryCatch } = require("../utils/tryCatch");
const jwt = require("jsonwebtoken");
const util = require("util");
const User = require("../services/user.service");
const AppError = require("../middleware/AppError");

const protect = tryCatch(async (req, res, next) => {
  //Getting the token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new AppError("Authorazization Failed", "You are not logged in", 401);
  }

  //Validating the token
  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_KEY);
  //Check if the user still exists
  const freshUser = await User.getSingleUser(decoded.userId);
  if (!freshUser) {
    throw new AppError("Inavlid User", "User no longer exists", 401);
  }
  //check if the user changed password after the jwt token was issued

  //granting access
  req.userId = freshUser.id;
  next();
});

module.exports = { protect };
