"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./forms.module.scss";
import { useCreateFolder } from "@/src/hooks/folderHook";
import { ButtonPrimary } from "../../atoms/buttons/ButtonPrimary";
import TextInput from "../../atoms/inputs/TextInput";

type FolderFormData = {
  name: string;
};

const CreateFolderForm = ({
  onSubmit,
}: {
  onSubmit: (data: FolderFormData) => void;
}) => {
  const { register, handleSubmit, formState, reset } = useForm<FolderFormData>({
    mode: "onBlur",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { errors } = formState;
  const { mutate: createFolder } = useCreateFolder();

  const onSubmitHandler = (data: FolderFormData) => {
    console.log("Folder", data);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
      <TextInput
        label="Folder Name"
        type="text"
        className={styles.switchLink}
        {...register("name", {
          required: "Folder name is required",
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <ButtonPrimary
        type="submit"
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? "Creating..." : "Create Folder"}
      </ButtonPrimary>
    </form>
  );
};

export default CreateFolderForm;
