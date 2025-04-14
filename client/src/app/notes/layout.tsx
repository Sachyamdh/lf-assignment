import clsx from "clsx";
import styles from "./notes.module.scss";
import { FolderProvider } from "@/src/contexts/FolderContext";

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FolderProvider>
      <main className={clsx(styles["notes-layout"])}>{children}</main>
    </FolderProvider>
  );
}
