import React from "react";
import ReactMarkdown from "react-markdown";


type Props = {
  content: string;
};

const NoteContent = ({ content }: Props) => {
  return (
    <div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default NoteContent;
