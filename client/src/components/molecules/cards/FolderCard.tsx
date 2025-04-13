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
    id: number;
    title: string;
    subInfo?: string;
  }>;
  onFileClick?: (fileId: number) => void;
}

const FolderCard: React.FC<FolderCardProps> = ({
  id,
  fileCardClassName,
  className,
  name,
  dropdown,
  onFileClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (dropdown && dropdown.length > 0) {
      setIsExpanded(!isExpanded);
    }
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
                key={item.id}
                id={item.id}
                title={item.title}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default FolderCard;
