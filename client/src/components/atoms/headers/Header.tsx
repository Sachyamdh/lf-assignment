// components/Header.tsx
import React from "react";
import clsx from "clsx";
import styles from "./Header.module.css"; // or wherever your styles are

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return <div className={clsx(className)}>{children}</div>;
};

export default Header;
