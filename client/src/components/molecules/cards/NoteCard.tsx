interface NoteCardProps {
  id: number;
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
      <div className=".caption">
        {" "}
        <span>{date}</span>
        <span>{trimSubInfo(subInfo)} ....</span>
      </div>
    </article>
  );
};

export default NoteCard;
