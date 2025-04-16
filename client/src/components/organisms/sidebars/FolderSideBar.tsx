"use client";
import { FOLDERS, more, recentItems } from "@/src/utils/data";
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
import { useNotes } from "@/src/hooks/noteHook";
import { useCreateFolder, useFolders } from "@/src/hooks/folderHook";
import FileCard from "../../atoms/cards/FileCard";
import { useFolderContext } from "@/src/contexts/FolderContext";
import CreateFolderForm from "../../molecules/forms/FolderForm";
import CreateNoteForm from "../../molecules/forms/CreateNoteForm";
import { GiHamburgerMenu } from "react-icons/gi";

const FolderSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { setFolder, setFile, resetToHome } = useFolderContext();
  const { data: Notes = [], isLoading: isLoadingNotes } = useNotes();
  const { mutate: createFolder } = useCreateFolder();
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const { data: folders = [], isLoading } = useFolders();

  if (isLoading && isLoadingNotes) return <p>Loading...</p>;
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

  const handleNoteSubmit = () => {
    setShowNoteForm(false);
  };

  return (
    <>
      <IconButton
        className={`${styles.sidebar__toggleBtn}`}
        icon={<GiHamburgerMenu size={12} />}
        onClick={() => setIsOpen(!isOpen)}
      />

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebar__open : ""}`}
      >
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
          {Notes.map((item) => {
            return (
              <FileCard
                key={item.slug}
                className={clsx(styles.sidebar__fileHolder)}
                id={item.slug}
                title={item.title.trim().split(" ").slice(0, 3).join("")}
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
                dropdown={item.notes}
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
      {showNoteForm && <CreateNoteForm />}
    </>
  );
};

export default FolderSideBar;
