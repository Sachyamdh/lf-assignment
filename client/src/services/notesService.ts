import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getNotes = async () => {
  const response = await axiosInstance.get("/notes/get");
  return response.data;
};

export const getNotesBySlug = async (slug: string) => {
  const response = await axiosInstance.get(`/notes/get/${slug}`);
  return response.data;
};

export const createNote = async (newNote: {
  title: string;
  content: string;
  folderId: string;
}) => {
  const response = await axiosInstance.post("/notes/create", newNote);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete(`/delete/${id}`);
  return response;
};

export const updateNote = async (
  id: string,
  updatedNote: { title: string; content: string }
) => {
  const response = await axios.patch(`/update/${id}`, updateNote);
};
