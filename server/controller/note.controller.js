const AppError = require("../middleware/AppError");
const Note = require("../services/notes.service");

// Get all notes
const getAllNotes = async (req, res) => {
  const userId = req.userId;
  const note = await Note.getAllNotes(req.params.id, req.userId);
  if (!note) {
    throw new AppError("No Notes found", "Notes not found", 404);
  }
  res.status(200).json({ status: "success", data: note });
};

// Get a single note by ID
const getNoteById = async (req, res) => {
  const userId = req.userId;
  console.log("here");
  const note = await Note.getNotesBySlug(req.params.id, req.userId);
  if (!note) {
    throw new AppError("No Notes found", "Notes not found", 404);
  }
  res.status(200).json({ status: "success", data: note });
};

// Create a new note
const createNote = async (req, res) => {
  const note = await Note.createNote(req.userId, req?.body);
  if (!note) throw new AppError("Server Error", "Failed to create note", 500);
  res.status(201).json({ status: "success", data: note });
};

// Update a note by ID
const updateNote = async (req, res) => {
  const data = await Note.updateNotes(req?.params.id, req?.body, req.userId);
  if (!data)
    throw new AppError("Failed to update note", "Failed to Update note", 503);

  res.status(202).json({ staus: "success", data: data });
};

// Delete a note by ID
const deleteNote = async (req, res) => {
  if (!req.params) throw new AppError("Client Error", "No param", 404);
  await Note.deleteNote(req?.params.id, req.userId);

  res.status(204).json({ status: "success" });
};

module.exports = {
  createNote,
  deleteNote,
  updateNote,
  getAllNotes,
  getNoteById,
};
