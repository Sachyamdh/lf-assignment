import FolderSideBar from "@/src/components/organisms/sidebars/FolderSideBar";

import { FilesBar } from "@/src/components/organisms/sidebars";
import { useFolders } from "@/src/hooks/folderHook";

export default function Page() {
  return (
    <>
      <FolderSideBar />
      <FilesBar />
    </>
  );
}
