const express = require("express");
const router = express.Router();
const {
  createFolder,
  getAllFolders,
} = require("../controller/folder.controller");
const validateDto = require("../middleware/validateDto");
const createFolderDto = require("../dtos/folder.dto");
const { tryCatch } = require("../utils/tryCatch");

router.get("/get", tryCatch(getAllFolders));
router.post("/create", validateDto(createFolderDto), tryCatch(createFolder));

module.exports = router;
