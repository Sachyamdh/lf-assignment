import axios from "axios";
import { Folder } from "../types/folderType";

const API_URL = process.env.API_URL;

export async function getFolders(): Promise<Folder[]> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.get(`${API_URL}/api/v1/folder`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function createFolder(name: string): Promise<Folder> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.post(
    `${API_URL}/api/v1/folder`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function deleteFolder(id: number): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  await axios.delete(`${API_URL}/api/v1/folder/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
