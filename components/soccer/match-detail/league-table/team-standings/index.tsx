import React from "react";
import { TeamStanding } from "../../../../../apis/soccer/models/team-standing";
import { useDeviceContext } from "../../../../../contexts/device-context";
import outcomeColor from "../../../../../common/enums/outcome-color";
import { Props } from "./type";


export default function TeamStandings(props: Props) {
  return (
    <table>
      <Header />
      <tbody>
        {props.teamStandings.map(standing => (
          <Row key={standing.Id} {...standing} />
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
          <th>#</th>
          <th>Team</th>
          <th>P</th>
          <th>Win</th>
          <th>L</th>
          <th>D</th>
          <th>GF</th>
          <th>GA</th>
          <th>PTS</th>
        </tr>
      </thead>
    );
  }

  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Team</th>
        <th>Played</th>
        <th>Win</th>
        <th>Lose</th>
        <th>Draw</th>
        <th>Goal For</th>
        <th>Goal Against</th>
        <th>Points</th>
      </tr>
    </thead>
  );
}

export function Row(props: TeamStanding) {
  return (
    <tr>
      <td style={{ backgroundColor: outcomeColor[props.Outcome.Value] }}>
        {props.Rank}
      </td>
      <td>{props.Name}</td>
      <td>{props.Played}</td>
      <td>{props.Win}</td>
      <td>{props.Loss}</td>
      <td>{props.Draw}</td>
      <td>{props.GoalsFor}</td>
      <td>{props.GoalsAgainst}</td>
      <td>{props.Points}</td>
    </tr>
  );
}
