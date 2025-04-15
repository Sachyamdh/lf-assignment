"use client";
import { folders, more, recentItems } from "@/src/utils/data";
import React, { useState } from "react";
import { ButtonPrimary } from "../../atoms/buttons/ButtonPrimary";
import { IoMdAdd, IoIosSearch, IoMdTrash } from "react-icons/io";
import styles from "./sidebars.module.scss";
import Image from "next/image";
import IconButton from "../../atoms/buttons/IconButtons";
import clsx from "clsx";
import { redirect, useRouter } from "next/navigation";
import FolderCard from "../../molecules/cards/FolderCard";
import { CgFolderAdd } from "react-icons/cg";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { FaArchive } from "react-icons/fa";
import { useCreateNote } from "@/src/hooks/noteHook";
import { useCreateFolder } from "@/src/hooks/folderHook";
import FileCard from "../../atoms/cards/FileCard";
import { useFolderContext } from "@/src/contexts/FolderContext";
import CreateFolderForm from "../../molecules/forms/FolderForm";

const FolderSideBar = () => {
  const router = useRouter();
  const { setFolder, setFile, resetToHome } = useFolderContext();
  const { mutate: createNote } = useCreateNote();
  const { mutate: createFolder } = useCreateFolder();
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);

  const handleCreateNew = () => {
    setShowNoteForm(!showNoteForm);
  };

  const handleCreateFolder = () => {
    setShowFolderForm(!showFolderForm);
  };
  const handleIconClick = () => {
    resetToHome();
    redirect("/home");
  };

  const handleFileClick = async (folderId: string, fileId: string) => {
    setFile(folderId, fileId);
    router.push(`notes/${fileId}`);
  };

  const handleFolderClick = (folderId: string) => {
    setFolder(folderId);
  };

  const handleFolderSubmit = (data: { name: string }) => {
    console.log("parent", data);
    createFolder({ name: data.name });
    setShowFolderForm(false);
  };

  const handleNoteSubmit = (data: {
    noteTitle: string;
    noteContent: string;
  }) => {
    // createNote({ title: data.noteTitle, content: data.noteContent });
    setShowNoteForm(false);
  };

  return (
    <>
      <aside className={clsx(styles.sidebar)}>
        <div className={clsx(styles.sidebar__topHolder)}>
          <div className={clsx(styles.sidebar__header)}>
            <div className={styles.sidebar__logo}>
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                objectFit="cover"
                onClick={handleIconClick}
              />
            </div>
            <IconButton
              icon={<IoIosSearch />}
              className={styles.sidebar__searchButton}
            />
          </div>

          <ButtonPrimary
            onClick={handleCreateNew}
            icon={<IoMdAdd />}
            className={styles.sidebar__createButton}
          >
            New Note
          </ButtonPrimary>
        </div>
        <div className={clsx(styles.sidebar__subHeader)}>
          <h6>Recent</h6>
        </div>

        <div className={clsx(styles.sidebar__folderHolder)}>
          {recentItems.map((item) => {
            return (
              <FileCard
                key={item.id}
                className={clsx(styles.sidebar__fileHolder)}
                id={item.id}
                title={item.title}
                onClick={() => handleFileClick("recent", item.title)}
              >
                <MdOutlineStickyNote2 />
              </FileCard>
            );
          })}
        </div>
        <div className={clsx(styles.sidebar__subHeader)}>
          <h6>Folders</h6>
          <CgFolderAdd onClick={handleCreateFolder} />
        </div>

        <div className={clsx(styles.sidebar__folderHolder)}>
          {folders.map((item) => {
            return (
              <FolderCard
                className={clsx(styles.sidebar__fileHolder)}
                key={item.id}
                id={item.id}
                name={item.name}
                dropdown={item.dropdown}
                fileCardClassName={clsx(styles.sidebar__fileHolder)}
                onFolderClick={(folderId) => handleFolderClick(folderId)}
                onFileClick={(fileId) =>
                  handleFileClick(item.id.toString(), fileId.toString())
                }
              />
            );
          })}
        </div>
        <div className={clsx(styles.sidebar__subHeader)}>
          <h6>More</h6>
        </div>

        <div className={clsx(styles.sidebar__folderHolder)}>
          {more.map((item) => {
            return (
              <FileCard
                key={item.id}
                className={clsx(styles.sidebar__fileHolder)}
                id={item.id}
                title={item.title}
              >
                {item.id === "deleted-item" ? <IoMdTrash /> : <FaArchive />}
              </FileCard>
            );
          })}
        </div>
      </aside>
      {showFolderForm && <CreateFolderForm onSubmit={handleFolderSubmit} />}
      {/* {showNoteForm && <CreateNoteForm onSubmit={handleNoteSubmit} />} */}
    </>
  );
};

export default FolderSideBar;
