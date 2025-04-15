import React from "react";
import { RiStickyNoteLine } from "react-icons/ri";
import styles from "./EmptyNoteMessage.module.scss";

const EmptyNoteMessage = () => {
  return (
    <section className={styles.wrapper}>
      <div>
        <RiStickyNoteLine className={styles.icon} />
      </div>
      <h1 className={styles.heading}>Select a note</h1>
    </section>
  );
};

export default EmptyNoteMessage;
