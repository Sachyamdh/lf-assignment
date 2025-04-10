const express = require("express");
const router = express.Router();
const { registerSchema } = require("../dtos/auth.dto");
const validateDto = require("../middleware/validateDto");
const { signUp,verifyEmail } = require("../controller/auth.controller");
const { verify } = require("jsonwebtoken");

router.post("/signup", validateDto(registerSchema), signUp);
router.get("/veriry-user", verifyEmail);

module.exports = router;
