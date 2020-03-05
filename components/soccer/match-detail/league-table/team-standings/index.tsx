import React from "react";
import { TeamStanding } from "../../../../../apis/soccer/models/team-standing";
import { useDeviceContext } from "../../../../../contexts/device-context";
import outcomeColor from "../../../../../common/enums/outcome-color";
import { Props } from "./type";


export default function TeamStandings(props: Props) {
  return (
    <table className="tbl-team-standings">
      <Header />
      <tbody>
        {props.teamStandings.map(standing => (
          <Row key={standing.Id} {...standing} highLighted={standing.Id === props.homeTeamId || standing.Id === props.awayTeamId}/>
        ))}
      </tbody>
    </table>
  );
}

function Header() {
  const { isMobile } = useDeviceContext();
  if (isMobile) {
    return (
      <thead>
        <tr>
          <th className="col">#</th>
          <th>Team</th>
          <th className="col">P</th>
          <th className="col">W</th>
          <th className="col">L</th>
          <th className="col">D</th>
          <th className="col">GF</th>
          <th className="col">GA</th>
          <th className="col">PTS</th>
        </tr>
      </thead>
    );
  }

  return (
    <thead>
      <tr>
        <th className="col-outcome">#</th>
        <th>Team</th>
        <th className="col">Played</th>
        <th className="col">Win</th>
        <th className="col">Lose</th>
        <th className="col">Draw</th>
        <th className="col">Goal For</th>
        <th className="col">Goal Against</th>
        <th className="col">Points</th>
      </tr>
    </thead>
  );
}

export function Row(props: TeamStanding & {highLighted: boolean}) {
  return (
    <tr className={props.highLighted ? "highlight" : ""}>
      <td className={outcomeColor[props.Outcome.Value]}>
        {props.Rank}
      </td>
      <td className="team-name">{props.Name}</td>
      <td className="odd">{props.Played}</td>
      <td>{props.Win}</td>
      <td className="odd">{props.Loss}</td>
      <td>{props.Draw}</td>
      <td className="odd">{props.GoalsFor}</td>
      <td >{props.GoalsAgainst}</td>
      <td className="odd">{props.Points}</td>
    </tr>
  );
}
