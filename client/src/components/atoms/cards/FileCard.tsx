import React from "react";

interface FileCardProps {
  id: number | string;
  title: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const FileCard: React.FC<FileCardProps> = ({
  id,
  title,
  className = "file_holder",
  children,
  onClick,
}) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
      {title}
    </div>
  );
};

export default FileCard;
