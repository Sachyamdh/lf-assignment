"use client";
import { useState, useEffect } from "react";
import styles from "./sidebars.module.scss";
import clsx from "clsx";

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
    <div className={clsx(styles["files-sidebar"])}>This is file side bar</div>
  );
};

export default FilesSideBar;
