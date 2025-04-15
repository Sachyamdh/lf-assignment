import { formatDate } from "@/src/utils/dateformatter";

interface NoteCardProps {
  id: string;
  title: String;
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
  const trimSubInfo = (data?: string) => {
    if (!data) return "";
    return data.split(" ").slice(0, 4).join(" ");
  };

  return (
    <article className={className}>
      <h4>{title}</h4>
      <div>
        {" "}
        <label className=".caption">{formatDate(date)}</label>
        <label className=".caption">{trimSubInfo(subInfo)} ....</label>
      </div>
    </article>
  );
};

export default NoteCard;
