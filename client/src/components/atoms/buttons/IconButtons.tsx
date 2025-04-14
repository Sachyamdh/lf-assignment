"use client";
import { ReactNode } from "react";
import clsx from "clsx";

interface IconButtonProps {
  onClick?: () => void;
  className?: string;
  icon: ReactNode;
  label?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export default function IconButton({
  onClick,
  className = "",
  icon,
  label,
  type = "button",
  ariaLabel,
}: IconButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={clsx(
        "flex items-center gap-2 text-[var(--color-foreground-primary)] hover:text-[var(--color-custom)] transition-transform duration-200 hover:scale-105 focus:outline-none",
        className
      )}
    >
      {icon}
      {label && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
