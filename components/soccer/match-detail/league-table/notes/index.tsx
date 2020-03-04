import React from "react";
import { LeagueGroupNote } from "../../../../../apis/soccer/models";
import { Props } from "./type";

export default function Notes(props: Props) {
  if (props.notes.length > 0) {
    return (
      <div>
        {props.notes.map(note => (
          <TeamNote key={note.TeamId} {...note} />
        ))}
      </div>
    );
  }
  return null;
}

export function TeamNote(note: LeagueGroupNote) {
  return (
        <div className="note-box">
            <div className="team">{note.TeamName}</div>
            <div className="note">{note.Comments.join(", ")}</div>
    </div>
  );
}
