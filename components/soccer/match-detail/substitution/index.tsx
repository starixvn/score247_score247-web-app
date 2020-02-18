import React from "react";
import { TimelineEvent, Player } from "../../../../apis/soccer/models";
import { sortArray } from "../../../../common/utils/sort";
import { SubstitutionType } from './type';

type Props = {
  substitutionEvents: TimelineEvent[];
};

const PlayerRow = (player: Player, substitutionType: SubstitutionType) => (
  <div className={substitutionType === SubstitutionType.In ? "player-in" : "player-out"}>
    {player.JerseyNumber} {player.Name}
  </div>
);

const SubstitutionRow = (substitutionEvent: TimelineEvent) => (
  <div className="substitution-row" key={substitutionEvent.Id}>
    {substitutionEvent.MatchTime}
    <span>
      {PlayerRow(substitutionEvent.PlayerOut, SubstitutionType.In)}
      {PlayerRow(substitutionEvent.PlayerOut, SubstitutionType.Out)}
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