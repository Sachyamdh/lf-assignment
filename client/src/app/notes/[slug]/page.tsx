import FolderSideBar from "@/src/components/organisms/sidebars/FolderSideBar";

import clsx from "clsx";
import { FilesBar } from "@/src/components/organisms/sidebars";
import NoteContainer from "@/src/components/organisms/notes/NotesContainer";

export default function Page() {

  return (
    <>
      <FolderSideBar />
      <FilesBar />
      <NoteContainer />
    </>
  );
}
