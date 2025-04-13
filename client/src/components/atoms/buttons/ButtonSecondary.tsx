"use client";
import { ReactNode } from "react";
import styles from "./button.module.scss";

interface ButtonSecondaryProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: ReactNode;
}

export function ButtonSecondary({
  children,
  onClick,
  type = "button",
  className = "",
  icon,
}: ButtonSecondaryProps) {
  return (
    <button type={type} onClick={onClick} className={`${className}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
