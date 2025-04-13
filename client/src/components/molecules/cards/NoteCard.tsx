interface NoteCardProps {
    id: number;
    title: String;
    date?: string;
    subInfo?: string;
  }

//   {date && subInfo && (
//     <div className="notes-sub-section">
//       <span>{date}</span>
//       <span>{subInfo}</span>
//     </div>
//   )}