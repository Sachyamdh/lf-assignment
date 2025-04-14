"use client";
import React, { createContext, useContext, useState } from "react";

interface FolderState {
  currentFolder: string | null;
  currentFile: string | null;
}

interface FolderContextType {
  folderState: FolderState;
  setFolder: (folderId: string) => void;
  setFile: (folderId: string, fileSlug: string) => void;
  resetToHome: () => void;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [folderState, setFolderState] = useState<FolderState>({
    currentFolder: "home",
    currentFile: null,
  });

  const setFolder = (folderId: string) => {
    setFolderState({
      currentFolder: folderId,
      currentFile: null,
    });
  };

  const setFile = (folderId: string, fileSlug: string) => {
    setFolderState({
      currentFolder: folderId,
      currentFile: fileSlug,
    });
  };

  const resetToHome = () => {
    setFolderState({
      currentFolder: "home",
      currentFile: null,
    });
  };
  console.log("Folder", folderState);
  return (
    <FolderContext.Provider
      value={{ folderState, setFolder, setFile, resetToHome }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolderContext = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolderContext must be used within a FolderProvider");
  }
  return context;
};
