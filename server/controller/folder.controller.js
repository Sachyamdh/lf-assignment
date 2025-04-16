const Folder = require("../services/folder.service");

// Create a new folder
const createFolder = async (req, res) => {
  const folder = await Folder.createFolder(req.userId, req.body.name);
  res.status(200).json({ message: "success", data: folder });
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
