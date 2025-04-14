"use client";
import { ReactNode } from "react";
import styles from "./button.module.scss";

interface ButtonPrimaryProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: ReactNode;
}

export function ButtonPrimary({
  children,
  onClick,
  type = "button",
  className = "",
  icon,
}: ButtonPrimaryProps) {
  return (
    <button type={type} onClick={onClick} className={`${className}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
