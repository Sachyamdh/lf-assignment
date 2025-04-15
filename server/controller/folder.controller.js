const Folder = require("../services/folder.service");

// Create a new folder
const createFolder = (req, res) => {
  return Folder.createFolder(req.userId, req.body);
};

// Get all folders
const getAllFolders = (req, res) => {
  return Folder.getAllFolders(req.userId);
};

module.exports = {
  createFolder,
  getAllFolders,
};
