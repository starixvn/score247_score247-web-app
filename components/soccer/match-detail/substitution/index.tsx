import React from "react";
import { TimelineEvent, Player } from "../../../../apis/soccer/models";
import { sortArray } from "../../../../common/utils/sort";
import { SubstitutionType } from './type';

type Props = {
  substitutionEvents: TimelineEvent[];
};

const PlayerRow = (player: Player, substitutionType: SubstitutionType) => (
  <>
    {player.JerseyNumber} {player.Name} {substitutionType === SubstitutionType.In ? "IN" : "OUT"}
  </>
);

const SubstitutionRow = (substitutionEvent: TimelineEvent) => (
  <div className="substitution-row" key={substitutionEvent.Id}>
    {substitutionEvent.MatchTime}
    <span>
      {PlayerRow(substitutionEvent.PlayerOut, SubstitutionType.Out)}
      {PlayerRow(substitutionEvent.PlayerOut, SubstitutionType.In)}
    </span>
  </div>
);

const Substitution: React.FC<Props> = (props: Props) => {
  const sortedSubstitutionEvents = sortArray(props.substitutionEvents, "CreatedTime");

  return (
    <div>
      {sortedSubstitutionEvents.map(event => SubstitutionRow(event))}
    </div>
  );
};

export default Substitution;