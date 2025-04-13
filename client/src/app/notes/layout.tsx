import clsx from "clsx";
import styles from "./notes.module.scss";

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={clsx(styles["notes-layout"])}>{children}</main>;
}
