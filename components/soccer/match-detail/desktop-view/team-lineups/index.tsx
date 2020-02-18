import React from "react";
import { TeamLineups } from "../../../../../apis/soccer/models";
import StartingLineups from "../../starting-lineups";
import Substitution from "../../substitution";
import SubstitutePlayers from "../../substitute-players";
import TeamCoach from "../../coach";

type Props = {
  lineUps: TeamLineups;
  pitchView: string;
};

export default function TeamLineUps(props: Props) {
  return (
    <>
      <StartingLineups lineUps={props.pitchView || props.lineUps.Players} />
      <div className="text-uppercase">substitution</div>
      <Substitution substitutionEvents={props.lineUps.SubstitutionEvents} />
      <div className="text-uppercase">substitute players</div>
      <SubstitutePlayers substitutePlayers={props.lineUps.Substitutions} />
      <div className="text-uppercase">coach</div>
      <TeamCoach coach={props.lineUps.Coach}/>
    </>
  );
}
