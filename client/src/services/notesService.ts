import axios from "axios";
import axiosInstance from "./axiosInstance";
import { NoteResponse } from "../types/noteType";

export async function getNotes(): Promise<NoteResponse[]> {
  const response = await axiosInstance.get("/notes/get");
  return response.data.data;
}

export const getNotesBySlug = async (slug: string) => {
  const response = await axiosInstance.get(`/notes/get/${slug}`);
  return response.data;
};

export async function createNote(newNote: {
  title: string;
  content: string;
  folderId: string;
}) {
  const response = await axiosInstance.post("/notes/create", newNote);
  return response.data;
}

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

export const getNoteById = async (slug: string) => {
  const response = await axiosInstance.get(`/notes/get/${slug}`);
  return response.data.data;
};
