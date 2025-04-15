import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/src/styles/global.scss";
import { AuthProvider } from "../contexts/AuthContext";
import QueryProvider from "../contexts/QueryProvider";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

/**
 * Metadata object containing information about the application.
 *
 * @property {string} title - The title of the application, displayed in the browser tab or used for SEO purposes.
 * @property {string} description - A brief description of the application, useful for SEO and sharing purposes.
 * @property {string[]} keywords - A list of relevant keywords to improve search engine discoverability.
 * @property {string} author - The name of the application creator or company.
 * @property {object} openGraph - Metadata used to enhance link previews on social media platforms.
 * @property {string} openGraph.title - The title used specifically for social media sharing.
 * @property {string} openGraph.description - A social-media-optimized version of the application description.
 * @property {string} openGraph.url - The canonical URL of the application.
 * @property {string} openGraph.type - The type of content (e.g., "website").
 */
export const metadata: Metadata = {
  title: "NoteFy – Smart Note Taking App",
  description:
    "NoteFy helps you capture, organize, and manage your notes efficiently with powerful features and a clean interface.",
  keywords: ["notes", "note taking", "productivity", "NoteFy"],
  authors: [{ name: "Sachyam Dhungana" }],
  openGraph: {
    title: "NoteFy",
    description: "The smartest way to take and manage your notes.",
    url: "http://localhost:3000",
    siteName: "NoteFy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} antialiased m-0 p-0`}>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
