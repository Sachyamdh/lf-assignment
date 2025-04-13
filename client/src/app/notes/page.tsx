import FolderSideBar from "@/src/components/organisms/sidebars/FolderSideBar";

import clsx from "clsx";
import { FilesBar } from "@/src/components/organisms/sidebars";

export default function Page() {
  return (
    <>
      <FolderSideBar />
      <FilesBar />
    </>
  );
}
