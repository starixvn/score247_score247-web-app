import React from "react";
import { TeamLineups } from "../../../../../apis/soccer/models";
import PitchView from "../../pitch-view";
import TeamCoach from "../../coach";
import StartingLineups from "../../starting-lineups";
import SubstitutePlayers from "../../substitute-players";
import Substitution from "../../substitution";
import { useTranslation } from "../../../../../common/helpers/Localizer";
import { ResourceType, SoccerResourceKey } from "../../../../../common/resources";
import Card from "../../../../common/basic/card";

type Props = {
  lineups: TeamLineups;
  pitchView: string;
  maxNumberOfSubstitutionEvent: number;
  maxNumberOfSubstitutePlayers: number;
  isShowingSubstitutionEvents: boolean;
};

export default function TeamLineUps(props: Props) {
  const { t } = useTranslation(ResourceType.SOCCER);
  const { lineups, pitchView } = props;
  return (
    <>
      <Card className="pitch-view-team" title={lineups.Name}>
        {lineups.Formation && (<div className="formation">{lineups.Formation}</div>)}
        {pitchView ? <PitchView pitchView={pitchView} /> : <StartingLineups lineups={lineups.Players} />}
      </Card>
      {props.isShowingSubstitutionEvents && (
        <Card title={t(SoccerResourceKey.SUBSTITUTION)} titleIcon={["icon-arrow-down1", "icon-arrow-up"]} className="substitution">
          <Substitution substitutionEvents={lineups.SubstitutionEvents} maxNumberOfSubstitutionEvent={props.maxNumberOfSubstitutionEvent} />
        </Card>
      )}
      {lineups.Substitutions?.some(x => x) && (
        <Card title={t(SoccerResourceKey.SUBSTITUTE_PLAYERS)} titleIcon="icon-substitute-player" className="substitute-player">
          <SubstitutePlayers substitutePlayers={lineups.Substitutions} maxNumberOfSubstitutePlayers={props.maxNumberOfSubstitutePlayers} />
        </Card>
      )}
      <Card className="coach" title={t(SoccerResourceKey.COACH)} titleIcon="icon-account" >
        <TeamCoach coach={lineups.Coach} />
      </Card>
    </>
  );
}
