const express = require("express");
const router = express.Router();
const { registerSchema, loginSchema } = require("../dtos/auth.dto");
const validateDto = require("../middleware/validateDto");
const {
  signUp,
  verifyEmail,
  signIn,
  verifyUser,
} = require("../controller/auth.controller");
const { tryCatch } = require("../utils/tryCatch");

router.post("/signup", validateDto(registerSchema), tryCatch(signUp));
router.post("/login", validateDto(loginSchema), tryCatch(signIn));
router.get("/verify-user", tryCatch(verifyEmail));
router.post("/verify-token", tryCatch(verifyUser));

module.exports = router;
