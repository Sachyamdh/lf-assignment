const express = require("express");
// const { protect } = require("../middleware/authMiddleware");
const { tryCatch } = require("../utils/tryCatch");
const { getAllNotes, getNoteById } = require("../controller/note.controller");
const router = express.Router();

// router.post("/create");
router.get("/get", tryCatch(getAllNotes));
router.get("/get/:id", tryCatch(getNoteById));

module.exports = router;
