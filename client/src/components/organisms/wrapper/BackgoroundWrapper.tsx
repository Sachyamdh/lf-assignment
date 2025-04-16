"use client";
import React, { useEffect, useState } from "react";
import styles from "./backgroundWrapper.module.scss";

const typingLines = [
  " Meeting with team @ 2pm tomorrow Ideas for new feature:",
  " Don't forget to buy groceries!",
  " Project deadline: Friday",

  "  - Dark mode toggle",
  "  - Markdown support",
  "  - Voice notes integration",
  "> System status: ONLINE",
  "> Ready for input...",
  "> Remember to review the pull requests.",
  "> Schedule a call with the design team.",
  "> Update the documentation for the API.",
  "> Backup the database before deployment.",
  "> Check server logs for errors.",
  "> Plan the sprint retrospective meeting.",
  "> Research new tools for productivity.",
  "> Prepare slides for the client presentation.",
  "> Test the new feature thoroughly.",
  "> Push the latest changes to the repository.",
  "> Review the team's weekly progress report.",
  "> Brainstorm ideas for the next hackathon.",
  "> Ensure all tasks are completed before the weekend.",
];

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);


  useEffect(() => {
    if (!typing) return;

    const line = typingLines[currentLine % typingLines.length];
    let charIndex = 0;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (charIndex < line.length) {
        setDisplayText(line.substring(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(type, Math.random() * 30 + 30); 
      } else {
        setTimeout(() => {
          setDisplayText("");
          setCurrentLine((prev) => prev + 1);
        }, 800); 
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [currentLine, typing]);

  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.typingBackground}>
        <div className={styles.typingContainer}>
          <div className={styles.typingText}>
            {displayText}
            <div
              className={`${styles.cursor} ${typing ? styles.blinking : ""}`}
            ></div>
          </div>
        </div>
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
