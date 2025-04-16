"use client";
import React, { useState } from "react";
import { RiStickyNoteLine } from "react-icons/ri";
import styles from "./EmptyNoteMessage.module.scss";
import clsx from "clsx";
import { ButtonPrimary } from "../buttons/ButtonPrimary";
import { IoMdAdd } from "react-icons/io";
import CreateNoteForm from "../../molecules/forms/CreateNoteForm";

const EmptyNoteMessage = () => {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const handleCreateNew = () => {
    setShowNoteForm(false);
  };
  return (
    <section className={styles.wrapper}>
      <div>
        <RiStickyNoteLine className={styles.icon} />
      </div>
      <h1 className={clsx(styles.heading, ".h1")}>Select a note</h1>
      <ButtonPrimary
        onClick={handleCreateNew}
        icon={<IoMdAdd />}
        className={styles.createButton}
      >
        New Note
      </ButtonPrimary>
      {showNoteForm && <CreateNoteForm />}
    </section>
  );
};

export default EmptyNoteMessage;
