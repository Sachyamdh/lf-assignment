const express = require("express");
const router = express.Router();
const { registerSchema, loginSchema } = require("../dtos/auth.dto");
const validateDto = require("../middleware/validateDto");
const {
  signUp,
  verifyEmail,
  signIn,
} = require("../controller/auth.controller");


router.post("/signup", validateDto(registerSchema), signUp);
router.post("/login", validateDto(loginSchema), signIn);
router.get("/veriry-user", verifyEmail);

module.exports = router;
