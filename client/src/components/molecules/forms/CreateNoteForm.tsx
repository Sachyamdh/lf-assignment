"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useFolders } from "@/src/hooks/folderHook";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import styles from "./forms.module.scss";
import TextInput from "../../atoms/inputs/TextInput";
import { useCreateNote } from "@/src/hooks/noteHook";
import { ButtonPrimary } from "../../atoms/buttons/ButtonPrimary";

type NoteFormData = {
  title: string;
  content: string;
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
  folderId?: number;
};

const systemCategories = [
  "Personal",
  "Education",
  "Journal",
  "Work",
  "Ideas",
  "Random",
  "Review",
  "Notes",
] as const;

const selectStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--color-foreground-primary)",
    },
    "&:hover fieldset": {
      borderColor: "var(--color-foreground-primary)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color-foreground-primary)",
    },
    "& .MuiSelect-select": {
      color: "var(--color-foreground-primary)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--color-foreground-primary)",
    "&.Mui-focused": {
      color: "var(--color-foreground-primary)",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "var(--text-color)",
  },
};

const CreateNoteForm = () => {
  const { register, handleSubmit, formState, reset } = useForm<NoteFormData>();
  const { data: folders } = useFolders();
  const { mutate: createNote, isPending } = useCreateNote();
  const { errors } = formState;

  const onSubmit = (data: NoteFormData) => {
    console.log(data);
    createNote({
      ...data,
      folderId: data.folderId || null,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextInput
        className={styles.switchLink}
        label="Title"
        {...register("title", { required: "Title is required" })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextInput
        className={styles.switchLink}
        label="Content"
        multiline
        rows={4}
        {...register("content", { required: "Content is required" })}
        error={!!errors.content}
        helperText={errors.content?.message}
      />

      <FormControl
        fullWidth
        sx={selectStyles}
        error={!!errors.systemCategories}
      >
        <InputLabel id="system-category-label">System Category</InputLabel>
        <Select
          labelId="system-category-label"
          label="System Category"
          multiple
          defaultValue={[]}
          {...register("systemCategories", {
            required: "At least one category is required",
          })}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {systemCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>

        {errors.systemCategories && (
          <FormHelperText>{errors.systemCategories.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth sx={selectStyles}>
        <InputLabel id="folder-label">Folder (Optional)</InputLabel>
        <Select
          labelId="folder-label"
          label="Folder (Optional)"
          defaultValue=""
          {...register("folderId")}
        >
          <MenuItem value="">None (Home)</MenuItem>
          {folders?.map((folder) => (
            <MenuItem key={folder.id} value={folder.id}>
              {folder.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ButtonPrimary
        type="submit"
        disabled={isPending}
        className={styles.button}
      >
        {isPending ? "Creating..." : "Create Note"}
      </ButtonPrimary>
    </form>
  );
};

export default CreateNoteForm;
