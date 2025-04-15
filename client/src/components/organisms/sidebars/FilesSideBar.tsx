"use client";
import { useState, useEffect } from "react";
import styles from "./sidebars.module.scss";
import clsx from "clsx";
import { recentItems } from "@/src/utils/data";
import NoteCard from "../../molecules/cards/NoteCard";
import { useFolderContext } from "@/src/contexts/FolderContext";
import { useRouter } from "next/navigation";
import { useNotes } from "@/src/hooks/noteHook";

const FilesSideBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { setFile, folderState } = useFolderContext();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return null;
  }
  const { data: Notes = [], isLoading } = useNotes();
  if (isLoading) return <p>Loading...</p>;
  console.log(Notes);

  const handleFileSelect = async (fileId: string) => {
    router.push(`notes/${fileId}`);
  };

  return (
    <section className={clsx(styles.filesSidebar)}>
      <h2 className={clsx(styles.sidebar__header, ".h2")}>
        {" "}
        {folderState.currentFolder}{" "}
      </h2>
      <div className={clsx(styles.filesSidebar__noteHolder)}>
        {Notes.map((item) => {
          return (
            <NoteCard
              key={item.slug}
              className={clsx(styles.filesSidebar__noteCard)}
              id={item.slug}
              title={item.title}
              date={item.updatedAt}
              subInfo={item.content}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FilesSideBar;
