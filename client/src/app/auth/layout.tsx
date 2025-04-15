import { Navbar } from "@/src/components/organisms/navbars";
import { FolderProvider } from "@/src/contexts/FolderContext";

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FolderProvider>
      <main>
        {" "}
        <Navbar />
        {children}
      </main>
    </FolderProvider>
  );
}
