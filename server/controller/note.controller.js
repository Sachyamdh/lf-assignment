const AppError = require("../middleware/AppError");
// const Note = require("../models/note.model");
// const Note = "test";
// Get all notes
const getAllNotes = async (req, res) => {
  console.log(req.userId);
  res.status(200).json(notes);
};

// Get a single note by ID
const getNoteById = async (req, res) => {
  try {
    const note = req.params.id;
    const userId = req.userId;
    console.log(note, userId);
    // const note = await Note.findById(req.params.id);
    if (!note) {
      throw new AppError("No Notes found", "Notes not found", 404);
    }
    res.status(200).json({ status: "success", data: note });
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
};

// Create a new note
const createNote = async (req, res) => {
  try {
    // const newNote = new Note(req.body);
    // const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

// Update a note by ID
const updateNote = async (req, res) => {
  try {
    // const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    // new: true,
    // });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
};

// Delete a note by ID
const deleteNote = async (req, res) => {
  try {
    // const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};

module.exports = {
  createNote,
  deleteNote,
  updateNote,
  getAllNotes,
  getNoteById,
};
