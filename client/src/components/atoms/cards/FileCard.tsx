import React from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";

interface FileCardProps {
  id: number;
  title: string;
  className?: string;
}

const FileCard: React.FC<FileCardProps> = ({
  id,
  title,
  className = "file_holder",
}) => {
  return (
    <div className={className} >
      <MdOutlineStickyNote2 />
      {title}
    </div>
  );
};

export default FileCard;
