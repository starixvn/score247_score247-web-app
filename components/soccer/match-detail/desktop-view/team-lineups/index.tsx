import React from "react";
import { TeamLineups } from "../../../../../apis/soccer/models";
import StartingLineups from "../../starting-lineups";
import SubstitutionDesktopView from "../../substitution/desktop-view";
import SubstitutePlayers from "../../substitute-players";
import TeamCoach from "../../coach";
import PitchView from "../../pitch-view";

type Props = {
  lineUps: TeamLineups;
  pitchView: string;
};

export default function TeamLineUps(props: Props) {
  return (
    <>
    <div>
      {props.lineUps.Name}
      <div>{props.lineUps.Formation}</div>
    </div>
      {props.pitchView ? (
        <PitchView pitchView={props.pitchView} />
      ) : (
          <StartingLineups lineUps={props.lineUps.Players} />
        )}
      <div className="text-uppercase">substitution</div>
      <SubstitutionDesktopView substitutionEvents={props.lineUps.SubstitutionEvents} />
      <div className="text-uppercase">substitute players</div>
      <SubstitutePlayers substitutePlayers={props.lineUps.Substitutions} />
      <div className="text-uppercase">coach</div>
      <TeamCoach coach={props.lineUps.Coach} />
    </>
  );
}
