import React from "react";
import { Props } from "./type";
import TeamStandings from "./team-standings";
import Notes from "./notes";
import Outcomes from "./current-outcome";
import "./style.scss";

export default function LeagueTable(props: Props) {
  const { leagueTable } = props;
  const groupTable = leagueTable.GroupTables[0];
  
  return (
    <>
      <TeamStandings teamStandings={groupTable.TeamStandings} />
      <Notes notes={groupTable.GroupNotes} />
      <Outcomes outcomes={groupTable.OutcomeList} />
    </>
  );
}
