import FolderSideBar from "@/src/components/organisms/sidebars/FolderSideBar";

import clsx from "clsx";
import { FilesBar } from "@/src/components/organisms/sidebars";

export default function Page() {
  console.log(process.env.API_URL);
  return (
    <>
      <FolderSideBar />
      <FilesBar />
    </>
  );
}
