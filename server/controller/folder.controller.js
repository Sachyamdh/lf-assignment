const Folder = require("../services/folder.service");

// Create a new folder
const createFolder = (req, res) => {
  return Folder.createFolder(req.userId, req.body);
};

// Get all folders
const getAllFolders = async (req, res) => {
  const folder = await Folder.getAllFolders(req.params.userId);
  res.status(200).json({ message: "success", data: folder });
};

module.exports = {
  createFolder,
  getAllFolders,
};
