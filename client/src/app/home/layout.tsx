import type { Metadata } from "next";
import "@/src/styles/global.scss";
import { Navbar } from "@/src/components/organisms/navbars";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
