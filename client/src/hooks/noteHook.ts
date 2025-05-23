// src/hooks/useNotes.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      window.location.reload();
    },
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
      slug: string;
      data: { title: string; content: string };
    }) => {
      console.log("hook", payload.slug);
      return updateNote(payload.slug, payload.data);
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
    mutationFn: (slug: string) => deleteNote(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      window.location.href = "/notes";
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
  });
};

export const useNoteById = (slug: string) => {
  return useQuery({
    queryKey: ["note", slug],
    queryFn: () => getNoteById(slug),
    enabled: !!slug,
  });
};
