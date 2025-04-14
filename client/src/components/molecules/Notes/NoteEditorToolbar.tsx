"use client";
import React from "react";
import { Editor } from "@tiptap/react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TitleIcon from "@mui/icons-material/Title"; 
import { IconButton, Box } from "@mui/material";
import styles from "./noteEditorToolBar.module.scss";

type Props = {
  editor: Editor;
};

const NoteEditorToolbar = ({ editor }: Props) => {
  if (!editor) return null;

  // Function to toggle heading level
  const toggleHeading = (level: number) => {
    editor.chain().focus().toggleHeading({ level: level as any }).run();
  };

  return (
    <Box className={styles.toolbar}>
      <IconButton
        onClick={() => toggleHeading(2)}
        color={editor.isActive("heading", { level: 2 }) ? "primary" : "default"}
        title="Subheading"
      >
        <TitleIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        color={editor.isActive("bold") ? "primary" : "default"}
      >
        <FormatBoldIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        color={editor.isActive("italic") ? "primary" : "default"}
      >
        <FormatItalicIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        color={editor.isActive("underline") ? "primary" : "default"}
      >
        <FormatUnderlinedIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        color={editor.isActive("bulletList") ? "primary" : "default"}
      >
        <FormatListBulletedIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        color={editor.isActive("orderedList") ? "primary" : "default"}
      >
        <FormatListNumberedIcon />
      </IconButton>
    </Box>
  );
};

export default NoteEditorToolbar;
