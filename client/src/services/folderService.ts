import axios from "axios";
import { Folder } from "../types/folderType";
import axiosInstance from "./axiosInstance";

export async function getFolders(): Promise<Folder[]> {
  const response = await axiosInstance.get(`/folder/get`);

  return response.data;
}

export async function createFolder(folderData:{name: string}): Promise<Folder> {
    const response = await axiosInstance.post('/folders/create',folderData)

  return response.data;
}

// export async function deleteFolder(id: number): Promise<void> {
//   const token = localStorage.getItem("token");
//   if (!token) throw new Error("Not authenticated");

//   await axios.delete(`${API_URL}/api/v1/folder/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// }
