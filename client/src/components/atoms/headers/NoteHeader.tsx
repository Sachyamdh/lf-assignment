"use client";
import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoMdTrash } from "react-icons/io";
import { FaArchive } from "react-icons/fa";
import styles from "@/src/components/organisms/notes/notes.module.scss";
import clsx from "clsx";

type Props = {
  slug: string;
  title: string;
};

const NoteHeader = ({ title, slug }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Add delete logic here
    console.log("Delete clicked");
    handleMenuClose();
  };

  const handleArchive = () => {
    // Add archive logic here
    console.log("Archive clicked");
    handleMenuClose();
  };

  return (
    <div className={clsx(styles.header)}>
      <h1 className=".h1">{title}</h1>
      <IconButton onClick={handleMenuOpen} aria-label="more options">
        <MoreVertIcon style={{ color: "white" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{ paper: styles.menuPaper }}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <IoMdTrash size={20} style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleArchive}>
          <ListItemIcon>
            <FaArchive size={18} style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Archive</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NoteHeader;
