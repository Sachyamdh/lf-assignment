import React, { useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import FileCard from "../../atoms/cards/FileCard";
import clsx from "clsx";
import styles from "@/src/components/organisms/sidebars/sidebars.module.scss";

interface FolderCardProps {
  id: number;
  fileCardClassName?: string;
  className?: string;
  name: string;
  dropdown?: Array<{
    title: string;
    slug: string;
  }>;
  onFolderClick: (folderId: string) => void;
  onFileClick: (fileId: string) => void;
}

const FolderCard: React.FC<FolderCardProps> =  ({
  id,
  fileCardClassName,
  className,
  name,
  dropdown,
  onFolderClick,
  onFileClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (dropdown && dropdown.length > 0) {
      setIsExpanded(!isExpanded);
    }
    onFolderClick(name);
  };

  return (
    <div className={className}>
      <div className={clsx(styles.sidebar__folderTitle)} onClick={handleToggle}>
        <span className={clsx(styles.sidebar__folderName)}>
          <FaRegFolderOpen className="folder-icon" />
          {name}
        </span>
        {dropdown?.length ? (
          <span className="folder-arrow">
            {isExpanded ? <SlArrowUp /> : <SlArrowDown />}
          </span>
        ) : null}
      </div>

      {isExpanded && dropdown?.length ? (
        <div className={clsx(styles.sidebar__folderContents)}>
          {dropdown.map((item) => {
            return (
              <FileCard
                className={fileCardClassName}
                key={item.slug}
                id={item.slug}
                title={item.title}
                onClick={(e) => {
                  e.stopPropagation();
                  onFileClick(item.slug);
                }}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default FolderCard;
