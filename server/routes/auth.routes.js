const express = require("express");
const router = express.Router();
const { registerSchema } = require("../dtos/auth.dto");
const validateDto = require("../middleware/validateDto");
const { signUp } = require("../controller/auth.controller");

router.post("/signup", validateDto(registerSchema), signUp);

module.exports = router;
