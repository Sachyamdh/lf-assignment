"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./notes.module.scss";
import NoteHeader from "@/src/components/atoms/headers/NoteHeader";
import NoteMeta from "@/src/components/atoms/NoteMeta";
import clsx from "clsx";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import NoteEditorToolbar from "../../molecules/Notes/NoteEditorToolbar";
import { useNoteById, useUpdateNote } from "@/src/hooks/noteHook";
import { formatDate } from "@/src/utils/dateformatter";

const NoteContainer = ({ slug }: { slug: string }) => {
  const { data: note, isLoading } = useNoteById(slug);
  const [lastSaved, setLastSaved] = useState(Date.now());
  const lastContentRef = useRef(note?.content || "");

  const updateNote = useUpdateNote();

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
        Underline,
        Placeholder.configure({ placeholder: "Start typing..." }),
      ],
      content: note?.content || "",
    },
    [note?.content]
  );


  useEffect(() => {
    const interval = setInterval(() => {
      if (!editor) return;
      const currentContent = editor.getHTML();
      if (currentContent !== lastContentRef.current) {
        updateNote.mutate({
          slug: note.slug,
          data: {
            title: note.title,
            content: currentContent,
          },
        });

        lastContentRef.current = currentContent;
        setLastSaved(Date.now());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [editor, note]);

  if (isLoading || !note || !editor) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <NoteHeader slug={note.slug} title={note.title} />
      <NoteMeta
        date={formatDate(note.updatedAt)}
        folder={note.folder?.name}
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
