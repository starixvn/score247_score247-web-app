import React from "react";
import { TeamLineups } from "../../../../../apis/soccer/models";
import StartingLineups from "../../starting-lineups";
import SubstitutePlayers from "../../substitute-players";
import TeamCoach from "../../coach";
import PitchView from "../../pitch-view";
import Substitution from "../../substitution";
import { useTranslation } from "../../../../../common/helpers/Localizer";
import { ResourceType, SoccerResourceKey } from "../../../../../common/resources";

type Props = {
  lineups: TeamLineups;
  pitchView: string;
};

export default function TeamLineUps(props: Props) {
  const { t } = useTranslation(ResourceType.SOCCER);
  const { lineups, pitchView } = props;

  return (
    <>
      <div>
        {props.lineups.Name}
        <div>{props.lineups.Formation}</div>
      </div>
      {props.pitchView ? (
        <PitchView pitchView={pitchView} />
      ) : (
        <StartingLineups lineups={lineups.Players} />
      )}
      <div className="sub-wrapper">
        <div className="sub-title">{t(SoccerResourceKey.SUBSTITUTION)}</div>
        <Substitution substitutionEvents={lineups.SubstitutionEvents} />
      </div>
      {t(SoccerResourceKey.SUBSTITUTE_PLAYERS)}
      <SubstitutePlayers substitutePlayers={lineups.Substitutions} />
      <div className="text-uppercase">{t(SoccerResourceKey.COACH)}</div>
      <TeamCoach coach={lineups.Coach} />
    </>
  );
}
