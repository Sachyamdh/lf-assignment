import React from "react";
import { Typography, Link } from "@mui/material";
import { FaRegCalendarAlt, FaRegFolderOpen } from "react-icons/fa";

type Props = {
  date: string;
  folder: string;
  className: string;
};

const NoteMeta = ({ date, folder = "test", className }: Props) => (
  <div className={className}>
    <h6>
      <FaRegCalendarAlt />
      {date} 12/13/14
    </h6>

    <label>
      {" "}
      <FaRegFolderOpen />
      <h5>
        {" "}
        <u>{folder}</u>
      </h5>
    </label>
  </div>
);

export default NoteMeta;
