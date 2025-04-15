"use client";
import { formatDate } from "@/src/utils/dateformatter";
import { useRouter } from "next/navigation";

interface NoteCardProps {
  id: string;
  title: string;
  date?: string;
  subInfo?: string;
  className: string;
}

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  date,
  subInfo,
  className,
}) => {
  const router = useRouter();

  const trimSubInfo = (data?: string) => {
    if (!data) return "";
    return data.split(" ").slice(0, 4).join(" ");
  };

  const handleClick = () => {
    router.push(`/notes/${id}`);
  };

  return (
    <article className={className} onClick={handleClick}>
      <h4>{title}</h4>
      <div>
        <label className=".caption">{formatDate(date)}</label>
        <label className=".caption">{trimSubInfo(subInfo)} ....</label>
      </div>
    </article>
  );
};

export default NoteCard;
