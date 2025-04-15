import FolderSideBar from "@/src/components/organisms/sidebars/FolderSideBar";

import clsx from "clsx";
import { FilesBar } from "@/src/components/organisms/sidebars";
import NoteContainer from "@/src/components/organisms/notes/NotesContainer";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = await params;
  return (
    <>
      <FolderSideBar />
      <FilesBar />
      <NoteContainer slug={slug.slug} />
    </>
  );
}
