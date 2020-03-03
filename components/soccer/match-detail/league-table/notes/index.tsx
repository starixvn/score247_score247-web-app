import React from "react";
import { LeagueGroupNote } from "../../../../../apis/soccer/models";

type Props = {
  notes: LeagueGroupNote[];
};

export default function Notes(props: Props) {
  if (props.notes.length > 0) {
    return (
    <div>
        {props.notes.map(note => <TeamNote key={note.TeamId} {...note} />)}
    </div>);
  }
  return null;
}


 function TeamNote(note: LeagueGroupNote) {
    return (
        <div>
            {note.TeamName}: {note.Comments.join(", ")}
        </div>
    );
  }
  