const express = require("express");
const router = express.Router();
const { serverHealth } = require("../controller/health.controller");

router.get("/health-check", serverHealth);


module.exports = router;
