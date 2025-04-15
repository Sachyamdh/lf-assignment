import FolderSideBar from "@/src/components/organisms/sidebars/FolderSideBar";

import { FilesBar } from "@/src/components/organisms/sidebars";
import { useFolders } from "@/src/hooks/folderHook";
import { RiStickyNoteLine } from "react-icons/ri";
import EmptyNoteMessage from "@/src/components/atoms/cards/EmptyNotesMessage";

export default function Page() {
  return (
    <>
      <FolderSideBar />
      <FilesBar />
      <EmptyNoteMessage />
    </>
  );
}
