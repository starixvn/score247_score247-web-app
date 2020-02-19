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
      <Card className="pitch-view-team" title={lineups.Name}>
        {lineups.Formation && <div className="formation">{lineups.Formation}</div>}
        {pitchView ? <PitchView pitchView={pitchView} /> : <StartingLineups lineups={lineups.Players} />}
      </Card>
      <Card title={t(SoccerResourceKey.SUBSTITUTION)} titleIcon="icon-substitute-player">
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
