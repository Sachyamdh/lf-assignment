"use client";
import { useState, useEffect } from "react";
import styles from "./sidebars.module.scss";
import clsx from "clsx";
import { recentItems } from "@/src/utils/data";
import NoteCard from "../../molecules/cards/NoteCard";

const FilesSideBar = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section className={clsx(styles.filesSidebar)}>
      <h2 className={clsx(styles.sidebar__header, ".h2")}> sidebar </h2>
      <div className={clsx(styles.filesSidebar__noteHolder)}>
        {recentItems.map((item) => {
          return (
            <NoteCard
              key={item.id}
              className={clsx(styles.filesSidebar__noteCard)}
              id={item.id}
              title={item.title}
              date={item.date}
              subInfo={item.subInfo}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FilesSideBar;
