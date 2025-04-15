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
  folderId: number | null;
  systemCategories: (
    | "Personal"
    | "Education"
    | "Journal"
    | "Work"
    | "Ideas"
    | "Random"
    | "Review"
    | "Notes"
  )[];
}) {
  const response = await axiosInstance.post("/notes/create", newNote);
  return response.data;
}

export const deleteNote = async (slug: string) => {
  const response = await axiosInstance.delete(`notes/delete/${slug}`);
  return response;
};

export const updateNote = async (
  id: string,
  updatedNote: { title: string; content: string }
) => {
  console.log(id);
  const response = await axiosInstance.patch(
    `/notes/update/${id}`,
    updatedNote
  );
  return response.data.data;
};

export const getNoteById = async (slug: string) => {
  const response = await axiosInstance.get(`/notes/get/${slug}`);
  return response.data.data;
};
