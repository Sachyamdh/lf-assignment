// src/hooks/useNotes.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/src/services/notesService";

// React Query hook to get all notes
export const useNotes = () => {
  return useQuery({ queryKey: ["notes"], queryFn: getNotes });
};

// hook to create new note
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onError: (error) => {
      console.error("Notes post failed", error);
    },
  });
};

// React Query hook to update an existing note
export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: string;
      data: { title: string; content: string };
    }) => {
      return updateNote(payload.id, payload.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Error updating note:", error);
    },
  });
};

// React Query hook to delete a note
export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
  });
};
