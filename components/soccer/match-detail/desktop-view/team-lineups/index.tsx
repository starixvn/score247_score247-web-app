import React from "react";
import { TeamLineups } from "../../../../../apis/soccer/models";
import StartingLineups from "../../starting-lineups";
import SubstitutePlayers from "../../substitute-players";
import TeamCoach from "../../coach";
import PitchView from "../../pitch-view";
import Substitution from "../../substitution";
import { useTranslation } from "../../../../../common/helpers/Localizer";
import { ResourceType, SoccerResourceKey } from "../../../../../common/resources";
import Card from "../../../../common/basic/card";

type Props = {
  lineups: TeamLineups;
  pitchView: string;
};

export default function TeamLineUps(props: Props) {
  const { t } = useTranslation(ResourceType.SOCCER);
  const { lineups, pitchView } = props;

  return (
    <>
      <div className="card pitch-view-team">
        <div className="card-title team-name">
          {props.lineUps.Name}          
        </div>
        <div className="formation">{props.lineUps.Formation}</div>
        {props.pitchView ? <PitchView pitchView={pitchView} /> : <StartingLineups lineUps={lineUps.Players} />}
      </div>     
      <Card title={t(SoccerResourceKey.SUBSTITUTION)}>
        <Substitution substitutionEvents={lineups.SubstitutionEvents} />
      </Card>
      <Card title={t(SoccerResourceKey.SUBSTITUTE_PLAYERS)}>
        <SubstitutePlayers substitutePlayers={lineups.Substitutions} />
      </Card>
      <Card title={t(SoccerResourceKey.COACH)}>
        <TeamCoach coach={lineups.Coach} />
      </Card>
    </>
  );
}
