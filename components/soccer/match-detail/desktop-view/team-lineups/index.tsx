import React from "react";
import { TeamLineups } from "../../../../../apis/soccer/models";
import StartingLineups from "../../starting-lineups";
import SubstitutePlayers from "../../substitute-players";
import TeamCoach from "../../coach";
import PitchView from "../../pitch-view";
import Substitution from '../../substitution';
import { useTranslation } from "../../../../../common/helpers/Localizer";
import { ResourceType, SoccerResourceKey } from "../../../../../common/resources";

type Props = {
  lineUps: TeamLineups;
  pitchView: string;
};

export default function TeamLineUps(props: Props) {
  const { t } = useTranslation(ResourceType.SOCCER);
  const { lineUps, pitchView } = props;

  return (
    <>
      <div>
        {props.lineUps.Name}
        <div>{props.lineUps.Formation}</div>
      </div>
      {props.pitchView ? <PitchView pitchView={pitchView} /> : <StartingLineups lineUps={lineUps.Players} />}
      <div className="text-uppercase">{t(SoccerResourceKey.SUBSTITUTION)}</div>
      <Substitution substitutionEvents={lineUps.SubstitutionEvents} />
      <div className="text-uppercase">{t(SoccerResourceKey.SUBSTITUTE_PLAYERS)}</div>
      <SubstitutePlayers substitutePlayers={lineUps.Substitutions} />
      <div className="text-uppercase">{t(SoccerResourceKey.COACH)}</div>
      <TeamCoach coach={lineUps.Coach} />
    </>
  );
}
