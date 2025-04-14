import React from "react";

interface FileCardProps {
  id: number | string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const FileCard: React.FC<FileCardProps> = ({
  id,
  title,
  className = "file_holder",
  children,
}) => {
  return (
    <div className={className}>
      {children}
      {title}
    </div>
  );
};

export default FileCard;
