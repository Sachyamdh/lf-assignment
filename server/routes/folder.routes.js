const express = require("express");
const router = express.Router();
const {
  createFolder,
  getAllFolders,
} = require("../controller/folder.controller");
const validateDto = require("../middleware/validateDto");
const createFolderDto = require("../dtos/folder.dto");
const { tryCatch } = require("../utils/tryCatch");

router.get("/get", validateDto(createFolderDto), tryCatch(getAllFolders));
router.post("/create", tryCatch(createFolder));

module.exports = router;
