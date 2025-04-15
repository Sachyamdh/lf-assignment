"use client";
import React, { useEffect, useState } from 'react';
import styles from './backgroundWrapper.module.scss';

const typingLines = [
  "Meeting with team @ 2pm tomorrow...",
  "Don't forget to buy groceries!",
  "Project deadline: Friday",
  "Ideas for new feature:",
  "- Dark mode toggle",
  "- Markdown support",
  "- Voice notes integration"
];

export function BackgroundWrapper({ children, useVideo = false }: { 
  children: React.ReactNode;
  useVideo?: boolean;
}) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(true);

  // Typing animation effect
  useEffect(() => {
    if (!typing) return;

    const line = typingLines[currentLine % typingLines.length];
    let charIndex = 0;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (charIndex < line.length) {
        setDisplayText(line.substring(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(type, Math.random() * 50 + 50); // Random typing speed
      } else {
        setTimeout(() => {
          setDisplayText('');
          setCurrentLine(prev => prev + 1);
        }, 1500); // Pause before next line
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [currentLine, typing]);

  return (
    <div className={styles.backgroundWrapper}>
      {/* Video Background Option */}
      {useVideo && (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.videoBackground}
        >
          <source src="/videos/notebook-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Typing Animation Background Option */}
      {!useVideo && (
        <div className={styles.typingBackground}>
          <div className={styles.typingContainer}>
            <div className={styles.typingText}>{displayText}</div>
            <div className={`${styles.cursor} ${typing ? styles.blinking : ''}`}></div>
          </div>
          <div className={styles.overlay}></div>
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}