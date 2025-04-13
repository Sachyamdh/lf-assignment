"use client";
import { folders, recentItems } from "@/src/utils/data";
import React, { useState } from "react";
import { ButtonPrimary } from "../../atoms/buttons/ButtonPrimary";
import { IoMdAdd, IoIosSearch } from "react-icons/io";
import styles from "./sidebars.module.scss";
import Image from "next/image";
import IconButton from "../../atoms/buttons/IconButtons";
import clsx from "clsx";
import { redirect } from "next/navigation";
import FolderCard from "../../molecules/cards/FolderCard";
import { CgFolderAdd } from "react-icons/cg";
import FileCard from "../../atoms/cards/FileCard";

const FolderSideBar = () => {
  const [state, setState] = useState<boolean>(false);

  const handleCreateNew = async () => {
    setState(!state);
  };
  const handleIconClick = () => {
    redirect("/home");
  };

  return (
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
            />
          );
        })}
      </div>
      <div className={clsx(styles.sidebar__subHeader)}>
        <h6>Folders</h6>
        <CgFolderAdd />
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
            />
          );
        })}
      </div>
    </aside>
  );
};

export default FolderSideBar;
