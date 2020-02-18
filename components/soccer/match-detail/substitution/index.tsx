import React, { Fragment } from "react";
import { TimelineEvent, Player } from "../../../../apis/soccer/models";
import { sortArray } from "../../../../common/utils/sort";
import { SubstitutionType } from './type';

type Props = {
  substitutionEvents: TimelineEvent[];
};

const PlayerRow = (player: Player, substitutionType: SubstitutionType) => {
  const className = `player ${substitutionType === SubstitutionType.In ? "player-in" : "player-out"}`;
  return (
    <Fragment>
      <div className={className}>
        <span>{player.JerseyNumber}</span><span>{player.Name}</span>
      </div>
      <div className=""></div>
    </Fragment>
  );
}

const SubstitutionRow = (substitutionEvent: TimelineEvent) => (
  <div className="subtitution-item sub-line" key={substitutionEvent.Id}>
    <div className="time">{substitutionEvent.MatchTime}</div>
    {PlayerRow(substitutionEvent.PlayerIn, SubstitutionType.In)}
    {PlayerRow(substitutionEvent.PlayerOut, SubstitutionType.Out)}
  </div>
);

const Substitution: React.FC<Props> = (props: Props) => {
  const sortedSubstitutionEvents = sortArray(props.substitutionEvents, "MatchTime", "DESC");

  return (
    <>
      {sortedSubstitutionEvents?.map(event => SubstitutionRow(event))}
    </>
  );
};

export default Substitution;