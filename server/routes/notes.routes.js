const express = require("express");
// const { protect } = require("../middleware/authMiddleware");
const { tryCatch } = require("../utils/tryCatch");
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controller/note.controller");
const validateDto = require("../middleware/validateDto");
const { createNoteSchema, updateNoteSchema } = require("../dtos/note.dto");
const router = express.Router();

// router.post("/create");
router.get("/get", tryCatch(getAllNotes));
router.get("/get/:id", tryCatch(getNoteById));
router.post("/create", validateDto(createNoteSchema), tryCatch(createNote));
router.patch("/:id", validateDto(updateNoteSchema), tryCatch(updateNote));
router.delete("/:id", tryCatch(deleteNote));
module.exports = router;
