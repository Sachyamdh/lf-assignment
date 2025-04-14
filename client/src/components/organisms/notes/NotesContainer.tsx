// Updated NoteContainer.tsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./notes.module.scss";
import NoteHeader from "@/src/components/atoms/headers/NoteHeader";
import NoteMeta from "@/src/components/atoms/NoteMeta";
import clsx from "clsx";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import NoteEditorToolbar from "../../molecules/Notes/NoteEditorToolbar";
// import { useSaveNote } from "@/src/services/noteService";

interface Props {
  title: string;
  date: string;
  folder: string;
  content: string;
}

const NoteContainer = ({ title, date, folder, content }: Props) => {
  const [lastSaved, setLastSaved] = useState(Date.now());
  // const saveNote = useSaveNote();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const now = Date.now();
      // Your save logic
    },
  });

  if (!editor) return null;

  return (
    <div className={styles.container}>
      <NoteHeader slug="Test Note" title={title} />
      <NoteMeta
        date={date}
        folder={folder}
        className={clsx(styles.container__meta, "label")}
      />

      <div className={styles.editorWrapper}>
        <div className={styles.toolbar}>
          <NoteEditorToolbar editor={editor} />
        </div>
        <div className={styles.editor}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default NoteContainer;
